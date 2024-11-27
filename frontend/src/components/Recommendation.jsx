import React, { useState } from "react";
import "../styles/index.css";

function Recommendation({ budgets, expenses }) {
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState("");
    const [error, setError] = useState("");

    const fetchRecommendation = async () => {
        setLoading(true);
        setError("");
        setRecommendation("");

        try {
            const response = await fetch("/api/generate-recommendation/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ budgets, expenses }),
            });

            if (response.ok) {
                const data = await response.json();
                setRecommendation(data.recommendation);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "An error occurred while fetching recommendations.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendation-container">
            <button onClick={fetchRecommendation} className="btn btn--dark">
                Generate Recommendations
            </button>

            {loading && <p>Loading recommendations...</p>}

            {error && <p className="error">{error}</p>}

            {recommendation && (
                <div className="recommendation-output">
                    <h3>Recommendations</h3>
                    <p>{recommendation}</p>
                </div>
            )}
        </div>
    );
}

export default Recommendation;
