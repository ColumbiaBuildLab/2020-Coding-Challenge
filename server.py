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

'''
1) The goal is to reflect this change immediately on the front-end. 
2) Once that's done, we would also like to sort the teams 
- so that whenever there's a score change, the list would change 
- so that the teams are listed in non-increasing order of scores from top to bottom
(you don't need to sort them alphabetically when there is a tie). 
To do these, you would need to make changes in both server.py file and scoreboard.js file. 
When you're done, please send a pull request to this repository with your name and uni in the comment. 
Thanks and good luck!
'''
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

    # Sort the scoreboard in non-increasing order of scores
    scoreboard = sorted(scoreboard, key=lambda x: x['score'], reverse=True)

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)
