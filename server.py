from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

scoreboard = [
    {"id": 1, "name": "Boston Bruins", "score": 7},
    {"id": 2, "name": "Tampa Bay Lightning", "score": 5},
    {"id": 3, "name": "Toronto Maple Leafs", "score": 2},
    {"id": 4, "name": "Florida Panthers", "score": 1},
    {"id": 5, "name": "Buffalo Sabres", "score": 1},
]


@app.route('/')
def show_scoreboard():
    return render_template('scoreboard.html', scoreboard=scoreboard)

@app.route('/increase_score', methods=['POST'])
def increase_score():
    team_id = request.json["id"]

    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
            scoreboard.sort(key=lambda x: x["score"], reverse=True)
            return jsonify(score=team["score"])
    
    

    return jsonify(error="Team not found"), 404

if __name__ == '__main__':
    app.run(debug=True)
