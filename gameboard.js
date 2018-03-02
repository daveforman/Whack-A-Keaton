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
        this.hits = 0;
        this.misses = 0;
        this.total = 0;
        this.gameBoardSelecter = $('#gameArea');
        this.tile_Selector = $("div > .tile").length-1;
        this.mole_Class = 'mole';

        this.gameBoard = this.gameBoardSelecter;
        this.gameTiles = this.gameBoard.find(this.tile_Selector);

        this.gameTime = 20 * 1000;
        this.turnTime = 1000;

        this.moleInterval;
        this.moleLifeMin = 1000;
        this.moleLifeMax = 3 * 1000;

        this.getRandomIntInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
        } 
    } 
    //updates hit stats
    //updates hit display
    successfulHit(){
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
      if(this.hasClass('mole')){
        successfulHit();
      } else {
        wrongHole();
      }
      updateTotalTries();
    }

    spawnMole(){
      let targetTile = $(this.gameBoard[this.getRandomIntInclusive(0,this.tile_Selector)]);
      let timeToLive = this.getRandomIntInclusive(this.moleLifeMin, this.moleLifeMax);
      targetTile.addClass(this.mole_Class);
      setTimeout(function(){
        targetTile.removeClass(this.mole_Class);
      }, timeToLive);
    }

    startGame(){
      this.moleInterval = setInterval(this.spawnMole.bind(this), this.turnTime);

      setTimeout(this.endGame, this.gameTime);
    }

    endGame(){
      clearInterval(this.moleInterval);
      this.gameTiles.removeClass(this.mole_Class);
      alert(` Game Over. Score: ${this.hits} `);
    }
}
