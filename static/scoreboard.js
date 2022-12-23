function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
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
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
      /* part(1), before sorting
      $("#teams").empty();
      console.log('response:',result['scoreboard']);
      for (let i = 0; i < result['scoreboard'].length; i++) {
        addTeamView(result['scoreboard'][i]['id'], result['scoreboard'][i]['name'], result['scoreboard'][i]['score']);
      }
      */

      //part (2)
      $("#teams").empty();
      let score_res = result['scoreboard'];
      score_res.sort((a, b) => b.score - a.score);
      console.log(score_res);
      for (let i = 0; i < score_res.length; i++) {
        addTeamView(score_res[i]['id'], score_res[i]['name'], score_res[i]['score']);
      }

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
  display_scoreboard(scoreboard);
})
