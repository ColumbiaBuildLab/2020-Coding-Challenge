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

    quickSort(scoreboard, 0, len(scoreboard) - 1)
    return jsonify(scoreboard=scoreboard)

def quickSort(scoreboard, start, end):
    if (start >= end):
        return
    left, right = start, end
    mid = (left + right) // 2
    pivot = scoreboard[mid]["score"]
    
    while (left <= right):
        while (left <= right and scoreboard[left]["score"] > pivot):
            left += 1
        while (left <= right and scoreboard[right]["score"] < pivot):
            right -= 1
        if (left <= right):
            scoreboard[left], scoreboard[right] = scoreboard[right], scoreboard[left]
            left += 1
            right -= 1
    
    quickSort(scoreboard, start, right)
    quickSort(scoreboard, left, end)

if __name__ == '__main__':
   app.run(debug = True)




