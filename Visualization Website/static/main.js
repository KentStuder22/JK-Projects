
function scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// reload page
function reload() {
    location.reload();
}

// function to present tooltip type div on mouse position based on state its hovering over
function state_highlight(evt, element) {
    // console.log(element.firstElementChild.innerHTML);
    let info = document.getElementById("stateInfo");
    info.innerHTML = element.firstElementChild.innerHTML;
    info.style.display = 'block';
    info.style.left = evt.pageX + 10 + 'px';
    info.style.top = evt.pageY + 10 + 'px';
}

// clears tooltip div when mouse leaves map area
function clear_highlight() {
    let info = document.getElementById("stateInfo");
    info.style.display = "none";
}

function loaded(str) {

    // load in data
    var string = str; // tweets string
    string = string.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\&quot;/g, '"').slice(2).slice(0,-2);
    string = string.replace(/", "/g, " , ");
    string = "[" + string + "]";
    tweets = JSON.parse(string);
    // console.log(tweets);
    
    var pos_cases = 0;
    //  data processing

    var jan=0; var feb=0; var mar=0; var apr=0; var may=0; var jun=0;
    var jul=0; var aug=0; var sep=0; var oct=0; var nov=0; var dec=0;

    for(var i=0; i<tweets.length; i++) {
        // console.log(tweets[i]);
        tweets[i][0] = tweets[i][0].split(",");

        if(tweets[i][1] === true) {
            pos_cases += 1;
        
            // tried Datetime but it was terrible
            // tweets[i][0][1] = Date.parse(tweets[i][0][1]);
            // console.log(tweets[i][0][1].slice(1,5)); // year
            // console.log(tweets[i][0][1].slice(6,8)); // month
            
            switch(tweets[i][0][1].slice(6,8)) {
                case '01': jan++;
                case '02': feb++;
                case '03': mar++;
                case '04': apr++;
                case '05': may++;
                case '06': jun++;
                case '07': jul++;
                case '08': aug++;
                case '09': sep++;
                case '10': oct++;
                case '11': nov++;
                case '12': dec++;
            }
        }
        
    }
    var neg_cases = tweets.length - pos_cases;

    // tweets[i][0][0] => geo data
    // tweets[i][0][1] => date
    // tweets[i][1] => label result
    //

    /*----------------------------------------------------------------
            LINE GRAPH  LINE GRAPH  LINE GRAPH
    ----------------------------------------------------------------*/
    const x_labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const data = {
        labels: x_labels,
        datasets: [{
            label: 'COVID-19 Cases',
            backgroundColor: 'rgb(0,0,0)',
            borderColor: 'rgb(255,255,255)',
            data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    const mainChart = new Chart(
        document.getElementById('trend-line'), config
    );

    /*----------------------------------------------------------------
            PIE CHART   PIE CHART   PIE CHART
    ----------------------------------------------------------------*/
    const pie_data = {
        labels: [
            'Covid Positive',
            'Healthy'
        ],
        datasets: [{
            label: 'TOTAL US POPULATION',
            data: [pos_cases, neg_cases],
            backgroundColor: [
                'rgb(136,8,8)',
                'rgb(0,0,0)'
            ],
            borderColor: 'rgb(255,255,255)',
            hoverOffset: 4
        }]
    };
    const pie_config = {
        type: 'doughnut',
        data: pie_data,
    };

    const pieChart = new Chart(
        document.getElementById('percent-total'), pie_config
    );
};