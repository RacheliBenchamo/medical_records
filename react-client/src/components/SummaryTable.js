import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SummaryTable = () => {
    // Initialize state for the registration data
    const [registrationData, setRegistrationData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [searchCity, setSearchCity] = useState('');

    // Fetch registration data from the server
    useEffect(() => {
        axios
            .get('/api/registrations')
            .then((response) => {
                // Update registrationData state with fetched data
                setRegistrationData(response.data);
            })
            .catch((error) => {
                // Handle error while fetching data
                console.error(error);
            });
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    // Filter registration data based on date range and city
    useEffect(() => {
        const filtered = registrationData.filter((registration) => {
            const dateOfBirth = new Date(registration.dateOfBirth);
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);
            const isWithinDateRange = dateOfBirth >= startDate && dateOfBirth <= endDate;
            const matchesCity = registration.city.toLowerCase().includes(searchCity.toLowerCase());
            return isWithinDateRange && matchesCity;
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
            <Table striped bordered responsive>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>City</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((registration) => (
                    <tr key={registration.id}>
                        <td>{registration.firstName}</td>
                        <td>{registration.lastName}</td>
                        <td>{registration.dateOfBirth}</td>
                        <td>{registration.city}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SummaryTable;
