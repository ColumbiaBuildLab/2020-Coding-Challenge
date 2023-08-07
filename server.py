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

    #This part is just to make sure that the initial scoreboard is in correct order
    #If the scores always in decreasing order at the beginning, then we don't need it
    global scoreboard
    sorted_score=[]
    i=0
    for team in scoreboard:
        sorted_score.append([team['score'],i])
        i+=1
    sorted_score.sort()
    sorted_score=sorted_score[::-1]
    i=0
    while i < len(sorted_score):
        sorted_score[i]=scoreboard[sorted_score[i][1]]
        i+=1
    scoreboard=sorted_score

    
    return render_template('scoreboard.html', scoreboard = scoreboard) 

@app.route('/increase_score', methods=['GET', 'POST'])
def increase_score():
    global scoreboard

    json_data = request.get_json()   
    team_id = json_data["id"] 

    index=0    #Record the team in which the score increased
    for team in scoreboard:
        if team["id"] == team_id:
            team["score"] += 1
            break
        index+=1
    
    #Find the the right place to insert after score increased
    incresed_score=scoreboard[index]["score"]
    if index != 0:
        insert_index=index-1
        while insert_index >=0:
            if scoreboard[insert_index]["score"]>=incresed_score:
                break
            insert_index-=1
        insert_index+=1
        
        #Swap is only suitable for increase score by 1
        #But it faster than insert
        '''
        temp=scoreboard[insert_index]
        scoreboard[insert_index]=scoreboard[index]
        scoreboard[index]=temp
        '''

        #insert into the right place
        temp=scoreboard[index]
        del scoreboard[index]
        scoreboard.insert(insert_index, temp)

    return jsonify(scoreboard=scoreboard)



if __name__ == '__main__':
   app.run(debug = True)




