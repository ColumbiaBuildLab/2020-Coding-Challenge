''' Patched on 21 Apr 2023 by Zekai Zhang
Function rearrange_teams added at lines 62-85: the algorithm consists of 2
separate loops, the first of which finds the index, within scoreboard, of 
the team whose score is being incremented; the second repeatedly compares 
the team's score against team at the previous index within the array, and 
swaps position if the team has a higher score. 
Since the array is originally arranged in non-increasing order from top to 
bottom, a higher score could only come from a previous item in the scoreboard
array, hence it makes sense to only compare forwards. The ELSE statement at
lines 91-92 saves runtime by ensuring that the loop halts once the team score 
is found to be equal or smaller than the previous one.
Overall, the first loop has runtime of O(N), N being the size of scoreboard, 
and the second loop has worst-case runtime of O(N) as well, making the entire
function to have an overall runtime of O(N).
'''

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

    return jsonify(scoreboard=scoreboard)


@app.route('/rearrange_teams', methods=['GET', 'POST'])
def rearrange_teams():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"] 

    i = 0
    for team in scoreboard:
        if team["id"] == team_id:
            break
        i += 1

    while i > 0:
        j = i-1
        temp = scoreboard[i]
        if scoreboard[i]["score"] > scoreboard[j]["score"]:
            scoreboard[i] = scoreboard[j]
            scoreboard[j] = temp
            i -= 1
        else:
            break

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)

