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

    lst = []

    # appends all values from scoreboard
    for team in scoreboard:
        lst.append([team['score'],team['id'],team['name']])

    # sorts list in reverse by the score
    lst.sort(reverse=True)

    i = 0
    # reassigns all values from scoreboard to reverse sorted list
    for team in scoreboard:
        team['id'] = lst[i][1]
        team['name'] = lst[i][2]
        team['score'] = lst[i][0]

        i += 1

    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)
