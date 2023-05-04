// var teams = [];

function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template = $(`<div class = row id = team-${id}></div>`);
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = \"col-md-2 score\"></div>");
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
  var team_id = {"id": id};
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
      // Updates the scorecard to match new scores
      // var scorecard = $(`#team-${id} > .score`)

      // result["scoreboard"].forEach(element => {
      //   if (element["id"] == id) {
      //     scorecard.text(element["score"]);
      //   }
      // })
      
      // console.log(result["scoreboard"]);
      // Update team ordering
      // var new_scoreboard = result["scoreboard"];
      // var scoreboard = $(`#teams`);

      // console.log(scoreboard.children());

      // scoreboard.children().each(i => {
      //   console.log($(this));
      //   console.log(i);
      // });
      // console.log(scoreboard);

      display_scoreboard(result["scoreboard"]);

      // for (var i = result["scoreboard"].length - 1; i > 0; i--) {
      //   var curr_team = scoreboard[i];
      //   var next_team = scoreboard[i - 1];
      //   var curr_score = curr_team["score"];
      //   var next_score = next_team["score"];

      //   console.log(curr_score +' '+ next_score);

      //   if (curr_score > next_score) {
      //     console.log("yes!");
          
      //     $(`#team-${curr_team["id"]}`).insertBefore(`#team-${next_team["id"]}`);
      //   }
      // }
      // console.log('');
      ;
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
})
