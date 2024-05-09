var temp_scoreboard
var order
function display_scoreboard(scoreboard){

  // scoreboard.sort(function(a, b) {
  //   return b.score - a.score;
  // });

  order=[];
  $("#teams").empty();
  $.each(scoreboard.toSorted(function(a, b) {
    return b.score - a.score;
  }), function(index, team){
    order.push(team.id)
    addTeamView(team.id, team.name, team.score);

  });
  console.log(order)
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
  original_id= id
  var team_id = {"id": id}
  // console.log ("INI")
  // console.log(team_id)
  // console.log(temp_scoreboard[id-1].name)
  // console.log("button pressed "+order[id-1])
  // console.log("team name  "+temp_scoreboard[original_id-1].name)
  team_id = {"id": temp_scoreboard[order[id-1]-1].id}
  // console.log("team id  "+String(temp_scoreboard[original_id-1].name))
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify({"id": original_id}),
    success: function(result){
      
      temp_scoreboard[original_id-1].score+=1

      display_scoreboard(temp_scoreboard)
      // console.log("SUCCESS");
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
  temp_scoreboard=scoreboard
  display_scoreboard(scoreboard);
})
