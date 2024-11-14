// Name: Kasula Hari Chandana
// uni: hk3351
// Function to display the scoreboard on the page
function display_scoreboard(scoreboard) {
  // Clear the existing team list
  $("#teams").empty();

  // Loop through each team in the scoreboard and add it to the view
  $.each(scoreboard, function(index, team) {
    addTeamView(team.id, team.name, team.score);
  });
}

// Function to create and display a team's view
function addTeamView(id, name, score) {
  var team_template = $("<div class='row'></div>");
  var name_template = $("<div class='col-md-5'></div>").text(name);
  var score_template = $("<div class='col-md-2'></div>").text(score);
  var button_template = $("<div class='col-md-2'></div>");
  var increase_button = $("<button class='increase-button btn btn-primary'>+</button>");

  increase_button.click(function() {
    increase_score(id);
  });

  button_template.append(increase_button);
  team_template.append(name_template, score_template, button_template);
  $("#teams").append(team_template);
}

// Function to increase the score of a team by sending a POST request
function increase_score(id) {
  var team_id = { "id": id };
  
  $.ajax({
    type: "POST",
    url: "/increase_score",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(team_id),
    success: function(result) {
      // Update the scoreboard with the sorted data from the server
      display_scoreboard(result.scoreboard);
    },
    error: function(request, status, error) {
      console.log("Error:", error);
    }
  });
}

// Initialize the scoreboard display when the page is ready
$(document).ready(function() {
  display_scoreboard(scoreboard);
});
