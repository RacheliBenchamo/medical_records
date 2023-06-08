import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Form, Button, FormGroup, FormLabel, FormControl, FormText, FormCheck, Dropdown, Alert} from 'react-bootstrap';
import "../styles/styles.css";

import axios from 'axios';

const RegistrationForm = () => {
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
    const [cityOptions, setCityOptions] = useState([]);
    const [error, setError] = useState(null);
    const [registrationComplete, setRegistrationComplete] = useState(false); // New state variable

    useEffect(() => {
        fetchCityData();
    }, []);

    const fetchCityData = () => {
        axios.get(`//api.geonames.org/searchJSON?country=IL&maxRows=100&style=FULL&username=ksuhiyp`)
            .then(response => {
                const cityData = response.data.geonames.map(city => city.name);
                cityData.sort();
                setCityOptions(cityData);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let fieldValue;

        if (type === 'checkbox') {
            if (name === 'infectedBefore') {
                fieldValue = checked;
            } else if (name === 'conditions') {
                const { conditions } = formData;

                if (checked) {
                    fieldValue = [...conditions, value];
                } else {
                    fieldValue = conditions.filter((condition) => condition !== value);
                }
            }
        } else {
            fieldValue = value;
        }

        setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/register', formData)
            .then((response) => {
                setRegistrationComplete(true);
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
            .catch(error => {
                if(error.response.status === 404) {
                    setError([error.response.data.error]);
                }
                else if(error.response.status === 500) {
                    setError([error.response.statusText]);
                }
                else
                    setError(error.response.data);
            });
    };

    if (registrationComplete) {
        return (
            <div className="registration-complete">
                <h3>Thank you for registering!</h3>
                <p>Your details have been successfully submitted.</p>
            </div>
        );
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    maxLength={20}
                    minLength={2}
                    pattern="^\s*[a-zA-Z]+$"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last Name"
                    maxLength={20}
                    minLength={2}
                    pattern="^\s*[a-zA-Z]+$"
                    required
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    className="form-input"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    placeholder="Date of Birth"
                    max={new Date().toISOString().split('T')[0]} // Set the max attribute to the current date
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address"
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    className="form-input"
                    as="select"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                >
                <option value="">Select City</option>
                {cityOptions.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    className="form-input"
                    type="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    placeholder="Zip Code"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="landline">
                <Form.Label>Landline</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    name="landline"
                    value={formData.landline}
                    placeholder="Landline"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="cellphone">
                <Form.Label>Cellular Phone</Form.Label>
                <Form.Control
                    className="form-input"
                    type="text"
                    name="cellphone"
                    value={formData.cellphone}
                    placeholder="Cellular Phone"
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="infectedBefore" className="mb-3 form-check">
                <Form.Check
                    className="form-input"
                    type="checkbox"
                    name="infectedBefore"
                    checked={formData.infectedBefore}
                    onChange={handleChange}
                    label="Have you been infected by COVID-19 before?"
                />
            </Form.Group>
            <Form.Group controlId="conditions" className="mb-3">
                <Form.Label>Previous Conditions</Form.Label>
                <div>
                    <Form.Check
                        type="checkbox"
                        name="conditions"
                        value="diabetes"
                        checked={formData.conditions.includes('diabetes')}
                        onChange={handleChange}
                        label="Diabetes"
                    />
                    <Form.Check
                        type="checkbox"
                        name="conditions"
                        value="cardiovascular"
                        checked={formData.conditions.includes('cardiovascular')}
                        onChange={handleChange}
                        label="Cardiovascular Problems"
                    />
                    <Form.Check
                        type="checkbox"
                        name="conditions"
                        value="allergies"
                        checked={formData.conditions.includes('allergies')}
                        onChange={handleChange}
                        label="Allergies"
                    />
                </div>
            </Form.Group>
            <Form.Group controlId="otherConditions">
                <Form.Label>Other Conditions</Form.Label>
                <Form.Control
                    className="form-input"
                    as="textarea"
                    name="otherConditions"
                    value={formData.otherConditions}
                    placeholder="Other Conditions"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
            <div className="error">
                {error && (
                    <Alert variant="danger" className="mt-4">
                        {Array.isArray(error) ? (
                            <ul>
                                {error.map((errorMsg, index) => (
                                    <li key={index}>{errorMsg}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{error}</p>
                        )}
                    </Alert>
                )}
            </div>
        </Form>
    );
};

export default RegistrationForm;