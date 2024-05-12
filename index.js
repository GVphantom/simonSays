const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keydown(() => {
  $("#level-title").text(`Level ${level}`);
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  userClickedPattern = [];
  gamePattern.push(randomChosenColour);

  level++;
  $("#level-title").text(`Level ${level}`);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("body").keydown(function () {
      startOver();
    });
  }
};

const startOver = () => {
  gamePattern = [];
  level = 0;
  started = false;
};

const playSound = (name) => {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
