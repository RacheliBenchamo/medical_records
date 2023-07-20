# Immunization Hub - Registration and Information Center

## Overview

Immunization Hub is a web application that allows users to register their medical data, including personal information, COVID-19 infection history, and pre-existing conditions. The application also provides an information center where users can view and filter registered data based on specific criteria.

The application is built using React for the client-side and Spring Boot for the server-side, providing a responsive and user-friendly interface.

## Features

1. **Registration Form:** Users can register their medical data, including personal information, COVID-19 infection history, and pre-existing conditions.

2. **Information Center:** Users can view and filter registered data based on specific criteria, such as date of birth range and city.

## Client-Side (React)

The client-side of the application is built using React and Bootstrap, providing a user-friendly and interactive interface for users to register their medical data and view the information center.

## Server-Side (Spring Boot)

The server-side of the application is implemented with Spring Boot, using Spring Data JPA to interact with a PostgreSQL database. The server-side API allows users to register their medical data and retrieve the information center data.

## Technology Stack

- **Client-Side:** React, Bootstrap, React Router

- **Server-Side:** Spring Boot, Spring Data JPA, PostgreSQL

## Installation and Setup

To run the Immunization Hub application locally, follow these steps:

1. Clone the repository from GitHub:

2. Install the required dependencies for the client-side:
   cd client
   npm install

3. Run the client-side development server:
   npm start

4. Install the required dependencies for the server-side:

   _(Ensure you have PostgreSQL installed and running on your machine. 
   Update the database configurations in `application.properties` if needed.)_
   Create a schema named `medical_project` in PostgreSQL.
   cd ../src/main/resources
   mvn install

5. Run the server-side application:
    mvn spring-boot:run

6. Access the application in your web browser at `http://localhost:3000`.

## How to Use the Application

### Registration Form

1. Fill in the required details in the registration form, including first name, last name, date of birth, address, city, zip code, landline, cellphone, COVID-19 infection history, and pre-existing conditions.

2. Click the "Register" button to submit your medical data.

### Information Center

1. Navigate to the "Records" page from the navigation bar.

2. Use the date of birth range and city search to filter the registered data.

3. Click the "Clear Filters" button to reset the filters.

4. View the filtered medical data in the information center table.

## Database Schema

The application uses a PostgreSQL database with the following schema:

- **Table Name: `medical_data`**
- `id` (Primary Key): The unique identifier for each medical record.
- `firstName`: The first name of the individual.
- `lastName`: The last name of the individual.
- `dateOfBirth`: The date of birth of the individual.
- `address`: The address of the individual.
- `city`: The city of the individual.
- `zipCode`: The zip code of the individual.
- `landline`: The landline number of the individual.
- `cellphone`: The cellphone number of the individual.
- `infectedBefore`: A boolean indicating if the individual has been infected by COVID-19 before.
- `conditions`: A list of pre-existing conditions of the individual.
- `otherConditions`: Additional details about the individual's conditions.

## Initialization

On starting the application, the React client fetches city data from the Geonames API to populate the city dropdown options in the registration form.

## Important Notes

- This application is intended for educational purposes only and should not be used in a production environment without further security measures.

- Ensure you have a PostgreSQL database set up with the appropriate configurations specified in `application.properties`.

- The application's session data is stored in the database.

- The country which the application fetches city data from can be changed in `client/src/components/RegistrationForm.js`.
   replace country variable with the desired country code.

## Author

- Racheli Benchamo: Email: racheli20202@gmail.com

