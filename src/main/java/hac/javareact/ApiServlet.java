package hac.javareact;
import com.google.gson.Gson;
import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "ApiServlet", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    private static final String SCORES = "scores.dat";
    private static final Object lock = new Object();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Set the content type of the response
        response.setContentType("application/json");

        // Allow requests from any origin
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Get the path to the high score file
        String filePath = getFilePath(SCORES);

        // Read the contents of the high score file
        String highScores = readScoresFromFile(filePath, response);

        // Convert the scores to a map and get the top 5 scores
        HashMap<String, Integer> scoresMap = getScoresAsMap(highScores.split(","));
        HashMap<String, Integer> top5Scores = getTop5Scores(scoresMap);

        // Send the scores to the client in JSON format
        Gson gson = new Gson();
        String json = gson.toJson(new Result(top5Scores));
        response.getWriter().write(json);
    }

    // Get the path to the high score file
    private String getFilePath(String fileName) {
        String rootPath = getServletContext().getRealPath(".");
        return rootPath + File.separator + fileName;
    }

    // Read the contents of the high score file
    private String readScoresFromFile(String filePath, HttpServletResponse response) throws IOException {
        synchronized(lock) {
            File file = new File(filePath);

            try {
                if (!file.exists()) {
                    file.createNewFile();
                }
            } catch (IOException e) {
                sendErrorResponse(response, "Error creating high score file: " + e.getMessage());
                return "";
            }

            try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
                return reader.readLine();
            } catch (IOException e) {
                sendErrorResponse(response, "Error reading high score file: " + e.getMessage());
                return "";
            }
        }
    }

    // Send an error response to the client
    private void sendErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        response.getWriter().write("{\"error\": \"" + errorMessage + "\"}");
    }

    // Convert the scores to a map and get the top 5 scores
    private HashMap<String, Integer> getTop5Scores(HashMap<String, Integer> scores) {
        List<Map.Entry<String, Integer>> entryList = new ArrayList<>(scores.entrySet());

        // Sort the list by score
        entryList.sort(new Comparator<Map.Entry<String, Integer>>() {
            @Override
            public int compare(Map.Entry<String, Integer> entry1, Map.Entry<String, Integer> entry2) {
                return entry1.getValue() - entry2.getValue();
            }
        });

        // Get the top 5 scores
        HashMap<String, Integer> bestScores = new HashMap<>();
        int count = 0;
        for (Map.Entry<String, Integer> entry : entryList) {
            if (count == 5) {
                break;
            }
            bestScores.put(entry.getKey(), entry.getValue());
            count++;
        }
        return bestScores;
    }

    // Convert the scores to a map
    private HashMap<String, Integer> getScoresAsMap(String[] entries) {
        HashMap<String, Integer> scores = new HashMap<>();
        for (String entry : entries) {
            String[] parts = entry.trim().split(":");
            String name = parts[0];
            int score = Integer.parseInt(parts[1].trim());

            // only keep the best score for each name
            if(scores.containsKey(name)) {
                int oldScore = scores.get(name);
                if (score < oldScore) {
                    scores.put(name, score);
                }
            }
            else
                scores.put(name, score);
        }
        return scores;
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // Set the content type of the response
        try {
            validateParameters(request);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \" " + e.getMessage() + "\"}");
            return;
        }

        // Get the name and score from the request
        String name = (String) request.getAttribute("name");
        int score = (int) request.getAttribute("score");

        // Get the path to the high score file
        String filePath = getServletContext().getRealPath(".") + File.separator + SCORES;

        // Write the name and score to the high score file
        synchronized(lock) {
            try {
                // Create the file if it doesn't exist
                File highScoreFile = new File(filePath);
                if (!highScoreFile.exists()) {
                    highScoreFile.createNewFile();
                }
            } catch (IOException e) {
                // Handle IOException
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"error\": \"Error creating high score file: " + e.getMessage() + "\"}");

                return;
            }
            try {
                FileWriter writer = new FileWriter(filePath, true);
                writer.write(name + ":" + score + ",");
                writer.close();
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"error\": \"Error writing to high score file: " + e.getMessage() + "\"}");
                return;
            }
        }
        // Send the response
        doGet(request, response);
    }

    // Validate the parameters
    private void validateParameters(HttpServletRequest request) throws Exception {
        String name = request.getParameter("name");
        String scoreStr = request.getParameter("score");

        // Validate the name parameter
        if (name == null || name.trim().isEmpty()) {
            throw new Exception("Name parameter is null or empty.");
        }

        int score;
        // Validate the score parameter
        try {
            score = Integer.parseInt(scoreStr);
        } catch (NumberFormatException e) {
            throw new Exception("Score parameter is not an integer.");
        }

        request.setAttribute("name", name);
        request.setAttribute("score", score);
    }

    // Class to hold the result
    class Result {
        HashMap<String, Integer> result;
        public Result(HashMap<String, Integer> result) {
            this.result = result;
        }
    }
}
