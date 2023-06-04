[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/YDg-_nm7)
## Authors
* Avigail Hagay:  avigilha@edu.hac.ac.il
* Racheli Benchamo:  rachelbenha@edu.hac.ac.il

## Explanations

The Bulls and Cows game is a number guessing game in which the program generates a random 4-digit number, and the player attempts to guess the number. The number to be guessed must use digits from 0 to 9, each digit at most once. For every guess that the player makes, the game displays the number of bulls and the number of cows. One bull means the guess contains one digit that is in the correct position as the target number. One cow means the guess contains one digit that is in the wrong position as the target number. The game ends when the player guesses the correct number, and the player's score is the number of guesses required to do so.

This project involves implementing the Bulls and Cows game in React and a Servlet. The React component of the project is responsible for generating the random number and allowing the user to input their guesses. It displays the number of bulls and cows for each guess, as well as a history of previous guesses. When the game is over, the UI disables further input, displays the user's score, and presents a form for the user to enter their name. The Servlet component handles high scores by providing REST API endpoints to add a result to the high scores and retrieve the top 5 high scores ordered by increasing guesses.The Bulls and Cows game is a number guessing game in which the program generates a random 4-digit number, and the player attempts to guess the number. The number to be guessed must use digits from 0 to 9, each digit at most once. For every guess that the player makes, the game displays the number of bulls and the number of cows. One bull means the guess contains one digit that is in the correct position as the target number. One cow means the guess contains one digit that is in the wrong position as the target number. The game ends when the player guesses the correct number, and the player's score is the number of guesses required to do so.

This project involves implementing the Bulls and Cows game in React and a Servlet. The React component of the project is responsible for generating the random number and allowing the user to input their guesses. It displays the number of bulls and cows for each guess, as well as a history of previous guesses. When the game is over, the UI disables further input, displays the user's score, and presents a form for the user to enter their name. The Servlet component handles high scores by providing REST API endpoints to add a result to the high scores and retrieve the top 5 high scores ordered by increasing guesses.

### Input Validation
The user's input is validated on the client side. The input is considered valid if it is a 4-digit number, each digit is between 0 and 9, and each digit is used at most once. If the input is invalid, the UI displays an error message and does not allow the user to submit the guess.
The user's name is validated on the client side. The name is considered valid if it is not empty and if it contains only numbers and digit. If the name is invalid, the UI displays an error message and does not allow the user to submit the name.

The user's name is validated also on the server side. The name is considered valid if it is not empty and if it is not null. If the name is invalid, the UI displays an error message and does not allow the user to insert his name in highs-cores file.
The user's high score is validated on the server side. The high score is considered valid if it is not null. If the high score is invalid, the UI displays an error message and does not allow the user to insert his name in highs-scores file.
### High Scores
The high scores are stored in a file named highscores.txt. The file is located in the same directory as the Servlet. The file is a JSON array of objects, each object representing a high score. The objects are ordered by increasing guesses. The file is read and written to when the user submits their name. The file is read when the user loads the page. The file is not read or written to when the user submits a guess.

### REST API
The Servlet provides the following REST API endpoints:
* POST /highscores - Adds a high score to the high scores file. The request body must be a JSON object with the following properties:
  * name - The name of the user.
  * guesses - The number of guesses required to guess the number.
* GET /highscores - Returns the top 5 high scores ordered by increasing guesses. The response body is a JSON array of objects, each object representing a high score. The objects are ordered by increasing guesses. Each object has the following properties:
  * name - The name of the user.
  * guesses - The number of guesses required to guess the number.

## How to use this template
This is the template for a project where front-end and back-end are separated.
The front-end is a React application, the back-end is a Java Web application
including a Servlet for REST API endpoints.

### Create a run configuration for the Server
* In IntelliJ, go to Run->Edit Configurations
* Click on the + sign and select Tomcat Server -> Local
* In the Tomcat Server Settings, select your local installation of tomcat (you can download it from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz)
* In the Deployment tab, select the java-react:war file to deploy (the war file in the target folder of your project), IntelliJ should automatically detect it and display a "Fix" button. Click on it.
* uncheck the "After launch: Open in browser" checkbox (we don't want to open the browser when we run the server, it's a REST API server)
* Click on the OK button


### initializing IntelliJ
In case you get into trouble with IntelliJ, you should close the project,
delete the .idea folder, re-open the project and follow the instructions above to
recreate a run configuration.

###  dependencies
The template depends on:
* your local installation of tomcat, this template uses
  tomcat 9.0.45 that can be downloaded from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz.
  In order to point to your own installation of tomcat, edit configuration in IntelliJ change the application server.
* your local installation of nodejs, this template is based on nodejs v18.15.0 (npm 9.5.0). You can download it from https://nodejs.org/en/download.
* your local installation of java (select one SDK at: File->Project Structure->Platform SDK). You can add SDK from IntelliJ by cliking on  File->Project Structure->Platform Settings-> +).
  This template is based on version 19, you can also download it from https://jdk.java.net/19/).

###  source files
The template includes:
* a Java Web template with an empty Servlet to implement your server side REST API under the src/main/java folder
* a React template under the reac-client folder, with an initialized npm project.

## In order to run your exercise you:
* run the server side; with IntelliJ configuration at the upper right (created above)
* run the client side: open the terminal: `cd react-client`, `npm install`,  run with the command `npm start`

Then browse:
* your react client at http://localhost:3000
* your server will be available at http://localhost:8080/api/highscores (you have of course to implement the REST API).
  Note that you should never specify the host and port in your React code! (use 'api/' instead of 'http://localhost:8080/api/')

