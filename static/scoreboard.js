var last_updated_id = null;
var winstreak = 0;

function display_scoreboard(scoreboard){
  $("#teams").empty();

  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });

  // last updated team becomes green
  if (last_updated_id !== null){
    var last_updated_row = $(`#team-${last_updated_id}`);
    last_updated_row.addClass("highlight");

    // Remove coloring after 5 seconds
    setTimeout(function(){
      last_updated_row.removeClass("highlight");
    }, 3000);
  }
}

function addTeamView(id, name, score){
  var team_template = $(`<div class=row id=team-${id}></div>`); // each div has id of team
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button>+</button>");
  $(increase_button).click(function(){
    increase_score(id);
  });
  var name = (winstreak >= 3 && id == last_updated_id) ? `${name} 🔥` : `${name}`
  name_template.text(`${name}`);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
}

function increase_score(id){
  winstreak = (last_updated_id == id) ? winstreak + 1 : 1;
  last_updated_id = id;
  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        // Refresh scoreboard with updated list
        display_scoreboard(result.scoreboard);
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request);
        console.log(status);
        console.log(error);
    }
  });
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
