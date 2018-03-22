var characteres = [];

$(document).ready(function () {

    var divCharactersContainers;

    var isMyCharacterChoose = false;
    var isOpponentChoose = false;

    var myCharacter = "";
    var myOpponent = "";

    var attackPowerMyCharacter = 0;
    var attackPowerEnemy = 0;

    var winCount = 0;

    //Game data
    function initializeData() {
        characteres = [
            {
                id: 1,
                name: "Goku",
                healthPower: 200,
                attackPower: 14,
                couterAttackPower: 28,
                pathImage: "assets/images/Goku.png"
            },
            {
                id: 4,
                name: "Piccolo",
                healthPower: 140,
                attackPower: 12,
                couterAttackPower: 21,
                pathImage: "assets/images/Piccolo.png"
            },
            {
                id: 2,
                name: "Vegeta",
                healthPower: 175,
                attackPower: 13,
                couterAttackPower: 25,
                pathImage: "assets/images/Vegeta.png"
            },
            {
                id: 3,
                name: "Majin_Buu",
                healthPower: 150,
                attackPower: 11,
                couterAttackPower: 22,
                pathImage: "assets/images/MajinBuu.png"
            }];
    }

    //Allows to create the div for each character in the game
    var createDiv = function () {
        for (var item = 0; item < characteres.length; item++) {
            //Create div, this div has the click event
            var div = $("<div>");
            div.attr("id", characteres[item].name);
            div.addClass("row mycharacters clickDiv");
            divCharactersContainers.append(div);

            //Create title
            var name = $("<h2>");
            name.text(characteres[item].name);
            div.append(name);

            //Create image            
            var image = $("<img>");
            image.attr("src", characteres[item].pathImage);
            div.append(image);

            //Create health power label
            var healthPower = $("<h2>");
            healthPower.attr("id", "hp" + characteres[item].name);
            healthPower.text(characteres[item].healthPower);
            div.append(healthPower);
        }
    }

    //Allows to initialize the game (Initialize variables)
    function initializeGame() {

        //First step is initialize data
        initializeData();

        //Set the div to the characters
        divCharactersContainers = $("#charactersContainer");

        $("#characterResult").html("");
        $("#opponentResult").html("");

        //Delete characters in the game
        $("#" + myOpponent.name).remove();
        $("#" + myCharacter.name).remove();

        //Hidde popup
        $("#popup").css("visibility", "hidden");

        //hidde attack and restarGame button and
        $("#attack").css("visibility", "hidden");
        $("#restartGame").css("visibility", "hidden");

        //Set title
        $("#titleGame").text("Select character");

        //Set variables in empty
        myCharacter = "";
        myOpponent = "";

        //Set variables in false, because We don't have players
        isMyCharacterChoose = false;
        isOpponentChoose = false;

        //Count to win is zero
        winCount = 0;

        //Create Div to the characters
        createDiv();
    }

    //The backgroud changes when the user selects a character or opppnent.
    function setBackground() {
        for (var item = 0; item < characteres.length; item++) {
            var name = characteres[item].name;

            //If the characters is selected then We change the backgroud to select the opponent
            if (isMyCharacterChoose && !isOpponentChoose) {
                if (myCharacter.name != name) {
                    $("#" + name).removeClass("mycharacters");
                    $("#" + name).removeClass("notPlaying");
                    $("#" + name).addClass("myOpponents");
                    $("#" + name).fadeTo("slow", 1);
                }
            }
            else {
                //If the opponent and character is seleted then We have the disable the other characters and 
                //change background
                if (isMyCharacterChoose && isOpponentChoose) {
                    if (myCharacter.name != name && myOpponent.name != name) {
                        $("#" + name).removeClass("mycharacters");
                        $("#" + name).removeClass("myOpponents");
                        $("#" + name).addClass("notPlaying");
                        $("#" + name).fadeTo("slow", 0.5);
                    }
                }
            }
        }
    }

    //Allows to identify the character
    function identifyCharacters(name) {
        for (var item = 0; item < characteres.length; item++) {
            if (name === characteres[item].name) {
                return characteres[item];
            }
        }
    }

    //Start Game
    initializeGame();

    $("body").on("click", ".clickDiv", function (event) {

        $("#popup").css("visibility", "hidden");

        //Get id the Div
        var idDiv = event.currentTarget.id;
        var jQueryId = "#" + idDiv;

        //Validate is the first character is choose
        if (!isMyCharacterChoose) {

            isMyCharacterChoose = true;

            //Set the div to my character
            myCharacter = identifyCharacters(idDiv);

            attackPowerMyCharacter = myCharacter.attackPower;

            $(jQueryId).detach().appendTo($("#myCharacter"));

            $("#titleGame").text("Select opponent");
        }
        else {
            //Validate is the  opponent is choose
            if (!isOpponentChoose) {

                isOpponentChoose = true;

                //When character and opponent is selected, we must enable the attack button
                $("#attack").css("visibility", "visible");
                $("#attack").css("display", "inline");

                //Set the div to hte opponent
                myOpponent = identifyCharacters(idDiv);

                $(jQueryId).detach().appendTo($("#opponent"));
            }
        }
        //Set background to identify the characters
        setBackground(jQueryId);

    });

    $("#attack").on("click", function (event) {

        $("#characterResult").html("You attacked " + myOpponent.name + " for " + myCharacter.attackPower + " damage.");
        $("#opponentResult").html(myOpponent.name + " attacked you back for " + myOpponent.couterAttackPower + " damage.");

        //Calculate health power fot the opponent
        myOpponent.healthPower = myOpponent.healthPower - myCharacter.attackPower;

        //Set text to the opponent
        $("#hp" + myOpponent.name).text(myOpponent.healthPower);

        //Set data in object
        myCharacter.healthPower = myCharacter.healthPower - myOpponent.couterAttackPower;

        //Set text to the chacacter
        $("#hp" + myCharacter.name).text(myCharacter.healthPower);

        //Set data in object
        myCharacter.attackPower = myCharacter.attackPower + attackPowerMyCharacter;

        //Validate Game
        validateGame();
    });

    //Allows to execute when the character win (Changes on th screen)
    function myCharacterWin() {
        winCount++;

        $("#" + myOpponent.name).remove();

        $("#attack").hide();

        isOpponentChoose = false;

        setBackground();

        $("#restartGame").css("visibility", "hidden");

        $("#popup").css("visibility", "visible");

        $("#attack").css("visibility", "hidden");

        if (winCount === 3) {
            $("#message").text("You win the game!!!");
            $("#restartGame").css("visibility", "visible");
        }
        else {
            $("#message").text("You win!!! Please select another opponent.");
        }
    }

    //Allows to execute when the character looses (Changes on the screen)
    function mycharacterLoose() {
        //Set divs 
        $("#popup").css("visibility", "visible");
        $("#message").text("You loose!!! Please start the game again.");
        $("#restartGame").css("visibility", "visible");
        $("#attack").css("visibility", "hidden");
    }

    //Allows to know if the user win or loose
    function validateGame() {
        if (myCharacter.healthPower <= 0 && myOpponent.healthPower <= 0) {
            if (myCharacter.healthPower < myOpponent.healthPower) {
                console.log("true");
                myCharacterWin();           
            }
            else {
                console.log("false");
                mycharacterLoose();               
            }
        }
        else {
            if (myCharacter.healthPower <= 0) {
                mycharacterLoose();
            }
            else {
                if (myOpponent.healthPower <= 0) {
                    myCharacterWin();
                }
            }
        }
    }

    $("#restartGame").on("click", function (event) {
        for (var item = 0; item < characteres.length; item++) {
            $("#" + characteres[item].name).remove();
        }
        initializeGame();
    });

});