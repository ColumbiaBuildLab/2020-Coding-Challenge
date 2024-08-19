function display_scoreboard(scoreboard){
  // this empty() function empties the div with id "teams". This does work needed when
  //updating the page with each button press
  $("#teams").empty();
  // this for each loop iterates through the list of teams in scoreboard and runs addTeamView for each team
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  // each time addTeamView is called it creates this HTML to add to the DOM
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
    //I am used to fetch, but I assume this is where the change to the DOM is made
    //This gets the entire scoreboard object back from the server
    //I need to loop through it to update the entire scoreboard
    //It is sorted by the server so I think I can just call display_scoreboard
    success: function(result){
      //This confused me at first but it has to be result.scoreboard because the 
      //result object is the scoreboard, not the list of teams
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

//This is what actually calls display_scoreboard to display the scoreboard and buttons.
//Once the DOM is ready, it will call display_scoreboard
$(document).ready(function(){
  display_scoreboard(scoreboard);
})
