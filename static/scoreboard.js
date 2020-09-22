// maps to store latest scoreboard info
let rank_team_map = new Map();
let id_team_map = new Map();

function display_scoreboard(scoreboard){
  // initialize maps
  rank_team_map = new Map();
  id_team_map = new Map();
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    // populate the maps
    rank_team_map.set(team.rank, team);
    id_team_map.set(team.id, team);
  });
  // add team by ranking order
  for (let r = 1; r <= rank_team_map.size; r++){
    const team = rank_team_map.get(r);
    addTeamView(team.id, team.name, team.score);
  }
}

function addTeamView(id, name, score){
  var team_template = $("<div class = row></div>");
  var name_template = $("<div class = col-md-5></div>");
  var score_template = $("<div class = col-md-2></div>");
  var button_template = $("<div class = col-md-2></div>");
  var increase_button = $("<button class = increase-button>+</button>");
  $(increase_button).click(function(){
    increase_score(id, score_template);
  });
  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
}

function increase_score(id, score_template){
  var team_id = {"id": id};

  // update score on the page
  const newScore = parseInt(score_template.text()) + 1;
  score_template.text(newScore);

  // update in maps
  const team = id_team_map.get(id);
  team["score"] = newScore;
  const rank = team.rank;
  rank_team_map.set(rank, team);

  // rearrange the order if needed
  sort_team(rank, newScore);

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

// rearrange the order of the teams
function sort_team(rank, score){
  // get the team which ranks one higher
  if (rank > 1){
    const team = rank_team_map.get(rank);
    const prev_team = rank_team_map.get(rank - 1);
    const prev_score = prev_team.score;
    if (prev_score < score){
      const team_els = $("#teams").children(".row");
      // swap the two teams
      team_els[rank - 1].parentNode.insertBefore(team_els[rank - 1], team_els[rank - 2]);
      // update maps
      team["rank"] = rank - 1;
      prev_team["rank"] = rank;
      rank_team_map.set(rank, prev_team);
      rank_team_map.set(rank-1, team);
      id_team_map.set(team.id, team);
      id_team_map.set(prev_team.id, prev_team);

      const post_data = {"team1": {"id": team.id, "rank": team.rank},
                          "team2": {"id": prev_team.id, "rank": prev_team.rank}};

      // post to server
      $.ajax({
        type: "POST",
        url: "swap_order",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(post_data),
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
  }
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
