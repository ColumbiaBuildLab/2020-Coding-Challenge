from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

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


@app.route('/')
def show_scoreboard():
    return render_template('scoreboard.html', scoreboard = scoreboard) 

@app.route('/increase_score', methods=['POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()
    print("Received data:", json_data)  # Debugging log
    team_id = json_data["id"]

    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    # Sort the scoreboard on the server side as well (optional but safer)
    scoreboard.sort(key=lambda x: x["score"], reverse=True)

    print("Updated scoreboard:", scoreboard)  # Debugging log

    return jsonify(scoreboard=scoreboard)

if __name__ == '__main__':
   app.run(debug = True)




