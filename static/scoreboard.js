function updateScoreAnimation(score_template, new_score) {
  score_template.fadeOut(200, function() {
    $(this).text(new_score).fadeIn(200);
  });
}

function addTeamView(id, name, score) {
  var team_template = $("<div class='team-container row'></div>");
  var name_template = $("<div class='col-md-5'></div>");
  var score_template = $("<div class='col-md-2 score'></div>");
  var button_template = $("<div class='col-md-2'></div>");
  var increase_button = $("<button class='increase-button'><i class='fas fa-plus'></i></button>");

  $(increase_button).click(function() {
    increase_score(id, score_template);
  });

  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
}

function increase_score(id, score_template) {
  var team_id = { "id": id };
  $.ajax({
    type: "POST",
    url: "increase_score",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(team_id),
    success: function(result) {
      var updated_team = result.scoreboard.find(team => team.id === id);
      updateScoreAnimation(score_template, updated_team.score);
      display_scoreboard(result.scoreboard);
    },
    error: function(request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    }
  });
}

function display_scoreboard(scoreboard) {
  $("#teams").empty();
  $.each(scoreboard, function(index, team) {
    addTeamView(team.id, team.name, team.score);
  });
}

$(document).ready(function() {
  display_scoreboard(scoreboard);
});
