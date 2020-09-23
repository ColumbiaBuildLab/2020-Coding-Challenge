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

def sort(scoreboard):
    newScore =  []
    newArr = []
    for i in range(0, len(scoreboard)):

        newArr.append(scoreboard[i].get("score"))
    newArr.sort(reverse=True)
    for i in range(0, len(newArr)):
        for j in range(0, len(scoreboard)):
            if scoreboard[j].get("score") == newArr[i]:
                newScore.append(scoreboard[j])
    return newScore


@app.route('/')
def show_scoreboard():
    newscoreboard = sort(scoreboard)
    return render_template('scoreboard.html', scoreboard = scoreboard)


@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            obj = team
            team["score"] += 1

    num = scoreboard.index(obj)
    if(obj["score"] > scoreboard[num - 1].get("score") and (num != 0)):
        temp = scoreboard[num-1]
        scoreboard[num-1] = obj
        scoreboard[num] = temp

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




