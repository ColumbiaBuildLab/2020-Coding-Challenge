/* Patched on 22 Aug by Zekai Zhang
Please ignore the in-line comments as those are mainly notes to myself.
1.  (Task 1) Line 19 reloads the division with id "teams" whenever the button is
    presses. The initial solution was to make the button refresh the page in addition
    to adding count and rearranging teams (line 20, now commented out); however, that 
    solution might not be desirable when a) other divisions, whose contens we do not 
    wish to refresh, are added to the page, and b) the page contains more data and 
    takes longer to refresh–hence the current solution.
2.  (Task 2) Function rearrange_teams added at lines 51-69, and called at line 18; 
    please refer to server.py for detailed explanation for its algorithm.
*/

function display_scoreboard(scoreboard){
  $("#teams").empty(); // empties the contents within the 'teams' division (html)
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score); 
      // calls the addTeamView function (js) to populate the div template with data 
  });
}

// function provides details to the template and tells which areas of data to map
function addTeamView(id, name, score){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button>+</button>");
  $(increase_button).click(function(){
    increase_score(id);
    rearrange_teams(id);
    $('#teams').load("#teams");
    // location.reload();
  });
  name_template.text(name); // data comes from py
  score_template.text(score); //data comes from py
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template); // adding the detailed template to the existing div 
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

function rearrange_teams(id){
  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "rearrange_teams",                
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
