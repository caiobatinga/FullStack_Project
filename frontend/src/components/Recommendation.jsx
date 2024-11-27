import React, { useState } from "react";
import "../styles/index.css";
import { toast } from "react-toastify"
import api from "../api"

function Recommendation({ budgets, expenses }) {
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState("");
    const [error, setError] = useState("");

    const fetchRecommendation = async () => {
        setLoading(true);
        setError("");
        setRecommendation("");

        try {
            const response = await api.post('/api/generate-recommendation/', {
                budgets,
                expenses,
            });
            const recommendations = response.data.recommendation;
    
            console.log(response)
            toast.success("Recommendations generated!");
            console.log(recommendations);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate recommendations.");
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
