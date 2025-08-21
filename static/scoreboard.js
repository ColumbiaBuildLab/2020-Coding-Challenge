function display_scoreboard(board) {
  const $teams = $("#teams");
  $teams.empty();
  $.each(board, function (_, team) {
    addTeamView(team.id, team.name, team.score, $teams);
  });
}

function addTeamView(id, name, score, $root) {
  const $row   = $("<div class='row align-items-center mb-2'></div>");
  const $name  = $("<div class='col-md-5 team-name'></div>").text(name);
  const $score = $("<div class='col-md-2 team-score'></div>").text(score);
  const $btns  = $("<div class='col-md-2'></div>");
  const $inc   = $("<button class='increase-button'>+1</button>");

  $inc.on("click", function () {
    // Disable while request is in-flight to avoid double taps
    $inc.prop("disabled", true);
    increase_score(id).always(() => $inc.prop("disabled", false));
  });

  $btns.append($inc);
  $row.append($name, $score, $btns);
  $root.append($row);
}

function increase_score(id) {
  return $.ajax({
    type: "POST",
    url: "/increase_score",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ id: id }),
    success: function (result) {
      // Server already returns the board sorted by score (desc)
      if (result && Array.isArray(result.scoreboard)) {
        display_scoreboard(result.scoreboard);
      }
    },
    error: function (request, status, error) {
      console.error("Increase failed:", status, error);
    }
  });
}

$(document).ready(function () {
  // If the template injected a global `scoreboard`, render it.
  // Otherwise, fetch the latest from the API.
  if (Array.isArray(window.scoreboard)) {
    display_scoreboard(window.scoreboard);
  } else {
    $.getJSON("/api/scoreboard", function (res) {
      display_scoreboard(res.scoreboard || []);
    });
  }
});
