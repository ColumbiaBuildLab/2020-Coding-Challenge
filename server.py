from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# base scoreboard
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

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    # retrieve data from json to identify "to-be-incremented" team
    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    # iterate thru scoreboard, "to-be-incremented" team, increment count
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
            

    # converts updated scoreboard into JSON response and sends it back to client (scoreboard.js)
    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




