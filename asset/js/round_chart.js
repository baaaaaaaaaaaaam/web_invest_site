


$(function () {
    Highcharts.setOptions({
lang: {
    thousandsSep: '',
}
});

// Radialize the colors
/*Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
return {
    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
    stops: [
        [0, color],
        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
    ]
};
});*/

// Build the chart
$('#daum_kospi_round_chart').highcharts({
credits: {
    enabled: false
},
exporting: { enabled: false },
chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
},
title: {
    text: 'QSOs per Continent details'
},
tooltip: {
    pointFormat: '{series.name}:<b> {point.y} ({point.percentage:.1f}%) </b>'
},
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)',
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'grey'
            },
            connectorColor: 'silver'
        }
    }
},
series: [{
    type: 'pie',
    name: 'QSOs',
    data: [
['SA', 474], ['OC', 274], ['NA', 1327], ['EU', 3547], ['AS', 949], ['AN', 11], ['AF', 913]
    ]
}]
});
});






$(function () {
    Highcharts.setOptions({
lang: {
    thousandsSep: '',
}
});

// Radialize the colors
/*Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
return {
    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
    stops: [
        [0, color],
        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
    ]
};
});*/

// Build the chart
$('#daum_kospi200_round_chart').highcharts({
credits: {
    enabled: false
},
exporting: { enabled: false },
chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
},
title: {
    text: 'QSOs per Continent details'
},
tooltip: {
    pointFormat: '{series.name}:<b> {point.y} ({point.percentage:.1f}%) </b>'
},
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)',
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'grey'
            },
            connectorColor: 'silver'
        }
    }
},
series: [{
    type: 'pie',
    name: 'QSOs',
    data: [
['SA', 474], ['OC', 274], ['NA', 1327], ['EU', 3547], ['AS', 949], ['AN', 11], ['AF', 913]
    ]
}]
});
});









$(function () {
    Highcharts.setOptions({
lang: {
    thousandsSep: '',
}
});

// Radialize the colors
/*Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
return {
    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
    stops: [
        [0, color],
        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
    ]
};
});*/

// Build the chart
$('#daum_kosdaq_round_chart').highcharts({
credits: {
    enabled: false
},
exporting: { enabled: false },
chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
},
title: {
    text: 'QSOs per Continent details'
},
tooltip: {
    pointFormat: '{series.name}:<b> {point.y} ({point.percentage:.1f}%) </b>'
},
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)',
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'grey'
            },
            connectorColor: 'silver'
        }
    }
},
series: [{
    type: 'pie',
    name: 'QSOs',
    data: [
['SA', 474], ['OC', 274], ['NA', 1327], ['EU', 3547], ['AS', 949], ['AN', 11], ['AF', 913]
    ]
}]
});
});


