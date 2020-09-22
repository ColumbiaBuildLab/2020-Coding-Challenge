from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# added a new key "rank" to indicate ordering
scoreboard = [
    {
    "id": 1,
    "name": "Boston Bruins",
    "score": 7,
    "rank": 1
    },

    {
    "id": 2,
    "name": "Tampa Bay Lightning", 
    "score": 5,
    "rank": 2
    },

    {
    "id": 3,
    "name": "Toronto Maple Leafs", 
    "score": 2,
    "rank": 3
    },

    {
    "id": 4,
    "name": "Florida Panthers", 
    "score": 1,
    "rank": 4
    },

    {
    "id": 5,
    "name": "Buffalo Sabres", 
    "score": 1,
    "rank": 5
    },
]

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

    return jsonify(scoreboard=scoreboard)

@app.route('/swap_order', methods=['GET', 'POST'])
def swap_order():
    global scoreboard
    json_data = request.get_json()

    # update the ranks of two teams
    for team_num in ["team1", "team2"]:
        team_id = json_data[team_num]["id"]
        for team in scoreboard:
            if team["id"] == team_id:
                team["rank"] = json_data[team_num]["rank"]

    return jsonify(scoreboard=scoreboard)

if __name__ == '__main__':
   app.run(debug = True)




