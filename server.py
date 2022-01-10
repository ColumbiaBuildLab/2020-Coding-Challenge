from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# modified data such that id is zero-indexed
scoreboard = [
    {
    "id": 0,
    "name": "Boston Bruins",
    "score": 7
    },

    {
    "id": 1,
    "name": "Tampa Bay Lightning", 
    "score": 5
    },

    {
    "id": 2,
    "name": "Toronto Maple Leafs", 
    "score": 2
    },

    {
    "id": 3,
    "name": "Florida Panthers", 
    "score": 1
    },

    {
    "id": 4,
    "name": "Buffalo Sabres", 
    "score": 1
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

    # sorting the scoreboard by score (desc)
    sorted_scoreboard = sorted(scoreboard, key=lambda team: team['score'], reverse=True)
   
    # easily print for testing
    # print(sorted_scoreboard)

    return jsonify(scoreboard=sorted_scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




