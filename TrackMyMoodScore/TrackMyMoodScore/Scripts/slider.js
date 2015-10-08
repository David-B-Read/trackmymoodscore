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

    updateMoodScore({ value: $(".mood-score-slider").slider("getValue") });
});

function updateMoodScore(moodScore) {
    $(".current-mood-value").text(moodScore.value);
}

function saveMyScore() {
    var score = $(".mood-score-slider").slider("getValue");

    alert(score);
}

