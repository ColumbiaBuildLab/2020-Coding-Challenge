class Team {
  constructor(id, name, score) {
    this.id = id;
    this.name = name;
    this.score = score;
  }

  createView() {
    var team_template = $("<div class = 'row team-row'></div>");
    team_template.data('team-id', this.id);
    var name_template = $("<div class = col-md-5></div>");
    var score_template = $("<div class = col-md-2></div>");
    var button_template = $("<div class = col-md-2></div>");
    var increase_button = $("<button class = increase-button>+</button>");
    
    var teamId = this.id;
    $(increase_button).click(function(){
      Team.increaseScore(teamId);
    });
    
    name_template.text(this.name);
    score_template.text(this.score);
    button_template.append(increase_button);
    team_template.append(name_template);
    team_template.append(score_template);
    team_template.append(button_template);
    
    return team_template;
  }

  static increaseScore(id) {
    if(!window.apiService) {
      console.error("API Service not initialized");
      return;
    }

    window.apiService.increaseScore(id)
      .done(function(result){
        var sortedScoreboard = result.scoreboard.sort(function(a, b) {
          return b.score - a.score;
        });
        if(window.app) {
          window.app.updateScoreboard(sortedScoreboard);
        }
      })
      .fail(function(request, status, error){
        window.apiService.handleError(error, request, status);
      });
  }
}
