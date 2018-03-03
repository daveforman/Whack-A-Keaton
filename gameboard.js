$(document).ready(initializeApp)
var firstGame = null;

function initializeApp(){
    firstGame = new Gameboard();
    firstGame.startGame();
    applyClickHandlers();
}

function applyClickHandlers(){
    $('.tile').on('click', firstGame.moleClickHandler);    
}

class Gameboard {
    constructor(name) {
        var hits = this.hits = 0;
        var misses = this.misses = 0;
        var total = this.total = 0;
        this.gameBoardSelecter = $('#gameArea');
        this.tile_Selector = $("div > .tile").length-1;
        this.tile = $("div > .tile");
        this.mole_Class = 'mole';

        this.gameBoard = this.gameBoardSelecter;
        this.gameTiles = this.gameBoard.find(this.tile_Selector);

        this.gameTime = 20 * 1000;
        this.turnTime = 1000;

        this.moleInterval;
        this.moleLifeMin = 300;
        this.moleLifeMax = 1000;

        this.getRandomIntInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
        } 
    } 
    //updates hit stats
    //updates hit display
    successfulHit(){
      console.log('hello');
      this.hits++;
      $("hit").text(this.hits).addClass('hitText'); //or add class "hits"/show 2nd img
    
    }
    //updates miss stats
    //updates miss display
    wrongHole(){
      this.misses++;
      $("misses").text(this.misses).addClass('missText'); //or add class "misses" 
    }
    
    updateTotalTries(){
      this.total = this.hits + this.misses;
      $("total").text(this.total);
    }
    
    moleClickHandler(){
        if ($(this).hasClass('mole')){
        $(this).removeClass('mole').addClass('keatonSad');
        this.hits++;
      } else {
        this.misses++;
      }
      this.total++;
    }

    spawnMole(){
      let targetTile = $(this.tile[this.getRandomIntInclusive(0,this.tile_Selector)]);
      let timeToLive = this.getRandomIntInclusive(this.moleLifeMin, this.moleLifeMax);
      targetTile.addClass(this.mole_Class);
      setTimeout(function(){
        targetTile.removeClass('mole');
      }, timeToLive);
    }

    startGame(){
      this.moleInterval = setInterval(this.spawnMole.bind(this), this.turnTime);

      setTimeout(this.endGame, this.gameTime);
    }

    endGame(){
      clearInterval(this.moleInterval);
      // this.tile.removeClass('mole');
      alert(` Game Over. Score: ${this.hits} `);
    }
}
