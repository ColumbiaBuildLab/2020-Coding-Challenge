# Name: Colin Julius Emmanuel
# UNI: cje2135


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
    # Sort the scoreboard by score in descending order initially
    sorted_scoreboard = sorted(scoreboard, key=lambda x: x['score'], reverse=True)
    return render_template('scoreboard.html', scoreboard = sorted_scoreboard) 

@app.route('/increase_score', methods=['POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
            break
    
    # Sort the scoreboard by score in descending order after the update
    scoreboard.sort(key=lambda x: x['score'], reverse=True)

    #return jsonify(scoreboard=scoreboard)
    #return jsonify({"success": True, "score": team["score"]})
    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)




