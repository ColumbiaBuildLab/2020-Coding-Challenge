function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score, scoreboard);
  });
}

function addTeamView(id, name, score, scoreboard){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button>+</button>");
  $(increase_button).click(function(){
    increase_score(id, scoreboard);
  });
  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
}

function increase_score(id, prevScoreboard){
  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        //Updating and Rearranging scoreboard
        const updatedScoreboard = prevScoreboard?.map(item =>
          item.id === id ? { ...item, score: (item.score || 0) + 1 } : item
        ) || [];
        updatedScoreboard.sort((s1, s2) => s2.score - s1.score);
        display_scoreboard(updatedScoreboard);
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
