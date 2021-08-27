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
    ''' 
    -> This function will display the Scoreboard whenever the page is loaded.
    -> Scoreboard is a 'List' or 'Array'. Hence, the fastest way to sort it is use the in-built Sort function.
    -> This function has a key parameter to specify a function (or other callable) to be called on each list 
       element prior to making comparisons. We can also use a custom function/method here.
    -> This method also accepts a parameter called 'reverse' to sort the list in decreasing order.  
    '''
    scoreboard.sort(key=lambda x: x["score"],reverse=True)
    return render_template('scoreboard.html', scoreboard = scoreboard) 

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    ''' 
    -> This function will increase the score for the corrosponding team whenever the button right next to it is pressed.
    -> We are parsing the incoming JSON request data and returing it using the get_json method.
    -> For whichever id(s) the button was pressed, the score will be incremented.
    
    -> We will use the same sorting technique as the previous function.
    '''
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"]  
    
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1

    scoreboard.sort(key=lambda x: x["score"],reverse=True)
    return jsonify(scoreboard=scoreboard)


if __name__ == '__main__':
   app.run(debug = True)
