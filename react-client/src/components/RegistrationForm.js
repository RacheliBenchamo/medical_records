import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/styles.css";
import axios from 'axios';
import {
    Form,
    Button,
    FormGroup,
    FormLabel,
    FormControl,
    FormText,
    FormCheck,
    Dropdown,
    Alert,
    Container,
    Col,
    Row
} from 'react-bootstrap';


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
    const [cityError, setCityError] = useState(null);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const country = "IL";

    useEffect(() => {
        fetchCityData();
    }, []);

    const fetchCityData = () => {
        axios.get(`http://api.geonames.org/searchJSON?country=${country}&maxRows=100&style=FULL&username=ksuhiyp`)
            .then(response => {
                const cityData = response.data.geonames.map(city => city.name);
                cityData.sort();
                setCityOptions(cityData);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setCityError(error.response.data.error);
                } else if (error.response && error.response.status === 500) {
                    setCityError(error.response.statusText);
                } else {
                    setCityError("An error occurred while fetching city data.");
                }
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
                if (error.response.status === 404) {
                    setError([error.response.data.error]);
                }
                else if (error.response.status === 500) {
                    setError([error.response.statusText]);
                }
                else
                    setError(error.response.data);
            });
    };

    if (registrationComplete) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col sm={12} md={8}>
                        <div className="registration-complete">
                            <h3>Thank you for registering!</h3>
                            <p>Your details have been successfully submitted.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={12} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="formFirstName">
                            <FormLabel>First Name</FormLabel>
                            <FormControl
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup controlId="formLastName">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup controlId="formDateOfBirth">
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup controlId="formAddress">
                            <FormLabel>Address</FormLabel>
                            <FormControl
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup controlId="formCity">
                            <FormLabel>City</FormLabel>
                            <FormControl
                                as="select"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a city</option>
                                {cityOptions.map((city, index) => (
                                    <option key={`${city}-${index}`} value={city}>{city}</option>
                                ))}
                            </FormControl>
                        </FormGroup>

                        <div>
                            {cityError && <Alert variant="danger">{cityError}</Alert>}
                        </div>
                        <FormGroup controlId="formZipCode">
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}

                            />
                        </FormGroup>
                        <FormGroup controlId="formLandline">
                            <FormLabel>Landline</FormLabel>
                            <FormControl
                                type="tel"
                                name="landline"
                                value={formData.landline}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="formCellphone">
                            <FormLabel>Cellphone</FormLabel>
                            <FormControl
                                type="tel"
                                name="cellphone"
                                value={formData.cellphone}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormCheck
                                type="checkbox"
                                name="infectedBefore"
                                id="infectedBefore"
                                checked={formData.infectedBefore}
                                onChange={handleChange}
                                label={<span className="bold-label">Have you been infected by COVID-19 before?</span>} // Apply the bold-label class to the label
                            />
                        </FormGroup>
                        <FormGroup controlId="formConditions">
                            <FormLabel>Pre-existing Conditions</FormLabel>
                            <div>
                                <FormCheck
                                    type="checkbox"
                                    name="conditions"
                                    id="diabetes"
                                    value="diabetes"
                                    checked={formData.conditions.includes('diabetes')}
                                    onChange={handleChange}
                                    label="Diabetes"
                                />
                            </div>
                            <div>
                                <FormCheck
                                    type="checkbox"
                                    name="conditions"
                                    id="hypertension"
                                    value="hypertension"
                                    checked={formData.conditions.includes('hypertension')}
                                    onChange={handleChange}
                                    label="Hypertension"
                                />
                            </div>
                            <div>
                                <FormCheck
                                    type="checkbox"
                                    name="conditions"
                                    id="heartDisease"
                                    value="heartDisease"
                                    checked={formData.conditions.includes('heartDisease')}
                                    onChange={handleChange}
                                    label="Heart Disease"
                                />
                            </div>
                        </FormGroup>
                        <FormGroup controlId="formOtherConditions">
                            <FormLabel>Other Conditions</FormLabel>
                            <FormControl
                                as="textarea"
                                rows={3}
                                name="otherConditions"
                                value={formData.otherConditions}
                                onChange={handleChange}
                            />
                            <FormText className="text-muted">Please separate multiple conditions with commas.</FormText>
                        </FormGroup>
                        {error && (
                            <Alert variant="danger">
                                {Array.isArray(error) ? (
                                    <ul>
                                        {error.map((errorMessage, index) => (
                                            <li key={index}>{errorMessage}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{error}</p>
                                )}
                            </Alert>
                        )}
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
