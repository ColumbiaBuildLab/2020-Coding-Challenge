from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

scoreboard = [
    {"id": 1, "name": "Boston Bruins",        "score": 7},
    {"id": 2, "name": "Tampa Bay Lightning",   "score": 5},
    {"id": 3, "name": "Toronto Maple Leafs",   "score": 2},
    {"id": 4, "name": "Florida Panthers",      "score": 1},
    {"id": 5, "name": "Buffalo Sabres",        "score": 1},
]


def sorted_board():
    # Sort by score (desc). As a stable tiebreaker, keep existing order.
    return sorted(scoreboard, key=lambda t: t["score"], reverse=True)


@app.route("/")
def show_scoreboard():
    # Render the page with the board already sorted.
    return render_template("scoreboard.html", scoreboard=sorted_board())


@app.route("/increase_score", methods=["POST"])
def increase_score():
    data = request.get_json(silent=True) or {}
    if "id" not in data:
        return jsonify(error="Missing 'id' in JSON body"), 400

    try:
        team_id = int(data["id"])
    except (TypeError, ValueError):
        return jsonify(error="'id' must be an integer"), 400

    # Find and increment the team
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
            return jsonify(scoreboard=sorted_board()), 200

    return jsonify(error=f"Team id {team_id} not found"), 404


# endpoint to fetch the current sorted board (useful for polling)
@app.route("/api/scoreboard", methods=["GET"])
def api_scoreboard():
    return jsonify(scoreboard=sorted_board())


if __name__ == "__main__":
    app.run(debug=True)
