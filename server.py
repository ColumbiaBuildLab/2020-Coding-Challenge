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
    
    #find the team whose score was changed
    idx = next(i for i, team in enumerate(scoreboard) if team["id"]==team_id)
    scoreboard[idx]["score"] += 1
    team = scoreboard.pop(idx) #remove the team from its current position

    #find the correct position for the team above
    #since list is sorted, only check from the top till you get next team with lower score
    insert_idx = 0
    while insert_idx<len(scoreboard) and scoreboard[insert_idx]["score"]>=team["score"]:
        insert_idx += 1
    scoreboard.insert(insert_idx, team)

    # for team in scoreboard:
    #     if team["id"] == team_id:
    #         team["score"] += 1
    # scoreboard.sort(key=lambda x: x["score"], reverse=True) #O(N * log N)
    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




