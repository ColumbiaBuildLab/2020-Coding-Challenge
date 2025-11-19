class App {
  constructor() {
    this.scoreboardManager = null;
    this.scoreboardData = null;
    this.apiService = null;
  }

  init(scoreboardData) {
    this.scoreboardData = scoreboardData;
    this.apiService = new ApiService();
    this.scoreboardManager = new Scoreboard("#teams");
    this.scoreboardManager.display(this.scoreboardData);
    
    // Make API service globally available
    window.apiService = this.apiService;
  }

  updateScoreboard(newScoreboardData) {
    this.scoreboardData = newScoreboardData;
    this.scoreboardManager.display(this.scoreboardData, true);
  }
}

$(document).ready(function(){
  window.app = new App();
  window.app.init(scoreboard);
});
