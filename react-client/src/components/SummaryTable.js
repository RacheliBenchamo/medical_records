import React, { useState, useEffect } from 'react';
import axios from 'axios';


const SummaryTable = () => {
    // Initialize state for the registration data
    const [registrationData, setRegistrationData] = useState([]);

    // Fetch registration data from the server
    useEffect(() => {
        axios.get('/api/registrations')
            .then((response) => {
                // Update registrationData state with fetched data
                setRegistrationData(response.data);
            })
            .catch((error) => {
                // Handle error while fetching data
                console.error(error);
            });
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    // Render the summary table
    return (
        <table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                {/* ...other table headers */}
            </tr>
            </thead>
            <tbody>
            {registrationData.map((registration) => (
                <tr key={registration.id}>
                    <td>{registration.firstName}</td>
                    <td>{registration.lastName}</td>
                    <td>{registration.dateOfBirth}</td>
                    {/* ...other table cells */}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SummaryTable;
