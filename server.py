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
    sort_scoreboard()
    return jsonify(scoreboard=scoreboard)

@app.route('/sort_scoreboard')
def sort_scoreboard():
    global scoreboard
    p = 0
    # using selection sort
    while p < len(scoreboard):

    #     find min
        min_idx = p
        for i in range(p, len(scoreboard)): #each time 
            if scoreboard[i]['score'] > scoreboard[min_idx]['score']:
                min_idx = i
    #     swap min element with element at 
 
        temp = scoreboard[p]
        scoreboard[p] = scoreboard[min_idx]
        scoreboard[min_idx] = temp


    # update p
        p += 1


if __name__ == '__main__':
   app.run(debug = True)




