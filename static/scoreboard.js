var lastScores = {};
var rowById = {};

function display_scoreboard(board, changedId){
  var maxScore = Math.max.apply(null, board.map(function(t){ return t.score; }).concat([1]));

  // 1. Create rows once, update in place after that (no more empty+rebuild)
  $.each(board, function(_, team){
    if (!rowById[team.id]) {
      rowById[team.id] = buildRow(team);
      $("#teams").append(rowById[team.id].row);
    }
    updateRow(team, maxScore, team.id === changedId);
    lastScores[team.id] = team.score;
  });

  // 2. FLIP reorder: record positions, reorder DOM, animate the delta
  var rows = board.map(function(t){ return rowById[t.id].row; });
  var firstPos = {};
  $.each(rows, function(_, r){ firstPos[r.data("team-id")] = r.position().top; });
  $.each(rows, function(_, r){ $("#teams").append(r); });
  $.each(rows, function(_, r){
    var id = r.data("team-id");
    var dy = firstPos[id] - r.position().top;
    if (dy !== 0) {
      r.css("transform", "translateY(" + dy + "px)");
      r[0].offsetHeight; // force reflow so transition runs
      r.css("transition", "transform .45s cubic-bezier(.2,.9,.25,1)");
      r.css("transform", "");
      setTimeout(function(){ r.css("transition", ""); }, 500);
    }
  });

  // 3. Refresh rank badges / medals / leader highlight after reorder
  $.each(board, function(index, team){
    var refs = rowById[team.id];
    var rank = index + 1;
    refs.rankBadge.text(rank);
    refs.nameDiv.text(team.name + medalFor(rank));
    refs.subDiv.text(rank === 1 ? "1st place - leading" : ("Rank #" + rank));
    refs.row.toggleClass("leader", rank === 1);
  });
}

function medalFor(rank){
  return rank === 1 ? " 🥇" : (rank === 2 ? " 🥈" : (rank === 3 ? " 🥉" : ""));
}

function buildRow(team){
  var row = $("<div class='team-row'></div>").attr("data-team-id", team.id);
  var rankBadge = $("<div class='rank-badge'></div>");
  var main = $("<div class='team-main'></div>");
  var nameDiv = $("<div class='team-name'></div>");
  var subDiv = $("<div class='team-sub'></div>");
  var barWrap = $("<div class='score-bar'></div>");
  var fill = $("<div class='score-fill'></div>");
  barWrap.append(fill);
  main.append(nameDiv); main.append(subDiv); main.append(barWrap);
  var scorePill = $("<div class='score-pill'></div>");
  var increase_button = $("<button class='increase-button' title='Add point'>+</button>");
  increase_button.click(function(){
    increase_score(team.id, increase_button);
  });
  row.append(rankBadge); row.append(main); row.append(scorePill); row.append(increase_button);
  return { row: row, rankBadge: rankBadge, nameDiv: nameDiv, subDiv: subDiv, fill: fill, scorePill: scorePill };
}

function updateRow(team, maxScore, justBumped){
  var refs = rowById[team.id];
  var pct = Math.max(8, Math.round(team.score / maxScore * 100));
  refs.fill.css("width", pct + "%");
  refs.scorePill.text(team.score);
  if (justBumped) {
    refs.scorePill.removeClass("bump");
    void refs.scorePill[0].offsetWidth; // restart animation
    refs.scorePill.addClass("bump");
  }
}

function increase_score(id, btn){
  var team_id = {"id": id};
  if (btn) { btn.prop("disabled", true); }
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
        // Server returns updated + sorted scoreboard.
        // Update rows in place with smooth FLIP reorder - no full reload.
        scoreboard = result.scoreboard;
        display_scoreboard(scoreboard, id);
        if (btn) { btn.prop("disabled", false); }
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
        if (btn) { btn.prop("disabled", false); }
    }
  });
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
