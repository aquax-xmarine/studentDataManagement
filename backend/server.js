console.log("SERVER STARTED");
const express = require("express");
const pool = require("./db");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT NOW()"
        );

        res.json(result.rows);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        // Development only (replace with bcrypt later)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
});


app.get("/api/students/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        console.log("studentId =", studentId);

        const result = await pool.query(
            `
            SELECT *
            FROM students
            WHERE id = $1
            `,
            [studentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

// Get students who had remarks in the last scheduled class
app.get("/api/student-remarks/last/:groupId/:section", async (req, res) => {
    try {

        const { groupId, section } = req.params;
        const [grade, subject] = groupId.split("-");

        const today = new Date();
        // const today = new Date("2026-07-17");

        const weekDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const todayName = today.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const todayIndex = weekDays.indexOf(todayName);

        for (let i = 1; i <= 7; i++) {

            const index = (todayIndex - i + 7) % 7;
            const dayName = weekDays[index];

            const previousDate = new Date(today);
            previousDate.setDate(today.getDate() - i);

            const schedule = await pool.query(
                `
                SELECT id
                FROM teacher_schedule
                WHERE day = $1
                AND grade = $2
                AND LOWER(subject) = LOWER($3)
                AND section = $4
                `,
                [
                    dayName,
                    grade,
                    subject,
                    section
                ]
            );

            if (schedule.rows.length === 0) {
                continue;
            }

            const scheduleId = schedule.rows[0].id;

            const result = await pool.query(
                `
                SELECT
                    s.id,
                    s.roll_no,
                    s.name,
                    scr.remarks
                FROM student_remarks scr
                JOIN students s
                    ON s.id = scr.student_id
                WHERE scr.schedule_id = $1
                AND scr.class_date = $2
                ORDER BY s.roll_no
                `,
                [
                    scheduleId,
                    previousDate.toISOString().split("T")[0]
                ]
            );

            return res.json(result.rows);
        }

        return res.json([]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});


app.get("/api/student-remarks/last/:groupId/:section/:studentId", async (req, res) => {
    try {

        const { groupId, section, studentId } = req.params;

        const [grade, subject] = groupId.split("-");

        const today = new Date();
        // const today = new Date("2026-07-17");

        const weekDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const todayName = today.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const todayIndex = weekDays.indexOf(todayName);

        for (let i = 1; i <= 7; i++) {

            const index = (todayIndex - i + 7) % 7;
            const dayName = weekDays[index];

            const previousDate = new Date(today);
            previousDate.setDate(today.getDate() - i);

            const schedule = await pool.query(
                `
                SELECT id
                FROM teacher_schedule
                WHERE day = $1
                AND grade = $2
                AND LOWER(subject) = LOWER($3)
                AND section = $4
                `,
                [
                    dayName,
                    grade,
                    subject,
                    section
                ]
            );

            if (schedule.rows.length === 0) {
                continue;
            }

            const scheduleId = schedule.rows[0].id;

            const result = await pool.query(
                `
SELECT *
FROM student_remarks
WHERE student_id = $1
AND schedule_id = $2
AND class_date = $3
`,
                [
                    studentId,
                    scheduleId,
                    previousDate.toISOString().split("T")[0]
                ]
            );

            return res.json(result.rows[0] || null);

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});


// // Get today's remarks for a class
app.get("/api/class-remarks/:groupId/:section", async (req, res) => {
    try {

        const { groupId, section } = req.params;
        const [grade, subject] = groupId.split("-");

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long"
        });
        // const today = "Friday";

        // Find today's schedule
        const schedule = await pool.query(
            `
            SELECT id
            FROM teacher_schedule
            WHERE day = $1
            AND grade = $2
            AND LOWER(subject) = LOWER($3)
            AND section = $4
            `,
            [
                today,
                grade,
                subject,
                section
            ]
        );

        if (schedule.rows.length === 0) {
            return res.status(404).json({
                message: "No class scheduled today."
            });
        }

        const scheduleId = schedule.rows[0].id;

        // Get today's remarks
        const result = await pool.query(
            `
            SELECT *
            FROM class_remarks
            WHERE schedule_id = $1
            AND class_date = CURRENT_DATE
            `,
            [scheduleId]
        );

        res.json(result.rows[0] || null);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});


// Save remarks for a class (topics covered)
app.post("/api/class-remarks/:groupId/:section", async (req, res) => {
    try {

        const { groupId, section } = req.params;
        const { topicsCovered } = req.body;

        const [grade, subject] = groupId.split("-");

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long"
        });

        // const today = "Friday";

        // console.log("Today:", today);

        // Find today's schedule
        const schedule = await pool.query(
            `
            SELECT id
            FROM teacher_schedule
            WHERE day = $1
            AND grade = $2
            AND LOWER(subject) = LOWER($3)
            AND section = $4
            `,
            [
                today,
                grade,
                subject,
                section
            ]
        );

        console.log(schedule.rows);

        if (schedule.rows.length === 0) {
            return res.status(404).json({
                message: "No class scheduled today."
            });
        }

        const scheduleId = schedule.rows[0].id;

        const result = await pool.query(
            `
            INSERT INTO class_remarks
                (schedule_id, class_date, topics_covered)
            VALUES
                ($1, CURRENT_DATE, $2)

            ON CONFLICT (schedule_id, class_date)
            DO UPDATE
            SET
                topics_covered = EXCLUDED.topics_covered

            RETURNING *;
            `,
            [
                scheduleId,
                topicsCovered
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});



// Load all students for a given assignment
app.get("/api/assignments/:assignmentId/students", async (req, res) => {
    try {
        const { assignmentId } = req.params;
        console.log("Assignment ID:", assignmentId);

        const result = await pool.query(
            `
            SELECT
                s.id,
                s.roll_no,
                s.name,
                ar.marks,
                ar.remarks
            FROM assignments a
            JOIN students s
                ON LOWER(s.subject) = LOWER(a.subject)
                AND s.section = a.section
            LEFT JOIN assignment_results ar
                ON ar.student_id = s.id
                AND ar.assignment_id = a.id
            WHERE a.id = $1
            ORDER BY s.roll_no;
            `,
            [assignmentId]
        );
        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});


// Load a single student for a given assignment
app.get("/api/assignments/:assignmentId/student/:studentId", async (req, res) => {

    const { assignmentId, studentId } = req.params;

    const result = await pool.query(
        `
        SELECT
            s.id,
            s.name,
            ar.remarks
        FROM students s
        LEFT JOIN assignment_results ar
            ON ar.student_id = s.id
            AND ar.assignment_id = $1
        WHERE s.id = $2
        `,
        [assignmentId, studentId]
    );

    res.json(result.rows[0]);
});


// Save remarks for a student for a given assignment
app.post("/api/assignments/:assignmentId/student/:studentId/remarks", async (req, res) => {

    const { assignmentId, studentId } = req.params;
    const { remarks } = req.body;

    const result = await pool.query(
        `
        INSERT INTO assignment_results
            (assignment_id, student_id, remarks)
        VALUES
            ($1, $2, $3)

        ON CONFLICT (assignment_id, student_id)
        DO UPDATE
        SET remarks = EXCLUDED.remarks

        RETURNING *;
        `,
        [assignmentId, studentId, remarks]
    );

    res.json(result.rows[0]);
});

// Check if today's class exists
app.get("/api/class-schedule/:groupId/:section", async (req, res) => {
    try {
        const { groupId, section } = req.params;
        const [grade, subject] = groupId.split("-");

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long",
        });

        // const today = "Friday";

        const result = await pool.query(
            `
            SELECT id
            FROM teacher_schedule
            WHERE day = $1
            AND grade = $2
            AND LOWER(subject) = LOWER($3)
            AND section = $4
            `,
            [
                today,
                grade,
                subject,
                section
            ]
        );

        res.json({
            scheduled: result.rows.length > 0
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



app.get("/api/students/:groupId/:section", async (req, res) => {
    try {
        const { groupId, section } = req.params;
        const [grade, subject] = groupId.split("-");

        const result = await pool.query(
            `
            SELECT *
            FROM students
            WHERE grade = $1
            AND LOWER(subject) = $2
            AND section = $3
            `,
            [
                grade,
                subject.toLowerCase(),
                section
            ]
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: error.message
        });

    }
});




// Get class remarks for a student for a given class session
app.get("/api/student-remarks/:groupId/:section/:studentId", async (req, res) => {
    try {

        const { groupId, section, studentId } = req.params;
        const [grade, subject] = groupId.split("-");

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long"
        });

        // const today = "Friday";

        // Find today's schedule
        const schedule = await pool.query(
            `
            SELECT id
            FROM teacher_schedule
            WHERE day = $1
            AND grade = $2
            AND LOWER(subject) = LOWER($3)
            AND section = $4
            `,
            [
                today,
                grade,
                subject,
                section
            ]
        );

        if (schedule.rows.length === 0) {
            return res.json(null);
        }

        const scheduleId = schedule.rows[0].id;

        // Load today's remarks for this student
        const result = await pool.query(
            `
            SELECT *
            FROM student_remarks
            WHERE schedule_id = $1
            AND student_id = $2
            AND class_date = CURRENT_DATE
            `,
            [
                scheduleId,
                studentId
            ]
        );

        res.json(result.rows[0] || null);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

// Save class remarks for a student for a given class session
app.post("/api/student-remarks/:groupId/:section/:studentId", async (req, res) => {
    try {

        const { groupId, section, studentId } = req.params;

        const {
            remarks,
            distracted,
            participating,
            great_effort,
            class_disturbance,
            late_arrival
        } = req.body;

        const [grade, subject] = groupId.split("-");

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long"
        });

        // const today = "Friday";

        // Find today's class
        const schedule = await pool.query(
            `
            SELECT id
            FROM teacher_schedule
            WHERE day = $1
              AND grade = $2
              AND LOWER(subject) = LOWER($3)
              AND section = $4
            `,
            [
                today,
                grade,
                subject,
                section
            ]
        );

        if (schedule.rows.length === 0) {
            return res.status(404).json({
                message: "No class scheduled today."
            });
        }

        const scheduleId = schedule.rows[0].id;

        const result = await pool.query(
            `
            INSERT INTO student_remarks
            (
                student_id,
                schedule_id,
                class_date,
                remarks,
                distracted,
                participating,
                great_effort,
                class_disturbance,
                late_arrival
            )
            VALUES
            (
                $1,$2,CURRENT_DATE,$3,$4,$5,$6,$7,$8
            )

            ON CONFLICT (student_id, schedule_id, class_date)
            DO UPDATE SET
                remarks = EXCLUDED.remarks,
                distracted = EXCLUDED.distracted,
                participating = EXCLUDED.participating,
                great_effort = EXCLUDED.great_effort,
                class_disturbance = EXCLUDED.class_disturbance,
                late_arrival = EXCLUDED.late_arrival

            RETURNING *;
            `,
            [
                studentId,
                scheduleId,
                remarks,
                distracted,
                participating,
                great_effort,
                class_disturbance,
                late_arrival
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});



// Load all assignments for a given group and section
app.get("/api/assignments/:groupId/:section", async (req, res) => {

    const { groupId, section } = req.params;

    const [grade, subject] = groupId.split("-");

    const result = await pool.query(
        `
        SELECT *
        FROM assignments
        WHERE subject = $1
        AND section = $2
        ORDER BY created_at DESC
        `,
        [
            subject,
            section
        ]
    );

    res.json(result.rows);

});


// Create a new assignment for a given group and section
app.post("/api/assignments", async (req, res) => {

    const { exercise, groupId, section } = req.body;

    const [grade, subject] = groupId.split("-");

    await pool.query(
        `
        INSERT INTO assignments
        (exercise, subject, section)
        VALUES ($1,$2,$3)
        `,
        [exercise, subject, section]
    );

    res.json({ message: "Assignment created" });

});


// Save marks for a student for a given assignment
app.post("/api/assignments/:assignmentId/student/:studentId", async (req, res) => {

    const { assignmentId, studentId } = req.params;
    const { marks } = req.body;

    const result = await pool.query(
        `
        INSERT INTO assignment_results
            (assignment_id, student_id, marks)
        VALUES
            ($1, $2, $3)

        ON CONFLICT (assignment_id, student_id)
        DO UPDATE
        SET marks = EXCLUDED.marks

        RETURNING *;
        `,
        [assignmentId, studentId, marks]
    );

    res.json(result.rows[0]);
});


// Get remarks from the last scheduled class
app.get("/api/class-remarks/last/:groupId/:section", async (req, res) => {
    try {

        const { groupId, section } = req.params;
        const [grade, subject] = groupId.split("-");

        const today = new Date();

        // const today = new Date("2026-07-17");

        const weekDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const todayName = today.toLocaleDateString("en-US", {
            weekday: "long"
        });


        const todayIndex = weekDays.indexOf(todayName);

        // Search backwards until a scheduled class is found
        for (let i = 1; i <= 7; i++) {

            const index = (todayIndex - i + 7) % 7;
            const dayName = weekDays[index];

            const previousDate = new Date(today);
            previousDate.setDate(today.getDate() - i);

            const schedule = await pool.query(
                `
                SELECT id
                FROM teacher_schedule
                WHERE day = $1
                AND grade = $2
                AND LOWER(subject) = LOWER($3)
                AND section = $4
                `,
                [
                    dayName,
                    grade,
                    subject,
                    section
                ]
            );

            // If no class on this day, keep searching
            if (schedule.rows.length === 0) {
                continue;
            }

            const scheduleId = schedule.rows[0].id;

            const remarks = await pool.query(
                `
                SELECT topics_covered
                FROM class_remarks
                WHERE schedule_id = $1
                AND class_date = $2
                `,
                [
                    scheduleId,
                    previousDate.toISOString().split("T")[0]
                ]
            );

            // Teacher recorded remarks
            if (remarks.rows.length > 0) {
                return res.json(remarks.rows[0]);
            }

            // Teacher forgot to record remarks
            return res.json({
                topics_covered: null
            });
        }

        // No previous scheduled class found
        return res.json({
            topics_covered: null
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});





app.listen(3000, () => {
    console.log("Server running on port 3000");
});