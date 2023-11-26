import React, { useState } from 'react';
import './CustomHostForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import themeone from "../images/wedding-theme.jpg";
import themetwo from "../images/Halloween-theme.jpg";
import themethree from "../images/birthday-theme.jpg";
import themefour from "../images/christmas-theme.jpg";
import themefive from "../images/roses-theme.jpg";
import themesix from "../images/seminar-theme.jpg";
import themeseven from "../images/travel-theme.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomHostForm = () => {
    const [formData, setFormData] = useState({
        eventType: '',
        eventTitle: '',
        eventVenue: '',
        dateTime: '',
        customMessage: '',
        questions: {
            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,
        },
        customQuestion: '',
        eventDetails: '',
        invitationImageUrl: '',
    });

  

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/events/upload-image', uploadFormData);
            setFormData({ ...formData, invitationImageId: response.data });
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

// Logic to handle image selection  
    const handleImageSelection = (themeUrl,index) => {
        setFormData({ ...formData, invitationImageUrl: themeUrl });
        setSelectedTile((prevSelectedTile) => (prevSelectedTile === index ? null : index));
        console.log(themeUrl);
    };

    // const handleInputChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     if (type === 'checkbox') {
    //         setFormData({
    //             ...formData,
    //             questions: {
    //                 ...formData.questions,
    //                 [name]: checked,
    //             },
    //         });
    //     } else {
    //         setFormData({
    //             ...formData,
    //             [name]: value,
    //         });
    //     }
    // };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const navigate = useNavigate();
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:8080/api/events', formData);
    //         navigate('/events');
    //         // Handle success
    //     } catch (error) {
    //             console.log(error);
    //     }
    // };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const uploadFormData = new FormData();
        uploadFormData.append('event', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
        if (selectedFile) {
            uploadFormData.append('file', selectedFile);
        }

        try {
            await axios.post('http://localhost:8080/api/events/create-event', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/events'); // Adjust as needed for your routing
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    const [selectedTile, setSelectedTile] = useState(null);

    const changeBorderColor = (index) => {
      setSelectedTile((prevSelectedTile) => (prevSelectedTile === index ? null : index));
    };
  
    const getBorderColor = (index) => (selectedTile === index ? 'black' : '#ddd');


    //   const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //   };

    //   const handleCheckboxChange = (question) => {
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       questions: {
    //         ...prevFormData.questions,
    //         [question]: !prevFormData.questions[question], // Toggle the value
    //       },
    //     }));
    //   };

    //   const handleImageUpload = (event) => {
    //     // Add logic to handle image upload and update the state
    //     const file = event.target.files[0];
    //     // Add logic to handle the file, for example, upload it to a server and get the URL
    //     const imageUrl = URL.createObjectURL(file);
    //     setFormData({
    //       ...formData,
    //       invitationTheme: imageUrl, // Assuming you store the image URL
    //     });
    //   };

    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Add your logic to handle form submission
    //     console.log('Form submitted:', formData);
    //   };

    return (
        <div className="CustomHostFormContainer">
            {/*  onSubmit={handleSubmit} */}
            <form className="hostForm"  onSubmit={handleSubmit}>
                <label>
                    Event Type:<br />
                    {/*  onChange={handleInputChange}  */}
                    <input type="text" name="eventType" value={formData.eventType} onChange={handleInputChange}/>
                </label>
                <br />
                <label>
                    Event Title:<br />
                    {/* onChange={handleInputChange}  */}
                    <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleInputChange}/>
                </label>
                <br />
                <label>
                    Event Venue:<br />
                    {/*  onChange={handleInputChange}  */}
                    <input type="text" name="eventVenue" value={formData.eventVenue} onChange={handleInputChange}/>
                </label>
                <br />
                <label>
                    Event Date & Time:<br />
                    {/*  onChange={handleInputChange}  */}
                    <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleInputChange}/>
                </label>
                <br />
                <div>
                    Invitation Theme:<br />
                    {/* image tile selection */}
                    <div className="inv-theme-tiles">
                    <div className="image-tile" style={{ border: `2px solid ${getBorderColor(0)}` }} onClick={() => handleImageSelection("wedding",0)}>
                        <img src={themeone} alt="theme1" />
                        <hr />
                        <p name="wedding">wedding</p>
                    </div>
                    <div className="image-tile" name="theme2" style={{ border: `2px solid ${getBorderColor(1)}` }} onClick={() => handleImageSelection("halloween",1)}>
                        <img src={themetwo} alt="theme2" />
                        <hr />
                        <p name="halloween">halloween</p>
                    </div>
                    <div className="image-tile" name="theme3" style={{ border: `2px solid ${getBorderColor(2)}` }} onClick={() => handleImageSelection("birthday",2)}>
                        <img src={themethree} alt="theme3" />
                        <hr />
                        <p name="birthday">birthday</p>
                    </div>
                    <div className="image-tile" name="theme4" style={{ border: `2px solid ${getBorderColor(3)}` }} onClick={() => handleImageSelection("christmas",3)}>
                        <img src={themefour} alt="theme4" />
                        <hr />
                        <p name="christmas">christmas</p>
                    </div>
                    <div className="image-tile" name="theme5" style={{ border: `2px solid ${getBorderColor(4)}` }} onClick={() => handleImageSelection("roses",4)}>
                        <img src={themefive} alt="theme5" />
                        <hr />
                        <p name="roses">roses</p>
                    </div>
                    <div className="image-tile" name="theme6" style={{ border: `2px solid ${getBorderColor(5)}` }} onClick={() => handleImageSelection("seminar",5)}>
                        <img src={themesix} alt="theme6" />
                        <hr />
                        <p name="seminar">seminar</p>
                    </div>
                    <div className="image-tile" name="theme7" style={{ border: `2px solid ${getBorderColor(6)}` }} onClick={() => handleImageSelection("travel",6)}>
                        <img src={themeseven} alt="theme7" />
                        <hr />
                        <p name="travel">travel</p>
                    </div>
                    <div className="image-tile" name="cust_theme">
                        <label htmlFor="fileInput" className="file-input-label">
                            <FontAwesomeIcon icon={faCirclePlus} className="faiconplus" />
                            <input type="file" id="fileInput" className="file-input" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>
                    
                    </div>
                  
                    {/* custom imge upload tile */}
                </div>

                
                <br />
                <label>
                    Custom Message:<br />
                    {/* onChange={handleInputChange}   */}
                    <input type="text" name="customMessage" value={formData.customMessage} onChange={handleInputChange}/>
                </label>
                <br />
                {/* Questions */}
                <div id="questions-div">
                    <p>Questions:</p>
                    <label>
                        {/* checked={formData.questions.includes('question1')}  onChange={() => handleCheckboxChange('question1')}  */}
                        <input type="checkbox" name="question1" checked={formData.question1} onChange={handleInputChange} />
                        Question 1
                    </label><br />
                    <label>
                        {/*  checked={formData.questions.includes('question2')} onChange={() => handleCheckboxChange('question2')}  */}
                        <input type="checkbox" name="question2" checked={formData.question2} onChange={handleInputChange} />
                        Question 2
                    </label><br />
                    <label>
                        {/*  checked={formData.questions.includes('question3')} onChange={() => handleCheckboxChange('question3')}  */}
                        <input type="checkbox" name="question3" checked={formData.question3} onChange={handleInputChange}  />
                        Question 3
                    </label><br />
                    <label>
                        {/* checked={formData.questions.includes('question4')}  onChange={() => handleCheckboxChange('question4')}  */}
                        <input type="checkbox" name="question4" checked={formData.question4} onChange={handleInputChange} />
                        Question 4
                    </label><br />
                    <label>
                        {/*  checked={formData.questions.includes('question5')} onChange={() => handleCheckboxChange('question5')}  */}
                        <input type="checkbox" name="question5" checked={formData.question5} onChange={handleInputChange} />
                        Question 5
                    </label>
                </div>
                <label>
                    Add a Custom Question:<br />
                    {/*  onChange={handleInputChange}  */}
                    <input type="text" name="customQuestion" value={formData.customQuestion} onChange={handleInputChange}/>
                </label>
                <br />
                <label>
                    Event Details:<br />
                    {/*  onChange={handleInputChange}  */}
                    <input type="text" name="eventDetails" value={formData.eventDetails} onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit" id="create-inv-btn">Create Invitation</button>
            </form>
        </div>
    );
}

export default CustomHostForm;