/**
Realized problem - if someone goes to the last question and finds the object, then the game will end.
Maybe add a counter that only increases with every found item
**/

$(document).ready(function() {
    //Variables for hidden objects game
   var use, score, index, hint, myOne, myTwo, mxOne, mxTwo, remove, first,my,mx,offset;
    var show = true;
    var begin = true;
    var numFound = 0;
   //mx and my
    var mxOne = [
        32, 148, 82, 311, 182,120,258,749,669,89,667,557,182,293,600
    ];
    var mxTwo = [
        72, 179, 94, 334, 220,141,280,762,797,115,716,574,213,340,699
    ];
    var myOne = [
        156, 154, 154, 533, 491,265,50,400,169,269,341,504,159,313,450
    ];
    var myTwo = [
        167, 183, 183, 564, 608,317,80,450,187,313,378,531,182,365,521
    ];
    //Questions
    var question = ["blue feather", "mini cannon", "hour glass", "binoculars", "axe", "bell", "wall clock", "candle","telescope","squirrel","belt", "number 2", "avocado", "cowboy hat", "Japanese fan"];
   //hints
   var hints = [
   "game/pictures/1.jpg",
   'game/pictures/2.jpg',
   'game/pictures/3.jpg',
   'game/pictures/4.jpg',
   'game/pictures/5.jpg',
   'game/pictures/6.jpg',
   'game/pictures/7.jpg',
   'game/pictures/8.jpg',
   'game/pictures/9.jpg',
   'game/pictures/10.jpg',
   'game/pictures/11.jpg',
   'game/pictures/12.jpg',
   'game/pictures/13.jpg',
   'game/pictures/14.jpg',
   'game/pictures/15.jpg',
   ];

    //This shows the instructions
    $('#instr').click(function() {
      showInstructions();
    });


    //This gets the game ready and shows the first question
    $('#quest').click(function() {
        if(begin == true) {
            //Questions
            question = ["blue feather", "mini cannon", "hour glass", "binoculars", "axe", "bell", "wall clock", "candle","telescope","squirrel","belt", "number 2", "avocado", "cowboy hat", "Japanese fan"];
            index = 0;
            score = 100;
           use = 0;
           numFound=0;
           remove = true;
           document.getElementById("quest").innerHTML = "Find the " + question[index];
            begin = false;
            document.getElementById("end").innerHTML = "";
            document.getElementById("leftArrow").src = "game/pictures/Left.png";
            document.getElementById("rightArrow").src = "game/pictures/right.png";
            begin = false;
        }
    });

   //This is for the arrows
   $('#rightArrow').click(function() {
     if(index < 14) {
       showQuestion("right");
     }
   });

   $('#leftArrow').click(function() {
     if(index > 0) {
       showQuestion("left");
     }
   });

   function showQuestion(direction) {
     if(direction == "right") {
       index++;
     }
     else {
       index--;
     }
     document.getElementById("quest").innerHTML = "Find the " + question[index];
   }



    //This is the full game
    $('#game').click(function(e) {
        offset = $(this).offset();
        getWherePlayerClicked(e,offset);

        if(checkIfGameIsNotOver()){
          contGame();
        }
        else {
            endGame();
        }
        document.getElementById("instr").innerHTML = "score: " + score + " use: " + use;

    });

    function contGame() {
      checkIfPlayerClickedTheObject();
    }

    function checkIfGameIsNotOver() {
      if(numFound < 14) {return true;}
      else {return false;}
    }

    function checkIfPlayerClickedTheObject() {
      if(playerClickedTheObject()) {
        question[index] = "You already found this!";
        index++;
        numFound++;
        document.getElementById("hint").src = "";
        if (index<=14){
            document.getElementById("quest").innerHTML = "Find the " + question[index];
        }
        use = 0;
        remove = true;
        if(index==14){
          index++;
        }
      }
      else {
        use = use + 1;
        if (remove == true && use == 2) {
            remove = false;
            //show hint here
            document.getElementById("hint").src = hints[index];
            score = score - 2;
        }
      }
    }

    function playerClickedTheObject() {
      if(myOne[index] <= my && my < myTwo[index] && mxOne[index] < mx && mx < mxTwo[index]) {return true;}
      else {return false;}
    }



    function endGame() {
      begin = true;
      document.getElementById("quest").innerHTML = "Want to play again? Click me!";
      document.getElementById("end").innerHTML = "You found everything! You scored: " + score + ". Done playing? click me";
      $('#end').click(function() {
          document.write("Thanks for playing!");
      });
      document.getElementById("instr").innerHTML = "score: " + score + " use: " + use;

    }

    function getWherePlayerClicked(e,offset) {
      my = (e.pageY - offset.top);
      mx = (e.pageX - offset.left);
    }

    function showInstructions() {
      if(show) {
        document.getElementById("instr").innerHTML = "Find all the hidden objects in the picture. You have one hint per object. To use a hint, click anywhere on the screen twice. If you use a hint, you lose 2 points.";
        show=false;
      }
      else {
        document.getElementById("instr").innerHTML = "Instructions";
        show = true;
      }
    }


});
