var subject = "";
var subDiv = "";
var queryURL = "";
var image = "";
var results = "";
var randStartPt = 0;
var stateStill = "";
var stateAnimate = "still";
var userInput = "";
var state = "";
var buttons = "";
var tempName = "";
var buttonArr = ["Twilight Sparkle", "Rainbow Dash", "Applejack", "Rarity", "Fluttershy", "Pinkie Pie"];
var buttonArrAtt = ["twilight-sparkle-pony", "rainbow-dash-pony", "applejack-pony", "rarity-pony", "fluttershy-pony", "pinkie-pie-pony"];


function createImages(sub) {
  for (var i = 0; i < 10; i++) {
    randStartPt = 1 + Math.floor(Math.random() * 200);
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + sub + "&offset=" + randStartPt + "&limit=1";
    //queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + sub + "&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        results = response.data;
        subDiv = $("<div>");
        subDiv.append("Rating: " + results[0].rating)
          .append('<br/>');
        image = $("<img>");
        stateStill = results[0].images.fixed_height_still.url;
        stateAnimate = results[0].images.fixed_height.url;
        image.attr("src", stateStill);
        image.attr("still", stateStill);
        image.attr("animate", stateAnimate);
        image.attr("data-state", "still");
        image.attr("alt", "image");
        image.attr("class", "image");
        subDiv.append(image);
        $("#images").append(subDiv);
      });
  }
}

function animateImage(im, context) {
  state = $(context).attr("data-state");
  if (state === "still") {
    $(context).attr("src", $(context).attr("animate"));
    $(context).attr("data-state", "animate");
  } else {
    $(context).attr("src", $(context).attr("still"));
    $(context).attr("data-state", "still");
  }
}


function createButtons() {
  for (var i = 0; i < buttonArr.length; i++) {
    $('#buttonDiv').append('<button data-pony=' + buttonArrAtt[i] + '>' + buttonArr[i] + '</button>');
  }
}

$(document).ready(function () {

  createButtons();
});


$("#buttonDiv").on("click", "button", function () {
  console.log("In button click");
  subject = $(this).attr("data-pony");
  $("#images").html("");
  createImages(subject);
});

$("#images").on("click", ".image", function (event) {
  animateImage("#images", this);
})


$('#submit').click(function (event) {
  event.preventDefault();
  userInput = $('#added').val().trim();
  console.log(userInput);
  buttonArr.push(userInput);
  tempName = userInput;
  tempName = tempName.replace(/\s+/g, '-').toLowerCase();
  buttonArrAtt.push(tempName);
  tempName = "";
  //console.log("buttonArr: " + buttonArr);
  //console.log("buttonArrAtt: " + buttonArrAtt);
  $("#buttonDiv").empty();
  createButtons();
});