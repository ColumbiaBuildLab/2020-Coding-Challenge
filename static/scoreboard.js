function display_scoreboard(scoreboard){
  $("#teams").empty();
  var scoreboardCopy = JSON.parse(JSON.stringify(scoreboard));
  
  for (var i = 0; i < scoreboardCopy.length; i++) {
    scoreboardCopy[i].originalIndex = i;
  }
  scoreboardCopy.sort(function(a, b) {
    var scoreCompare = b.score - a.score;
    return scoreCompare !== 0 ? scoreCompare : a.originalIndex - b.originalIndex;
  });
  
  $.each(scoreboardCopy, function(index, team){
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
  var team_id = {"id": id}
  $(".increase-button").prop('disabled', true);
  
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        console.log("Score updated successfully:", result);
        display_scoreboard(result.scoreboard);
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
        alert("Error updating score. Please try again.");
    },
    complete: function() {
        $(".increase-button").prop('disabled', false);
    }
  });
}

$(document).ready(function(){
  console.log("Document ready, initializing scoreboard:", scoreboard);
  display_scoreboard(scoreboard);
  $("body").on("mouseenter", ".increase-button", function() {
    $(this).css("cursor", "pointer");
    $(this).css("background-color", "#4CAF50");
    $(this).css("color", "white");
  }).on("mouseleave", ".increase-button", function() {
    $(this).css("background-color", "");
    $(this).css("color", "");
  });
})