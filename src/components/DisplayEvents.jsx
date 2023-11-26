import React, { useState, useEffect } from 'react';
import axios from 'axios';
import themeone from "../images/wedding-theme.jpg";
import themetwo from "../images/Halloween-theme.jpg";
import themethree from "../images/birthday-theme.jpg";
import themefour from "../images/christmas-theme.jpg";
import themefive from "../images/roses-theme.jpg";
import themesix from "../images/seminar-theme.jpg";
import themeseven from "../images/travel-theme.jpg";
import './DisplayEvents.css'


const getImagePath = (imageName) => {
        const imageMap = {
            'wedding': themeone,
            'Halloween': themetwo,
            'birthday': themethree,
            'christmas': themefour,
            'roses': themefive,
            'seminar': themesix,
            'travel': themeseven,
        };
        console.log(imageName);
        return imageMap[imageName];
    };
const DisplayEvents = () => {
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/events')
    //         .then(response => setEvents(response.data))
    //         .catch(error => console.error('Error fetching events', error));
    // }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events');
                const eventsData = await Promise.all(response.data.map(async (event) => {
                    const imageResponse = await axios.get(`http://localhost:8080/api/events/${event.id}/image`, {
                        responseType: 'blob'
                    });
                    const imageUrl = URL.createObjectURL(imageResponse.data);
                    return { ...event, imageUrl };
                }));
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        // Clean up URLs when the component unmounts
        return () => {
            events.forEach(event => {
                if (event.imageUrl) {
                    URL.revokeObjectURL(event.imageUrl);
                }
            });
        };
    }, [events]);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             const { data } = await axios.get('http://localhost:8080/api/events');
    //             const eventsWithImages = await Promise.all(data.map(async (event) => {
    //                 if (event.invitationImageData) {
    //                     // Fetch image from the server if image data is present
    //                     const imageResponse = await axios.get(`http://localhost:8080/api/events/${event.id}/image`, {
    //                         responseType: 'blob'
    //                     });
    //                     return { ...event, imageUrl: URL.createObjectURL(imageResponse.data) };
    //                 } else {
    //                     // Use predefined image URL or a placeholder
    //                     return { ...event, imageUrl: event.invitationImageUrl || 'path/to/default-image.jpg' };
    //                 }
    //             }));
    //             setEvents(eventsWithImages);
    //         } catch (error) {
    //             console.error('Error fetching events:', error);
    //         }
    //     };

    //     fetchEvents();
    // }, []);

    // useEffect(() => {
    //     // Clean up URLs when the component unmounts
    //     return () => {
    //         events.forEach(event => {
    //             if (event.imageUrl && event.invitationImageData) {
    //                 URL.revokeObjectURL(event.imageUrl);
    //             }
    //         });
    //     };
    // }, [events]);


    const [rsvp, setRsvp] = useState('');

    const handleRsvpChange = (value) => {
        setRsvp(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        //${event.invitationImageUrl} ? getImagePath(event.invitationImageUrl) : event.imageUrl}
        console.log('Form submitted!');
    };


    return (
        <div>
           {events.map(event => (
             <div className="event-invitation-card" style={{ 
                backgroundImage: `url(${event.invitationImageUrl ? getImagePath(event.invitationImageUrl) : event.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                 
            <form onSubmit={handleSubmit} id="invitation-form" key={event.id}>

                <div className="event-details-container">
                    <div className="event-details">
                        <p className="event-detail"><b>Event Type:</b>  {event.eventType} </p>  {/* event type*/}
                        <p className="event-detail"><b>Event Title:</b>  {event.eventTitle}</p> {/* event title*/}
                        <p className="event-detail"><b>Event Venue:</b>  {event.eventVenue}</p> {/* event venue*/}
                        <p className="event-detail"><b>Date & Time:</b>  {event.dateTime}</p> {/* event date and time*/}
                        <p className="event-detail"><b>Additional details:</b> {event.eventDetails}</p> {/* additional event details*/}
                    </div>
                    <div className="invitation-message">
                        <h1 id="invited">You are cordially invited!</h1>
                        <p className="event-detail">
                        {event.customMessage}
                            {/* custom invitation message */}
                        </p>
                    </div>
                </div>
                <div className="questionnaire-container">
                    <p className="questionnaire-heading">Please answer the following questions:</p>
                    <div className="rsvp-container">
                        <p>RSVP:</p>
                        <div className="radio-buttons">
                            <label className="inv-form-label">
                                <input
                                    type="radio"
                                    name="rsvp"
                                    value="Not Attending"
                                    checked={rsvp === 'Not Attending'}
                                    onChange={() => handleRsvpChange('Not Attending')}
                                /> Not Attending
                            </label>

                            <label className="inv-form-label">
                                <input
                                    type="radio"
                                    name="rsvp"
                                    value="Attending"
                                    checked={rsvp === 'Attending'}
                                    onChange={() => handleRsvpChange('Attending')}
                                />
                                Attending
                            </label>

                            <label className="inv-form-label">
                                <input
                                    type="radio"
                                    name="rsvp"
                                    value="Tentative"
                                    checked={rsvp === 'Tentative'}
                                    onChange={() => handleRsvpChange('Tentative')}
                                />
                                Tentative
                            </label>
                        </div>

                        {rsvp === 'Attending' || rsvp === 'Tentative' ? (
                            <div className="questionnaire-container">

                               {event.question1 && ( 
                                <div className="question-container">
                                    <p className="question"> {event.question1 ? 'question1' : 'No'}</p>
                                    <input
                                        type="text"
                                        className="answer-input"
                                        placeholder="Answer for Question 1"
                                        required
                                    />
                                </div>
                               )} 

                               {event.question2 && ( 
                                <div className="question-container">
                                    <p className="question"> {event.question2 ? 'question2' : 'No'}</p>
                                    <input
                                        type="text"
                                        className="answer-input"
                                        placeholder="Answer for Question 2"
                                        required
                                    />
                                </div> )}
                                

                              {event.question3 && ( 
                                <div className="question-container">
                                    <p className="question">{event.question3 ? 'question3' : 'No'} </p>
                                    <input
                                        type="text"
                                        className="answer-input"
                                        placeholder="Answer for Question 3"
                                        required
                                    />
                                </div> )}
                                
                                {event.question4 && ( 
                                <div className="question-container">
                                    <p className="question"> {event.question4 ? 'question4' : 'No'}</p> 
                                    <input
                                        type="text"
                                        className="answer-input"
                                        placeholder="Answer for Question 4"
                                        required
                                    />
                                </div> )} 
                                

                                {event.question5 && (
                                <div className="question-container">
                                    <p className="question">{event.question5 ? 'question5' : 'No'} </p>
                                    <input
                                        type="text"
                                        className="answer-input"
                                        placeholder="Answer for Question 5"
                                        required
                                    />
                                </div>)}
                              
                                <p className="event-detail"> {event.customQuestion}</p> 
                                <input type="text" className="custom-question-input" placeholder="Your answer for the custom question" required />
                            </div>
                        ) : null}

                        {rsvp && (
                            <div className="additional-info-container">
                                <p className="event-detail">Give a custom greeting or message to the host:</p>
                                <input type="text" id="custom-greeting-input" required />

                                <p className="event-detail">Upload a memorable picture to display in the event:</p>
                                <input type="file" id="upload-picture-input" required />

                                <p className="event-detail">Please type your full name below:</p>
                                <input type="text" className="full-name-input" required />
                            </div>
                        )}
                    </div>
                </div>
                <button type="submit" className="submit-button">
                    Submit Response
                </button>
            
            </form >
  
            

        </div>
))}  
       
        </div>
    );
};

export default DisplayEvents;