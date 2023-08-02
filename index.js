var gameArray = ["green", "red", "yellow", "blue"];
var pattern = [];
var patternUser = [];
var started = 0;
var count = 0;
var gameCount=1;
$("#reset").hide();
$(document).on("keyup", function () {
    if (started === 0) {
        $("#reset").show();
        setTimeout(() => {
            makePattern();
        }, 500);
        
        started = 1;
    }

})
$(".btn").on("click", function (event) {
    var color = event.target.id;
    patternUser.push(color);
    if(pattern[count]==patternUser[count]){
        count++;
        if(count===pattern.length){
            setTimeout(() => {
                makePattern();
            }, 1000);
        }    
    }else{
        count=0;
        wrongPattern();
    }
    tileEffect(color);
    btnSoundEvent(color);
})

function reset(){
    started = 0;
    count = 0;
    gameCount=1;
    pattern = [];
    patternUser = [];
    $("#level-title").text("Game Over. Press A key to start again!!");
}
function wrongPattern() {
    $("#reset").hide();
    $("body").css("background-color", "red");
    setTimeout(() => {
        $("body").css("background-color", "#5c12bc");
    }, 100);
    reset();
    btnSoundEvent("wrong");
}

function makePattern() {
    var num = randomNumber();
    pattern.push(gameArray[num]);
    count=0;
    $("#level-title").text("Level "+gameCount);
    gameCount++;
    patternUser = [];
    tileEffect(gameArray[num])
    btnSoundEvent(gameArray[num]);
}

function btnSoundEvent(color) {
    var audio = new Audio("/sounds/" + color + ".mp3");
    audio.play();
}

function tileEffect(color) {
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function randomNumber() {
    var randomNum = Math.floor(Math.random() * 4);
    return randomNum;
}