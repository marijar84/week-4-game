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

    function initializeData() {
        characteres = [
            {
                id: 1,
                name: "Goku",
                healthPower: 200,
                attackPower: 25,
                couterAttackPower: 28,
                pathImage: "assets/images/Goku.png"
            },
            {
                id: 4,
                name: "Piccolo",
                healthPower: 140,
                attackPower: 20,
                couterAttackPower: 21,
                pathImage: "assets/images/Piccolo.png"
            },
            {
                id: 2,
                name: "Vegeta",
                healthPower: 175,
                attackPower: 20,
                couterAttackPower: 25,
                pathImage: "assets/images/Vegeta.png"
            },
            {
                id: 3,
                name: "Majin_Buu",
                healthPower: 150,
                attackPower: 22,
                couterAttackPower: 22,
                pathImage: "assets/images/MajinBuu.png"
            }];
    }

    function createDiv() {
        for (var item = 0; item < characteres.length; item++) {
            var div = $("<div>");
            div.attr("id", characteres[item].name);
            div.addClass("row mycharacters clickDiv");
            //div.addClass("mycharacters");
            //div.addClass("clickDiv");
            divCharactersContainers.append(div);

            var name = $("<h2>");
            name.text(characteres[item].name);
            div.append(name);

            var image = $("<img>");
            image.attr("src", characteres[item].pathImage);
            div.append(image);

            var healthPower = $("<h2>");
            healthPower.attr("id", "hp" + characteres[item].name);
            healthPower.text(characteres[item].healthPower);
            div.append(healthPower);
        }
    }

    function initializeGame() { 
        
        console.log("Debbuging 1");

        initializeData();

        divCharactersContainers = $("#charactersContainer");

        $("#" + myOpponent.name).remove();
        $("#" + myCharacter.name).remove();

        $("#popup").css("visibility", "hidden");

        $("#attack").css("visibility", "hidden");
        $("#restartGame").css("visibility", "hidden");

        myCharacter = "";
        myOpponent = "";

        winCount = 0;        

        createDiv();

        console.log($("idGoku"));
    }    

    function setBackground() {
        for (var item = 0; item < characteres.length; item++) {
            var name = characteres[item].name;

            if (isMyCharacterChoose && !isOpponentChoose) {
                if (myCharacter.name != name) {
                    $("#" + name).removeClass("mycharacters");
                    $("#" + name).removeClass("notPlaying");
                    $("#" + name).addClass("myOpponents");
                    $("#" + name).fadeTo("slow", 1);
                }
            }
            else {
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

    function identifyCharacters(name) {
        for (var item = 0; item < characteres.length; item++) {
            if (name === characteres[item].name) {
                return characteres[item];
            }
        }
    }

    initializeGame();

    $(".clickDiv").on("click", function (event) {

        console.log("Click");

        $("#popup").css("visibility", "hidden");

        var idDiv = event.currentTarget.id;
        var classBackground = "";
        var jQueryId = "#" + idDiv;

        if (!isMyCharacterChoose) {

            isMyCharacterChoose = true;

            myCharacter = identifyCharacters(idDiv);

            classBackground = "mycharacters";

            attackPowerMyCharacter = myCharacter.attackPower;

            $(jQueryId).detach().appendTo($("#myCharacter"));

            $("#titleGame").text("Select opponent");
        }
        else {
            if (!isOpponentChoose) {

                isOpponentChoose = true;

                $("#attack").css("visibility", "visible");
                $("#attack").css("display", "inline");

                myOpponent = identifyCharacters(idDiv);

                classBackground = "myOpponents";

                $(jQueryId).detach().appendTo($("#opponent"));
            }
        }

        setBackground(jQueryId);

    });

    $("#attack").on("click", function (event) {

        var labelMyCharacterHP = "hp" + myCharacter;
        var labelEnemyrHP = "hp" + myOpponent;

        myOpponent.healthPower = myOpponent.healthPower - myCharacter.attackPower;

        $("#hp" + myOpponent.name).text(myOpponent.healthPower);

        myCharacter.healthPower = myCharacter.healthPower - myOpponent.couterAttackPower;

        $("#hp" + myCharacter.name).text(myCharacter.healthPower);

        myCharacter.attackPower = myCharacter.attackPower + attackPowerMyCharacter;

        validateGame();
    });

    function validateGame() {
        if (myCharacter.healthPower <= 0) {

            $("#popup").css("visibility", "visible");
            $("#message").text("You loose!!! Please start the game again.");
            $("#restartGame").css("visibility", "visible");
            $("#attack").css("visibility", "hidden");

        }
        else {
            if (myOpponent.healthPower <= 0) {

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
        }
    }

    $("#restartGame").on("click", function (event) {        
        initializeGame();
    });

});