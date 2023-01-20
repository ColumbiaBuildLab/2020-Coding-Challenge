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
    var i;
    score = score+1
    score_template.text(score);
    increase_score(id);

    scoreboard.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
  });

    for (i = 0; i < scoreboard.length; i++) {
      if (scoreboard[i].id == id){
        scoreboard[i].score +=1;
        var buffer = i;
      }
    }
    if ((buffer) != 0){
      console.log(scoreboard[buffer].score)
      console.log(scoreboard[buffer-1].score)
      if (scoreboard[buffer].score>scoreboard[buffer-1].score){
        location.reload(true);
      }
    }



  });


  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
  console.log(team_template)
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
