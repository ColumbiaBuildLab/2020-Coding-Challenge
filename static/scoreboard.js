function sort_scoreboard(scoreboard){
  scoreboard.sort(function(teama,teamb){
    return (teama.score - teamb.score) * -1;
  })
}

function change_score(id, new_score){
  $.each(scoreboard, function(index, team){
    if(team.id == id){
      team.score = new_score;
    }
  });
}
function display_scoreboard(scoreboard){
  $("#teams").empty();
  sort_scoreboard(scoreboard);
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2 id=" + id + "_score" + "></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button id=" + id + ">+</button>");
  $(increase_button).click(function(){
    var n = parseInt(score_template.text()) + 1;
    score_template.text(n);
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
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        let returned_data = result["scoreboard"];
        scoreboard = returned_data;
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

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
