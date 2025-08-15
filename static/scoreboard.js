function sortRow(row) {
  var currentScore = parseInt(row.find(".col-md-2:first").text());
  var $allRows = $(".row").not(row);
  var $targetRow = null;

  $allRows.each(function() {
    var rowScore = parseInt($(this).find(".col-md-2:first").text());
    if (rowScore <= currentScore) {
      $targetRow = $(this);
      return false;
    }
  });

  if ($targetRow) {
    row.insertBefore($targetRow);
    updateServerOrder();
  }
}

function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template = $(`<div class="row" data-id="${id}"></div>`);
  var name_template = $("<div class='col-md-5'></div>");
  var score_template = $("<div class='col-md-2'></div>");
  var button_template = $("<div class='col-md-2'></div>");
  var increase_button = $("<button class='increase-button'>+</button>");
  
  increase_button.click(function(){
    increase_score(id);
  });
  
  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template, score_template, button_template);
  $("#teams").append(team_template);
}

function updateServerOrder() {
  var newOrder = [];
  $(".row").each(function() {
    var teamId = parseInt($(this).data("id"));
    newOrder.push(teamId);
  });
  
  $.ajax({
    type: "POST",
    url: "/update_order",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ order: newOrder }),
    success: function(response) {
      // do nothing
    },
    error: function(request, status, error) {
      console.error("Error updating server order:", error);
    }
  });
}

function increase_score(id){
  var team_id = {"id": id};
  $.ajax({
    type: "POST",
    url: "/increase_score",                
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(team_id),
    success: function(result){
      var teamRow = $(`.row[data-id="${id}"]`);
      var scoreEl = teamRow.find(".col-md-2:first");
      scoreEl.text(parseInt(scoreEl.text()) + 1);
      sortRow(teamRow);
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
});
