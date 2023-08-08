function display_scoreboard() {
  $("#teams").empty();

  $.each(scoreboard, function(index, team) {
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score) {
  var team_template = $("<div class='row'></div>");
  var name_template = $("<div class='col-md-5'></div>").text(name);
  var score_template = $("<div class='col-md-2' id='score-" + id + "'></div>").text(score);
  var button_template = $("<div class='col-md-2'></div>");
  var increase_button = $("<button class='increase-button'>+</button>");
  increase_button.click(function () {
    increase_score(id);
  });
  button_template.append(increase_button);
  team_template.append(name_template, score_template, button_template);
  $("#teams").append(team_template);
}

function increase_score(id) {
  var team_id = { "id": id };
  $.ajax({
    type: "POST",
    url: "increase_score",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(team_id),
    success: function(result) {
      // Update the score for the team with the given id
      for (var i = 0; i < scoreboard.length; i++) {
        if (scoreboard[i].id === id) {
          scoreboard[i].score = result.score;
          break;
        }
      }

      coreboard = response.scoreboard;
      display_scoreboard(scoreboard);
    },
    error: function(request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    }
  });
}


// Initial scoreboard data
var scoreboard = [
  {"id": 1, "name": "Boston Bruins", "score": 7},
  {"id": 2, "name": "Tampa Bay Lightning", "score": 5},
  {"id": 3, "name": "Toronto Maple Leafs", "score": 2},
  {"id": 4, "name": "Florida Panthers", "score": 1},
  {"id": 5, "name": "Buffalo Sabres", "score": 1},
]

$(document).ready(function() {
  display_scoreboard();
});
