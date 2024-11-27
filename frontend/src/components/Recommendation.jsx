import React, { useState } from "react";
import "../styles/index.css";
import { toast } from "react-toastify"
import api from "../api"
import LoadingIndicator from "./LoadingIndicator";

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
            
            setRecommendation(response.data.recommendation)
    
            toast.success("Recommendations generated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate recommendations.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="intro">
            <div className=" intro">
            <button onClick={fetchRecommendation} className="btn btn--dark">
                Generate AI Recommendations
            </button>
            </div>
            <div className="intro">
            {loading && <LoadingIndicator/>}
            </div>

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
