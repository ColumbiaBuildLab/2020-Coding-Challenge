function display_scoreboard(scoreboard){
  $("#teams").empty();

  // sort the teams by highest to lowest score
  scoreboard.sort((a, b) => {
    return b.score - a.score;
  });

  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

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

function increase_score(id){

  // locally increment the value on front-end
  // done this way because index and id don't always match up
  scoreboard.find(t => t.id === id).score += 1

  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });

  // refresh the scoreboard
  display_scoreboard(scoreboard);

}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
