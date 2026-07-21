import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/StudentRemarks.css";
import "../styles/common.css";
import { API_URL } from '../config.js';


const API_BASE = "${API_URL}/api";

function StudentRemarks() {

    const { assignmentId, studentId } = useParams();

    const [student, setStudent] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [savedMessage, setSavedMessage] = useState(false);

    useEffect(() => {
        fetchStudent();
    }, []);

    async function fetchStudent() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(
                `${API_BASE}/assignments/${assignmentId}/student/${studentId}`
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            setStudent(data);
            setRemarks(data.remarks || "");

        } catch (err) {
            console.error("Failed to fetch student:", err);
            setError("Couldn't load this student. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    async function saveRemarks() {
        try {
            setIsSaving(true);
            setSavedMessage(false);

            const response = await fetch(
                `${API_BASE}/assignments/${assignmentId}/student/${studentId}/remarks`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ remarks })
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            setSavedMessage(true);
            setTimeout(() => setSavedMessage(false), 2500);

        } catch (err) {
            console.error("Failed to save remarks:", err);
            setError("Couldn't save remarks. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <div className="remarks-page">
                <h2 className="remarks-title">Student</h2>
                <p className="remarks-status">Loading…</p>
            </div>
        );
    }

    if (error && !student) {
        return (
            <div className="remarks-page">
                <h2 className="remarks-title">Student</h2>
                <p className="remarks-status remarks-status--error">{error}</p>
            </div>
        );
    }

    return (
        <div className="student-remarks-page">

            <span className="choose-eyebrow">Classroom</span>

            <div className="student-name-pill">
                {student.name}
            </div>

            <div className="remarks-card">
                <textarea
                    className="remarks-textarea"
                    rows={8}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Your Text here"
                />
            </div>

            {error && student && (
                <p className="remarks-status remarks-status--error">{error}</p>
            )}

            <div className="remarks-footer">
                <button
                    type="button"
                    className="remarks-save-button"
                    onClick={saveRemarks}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving…" : "Save"}
                </button>

                {savedMessage && (
                    <span className="remarks-saved-message">Saved Successfully!</span>
                )}
            </div>

        </div>
    );
}

export default StudentRemarks;