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

    #This function is called via flask-js-html interaction
    #each time an "add" button is pressed on the homescreen for 
    # a particular team, we can identify this team with the
    #team_id value to determine who's score to increase


    #tells us the scoreboard var we are using here is global
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]
    
    #for each team in scoreboard, if the team was apart of the 
    #json request data, increase its value
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    #sort the list by score
    scoreboard = sorted(scoreboard, key=lambda k: k['score'], reverse=True)

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




