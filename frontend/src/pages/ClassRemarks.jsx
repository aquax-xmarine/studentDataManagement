import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ClassRemarks.css";
import "../styles/common.css";
import { API_URL } from '../config.js';

const API_BASE = `${API_URL}/api`;

function ClassRemarks() {
    const navigate = useNavigate();
    
    const { groupId, sessionId } = useParams();

    const [topicsCovered, setTopicsCovered] = useState("");
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState(false);
    const [error, setError] = useState(null);

    const formattedDate = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {
        fetchRemarks();
        fetchStudents();
    }, []);

    const fetchRemarks = async () => {
        const response = await fetch(
            `${API_BASE}/class-remarks/${groupId}/${sessionId}`
        );

        const data = await response.json();

        if (data) {
            setTopicsCovered(data.topics_covered || "");
        }
    };

    const fetchStudents = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(
                `${API_BASE}/students/${groupId}/${sessionId}`
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setStudents(data);

        } catch (err) {
            console.error("Failed to fetch students:", err);
            setError("Couldn't load students. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const saveRemarks = async () => {
        try {
            setIsSaving(true);
            setSavedMessage(false);

            const response = await fetch(
                `${API_BASE}/class-remarks/${groupId}/${sessionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ topicsCovered }),
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            setSavedMessage(true);
            setTimeout(() => setSavedMessage(false), 2500);

        } catch (err) {
            console.error("Failed to save remarks:", err);
            setError("Couldn't save. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="class-remarks-page">

            <span className="choose-eyebrow">
                Classroom
            </span>

            <h2 className="upcoming-title">
                {sessionId} - {formattedDate}
            </h2>

            <div className="topic-card">

                <div className="topic-label">
                    Topic / Questions Covered
                </div>

                <textarea
                    className="topic-textarea"
                    value={topicsCovered}
                    onChange={(e) => setTopicsCovered(e.target.value)}
                    placeholder="Your Text here"
                />

                <div className="save-row">
                    <button
                        type="button"
                        className="save-button"
                        onClick={saveRemarks}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving…" : "Save"}
                    </button>

                    {savedMessage && (
                        <span className="saved-message">Saved Successfully!</span>
                    )}
                </div>

            </div>

            <h2 className="students-heading">
                Students
            </h2>

            <div className="students-card">

                {isLoading && (
                    <p className="status-message">Loading students…</p>
                )}

                {!isLoading && error && students.length === 0 && (
                    <p className="status-message status-message--error">{error}</p>
                )}

                {!isLoading && !error && students.length === 0 && (
                    <p className="status-message">No students yet.</p>
                )}

                {!isLoading && students.map((student) => (
                    <button
                        key={student.id}
                        type="button"
                        className="student-button"
                        onClick={() =>
                            navigate(
                                `/during-class/${groupId}/session/${sessionId}/student/${student.id}`
                            )
                        }
                    >
                        {student.name}
                        {student.note && ` (${student.note})`}
                    </button>
                ))}

            </div>

        </div>
    );
}

export default ClassRemarks;