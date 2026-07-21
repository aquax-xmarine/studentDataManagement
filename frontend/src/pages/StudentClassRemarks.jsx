import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/StudentClassRemarks.css";
import "../styles/common.css";
import { API_URL } from '../config.js';


const API_BASE = `${API_URL}/api`;

function StudentClassRemarks() {
    const { groupId, sessionId, studentId } = useParams();

    const [student, setStudent] = useState(null);

    const [remarks, setRemarks] = useState("");

    const [quickLinks, setQuickLinks] = useState({
        distracted: false,
        participating: false,
        great_effort: false,
        class_disturbance: false,
        late_arrival: false,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState(false);

    useEffect(() => {
        fetchStudent();
        fetchRemarks();
    }, []);

    async function fetchStudent() {
        const response = await fetch(
            `${API_BASE}/students/${studentId}`
        );

        const data = await response.json();

        setStudent(data);
    }

    async function fetchRemarks() {
        const response = await fetch(
            `${API_BASE}/student-remarks/${groupId}/${sessionId}/${studentId}`
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!data) return;

        setRemarks(data.remarks || "");

        setQuickLinks({
            distracted: data.distracted,
            participating: data.participating,
            great_effort: data.great_effort,
            class_disturbance: data.class_disturbance,
            late_arrival: data.late_arrival,
        });
    }

    function toggleLink(key) {
        setQuickLinks((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    }

    async function saveRemarks() {

        setIsSaving(true);

        await fetch(
            `${API_BASE}/student-remarks/${groupId}/${sessionId}/${studentId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    remarks,
                    ...quickLinks,
                }),
            }
        );

        setIsSaving(false);

        setSavedMessage(true);

        setTimeout(() => {
            setSavedMessage(false);
        }, 2500);
    }

    return (
        <div className="student-class-remarks-page">

            <span className="choose-eyebrow">Classroom</span>

            <div className="student-name">
                {student?.name}
            </div>

            <textarea
                className="remarks-box"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Your Text here"
            />

            <div className="quick-card">

                <h3>
                    Quick Text Links
                </h3>

                <button
                    className={quickLinks.distracted ? "quick-button active" : "quick-button"}
                    onClick={() => toggleLink("distracted")}
                >
                    <span className="quick-button-check">✓</span>
                    <span>Off Task / Distracted</span>
                </button>

                <button
                    className={quickLinks.participating ? "quick-button active" : "quick-button"}
                    onClick={() => toggleLink("participating")}
                >
                    <span className="quick-button-check">✓</span>
                    <span>Participating</span>
                </button>

                <button
                    className={quickLinks.great_effort ? "quick-button active" : "quick-button"}
                    onClick={() => toggleLink("great_effort")}
                >
                    <span className="quick-button-check">✓</span>
                    <span>Great Effort</span>
                </button>

                <button
                    className={quickLinks.class_disturbance ? "quick-button active" : "quick-button"}
                    onClick={() => toggleLink("class_disturbance")}
                >
                    <span className="quick-button-check">✓</span>
                    <span>Class Disturbance</span>
                </button>

                <button
                    className={quickLinks.late_arrival ? "quick-button active" : "quick-button"}
                    onClick={() => toggleLink("late_arrival")}
                >
                    <span className="quick-button-check">✓</span>
                    <span>Late Arrival</span>
                </button>

            </div>

            <button
                className="save-button"
                onClick={saveRemarks}
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "Save"}
            </button>

            {savedMessage && (
                <p className="saved-message">
                    Saved Successfully
                </p>
            )}

        </div>
    );
}

export default StudentClassRemarks;