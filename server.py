from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# Helpers / Defaults
# Note to review: The scope of the project was to change a couple lines of code. Given a broader scope, 
# I would consider creating a class for the scoreboard and creating methods to handle the scoreboard data.
# I'd also consider incorporating Pydantic or FastAPI to improve readibility and maintainability, especially
# as the project grows.
scoreboard = [
    {
    "id": 1,
    "name": "Boston Bruins",
    "score": 7
    },

    {
    "id": 2,
    "name": "Tampa Bay Lightning", 
    "score": 5
    },

    {
    "id": 3,
    "name": "Toronto Maple Leafs", 
    "score": 2
    },

    {
    "id": 4,
    "name": "Florida Panthers", 
    "score": 1
    },

    {
    "id": 5,
    "name": "Buffalo Sabres", 
    "score": 1
    },
]

# Sorts scoreboard by score in descending order
def sort_scoreboard_by_score(scoreboard):
    return sorted(scoreboard, key=lambda team: team['score'], reverse=True)

@app.route('/')
def show_scoreboard():
    return render_template('scoreboard.html', scoreboard = scoreboard) 

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
    
    scoreboard = sort_scoreboard_by_score(scoreboard)

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




