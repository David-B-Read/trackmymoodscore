$(document).ready(function () {
    $(".mood-score-slider").slider(
        {
            min: 0,
            max: 10,
            step: 1
        });

    $(".mood-score-slider").on("slide", updateMoodScore);
    $(".mood-score-slider").click(updateMoodScore);

});

function updateMoodScore(moodScore) {
    $(".current-mood-value").text(moodScore.value);
}