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

    displayHistoricalScoresGraph();
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

    displayHistoricalScoresGraph();
}

function displayHistoricalScoresGraph() {
    if (savedMoodScores == null || savedMoodScores.length == 0)
        return;

    var dates = [];
    for (var i = 0; i < savedMoodScores.length; i++) {
        var date = new Date(savedMoodScores[i].date);
        var xAxisDate = date.getDate() + '/'
            + (date.getMonth() + 1) + '/'
            + date.getFullYear();
        dates.push(xAxisDate);
    }
    var scores = [];
    for (var j = 0; j < savedMoodScores.length; j++) {
        scores.push(savedMoodScores[j].score);
    }

    $('.graph-container').highcharts({
        chart: {
        type: 'column'
    },
        title: {
        text: 'Your mood score history'
    },
        xAxis: {
        categories: dates,
        crosshair: false
    },
        yAxis: {
        allowDecimals: false,
        min: 0,
        max: 10,
        title: {
        text: 'Mood Score'
    }
    },
        tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
        plotOptions: {
        column: {
        pointPadding: 0.2,
        borderWidth: 0
    }
    },
        series: [{
        name: 'Mood Score',
        data: scores

    }]
    });
	
}
