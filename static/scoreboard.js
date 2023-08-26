/*
Nicholas Djedjos
08/26/2023
CBL Coding Challenge
*/

function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
    console.log("does this work");
  });
}

function addTeamView(id, name, score){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button>+</button>");

  // $ symbolizes a jQuery object

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
function increase_score(id){
  var team_id = {"id": id}
  /* .ajax allows web pages to be updated asynchronously*/
  $.getJSON({
    type: "POST", 
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),

   
    success: function(result){ /* result holds the data the server has sent back in response to request*/
      // problem was result has the correct value but isn't the same data type as old scoreboard
      scoreboard = result.scoreboard
      display_scoreboard(scoreboard);

    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

// after document is loaded, this happens

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
