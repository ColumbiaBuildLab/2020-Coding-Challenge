function display_scoreboard(scoreboard){
  $("#teams").empty();
  sort_scores(scoreboard);  
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template   = $("<div class = row></div>");
  var image_template  = $("<img class = col-xs-1 src=/static/team_images/" + name.substring(0, name.indexOf(' ')) + ".png></img>");
  var name_template   = $("<div class = col-md-5></div>");
  var score_template  = $("<div class = col-md-2></div>");
  var button_template = $("<div class=btn-toolbar><div class = col-md-2></div></div>");
  var increase_button = $("<button class = increase-button>+</button>");
  $(increase_button).click(function(){
    increase_score(id);
  });
  team_template.append(image_template);
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
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
       display_scoreboard(result.scoreboard);
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

function sort_scores(scoreboard){
  [scoreboard].sort(function(team1, team2){
    return team1.score - team2.score;
  })
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
