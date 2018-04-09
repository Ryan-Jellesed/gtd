$(document).ready(function() {
    $('#regions_all').bind('change', function() {
        var elements = $('div.container').children().hide(); // hide all the elements
        var value = $(this).val();

        if (value.length) { // if somethings' selected
            elements.filter('.' + value).show(); // show the ones we want
        }
    }).trigger('change');
});



  var margin = {top: 40, right: 100, bottom: 50, left: 100},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  /*
    Start building the graphing functions
   */

 
  // var buildLine = function(ds){

  //   var minDate = getDate(ds[0].date);

  //   var maxDate = getDate(ds[ds.length-1].date);

  //   console.log("min date: " + minDate);
  //   console.log("max date: " + maxDate);

  //   var tooltip = d3.select('body').append("div")
  //                     .attr("class", "tooltip")
  //                     .style("opacity", 0)

  //   // scales
  //   var xScale = d3.time.scale()
  //                         .domain([minDate, maxDate])
  //                         .range([0, width]);

  //   var yScale = d3.scale.linear()
  //                           .domain([0, d3.max(ds. function(d){ return d.count; })])
  //                           .range([height, 0])
  //                           .nice();

  //   // Axis
  //   var xAxis = d3.svg.axis()
  //                       .scale(xScale)
  //                       .orient("bottom")
  //                       .innerTickSize(-height)
  //                       .outerTickSize(0)
  //                       .tickPadding(10)
  //                       .tickFormat(d3.time.format("%b"));

  //   var yAxis = d3.svg.axis()
  //       .scale(yScale)
  //       .orient("left")
  //       .innerTickSize(-width)
  //       .outerTickSize(0)
  //       .tickPadding(10);


  // }


  var buildLineYear = function(data) {

    dataset = data;
    console.log(dataset)

    var minDate = getDate(dataset[0].date );

    var maxDate = getDate(dataset[dataset.length -1].date );

    console.log("min date: " + minDate);
    console.log("max date: " + maxDate);

    // Scales
    var xScale = d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d){ return d.count; })])
        .range([height, 0]);

    // Axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickPadding(10)
        .tickFormat(d3.time.format("%y'"));

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(10);

    // Line func
    var line = d3.svg.line()
        .x(function(d) { return xScale(getDate(d.date ))})
        .y(function(d) { return yScale(d.count); })
        .interpolate("linear");

    // Create svg
    var svg = d3.select("").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "svg-month")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

      svg.append("g")
          .attr("class", "y-axis")
          .call(yAxis)

      // text label for the x axis
      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle");
      // .text("Month Number or Year Number (I haven't coded the dynamic variables yet)");

      svg.append("path")
          .data([dataset])
          .attr("class", "path-month")
          .attr("d", line);
  };

  var buildLineMonth = function(ds) {

    // base = 1970;
    // dataset = ds[year - base].month;
    // data = dataset.month;
    // console.log(dataset)

    var minDate = getDate(ds[0]['date']);
    // console.log(minDate);
    var maxDate = getDate(ds[ds.length-1].date);
    // console.log(maxDate);

    console.log("min date: " + minDate);
    console.log("max date: " + maxDate);

    var tooltip = d3.select("body").append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0)

    // Scales
    var xScale = d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(ds, function(d){ return d.count; })])
        .range([height, 0])
        .nice();

    // Axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickPadding(10)
        .tickFormat(d3.time.format("%b"));

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(10);

    // Line func
    var line = d3.svg.line()
        .x(function(d) { return xScale(getDate(d.date)); })
        .y(function(d) { return yScale(d.count); })
        .interpolate("linear");

    // Create svg
    var svg = d3.select("#area-1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "svg-month")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

      svg.append("g")
          .attr("class", "y-axis")
          .call(yAxis)

      // text label for the x axis
      // svg.append("text")             
      //       .attr("transform",
      //             "translate(" + (width/2) + " ," + 
      //                            (height + margin.top + 10) + ")")
      //       .style("text-anchor", "middle")
      //       .text("Count of Global Terror Attacks")
      //       .text("1970 - 2016");


      svg.append("path")
          .data([ds])
          .attr("class", "path-month")
          .attr("d", line);

      var dots = svg.selectAll("circle")
                      .data(ds)
                      .enter()
                      .append("circle")
                      .attr({
                        cx: function(d) { return xScale(getDate(d.date)); },
                        cy: function(d) { return yScale(d.count); },
                        r: 3,
                        "fill": "#666666",
                        class: "circle-svg"
                      })
                      .on("mouseover", function(d){

                        tooltip.transition()
                                  .duration(500)
                                  .style("opacity", .85)
                        tooltip.html("<strong>Attack Count: " + d.count)
                                  .style("left", (d3.event.pageX) + "px")
                                  .style("top", (d3.event.pageY - 28) + "px");
                      })
                      .on("mouseout", function(d){
                        tooltip.transition()
                                  .duration(300)
                                  .style("opacity", 0);
                      })


      svg.append("text")
            .attr("x", (width /2 ))
            .attr("y", 0 - (margin.top / 5))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Count of Global Terror Attacks 1970 - 2016 ")
      svg.append("text")
            .attr("x", (width - 70 ))
            .attr("y", 0 - (margin.top /5))
            .attr("text-anchor", "right")
            .style("font-size", "30px")
            .style("text-decoration", "bold")
            .text("1970")
            .attr("id", "demo")
      // svg.append("text")
      //       .attr("x", (width - 70 ))
      //       .attr("y", 0 - (margin.top /5))
      //       .attr("text-anchor", "right")
      //       .style("font-size", "30px")
      //       .style("text-decoration", "bold")
      //       .text("U.S.")
      //       .attr("id", "gdp-year")
            // .text("1970 - 2016");

  };

  var updateLineMonth = function(ds) {

      // base = 1970;
      // dataset = contents[year - base].month;
      // data = dataset.month;
      console.log(ds)

      var minDate = getDate(ds[0].date);

      var maxDate = getDate(ds[ds.length - 1].date);

      console.log("min date: " + minDate);
      console.log("max date: " + maxDate);

      // Scales
      var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

      var yScale = d3.scale.linear()
          .domain([0, d3.max(ds, function(d){ return d.count; })])
          .range([height, 0])
          .nice();

      // Axis
      var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .innerTickSize(-height)
          .outerTickSize(0)
          .tickPadding(10)
          // .ticks(ds.monthlySales.length-1)     DIDN'T IMPLEMENT THIS YET FROM THE TUTORIAL
          .tickFormat(d3.time.format("%b"))
          .ticks(ds.length - 1);

      var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .innerTickSize(-width)
          .outerTickSize(0)
          .tickPadding(10);

      // Line func
      var line = d3.svg.line()
          .x(function(d) { return xScale(getDate(d.date)); })
          .y(function(d) { return yScale(d.count); })
          .interpolate("linear");

      // Create svg
      var svg = d3.select("body").select("#svg-month");

        svg.selectAll("g.x-axis").call(xAxis);

        svg.selectAll("g.y-axis").call(yAxis);

        svg.selectAll(".path-month")
              .data([ds])
              .transition()
              .duration(3500)
              // .ease("linear")
              // .ease("elastic")
              // .ease("circle")
              .ease("bounce")
            // .attr("class", "line")
              .attr("d", line);

      // var svg = d3.select("svg");
      // svg.selectAll("*").remove();

      var dots = svg.selectAll(".circle-svg")
                      // .data(ds)     
                      .transition()
                      .duration(1000)
                      .ease("linear")
                      .attr({
                        cx: function(d) { return xScale(getDate(d.date)); },
                        cy: function(d) { return yScale(d.count); },
                      });
      var dots = svg.selectAll(".circle-svg")
                      .data(ds)
                      .transition()
                      .duration(1000)
                      .ease("linear")
                      .attr({
                        cx: function(d) { return xScale(getDate(d.date)); },
                        cy: function(d) { return yScale(d.count); },
                      });                     
  };

// var obj = new Object();
//    obj.name = "Raj";
//    obj.age  = 32;
//    obj.married = false;
//    var jsonString= JSON.stringify(obj);

// var jsonString = JSON.stringify(ds2);

// JSON.parse(jsonString);
// decodedData = JSON.parse(jsonString);

// decodedData.contents.forEach(function(ds){
//   console.log(ds);
// })


  /*
    Load the whole gtd dataset in JSON format
   */
  var gtdJSON = [];
  d3.json("large_data/gtd.json", function(error, data){

    if(error){
      console.log(error);
    } else {
      // console.log("************************************************");
      // console.log("Loaded the GTD full Dataset!!!");
      // console.log(data.contents);
      // gtdJSON = data;
      // console.log("************************************************\n\n\n\n");
    
      console.log("*******    gtdJSON = GTD full dataset      *******");
      data.contents.forEach(function(contents){
        gtdJSON.push(contents);
      });
      console.log(gtdJSON);
      console.log("**************************************************\n\n\n\n");

    }

  });


  /*
    when pulling data from github use the api
   */
  
  d3.json("https://api.github.com/repos/Ryan-Jellesed/gtd/contents/jsonFiles/MM_YY_Atacks.json", function(error, data) {
     
   if(error) {
       console.log(error);
   } else {
       // console.log(data); //we're golden!
   }

    var decodedData = JSON.parse(window.atob(data.content));
      // console.log("******  MM_YY_Atacks Dataset from Github **********\n\n\n");
      // console.log("******            decodedData            **********");
      // console.log(decodedData);
      // console.log("***************************************************\n\n\n\n");
      // console.log("******         decodedData.contents      **********");
      // console.log(decodedData.contents);
      // console.log("***************************************************\n\n\n\n");

      var ds = decodedData.contents;
      var year = 1970;
      var dsYear = ds[year - 1970];
      console.log(dsYear['monthlyCount']);


      buildLineMonth(dsYear['monthlyCount']);


      decodedData.contents.forEach(function(ds){

          // console.log(ds);
      //     // showHeader(ds);
      //     // buildLine(ds);
      });


      d3.select("#year-option")
          .on("change", function(d,i){

            //get selected option
            var selYear = d3.select('#year-option').node().value;
            var selDate = d3.select("#date-option").node().value;
            // console.log(ds.monthlySales.length-sel);
            // console.log(selYear);

            var decodedData = JSON.parse(window.atob(data.content));
            var ds = decodedData.contents;
            year = selYear;
            var date = selDate;
            var dsYear = ds[year - 1970];

            // dsYear = dsYear.monthlyCount.splice(0, dsYear.monthlyCount.length - date);
            if(d3.select("#date-option").node().value === "-6"){
              dsYear = dsYear.monthlyCount.splice(6, dsYear.monthlyCount.length - date);
            } else {
              dsYear = dsYear.monthlyCount.splice(0, dsYear.monthlyCount.length - date);
            }
            updateLineMonth(dsYear)
          
      });

      d3.select("#month-option")
          .on("change", function(d,i){

                // get selected option
            var selMonth = d3.select("#month-option").node().value;

              console.log(selMonth);       
      });

      d3.select("#date-option")
          .on("change", function(d,i){

                // get selected option
            var selDate = d3.select("#date-option").node().value;
            var selYear = d3.select("#year-option").node().value;
            var decodedData = JSON.parse(window.atob(data.content));

            var ds = decodedData.contents
            var year = selYear;
            var date = selDate;
            var dsYear = ds[year - 1970];


            if(d3.select("#date-option").node().value === "-6"){
              dsYear = dsYear.monthlyCount.splice(6, dsYear.monthlyCount.length - date);
            } else if(d3.select("#date-option").node().value === "-3"){
              dsYear = dsYear.monthlyCount.splice(9, dsYear.monthlyCount.length - date);
            } else {
              dsYear = dsYear.monthlyCount.splice(0, dsYear.monthlyCount.length - date);
            }
            updateLineMonth(dsYear);

              // console.log(selDate);    
      });

      d3.select("#day-option")
          .on("change", function(d,i){

              // get selected option
            var selDay = d3.select('#day-option').node().value;

            // console.log(selDay);    
      });


  d3.json("https://api.github.com/repos/Ryan-Jellesed/gtd/contents/jsonFiles/attacksByYear.json", function(error, data) {
     
    if(error) {
       console.log(error);
    } else {
       // console.log(data); //we're golden!
       
    }

      var decodedData = JSON.parse(window.atob(data.content));
      attacksByYear = decodedData;
      return(attacksByYear);
  });


});


d3.json("http://api.worldbank.org/v2/countries/eg/indicators/NY.GDP.MKTP.CD?date=1970&format=json", function(error, data) {
     
    if(error) {
       console.log(error);
    } else {
       // console.log(data); //we're golden! 
    }

      // var decodedData = JSON.parse(window.atob(data.content));
      countryLiteracyRate = data;
      return(countryLiteracyRate);
  });



/*
  function for saving JSON file
  console.save(data, filename);
 */

(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)


function myFunction() {
  var selectedYear = document.getElementById("year-option").value;
  document.getElementById("demo").innerHTML = selectedYear;
} 


function insertCountry() {
  // var selectedCountry = document.getElementsByClassName("country").class;
  var selectedCountry = $("#country option:selected").html();
  document.getElementById("data1").innerHTML = selectedCountry;
}

/*
  this function gets the iso county code and year value from the selection option in the html and 
  pulls the correct json file from the world bank data, returning the correct gdp for the country
  and year
 */

// function selectCountryCode(){

//   selectCountryISO = document.getElementById("country").value;
//   selectCountryYear = document.getElementById("year-option").value;

//   // console.log(selectCountryISO);
//   if(document.getElementById("country").value === '99' || document.getElementById("country").value === "cs") {
//     document.getElementById("gdp").innerHTML = " _____ ";
//     document.getElementById("population-total").innerHTML = "  _____  ";
//   } else {
//     d3.json("http://api.worldbank.org/v2/countries/"+selectCountryISO+"/indicators/NY.GDP.MKTP.CD?date=" + selectCountryYear + "&format=json", function(error, data) {
     
//       if(error) {
//          console.log(error);
//       } else {
//          // console.log(data); //we're golden! 
//       }

//       // var decodedData = JSON.parse(window.atob(data.content));
//       countryGDPyear = data;
//       // n = countryGDPyear[1][0].value / 1000000;
//       // n = n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
//       // countryGDP = n;

//       countryGDP = Math.round(countryGDPyear[1][0].value / 1000000);
//       countryGDP = (countryGDPyear[1][0].value / 1000000000).toFixed(4);

//       document.getElementById("gdp").innerHTML = countryGDP;
//     });

//     d3.json("https://api.worldbank.org/v2/countries/"+ selectCountryISO + "/indicators/SP.POP.TOTL?&format=json" + "&date=" + selectCountryYear, function(error, data) {

//       if(error){
//         console.log(error);
//       } else {
//         // console.log(data);
//       }

//       population = data[1][0].value;
//       population = (population / 1000000).toFixed(4);

//       document.getElementById("population-total").innerHTML = population;

//       return population;
//     });

//   }
// }


function clearInputs() {
  document.getElementById("gdp").innerHTML = " _____ ";
  document.getElementById("population-total").innerHTML = "  _____  ";
}





// function selectNorthAmericaCountryCode() {

//   selectCountryISO = document.getElementById("north_america").value;
//   selectCountryYear = document.getElementById("year-option").value;

//   // console.log(selectCountryISO);
//   if(document.getElementById("north_america").value === '99' || document.getElementById("north_america").value === "cs") {
//     document.getElementById("gdp").innerHTML = " _____ ";
//     document.getElementById("population-total").innerHTML = "  _____  ";
//   } else {
//     d3.json("http://api.worldbank.org/v2/countries/"+selectCountryISO+"/indicators/NY.GDP.MKTP.CD?date=" + selectCountryYear + "&format=json", function(error, data) {
     
//       if(error) {
//          console.log(error);
//       } else {
//          // console.log(data); //we're golden! 
//       }

//       // var decodedData = JSON.parse(window.atob(data.content));
//       countryGDPyear = data;
//       // n = countryGDPyear[1][0].value / 1000000;
//       // n = n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
//       // countryGDP = n;

//       countryGDP = Math.round(countryGDPyear[1][0].value / 1000000);
//       countryGDP = (countryGDPyear[1][0].value / 1000000000).toFixed(4);

//       document.getElementById("gdp").innerHTML = countryGDP;
//     });

//     d3.json("https://api.worldbank.org/v2/countries/"+ selectCountryISO + "/indicators/SP.POP.TOTL?&format=json" + "&date=" + selectCountryYear, function(error, data) {

//       if(error){
//         console.log(error);
//       } else {
//         // console.log(data);
//       }

//       population = data[1][0].value;
//       population = (population / 1000000).toFixed(4);

//       document.getElementById("population-total").innerHTML = population;

//       return population;
//     });

//   }
// }
countryCode = "99";
yearCode = "1970";

function setCCode(x){
  countryCode = x;
};

function setYCode(x){
  yearCode = x;
}

function selectCCode() {
  // x = toString(idName);
  
  CCode = countryCode;
  YCode = yearCode;
  console.log(YCode);
  console.log(CCode);
  // selectCountryISO = document.getElementById('"' + x + '"').value;

  // selectCountryYear = document.getElementById("year-option").value;

  // console.log(selectCountryISO);
  if(CCode === '99' || CCode === "cs") {
    document.getElementById("gdp").innerHTML = " _____ ";
    document.getElementById("population-total").innerHTML = "  _____  ";
  } else {
    d3.json("http://api.worldbank.org/v2/countries/"+ CCode +"/indicators/NY.GDP.MKTP.CD?date=" + YCode + "&format=json", function(error, data) {
     
      if(error) {
         console.log(error);
      } else {
         // console.log(data); //we're golden! 
      }

      // var decodedData = JSON.parse(window.atob(data.content));
      countryGDPyear = data;
      // n = countryGDPyear[1][0].value / 1000000;
      // n = n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
      // countryGDP = n;

      countryGDP = Math.round(countryGDPyear[1][0].value / 1000000);
      countryGDP = (countryGDPyear[1][0].value / 1000000000).toFixed(4);

      document.getElementById("gdp").innerHTML = countryGDP;
    });

    d3.json("https://api.worldbank.org/v2/countries/"+ CCode + "/indicators/SP.POP.TOTL?&format=json" + "&date=" + YCode, function(error, data) {

      if(error){
        console.log(error);
      } else {
        // console.log(data);
      }

      population = data[1][0].value;
      population = (population / 1000000).toFixed(4);

      document.getElementById("population-total").innerHTML = population;

      return population;
    });

  }
}



