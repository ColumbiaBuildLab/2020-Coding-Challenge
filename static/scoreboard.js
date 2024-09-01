function display_scoreboard(scoreboard){
  $("#teams").empty(); //clear scoreboard first/refresh it
  $.each(scoreboard, function(index, team){ //for each team dict in scoreboard array, execute the function with index as index of array and team as current team obj looking at 
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
        //if increase button clicked, then: 
  	//sort the teams by score, with highest score on top/first,then lowers
  	//sorting scoreboard in place:
        result.scoreboard.sort((a, b) => b.score - a.score);
	display_scoreboard(result.scoreboard);

    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

//first time document is ready you want to display the scoreboard 
$(document).ready(function(){
  display_scoreboard(scoreboard);
})

