import React, { useState, useEffect } from 'react';
import {Table, Form, Button, FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

import axios from 'axios';

const SummaryTable = () => {
    // Initialize state for the registration data
    const [registrationData, setRegistrationData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [searchCity, setSearchCity] = useState('');
    const [error, setError] = useState(null);

    // Fetch registration data from the server
    useEffect(() => {
        axios
            .get('/api/medical-data')
            .then((response) => {
                setRegistrationData(response.data);
            })
            .catch(error => {
                console.log(error);
                if(error.response.status === 404) {
                    setError(error.response.data.error);
                }
                else if(error.response.status === 500) {
                    setError(error.response.statusText);
                }
                else
                    setError(error.response.data);
            });
    }, []);

    useEffect(() => {
        console.log(filteredData);
    }, [filteredData]);


    // Filter registration data based on date range and city
    useEffect(() => {
        const filtered = registrationData.filter((registration) => {
            const dateOfBirth = new Date(registration.dateOfBirth);
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);
            const isWithinDateRange = dateOfBirth >= startDate && dateOfBirth <= endDate;
            const matchesCity = registration.city.toLowerCase().includes(searchCity.toLowerCase());
            return (
                (!dateRange.startDate || !dateRange.endDate || isWithinDateRange) &&
                (!searchCity || matchesCity)
            );
        });
        setFilteredData(filtered);
    }, [dateRange, searchCity, registrationData]);


    // Handle date range change
    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setDateRange((prevDateRange) => ({ ...prevDateRange, [name]: value }));
    };

    // Handle city search change
    const handleCitySearchChange = (e) => {
        setSearchCity(e.target.value);
    };

    // Clear filters and show all data
    const clearFilters = () => {
        setDateRange({ startDate: '', endDate: '' });
        setSearchCity('');
        setFilteredData(registrationData);
    };

    return (
        <div>
            <h2>Registration Summary</h2>
            <Form>
                <Form.Group className="mb-3" controlId="dateRange">
                    <Form.Label>Date of Birth Range</Form.Label>
                    <div className="d-flex">
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={dateRange.startDate}
                            onChange={handleDateRangeChange}
                        />
                        <span className="mx-2">to</span>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={dateRange.endDate}
                            onChange={handleDateRangeChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="citySearch">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search by city"
                        value={searchCity}
                        onChange={handleCitySearchChange}
                    />
                </Form.Group>
            </Form>
            <div className="mb-3">
                <Button variant="secondary" onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>
            <div>
                {filteredData.length > 0 ? (
                    <Table striped bordered responsive>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>City</th>
                            <th>COVID-19 Infection</th>
                            <th>Previous Conditions</th>
                            <th>Other Conditions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((registration) => (
                            <tr key={registration.id}>
                                <td>{registration.firstName}</td>
                                <td>{registration.lastName}</td>
                                <td>{registration.dateOfBirth}</td>
                                <td>{registration.city}</td>
                                <td>{registration.infectedBefore ? '✓' : '✕'}</td>
                                <td>
                                    {registration.conditions && registration.conditions.length > 0
                                        ? registration.conditions.join(', ')
                                        : '-'}
                                </td>
                                <td>{registration.otherConditions !== ''
                                    ? registration.otherConditions
                                    : '-'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <div className="alert alert-info" role="alert">
                        No data found
                    </div>
                )}
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">{error} </div>
            )}
        </div>
    );
};

export default SummaryTable;
