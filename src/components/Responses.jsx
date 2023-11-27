import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Responses.css';

const ResponsesList = () => {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/response/get-all-responses')
            .then(response => {
                setResponses(response.data);
            })

            .catch(error => {
                console.error('Error fetching responses:', error);
            });
    }, []);

    const renderImage = (imageBase64) => {
        if (imageBase64) {
            return <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Response" />;
        }
        return null;
    };

    return (
        <div className="main-content">
        <div className="responses-container">
            {responses.map((response) => (
                <div key={response.id} className="response-card">
                    <div className="response-image">
                        {renderImage(response.invitationImageBase64)}
                    </div>
                    <div className="Info_about">
                        <div className="Info_about_column">
                            <h3>Event NAME: {response.eventTitle}</h3>
                            <p><strong>Attend:</strong> {response.attendFlag ? 'Yes' : 'No'}</p>
                            <p><strong>Custom Response:</strong> {response.customResponse}</p>
                        </div>
                        {response.attendFlag && (
                            <div className="Info_about_column_2">
                                <p><strong>Response 1:</strong> {response.response1}</p>
                                <p><strong>Response 2:</strong> {response.response2}</p>
                                <p><strong>Response 3:</strong> {response.response3}</p>
                                <p><strong>Response 4:</strong> {response.response4}</p>
                                <p><strong>Response 5:</strong> {response.response5}</p>
                                <p><strong>Custom Answer:</strong> {response.customAnswer}</p>
                                <p><strong>Invitee Name:</strong> {response.inviteeName}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default ResponsesList;
