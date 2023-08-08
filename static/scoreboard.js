/* referenced souces: https://www.scaler.com/topics/javascript-sort-an-array-of-objects/ */

/* Iterates over each team element in scoreboard array and
  passes team id, name, and score into the addTeamView function */
function display_scoreboard(scoreboard){
  $("#teams").empty();
    // sort scoreboard before displaying
    scoreboard = scoreboard.sort(
      (t1, t2) => (t1.score < t2.score) ? 1 : (t1.score > t2.score ? -1 : 0)
    ) 
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

/* Initializes the buttons for each team and
  calls increase_score function on team if increase_button is clicked. 
  Then appends values to the templates to display info */
function addTeamView(id, name, score){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button>+</button>");
  $(increase_button).click(function(){
    increase_score(id);
  });
  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
}

/* Sends the team id as a JS object to server.py to increase the score.
   POST -->  send data to server to update */
function increase_score(id){
  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
      // display updated scoreboard right away
      display_scoreboard(result.scoreboard) 
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

/* Displays the webpage */
$(document).ready(function(){
  display_scoreboard(scoreboard);
})
