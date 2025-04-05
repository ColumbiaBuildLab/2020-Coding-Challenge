"""
For implementing real-time changes to the front-end of the website, I decided to use Server-Sent Events.
This provides an easier way of seeing the changes in real-time on a smaller scale, while still allowing 
for server to client updates. I believe that it is useful here for checking and testing changes quickly.
"""
import json
import time
from flask import Flask, render_template, Response, request, jsonify
from flask_cors import CORS
#to ensure the correct comparisons are being made to scoreboard
from copy import deepcopy

app = Flask(__name__)
#allows for cross-origin requests
CORS(app)

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

@app.route('/stream')
def stream():
    def sendUpdate():
        prevScoreboard = deepcopy(scoreboard)
        while True:
            #memory overuse prevention
            time.sleep(1)
            #updating score if change was found -> user pressed button(s)
            if prevScoreboard != scoreboard:
                #reference data from JSON format to be parsed
                yield f"data: {json.dumps(scoreboard)}\n\n"
                prevScoreboard = deepcopy(scoreboard)
            else:
                #preventing timeout
                yield ": keepalive\n\n"
    return Response(sendUpdate(), mimetype = 'text/event-stream')

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

    #sorting the scoreboard before sending the data
    #NOTE: I referenced the sorting syntax that I normally use for datasets in Pandas
    scoreboard.sort(key=lambda x: x['score'], reverse=True)
    return jsonify(scoreboard=scoreboard)

if __name__ == '__main__':
   app.run(debug = True)
