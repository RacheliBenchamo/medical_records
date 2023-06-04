import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let fieldValue;

        if (type === 'checkbox') {
            const { conditions } = formData;

            if (checked) {
                fieldValue = [...conditions, value];
            } else {
                fieldValue = conditions.filter((condition) => condition !== value);
            }
        } else {
            fieldValue = value;
        }

        setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        if (!formData.address) {
            errors.address = 'Address is required';
        }

        if (!formData.city) {
            errors.city = 'City is required';
        }

        if (!formData.cellphone) {
            errors.cellphone = 'Cellular phone is required';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            setSubmitting(true);

            axios
                .post('/api/register', formData)
                .then((response) => {
                    console.log(response.data);
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
                    setFormErrors({});
                    setSubmitting(false);
                })
                .catch((error) => {
                    console.error(error);
                    setSubmitting(false);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {formErrors.firstName && (
                <Alert variant="danger">{formErrors.firstName}</Alert>
            )}
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            {formErrors.lastName && (
                <Alert variant="danger">{formErrors.lastName}</Alert>
            )}
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            {formErrors.dateOfBirth && (
                <Alert variant="danger">{formErrors.dateOfBirth}</Alert>
            )}
            <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            {formErrors.address && (
                <Alert variant="danger">{formErrors.address}</Alert>
            )}
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            {formErrors.city && (
                <Alert variant="danger">{formErrors.city}</Alert>
            )}
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    as="select"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select City</option>
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="landline">
                <Form.Label>Landline</Form.Label>
                <Form.Control
                    type="text"
                    name="landline"
                    value={formData.landline}
                    onChange={handleChange}
                />
            </Form.Group>
            {formErrors.cellphone && (
                <Alert variant="danger">{formErrors.cellphone}</Alert>
            )}
            <Form.Group controlId="cellphone">
                <Form.Label>Cellular Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="cellphone"
                    value={formData.cellphone}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="infectedBefore" className="mb-3 form-check">
                <Form.Check
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
                    as="textarea"
                    name="otherConditions"
                    value={formData.otherConditions}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Register'}
            </Button>
        </Form>
    );
};

export default RegistrationForm;
