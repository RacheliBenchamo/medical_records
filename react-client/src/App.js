import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './components/RegistrationForm';
import SummaryTable from './components/SummaryTable';
import Header from './components/Header';
import NoPage from "./components/NoPage";


export const AppContext = React.createContext();

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <BrowserRouter>
            <AppContext.Provider value={{ cartItems, setCartItems }}>
                <Header />
                <Routes>
                    <Route path="/" element={<SummaryTable />} />
                    <Route path="/records" element={<SummaryTable />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
};

export default App;
