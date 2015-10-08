$(document).ready(function () {
    $(".mood-score-slider").slider(
        {
            min: 0,
            max: 10,
            step: 1
        });

    $(".mood-score-slider").on("slide", updateMoodScore);
    $(".mood-score-slider").on("slideStop", updateMoodScore);

    $(".save-my-score").on("click", saveMyScore);

    $.cookie.json = true;

    getSavedState();

    updateMoodScore({ value: $(".mood-score-slider").slider("getValue") });
});

function updateMoodScore(moodScore) {
    $(".current-mood-value").text(moodScore.value);
}

var savedMoodScores;

function getSavedState() {

    var cookieData = $.cookie("mood-score");

    if ((typeof (cookieData) !== 'undefined') && (cookieData !== null)) {
        savedMoodScores = cookieData;
    }
    else {
        savedMoodScores = [];
    }
}

function saveMyScore() {
    var todaysScore = $(".mood-score-slider").slider("getValue");

    var currentScore = { date: new Date(), score: todaysScore };

    savedMoodScores.push(currentScore);
    
    $.cookie("mood-score", savedMoodScores, { expires: 365 });
}

