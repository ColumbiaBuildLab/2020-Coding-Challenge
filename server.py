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
    return render_template('scoreboard.html', scoreboard=scoreboard)


@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()
    team_id = json_data["id"]

    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    scoreboard = updatePositions()
    scoreboard = updatePositionsMoreTraditional()
    show_scoreboard()

    return jsonify(scoreboard=scoreboard)


def updatePositions():
    """
    Sorted the positions with a single line as it is available, but to show that I understand how
    to sort a list of dictionaries I did it more traditionally below.bbS
    """
    global scoreboard

    newScoreboard = sorted(scoreboard, key=lambda k: k["score"], reverse=True)

    return newScoreboard


def updatePositionsMoreTraditional():
    global scoreboard

    sizeOfList = len(scoreboard)

    for i in range(sizeOfList):  # bubble sort algorithm
        indexOfMin = i
        for j in range(i+1, sizeOfList):
            if scoreboard[indexOfMin]["score"] > scoreboard[j]["score"]:
                indexOfMin = j

        # swapping values around
        scoreboard[i], scoreboard[indexOfMin] = scoreboard[indexOfMin], scoreboard[i]

    scoreboard.reverse()

    return(scoreboard)


if __name__ == '__main__':
    app.run(debug=True)
