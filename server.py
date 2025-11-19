from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
import os

app = Flask(__name__)

# Load teams data from JSON file
def load_teams():
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'teams.json')
    with open(data_path, 'r') as f:
        return json.load(f)

scoreboard = load_teams()


@app.route('/')
def show_scoreboard():
    sorted_scoreboard = sorted(scoreboard, key=lambda x: x['score'], reverse=True)
    return render_template('scoreboard.html', scoreboard = sorted_scoreboard) 

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




