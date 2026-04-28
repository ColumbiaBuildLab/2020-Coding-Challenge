function display_scoreboard(scoreboard, changedId){
  // displaying using FLIP technique (First, Last, Invert, Play)

  // (first): copy current positions by team id
  var oldPositions = {};
  $("#teams .team-row").each(function(){
    var id = $(this).data("team-id");
    oldPositions[id] = this.getBoundingClientRect().top;
  });

  // (last) — re-render in the new sort order
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });

  // (invert + play): translate each row back to its old spot, then release
  $("#teams .team-row").each(function(){
    var $row = $(this);
    var id = $row.data("team-id");
    var newTop = this.getBoundingClientRect().top;
    var oldTop = oldPositions[id];

    if (oldTop !== undefined && oldTop !== newTop) {
      var delta = oldTop - newTop;

      // (invert) old position without animating
      $row.css({
        "transition": "none",
        "transform": "translateY(" + delta + "px)"
      });

      // force reflow to apply transformation before it is removed
      this.offsetHeight;

      // lift the row that needs to be swapped
      if (id === changedId) {
        $row.addClass("lifting");
        $row.on("transitionend.lift", function(e){
          if (e.originalEvent.propertyName === "transform") {
            $row.removeClass("lifting").off("transitionend.lift");
          }
        });
      }

      // (play) re-enable transition, release transform
      $row.css({
        "transition": "",
        "transform": ""
      });
    }

    // highlight changed score
    if (id === changedId) {
      $row.find(".score-cell").addClass("score-flash");
    }
  });
}

function addTeamView(id, name, score){
  var team_template = $("<div class='row team-row'></div>").attr("data-team-id", id);
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class='col-md-2 score-cell'></div>");
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
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        display_scoreboard(result.scoreboard, id); // update scoreboard and re-render 
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
  display_scoreboard(scoreboard, );
})
