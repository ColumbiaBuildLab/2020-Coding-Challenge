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

    # Custom quicksort 
    # Alternatively we could also use scoreboard.sort() with score as the key
    my_quicksort(scoreboard, 0, len(scoreboard) - 1)

    return jsonify(scoreboard=scoreboard)

def my_quicksort(scoreboard, start, end):
    def partition(scoreboard, i, j):
        pivot = scoreboard[j]["score"]
        p_idx = j

        j -= 1
        while True:
            while not i > j and scoreboard[j]["score"] <= pivot:
                j -= 1
            
            while not i > j and scoreboard[i]["score"] >= pivot:
                i += 1
            
            if not i > j:
                temp = scoreboard[i]
                scoreboard[i] = scoreboard[j]
                scoreboard[j] = temp
            else:
                break
        
        temp = scoreboard[i]
        scoreboard[i] = scoreboard[p_idx]
        scoreboard[p_idx] = temp

        return i

    if start < end:
        idx = partition(scoreboard, start, end)

        my_quicksort(scoreboard, start, idx - 1)
        my_quicksort(scoreboard, idx + 1, end)

if __name__ == '__main__':
   app.run(debug = True)




