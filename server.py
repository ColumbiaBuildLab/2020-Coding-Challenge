from flask import Flask
from flask import render_template
from flask import request, jsonify
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


def sort_scoreboard_in_place():
    scoreboard.sort(key=lambda team: team["score"], reverse=True)


@app.route('/')
def show_scoreboard():
    sort_scoreboard_in_place()
    return render_template('scoreboard.html', scoreboard = scoreboard) 

@app.route('/increase_score', methods=['POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json(silent=True) or {}
    team_id = json_data.get("id")
    if team_id is None:
        return jsonify(error="Missing required field 'id'"), 400
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
            break

    sort_scoreboard_in_place()
    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)



