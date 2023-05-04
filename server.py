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

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
    
    # Adjust scoreboard positions
    # Different loop to avoid score increase conflict
    for i in range(len(scoreboard) - 1, 0, -1):
        curr_team = scoreboard[i]
        curr_score = curr_team['score']
        next_score = scoreboard[i-1]['score']

        if curr_score > next_score:
            next_team = scoreboard[i-1]
            scoreboard[i-1] = scoreboard[i]
            scoreboard[i] = next_team
        
        next_score = scoreboard[i]

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




