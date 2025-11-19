class Scoreboard {
  constructor(containerSelector) {
    this.$container = $(containerSelector);
  }

  display(scoreboard, animate) {
    if(animate){
      this.reorder(scoreboard);
    } else {
      this.$container.empty();
      var self = this;
      $.each(scoreboard, function(index, teamData){
        var team = new Team(teamData.id, teamData.name, teamData.score);
        var teamView = team.createView();
        self.$container.append(teamView);
      });
    }
  }

  reorder(scoreboard) {
    var $children = this.$container.children();
    
    var oldPositions = {};
    $children.each(function(){
      var $this = $(this);
      var id = $this.data('team-id');
      oldPositions[id] = $this.position().top;
    });
    
    $children.each(function(){
      var $this = $(this);
      var id = $this.data('team-id');
      var team = scoreboard.find(function(t){ return t.id === id; });
      if(team){
        $this.find('.col-md-2').first().text(team.score);
      }
    });
    
    var items = $children.detach().get();
    items.sort(function(a, b){
      var aId = $(a).data('team-id');
      var bId = $(b).data('team-id');
      var aIdx = scoreboard.findIndex(function(t){ return t.id === aId; });
      var bIdx = scoreboard.findIndex(function(t){ return t.id === bId; });
      return aIdx - bIdx;
    });
    
    var self = this;
    $.each(items, function(i, item){
      self.$container.append(item);
    });
    
    this.$container.children().each(function(){
      var $this = $(this);
      var id = $this.data('team-id');
      var oldTop = oldPositions[id];
      var newTop = $this.position().top;
      var distance = oldTop - newTop;
      
      if(distance !== 0){
        $this.css({
          'position': 'relative',
          'top': distance + 'px'
        });
        $this.animate({
          top: 0
        }, 500, function(){
          $this.css('position', '');
        });
      }
    });
  }
}
