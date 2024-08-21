# 2020-Columbia-Build-Lab-Coding-Exercise

Thank you for your interest in joining Columbia Build Lab!

This exercise is designed to evaluate your proficiency in web programming, focusing on how well you can read and extend an existing codebase. Although this project uses Python, JavaScript, and the Flask framework, prior experience with these technologies is not required. You are welcome and encouraged to use any online resources. 

This exercise should take no longer than 1 hour, though you are free to take as much time as needed.

## Project Overview

This project implements a simple web application that displays a list of NHL teams and their scores. Each team has a button that allows users to increase the score for that team. Currently, when a button is clicked, the score increases on the server-side, but the change is not immediately reflected on the front-end. Additionally, the teams are not sorted by their scores.

### Objective

The goal of this exercise is to implement the following features:
1. **Immediate Score Updates:** When a score is increased, the change should be immediately reflected on the front-end without requiring a manual page refresh.
2. **Sorting by Score:** After each score update, the teams should be sorted in non-increasing order based on their scores.

To accomplish these tasks, you will need to make changes to both the `server.py` and `scoreboard.js` files.

## Submitting Your Solution

Once you have completed the changes:
1. Fork this repository.
2. Push your changes to your fork.
3. Create a pull request with your name and UNI in the comment.

## Getting Started

### Prerequisites

1. Install Python (version 3.6 or higher).
2. Install Flask using the following command:

   ```bash
   pip install Flask
   ```

3. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/KavinAravindhan/2020-Columbia-Build-Lab-Coding-Exercise.git
   cd 2020-Columbia-Build-Lab-Coding-Exercise
   ```

### Running the Application

To start the web application, run the following command:

```bash
python server.py
```

After running the server, open your browser and navigate to `http://127.0.0.1:5000/`. You will see a list of NHL teams and their scores displayed on the webpage.

## Implementation Details

### 1. Immediate Score Updates

To ensure that score updates are reflected on the front-end immediately after clicking a button, I made the following changes:

- **server.py**:
  - I modified the `increase_score` function to handle the score updates on the server-side. When a `POST` request is received, the score of the specified team is incremented.
  - The updated scoreboard is then sorted in non-increasing order of scores (highest to lowest) and returned as a JSON response to the front-end.

- **scoreboard.js**:
  - I added an AJAX call to send the team ID to the server when a button is clicked.
  - Upon successful completion of the request, the front-end scoreboard is updated in real-time using the `display_scoreboard` function, which displays the updated and sorted list of teams.

### 2. Sorting Teams by Score

After each score update, the teams are now sorted in non-increasing order of their scores. The sorting is done server-side in the `increase_score` function, and the sorted list is returned to the front-end.

## Code Changes

### server.py

```python
@app.route('/increase_score', methods=['POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
    
    # Sort the scoreboard by score in non-increasing order
    scoreboard.sort(key=lambda x: x["score"], reverse=True)
    
    return jsonify(scoreboard=scoreboard)
```

- **Score Update Logic:** The score is updated based on the team ID received in the request.
- **Sorting:** The scoreboard is sorted by the `score` field in non-increasing order (highest score first).
- **Return JSON Response:** The updated and sorted scoreboard is returned as JSON to the front-end.

### scoreboard.js

```javascript
function increase_score(id) {
  var team_id = {"id": id};
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(team_id),
    success: function(result) {
      // Refresh the scoreboard with the updated and sorted scores
      display_scoreboard(result.scoreboard);
    },
    error: function(request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    }
  });
}
```

- **AJAX Request:** Sends a `POST` request to the `increase_score` endpoint with the team ID as JSON data.
- **Success Callback:** The front-end is updated in real-time using the `display_scoreboard` function, which renders the sorted scoreboard.

## Testing

1. Start the server and open the application in your browser.
2. Click the "Increase Score" button for any team. The scoreboard should immediately update, and the teams should be re-ordered by their scores.

