import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import SummaryTable from './components/SummaryTable';
import Header from './components/Header';


const App = () => {
    return (
        <div>
            <h1>COVID-19 Vaccination Registration</h1>
            <RegistrationForm />
            <h2>Summary</h2>
            <SummaryTable />
        </div>
    );
};

export default App;
