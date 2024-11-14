from flask import Flask, render_template, request, jsonify # type: ignore

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
    global scoreboard

    # Get the JSON data sent by the AJAX call
    json_data = request.get_json()
    team_id = json_data["id"]

    # Increase the score of the specified team
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    # Sort the scoreboard by score in descending order
    scoreboard.sort(key=lambda x: x["score"], reverse=True)

    # Return the updated scoreboard as JSON
    return jsonify(scoreboard=scoreboard)

if __name__ == '__main__':
    app.run(debug=True)
