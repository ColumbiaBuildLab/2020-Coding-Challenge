function display_scoreboard(scoreboard) {
  $("#teams").empty();
  $.each(scoreboard, function (index, team) {
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score) {
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div id='" + id + "'class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $(
    "<button id='" + id + "'class=increase-button>+</button>"
  );
  $(increase_button).click(function () {
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

function compare(a, b) {
  const scoreA = a.score;
  const scoreB = b.score;
  let comparison = 0;
  if (scoreA > scoreB) {
    comparison = 1;
  } else if (scoreA < scoreB) {
    comparison = -1;
  }
  return comparison * -1;
}

function change_order(scoreboard) {
  scoreboard.sort(compare);
  display_scoreboard(scoreboard);
}

function increase_score(id) {
  var team_id = { id: id };
  $.ajax({
    type: "POST",
    url: "increase_score",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(team_id),
    success: function (result) {
      result = result.scoreboard;
      let theObj;
      for (let i = 0; i < result.length; i++) {
        if (result[i].id == id) {
          theObj = result[i];
        }
      }
      $("div#" + id).text(theObj.score);
      $("#teams").empty();
      $.each(result, function (index, team) {
        addTeamView(team.id, team.name, team.score);
      });
      console.log(result);
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

$(document).ready(function () {
  display_scoreboard(scoreboard);
});
