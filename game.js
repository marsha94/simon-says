const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;

$(document).on("keypress", function () {
  if (level == 0) {
    nextSequence();
  }
});

$(".btn").on("click", handleClicks);

function playSound(colour) {
  let audio = new Audio(`sounds/${colour}.mp3`);
  audio.play();
}

function playAnimation(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(
    function () {
      $("#" + colour).removeClass("pressed");
    },
    50,
    colour
  );
}

function nextSequence() {
  level += 1;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomColourChosen = buttonColours[randomNumber];
  gamePattern.push(randomColourChosen);
  playAnimation(randomColourChosen);
  playSound(randomColourChosen);
}

function handleClicks(event) {
  const userColourChosen = event.target.id;
  userClickedPattern.push(userColourChosen);
  playAnimation(event.target.id);
  playSound(event.target.id);
  checkAnswer(level);
}

function checkAnswer() {
  if (
    userClickedPattern[userClickedPattern.length - 1] ==
    gamePattern[userClickedPattern.length - 1]
  ) {
    if (userClickedPattern.length == gamePattern.length) {
      userClickedPattern.length = 0;
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  let audioWrong = new Audio("sounds/wrong.mp3");
  audioWrong.play();
  startOver();
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}
