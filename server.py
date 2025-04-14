from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

#I created this simple function to simplify the sorting process of teams
def scoreSort(team):
  return team['score']

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
    #added this additional sort to make sure the starting list is always sorted
    scoreboard.sort(key=scoreSort, reverse=True)
    return render_template('scoreboard.html', scoreboard = scoreboard) 

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    #sorting the teams list before returning so it always remains decreasing
    scoreboard.sort(key=scoreSort, reverse=True)
    #I opted to use the function I created earlier, scoreSort, to cleanly sort
    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




