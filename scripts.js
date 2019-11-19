/*
Yahtzee Game
Sira Nassoko
November 9, 2019
  As I said in my email, my computer kept crashing and wasn't letting me run my actual program.
  This wasn't in the requirements, but I added a validation check for the username that the user inputs.
  I referenced the ASCII chart for this validation as well, but other than that none of this code was adapted.
*/

console.log("scripts.js loaded!");

var dice_width=70;

//An array of dice images to be used for array manipulation
var dice_tags=[
  '<img src="images/one.svg" width="'+dice_width+'"/>',
  '<img src="images/two.svg" width="'+dice_width+'"/>',
  '<img src="images/three.svg" width="'+dice_width+'"/>',
  '<img src="images/four.svg" width="'+dice_width+'"/>',
  '<img src="images/five.svg" width="'+dice_width+'"/>',
  '<img src="images/six.svg" width="'+dice_width+'"/>',
];

var dice_types_score=[
  'aces_score_value',
  'twos_score_value',
  'threes_score_value',
  'fours_score_value',
  'fives_score_value',
  'sixes_score_value'
];

var dice_types = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six'
];

//User object --> to be stored in local storage when user saves game
var user = {
  username: username,
  upperBonusStatus: upperBonus,
  threeKindStatus:  threeKind,
  fourKindStatus: fourKind,
  fullHouseStatus:fullHouse,
  smallStraightStatus: smallStraight,
  largeStraightStatus: largeStraight,
  yahtzeeStatus: yahtzee,
  turnsTaken: turnCounter,
  rollsTakenInTurn: rollcounter
};

console.log(user);

//user object value assignments
var turnCounter = 0;
var username = document.getElementById("username");
var usernameValid;
var upperBonus = false;
var threeKind = false;
var fourKind = false;
var fullHouse = false;
var smallStraight = false;
var largeStraight = false;
var yahtzee = false;
var rollcounter = 0;


user.upperBonusStatus = upperBonus;
user.threeKindStatus =  threeKind;
user.fourKindStatus = fourKind;
user.fullHouseStatus = fullHouse;
user.smallStraightStatus = smallStraight;
user.largeStraightStatus = largeStraight;
user.yahtzeeStatus = yahtzee;
user.turnsTaken = turnCounter;
user.rollsTakenInTurn = rollcounter;


/*
usernameCheck is a static method that checks if the username entered is a valid name. It returns true if the name only includes letters, but false if it includes foriegn symbols, like brackets.
parameters: username (string)
returns: boolean
*/
function usernameCheck(name) {
  for(l = 0;l < name.length;l++) {
    if(name.charCodeAt(l) <= 65 || name.charCodeAt(l) >= 90
    && name.charCodeAt(l) <= 96 || name.charCodeAt(l) >= 123){
      usernameValid = false;
    }

    else {
      return usernameValid = true;
    }
  }
}

/*
stringToNum is a static method that converts a word into its numerical value (i.e. four becomes the integer 4)
parameters: num (string)
returns: integer
*/
function stringToNum(num) {
  for (i = 0; i < dice_types.length; i++) {
    if (num == dice_types[i]) {
      return i+1;
    }
  }
}

//USERNAME VALIDATION
username.addEventListener('keyup', function(e) {

  if (e.keyCode == 13) { //check that the enter key was pressed
    //if there are no foriegn keys or numbers in the string, store the username into the user object and start the game
    if (isNaN(parseInt(this.value)) && usernameCheck(this.value)) {
      username = this.value.charAt(0).toUpperCase() + this.value.slice(1);
      user.username = username;
      document.getElementById('message_section').style.backgroundColor= "lightgreen";
      document.getElementById('message_section').style.color= "darkgreen";
      document.getElementById('message_section').innerHTML = "Hi " + username + "! Please click the roll button to start!";
      document.getElementById('titleName').innerHTML = user.username + "'s Yahtzee Game!"
        console.log(username);
        console.log(this.parentNode);
        console.log(this);
    }

    //alert the user that they have eneter an invalid username
    else {
        document.getElementById('message_section').innerHTML = "Please input a valid username!";
        document.getElementById('message_section').style.backgroundColor= "pink";
        document.getElementById('message_section').style.color= "darkred";

    }
  }

}); //USERNAME VALIDATION


//ROLL BUTTON
var roll_button = document.getElementById("roll_button");
roll_button.addEventListener('click', function(){
  //if the user has not rolled, set all the dice to unreserved
  if (rollcounter < 1 ) {
    for (i=0; i < 5; i++) {
          document.getElementsByClassName("dice")[i].style.backgroundColor = "red";
          document.getElementsByClassName("dice")[i].className = "dice";
    }
  }

  //if the user has rolled, display how many rolls they have left
  if (rollcounter < 3) {
      rollcounter++;
      document.getElementById('message_section').style.backgroundColor = "lightgreen";
      document.getElementById('message_section').style.color = "darkgreen";
      document.getElementById('message_section').innerHTML = "You have " + (3-rollcounter) + " rolls left for this turn.";
      console.log("Rolls taken" + rollcounter);

  }

  //if the user has taken all their rolls for that turn, let them know they must input a score to end their turn
  else {
    console.log('You cannot roll again for this turn.');
    document.getElementById('message_section').style.backgroundColor = "pink";
    document.getElementById('message_section').style.color = "darkred";
    return document.getElementById('message_section').innerHTML = "You have no more rolls left. Please reserve all the dice you want and input a score based on the dice configuration above.";
  }

  //roll each of the five dice with standard distribution
  for (var i=1; i<=5; i++){
    var diceValue=Math.floor(6*Math.random());
    console.log("dice_"+i);
    console.log(document.getElementById("dice_"+i));

    //if the dice is reserved, do not change the image or value of that dice
    if (document.getElementById("dice_"+i).className.includes("reserved") == false) {
      console.log(document.getElementById("dice_"+i).className);
      document.getElementById("dice_"+i).innerHTML=dice_tags[diceValue];
    }
  }

  //store the rolls taken in the user object
  user.rollsTakenInTurn = rollcounter;
  console.log(user);
});//ROLL BUTTON

//RESERVING DICE
var reserved = document.getElementsByClassName("dice"); //stores all the dice images in an array
var diceNum; //variable to store numerical value of dice

for (var i = 0; i < reserved.length; i++) {
    reserved[i].addEventListener('click', function() {
      console.log("Classname: " + this.className);

      //if the roll button has not been pressed, tell the user they must roll before reserving dice
      if (this.className.includes("blank") || rollcounter == 0) {
        document.getElementById('message_section').style.backgroundColor = "pink";
        document.getElementById('message_section').style.color = "darkred";
        document.getElementById('message_section').innerHTML = "You cannot reserve blank dice. Please press the roll button to start you turn.";
      }

      else{
        var reservedTag = this.innerHTML; //stores the html tags for dice to parse through
        console.log(reserved); //all dice attributes
        console.log(reservedTag); //html tag for dice

        //converts and stores dice html tag to a string
        var diceNum = reservedTag.toString();
        diceNum = parseInt(stringToNum(diceNum.slice(diceNum.indexOf('/')+1,diceNum.indexOf('.'))));
        console.log("Value of dice: " + diceNum); //retrieves the actual number value of the dice
        console.log("Spot in array: " + this.cellIndex); //prints the spot in the array

          //checks if the dice has 'reserved' in its class name, changes the background color to white, and sets it back to its original state in case it is clicked again
          if (this.className.includes("reserved")) {
            this.style.backgroundColor = "red";
            this.className = "dice";
          }

          //checks if the dice does not have 'reserved' in its class name and changes the background to lightgreen if true
          else if (this.className.includes("reserved") == false){
            this.style.backgroundColor = "white";
            this.className = "dice reserved";
          }
        console.log("Reservation status: " + this.className);
      }
  });
}//RESERVING DICE

var totalupperscore = 0;
var upperscorevalues = document.getElementsByClassName("score_value"); //this is an array of all the upperscore vlaue inputs
var feedback = document.getElementById('message_section'); //This is the text that will be manipulated to display the correct feedback given an event

//UPPER SECTION SCORE VALIDATION
for (i = 0; i <= 5; i++) {
  upperscorevalues[i].addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { //checks that the enter key is pressed
      console.log(this.id + " keyup event");

        //If the user inputs text or value less than zero
        if (isNaN(parseInt(this.value)) || parseInt(this.value) < 0) {
          console.log("Value: " + this.value);
          document.getElementById('message_section').style.backgroundColor = "pink";
          document.getElementById('message_section').style.color = "darkred";
          document.getElementById('message_section').innerHTML = "The score input for any category must be an integer. You have entered either text or a negative number. Please input a valid score.";
        }

        //if the dice are blank/the roll button has not been pressed
        else if (rollcounter == 0){
              this.value = '';
              document.getElementById('message_section').style.backgroundColor = "pink";
              document.getElementById('message_section').style.color = "darkred";
              document.getElementById('message_section').innerHTML = "You cannot input a score if you have not rolled the dice yet. Please click the roll button.";
        }

        //if the inputed score is arithmetically innacurate
        else if (parseInt(this.value) != 0 && parseInt(this.value) % parseInt(stringToNum(this.id.slice(0,this.id.indexOf('_')))) !== 0) {
          this.value = '';
          document.getElementById('message_section').style.backgroundColor = "pink";
          document.getElementById('message_section').style.color = "darkred";
          document.getElementById('message_section').innerHTML = "You have entered a score into the upper catgory that does not follow that categorys rules. The input value must be a multiple of that respective dice category. Please input the correct numerical value.";
        }

        //if the inputed score is too large of a number
        else if (parseInt(stringToNum(this.id.slice(0,this.id.indexOf('_')))) * 5 < this.value) {
          document.getElementById('message_section').style.backgroundColor = "pink";
          document.getElementById('message_section').style.color = "darkred";
          document.getElementById('message_section').innerHTML = "You have entered a score that is not possible. The score for any category in the uppersection cannot proceed the numerical value of that categroy multiplied by 5, because there are only five dice. Please input a valid score."
        }

        //this code runs when the user has entered a valid score
        else {
          console.log("Value: " + this.value);
          this.disabled = true; //disable the category
          totalupperscore += parseInt(this.value);

          document.getElementById("upper_total").innerHTML = totalupperscore;
          console.log(totalupperscore);
          console.log(document.getElementById("upper_total").innerHTML);

          document.getElementById('message_section').style.backgroundColor = "lightgreen";
          document.getElementById('message_section').style.color = "darkgreen";
          document.getElementById('message_section').innerHTML = "Great! Roll again!";

          endTurn();
        }
      }
  });
}//UPPERSECTION SCORE VALIDATION

/*
endTurn is executed once the user inputs a value into one of the score boxes. It resets the dice back to unreserved blank ones. It also sets the rolls for that turn back to zero. It also adds a bonus if the upperscore total is greater than 63
parameters: none;
returns: blank dice;
*/
function endTurn() {
  rollcounter = 0;
  for (i=1 ;i <= 5; i++) {
    document.getElementById("dice_"+i).innerHTML = '<img src="images/blankdice.png" width="70"/>';
    document.getElementById("dice_"+i).style.backgroundColor = "red";
    console.log(document.getElementById("dice_"+i).className);

      if (upperscorevalues[i].diabled == true && totalupperscore > 63) {
        totalupperscore += 35;
      }
    }
}
