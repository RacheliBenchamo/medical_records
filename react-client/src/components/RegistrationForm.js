import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    // Initialize form field values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        city: '',
        zipCode: '',
        landline: '',
        cellphone: '',
        infectedBefore: false,
        conditions: [],
        otherConditions: '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send POST request to the server
        axios.post('/api/register', formData)
            .then((response) => {
                // Handle successful registration
                console.log(response.data);
                // Reset form fields
                setFormData({
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    address: '',
                    city: '',
                    zipCode: '',
                    landline: '',
                    cellphone: '',
                    infectedBefore: false,
                    conditions: [],
                    otherConditions: '',
                });
            })
            .catch((error) => {
                // Handle registration error
                console.error(error);
            });
    };

    // Render the registration form
    return (
        <form onSubmit={handleSubmit}>
            {/* Render form inputs and fields */}
            {/* Use the handleChange function for input onChange events */}
            {/* Example input: First Name */}
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            {/* ...other form inputs */}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
