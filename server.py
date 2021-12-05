from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect

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
    global scoreboard
    return render_template('scoreboard.html', scoreboard=scoreboard)


@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()
    team_id = json_data["id"]

    position = 0
    while True:
        if scoreboard[position]["id"] == team_id:
            scoreboard[position]["score"] += 1
            if position != 0:
                if scoreboard[position-1]["score"] < scoreboard[position]["score"]:
                    scoreboard[position-1], scoreboard[position] = scoreboard[position], scoreboard[position-1]
            break
        position = position + 1

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
    app.run(debug=True)
