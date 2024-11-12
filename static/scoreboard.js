// Name: Colin Julius Emmanuel
// UNI: cje2135

function display_scoreboard(scoreboard){
  if (!scoreboard || scoreboard.length === 0) {
    console.log("No data to display in scoreboard.");
    return;
  }
  
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template = $("<div class = 'row' id='team-" + id + "'></div>"); // Add unique ID to each team container
  var name_template = $("<div class = 'col-md-5'></div>");
  var score_template = $("<div class = 'col-md-2 score'></div>"); // Add score class
  var button_template = $("<div class = 'col-md-2'></div>");
  var increase_button = $("<button class = 'increase-button'>+</button>");
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
    url: "/increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(response){
        // Find the score element for the team and update it
        // var teamElement = $("#team-" + id)
        // var scoreElement = teamElement.find(".score")
        // scoreElement.text(response.score) // Update score in the DOM
        // console.log("Received updated scoreboard:", response.scoreboard); // Debug statement
        // Re-render the entire scoreboard with the updated sorted data
        // display_scoreboard(response.scoreboard);
        let updatedScoreboard = JSON.parse(JSON.stringify(response.scoreboard));
        console.log("Received updated scoreboard:", updatedScoreboard);

        if (updatedScoreboard) {
          display_scoreboard(updatedScoreboard);
        } else {
          console.log("Error: scoreboard data missing in response");
        }

        if (response.scoreboard) {
          // Re-render the entire scoreboard with the updated sorted data
          display_scoreboard(response.scoreboard);
        } else {
          console.log("Error: scoreboard data missing in response");
        }
    },
    error: function(request, status, error){
        console.log("Error");
        //console.log(request)
        // console.log(status)
        // console.log(error)
    }
  });
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
