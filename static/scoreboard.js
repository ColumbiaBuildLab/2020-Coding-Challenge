function display_scoreboard(scoreboard){
  // Sort the array by non-increasing order 
  scoreboard.sort(function(a,b) {
    return b.score - a.score;
  });  

  $("#teams").empty();

  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-3></div>");
  var increase_button = $("<button class='increase-button' data-id='" + id + "'>+</button>");
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
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
      // Update the score on the correct element and location
      var newScore = result.scoreboard.find(team => team.id === id).score;
      var scoreElem = $(`[data-id="${id}"]`).closest('.row').find('.col-md-2');
      scoreElem.text(newScore);

      // Sort the scoreboard dynamically by recalling the display every time there is increase in score 
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

$(document).ready(function(){
  // Display the initial scoreboard
  display_scoreboard(scoreboard);
});
