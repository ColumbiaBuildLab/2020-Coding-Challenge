// iterates over each team element in scoreboard array
// passes team id, name, and score into the addTeamView function
function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

// initializes the buttons for each team
// calls increase_score function on team if increase_button is clicked
// appends values to the templates to display info
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

// sends the team id as a JS object to server.py to increase the score
// POST -->  send data to server to update
function increase_score(id){
  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
      display_scoreboard(result.scoreboard) // just display updated scoreboard right away
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
