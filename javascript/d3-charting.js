 var margin = {top: 40, right: 100, bottom: 50, left: 100},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

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
            .attr("x", (width - 60 ))
            .attr("y", 0 - (margin.top /5))
            .attr("text-anchor", "right")
            .style("font-size", "30px")
            .style("text-decoration", "bold")
            .style("fill", "black")
            .text("")
            .attr("id", "demo")
      svg.append("text")
            .attr("x", (width - 150 ))
            .attr("y", 0 - (margin.top /5))
            .attr("text-anchor", "right")
            .style("font-size", "30px")
            .style("text-decoration", "bold")
            // .text("1970")
            .style("fill", "red")
            .attr("id", "demo2")
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
          // .interpolate("step-before");
          // .interpolate("cardinal");

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

      // var dots = svg.selectAll(".circle-svg")
      //                 // .data(ds)     
      //                 .transition()
      //                 .duration(1000)
      //                 .ease("linear")
      //                 .attr({
      //                   cx: function(d) { return xScale(getDate(d.date)); },
      //                   cy: function(d) { return yScale(d.count); },
      //                 });
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


  /*
    Load the whole gtd dataset in csv format
   */
  var gtdCSV = [];
  d3.csv("large_data/gtdMini.csv", function(error, data){

    if(error){
      console.log(error);
    } else {
      // console.log("************************************************");
      // console.log("Loaded the GTD full Dataset!!!");
      // console.log(data.contents);
      // gtdCSV = data;
      // console.log("************************************************\n\n\n\n");
    
      console.log("*******    gtdCSV = GTD full dataset      *******");
      data.forEach(function(contents){
        gtdCSV.push(contents);
      });
      console.log(gtdCSV);
      console.log("**************************************************\n\n\n\n");

    }

  });


  /*
    when pulling data from github use the api
   */

  // d3.json("https://api.github.com/repos/Ryan-Jellesed/gtd/contents/jsonFiles/MM_YY_Atacks.json", function(error, data) {
  d3.json("jsonFiles/MM_YY_Atacks.json", function(error, data) {

   if(error) {
       console.log(error);
   } else {
       // console.log(data); //we're golden!
   }

    // var decodedData = JSON.parse(window.atob(data.content));
    var decodedData = data;

      // console.log("******  MM_YY_Atacks Dataset from Github **********\n\n\n");
      // console.log("******            decodedData            **********");
      // console.log(decodedData);
      // console.log("***************************************************\n\n\n\n");
      // console.log("******         decodedData.contents      **********");
      // console.log(decodedData.contents);
      // console.log("***************************************************\n\n\n\n");

      var ds = decodedData.contents;
      console.log("1");
      console.log(ds);
      var year = 1970;
      var dsYear = ds[year - 1970];
      console.log("this is what you need");
      console.log(dsYear['monthlyCount']);

      tempArray = [{date: 19930101, count: 0},
                  {date: 19930201, count: 0},
                  {date: 19930301, count: 0},
                  {date: 19930401, count: 0},
                  {date: 19930501, count: 0},
                  {date: 19930601, count: 0},
                  {date: 19930701, count: 0},
                  {date: 19930801, count: 0},
                  {date: 19930901, count: 0},
                  {date: 19931001, count: 0},
                  {date: 19931101, count: 0},
                  {date: 19931201, count: 0}]

      // buildLineMonth(dsYear['monthlyCount']);
      buildLineMonth(tempArray);


      // decodedData.contents.forEach(function(ds){

      //     // console.log(ds);
      // //     // showHeader(ds);
      // //     // buildLine(ds);
      // });


      d3.select("#year-option")
          .on("change", function(d,i){

            regionLatLon();          
            // updategraph1(mapDs);
            if(regionSelected === "Australasia & Oceania"){
              update_australasia_map(australasia_ds);
              mapDs = australasia_ds;

            } else if(regionSelected === "North America"){
              update_north_america_map(north_america_ds);
              mapDs = north_america_ds;

            } else if(regionSelected === "Central America & Caribbean"){
              update_central_america_map(central_america_ds);
              mapDs = central_america_ds;

            } else if(regionSelected === "Central Asia"){
              update_central_asia_map(central_asia_ds);
              mapDs = central_asia_ds;

            } else if(regionSelected === "East Asia"){
              update_east_asia_map(east_asia_ds);
              mapDs = east_asia_ds;

            } else if(regionSelected === "Eastern Europe"){
              update_eastern_europe_map(eastern_europe_ds);
              mapDs = eastern_europe_ds;
            
            } else if(regionSelected === "Middle East & North Africa"){
              update_middle_east_and_north_africa_map(middle_east_and_north_africa_ds);
              mapDs = middle_east_and_north_africa_ds;

            } else if(regionSelected === "South America"){
              update_south_america_map(south_america_ds);
              mapDs = south_america_ds;

            } else if(regionSelected === "South Asia"){
              update_south_asia_map(south_asia_ds);
              mapDs = south_asia_ds;

            } else if(regionSelected === "Southeast Asia"){
              update_southeast_asia_map(southeast_asia_ds);
              mapDs = southeast_asia_ds;

            } else if(regionSelected === "Sub-Saharan Africa"){
              update_sub_saharan_africa_map(sub_saharan_africa_ds);
              mapDs = sub_saharan_africa_ds;

            } else if(regionSelected === "Western Europe"){
              update_western_europe_map(western_europe_ds);
              mapDs = western_europe_ds;
            }
           
            
            //get selected option
            var selYear = d3.select('#year-option').node().value;
            var selDate = d3.select("#date-option").node().value;
            // console.log(ds.monthlySales.length-sel);
            // console.log(selYear);
            // console.log(data);

            if(selYear === "00"){
              updateLineMonth(tempArray);
            } else {

              // var decodedData = JSON.parse(window.atob(data.content));
            var decodedData = data;
            // console.log(decodedData);

            
            ds = decodedData.contents;
            // console.log(ds);

            // var ds = decodedData;
            // console.log("below is the ds dataset");
            // console.log(ds);
            // return ds;
            year = selYear;
            console.log("year");
            console.log(year);

            var date = selDate;
            console.log("date");
            console.log(date);

            var dsYear = ds[year - 1970];
            console.log("dsYear");
            console.log(dsYear);

            console.log("dsYear['monthlyCount] ---- below");
            console.log(dsYear['monthlyCount']);

            // dsYear = dsYear.monthlyCount.slice(0, dsYear.monthlyCount.length - date);
            // if(d3.select("#date-option").node().value === "-6"){
            //   dsYear = dsYear.monthlyCount.slice(6, dsYear.monthlyCount.length - date);
            // } else {
            //   dsYear = dsYear.monthlyCount.slice(0, dsYear.monthlyCount.length - date);
            // }
            updateLineMonth(dsYear['monthlyCount']);

            } 
      });



    // #####################

    d3.select("#year2-option")
          .on("change", function(d,i){

            //get selected option
            var selYear = d3.select('#year2-option').node().value;
            console.log(selYear);
            var selDate = d3.select("#date-option").node().value;
            // console.log(ds.monthlySales.length-sel);
            // console.log(selYear);
            // console.log(data);

            if(selYear === "99"){
              updateLineMonth(tempArray);
            } else {

              // var decodedData = JSON.parse(window.atob(data.content));
            var decodedData = data;
            // console.log(decodedData);

            
            ds = decodedData.contents;
            // console.log(ds);

            // var ds = decodedData;
            // console.log("below is the ds dataset");
            // console.log(ds);
            // return ds;
            year = selYear;
            console.log("year");
            console.log(year);

            var date = selDate;
            console.log("date");
            console.log(date);

            var dsYear2 = ds[year - 1970];
            console.log("dsYear2");
            console.log(dsYear2);

            console.log("dsYear2['monthlyCount] ---- below");
            console.log(dsYear2['monthlyCount']);

            // dsYear = dsYear.monthlyCount.slice(0, dsYear.monthlyCount.length - date);
            // if(d3.select("#date-option").node().value === "-6"){
            //   dsYear = dsYear.monthlyCount.slice(6, dsYear.monthlyCount.length - date);
            // } else {
            //   dsYear = dsYear.monthlyCount.slice(0, dsYear.monthlyCount.length - date);
            // }
            updateLineMonth(dsYear2['monthlyCount']);

            } 
      });

    // #####################

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
            // var decodedData = JSON.parse(window.atob(data.content));

            var decodedData = data;

            var ds = decodedData.contents
            var year = selYear;
            var date = selDate;
            var dsYear = ds[year - 1970];


            if(d3.select("#date-option").node().value === "-6"){
              dsYear = dsYear.monthlyCount.slice(6, dsYear.monthlyCount.length - date);
            } else if(d3.select("#date-option").node().value === "-3"){
              dsYear = dsYear.monthlyCount.slice(9, dsYear.monthlyCount.length - date);
            } else {
              dsYear = dsYear.monthlyCount.slice(0, dsYear.monthlyCount.length - date);
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

      d3.select("#year2-option")
          .on("change", function(d,i) {

          });

  // d3.json("https://api.github.com/repos/Ryan-Jellesed/gtd/contents/jsonFiles/attacksByYear.json", function(error, data) {
  d3.json("jsonFiles/attacksByYear.json", function(error, data) {
     
    if(error) {
       console.log(error);
    } else {
       // console.log(data); //we're golden!
       
    }
      // var decodedData = JSON.parse(window.atob(data.content));
      var decodedData = data.content;

      attacksByYear = decodedData;
      return(attacksByYear);
  });
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
})(console);


function myFunction() {
  var selectedYear = document.getElementById("year-option").value;
  if(selectedYear === "00") {
    document.getElementById("demo").innerHTML = "";
  } else {
    document.getElementById("demo").innerHTML = selectedYear;
  }
}; 

var compareYears = function () {
  var selectedYear = document.getElementById("year-option").value;
  var selectedYear2 = document.getElementById("year2-option").value;
  if(selectedYear === "00" & selectedYear2 === "99") {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
  } else if(selectedYear2 === "99"){
    document.getElementById("demo").innerHTML = selectedYear;
    document.getElementById("demo").style.fill = "black";
    document.getElementById("demo2").innerHTML = "";
  } else if(selectedYear === "00") {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").style.fill = "black";
    document.getElementById("demo2").innerHTML = selectedYear2;
  } else {
    
    // document.getElementById("year2-option").style.color = "red";
    // document.getElementById("demo").style.color = "blue";
    document.getElementById("demo").style.fill = "blue";
    document.getElementById("demo2").style.fill = "red";
    document.getElementById("demo").innerHTML = selectedYear;
    document.getElementById("demo2").innerHTML = selectedYear2;

  }
};

// gets the value that is in the rendered html not the value="" from within the tag
function getOptionIndexValue(sel){
        selected = sel.options[sel.selectedIndex].text;
        return selected;
  };

function insertCountry(sel) {
  // var selectedCountry = document.getElementsByClassName("country").class;
  // var selectedCountry = $("#country option:selected").html();
  getOptionIndexValue(sel)
  selectedCountry = selected;
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
  document.getElementById("data1").innerHTML = " _____ ";
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
  if(CCode === '99' || CCode === "cs" || CCode === "va" || YCode === "99") {
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

 // var width = 960,
 //      height = 500;

 //  var projection = d3.geo.albers()
 //      .center([-20, 40])
 //      // .rotate([4.4, 0])
 //      .parallels([50,60])
 //      .scale(350)
 //      .translate([width / 2, height / 2]);

 //  var path = d3.geo.path()
 //      .projection(projection);

 //  var svg = d3.select("#area-2").append("svg")
 //      .attr("width", width)
 //      .attr("height", height)
 //    .append("svg")
 //      .attr("width", width)
 //      .attr("height", height);

 //  d3.json("north_america.json", function(error, north_america) {
 //    if (error) return console.error(error);
 //    console.log(north_america);

 //    var subunits = topojson.feature(north_america, north_america.objects.subunits);
 //    console.log(subunits);
 //    svg.append("path")
 //          .datum(subunits)
 //          .attr("d", path);

 //    svg.selectAll(".subunit")
 //          .data(topojson.feature(north_america, north_america.objects.subunits).features)
 //        .enter().append("path")
 //          .attr("class", function(d) { return "subunit " + d.id; })
 //          .attr("d", path);

 //  });


// this code sets a global region variable
// the selectRegion function will grab the region from the select drop down and store
// it in the regionSelected Variable
var regionSelected = "";
var selectRegion = function(sel){
  regionSelected = sel.options[sel.selectedIndex].text;
  console.log(regionSelected);
  return regionSelected;
};

// this code block will set up an array of lat lon value to be used in plotting on the map
// it iterates over the gtdCSV file and pushes the lat lon data to the new array 
latLonArray = [];
var regionLatLon = function(){
  // var latLonArray = [];
  var selectedYear = document.getElementById("year-option").value;
  latLonArray = [];
  // var selectedRegion = document.getElementById("regions_all").value;
  for(i = 0; i < gtdCSV.length; i++){

    if(gtdCSV[i]['iyear'] === selectedYear & gtdCSV[i]['latitude'] !== "" & gtdCSV[i]['region_txt'] === regionSelected) {
      latLonArray.push({
                      lon: parseFloat(gtdCSV[i]['longitude']),
                      lat: parseFloat(gtdCSV[i]['latitude']),
                      date: String(gtdCSV[i]['imonth']) + "/" + String(gtdCSV[i]['iday']) + "/" + String(gtdCSV[i]['iyear']),
                      country: gtdCSV[i]['country_txt'],
                      city: gtdCSV[i]['city'],
                      state: gtdCSV[i]['provstate'],
                      target: gtdCSV[i]['target1'],
                      group_name: gtdCSV[i]['gname'],
                      motive: gtdCSV[i]['motive'],
                      attack_type: gtdCSV[i]['attacktype1_txt'],
                      weapon_type: gtdCSV[i]['weaptype1_txt'],
                      number_killed: gtdCSV[i]['nkill'],
                      summary: gtdCSV[i]['summary'],
                      additional_notes: gtdCSV[i]['addnotes']
                });
    }
  };
  console.log(latLonArray);
  return latLonArray;
};

// d3.select('id', 'regions_all')
//     .on('change', function(d,i) {

//       regionLatLon();

//   }); 





// var graph1 = function(ds){
      
//       var width = 960,
//           height = 500;

//       var projection = d3.geo.albers()
//           .center([-20, 40])
//           // .rotate([4.4, 0])
//           .parallels([50,60])
//           .scale(350)
//           .translate([width / 2, height / 2]);
      
//       var path = d3.geo.path()
//           .projection(projection);

//       var svg = d3.select("body").append("svg")
//           .attr("width", width)
//           .attr("height", height)
//           .attr("id", "graph_north_america")
//           .attr("class", "map");
//         // .append("svg")
//         //   .attr("width", width)
//         //   .attr("height", height);

//         var subunits = topojson.feature(ds, ds.objects.subunits);
        
//         var tooltip = d3.select("body").append("div")
//                       .attr("class", "tooltip")
//                       .style("opacity", 0)

//         console.log(subunits);
//         svg.append("path")
//               .datum(subunits)
//               .attr("d", path);

//         svg.selectAll(".subunit")
//               .data(topojson.feature(ds, ds.objects.subunits).features)
//             .enter().append("path")
//               .attr("class", function(d) { return "subunit " + d.id; })
//               .attr("d", path);

      

// };

var removeBubble = function(){
  d3.selectAll(".bubble").remove();
}

// var updategraph1 = function(ds){
//      removeBubble();
      
//       var width = 960,
//           height = 500;

//       var projection = d3.geo.albers()
//           .center([-20, 40])
//           // .rotate([4.4, 0])
//           .parallels([50,60])
//           .scale(350)
//           .translate([width / 2, height / 2]);

//       var tooltip = d3.select("body").select(".tooltip")
//                       // .append("div")
//                       // .attr("class", "tooltip")
//                       .style("opacity", 0)

//       var maxTooltip = function(arr){
//         var maxTip = [];
//         for(i = 0; i<arr.length; i++){
//           maxTip.push(arr[i].number_killed)
//         }
//         var maxTipOut = Math.max(...maxTip)
//         console.log(maxTipOut);
//         return maxTipOut;
//       };

//       var radius = d3.scale.sqrt()
//           // .domain([0, maxTooltip(toolTipArray)])
//           .domain([0, 1500])
//           .range([0, 3]);

//       var path = d3.geo.path()
//           .projection(projection);

//       var svg = d3.select("body").select("#graph_north_america")
//           .append("svg")
//           .attr("width", width)
//           .attr("height", height)
//           .attr("class", "map");
//           // .attr("id", "graph_north_america");
//         // .append("svg")
//         //   .attr("width", width)
//         //   .attr("height", height);

//         var subunits = topojson.feature(ds, ds.objects.subunits);

//         console.log(subunits);
//         svg.append("path")
//               .datum(subunits)
//               .attr("d", path);

//         svg.selectAll(".subunit")
//               .data(topojson.feature(ds, ds.objects.subunits).features)
//             .enter().append("path")
//               .attr("class", function(d) { return "subunit " + d.id; })
//               .attr("d", path);

//         svg.selectAll("circle")
//               .data(latLonArray)
//               .sort(function(a,b) {
//                 return b.properties.number_killed - a.properties.number_killed;
//               })

//               .enter()
//               .append("circle")
//               .attr("class", "bubble")

//               // .attr("cy", function(d) {  console.log(projection(d)); return projection(d[0]["lon"]); })
//               // .attr("cx", function(d) {  return projection(d[1]["lat"]); })
//               .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
//               .attr("r", "2px")
//               // .attr("r", function(d) { return d.number_killed ; })
//               // .attr("r", function(d) { return radius(d.number_killed); })
//               .attr("fill", "red")
//               .on("mouseover", function(d){

//                         tooltip.transition()
//                                   .duration(500)
//                                   .style("opacity", .85)
//                         tooltip.html("<strong>Date: </strong>" + d.date + 
//                                     "<br><strong>City: </strong>" + d.city +
//                                     "<br><strong>State/Province: </strong>" + d.state +
//                                     "<br><strong>Country: </strong>" + d.country +
//                                     "<br><strong>Target: </strong>" + d.target +
//                                     "<br><strong>Attack Type: </strong>" + d.attack_type +
//                                     "<br><strong>Weapon Used: </strong>" + d.weapon_type +
//                                     "<br><strong>Number Killed: </strong>" + d.number_killed +
//                                     "<br><strong>Motive: </strong>" + d.Motive +
//                                     "<br><strong>Group Name: </strong>" + d.group_name +
//                                     "<br><strong>Summary: </strong>" + d.summary +
//                                     "<br><strong>Additional Notes: </strong>" + d.additional_notes)
//                                   .style("left", (d3.event.pageX) + "px")
//                                   .style("top", (d3.event.pageY - 28) + "px");
//                       })
//                       .on("mouseout", function(d){
//                         tooltip.transition()
//                                   .duration(200)
//                                   .style("opacity", 0);
//                       })

// };



var australasia_map = function(ds){
  // var graph1 = function(ds){
      
      var width = 960,
          height = 500;

      var projection = d3.geo.albers()
          .center([0, -155])
          .rotate([-150, 0])
          .parallels([0,-60])
          .scale(500)
          .translate([width / 2, height / 2]);
      
      var path = d3.geo.path()
          .projection(projection);

      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("id", "graph_australasia")
          .attr("class", "map");
        // .append("svg")
        //   .attr("width", width)
        //   .attr("height", height);

        var subunits = topojson.feature(ds, ds.objects.subunits);
        
        var tooltip = d3.select("body").append("div")
                      .attr("class", "tooltip_graph")
                      .style("opacity", 0)

        console.log(subunits);
        svg.append("path")
              .datum(subunits)
              .attr("d", path);

        svg.selectAll(".subunit")
              .data(topojson.feature(ds, ds.objects.subunits).features)
            .enter().append("path")
              .attr("class", function(d) { return "subunit " + d.id; })
              .attr("d", path);     

  };

var update_australasia_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, -155])
      .rotate([-150, 0])
      .parallels([0,-60])
      .scale(500)
      .translate([width / 2, height / 2]);

  var tooltip = d3.select("body").select(".tooltip")
                  // .append("div")
                  // .attr("class", "tooltip")
                  .style("opacity", 0)

  var maxTooltip = function(arr){
    var maxTip = [];
    for(i = 0; i<arr.length; i++){
      maxTip.push(arr[i].number_killed)
    }
    var maxTipOut = Math.max(...maxTip)
    console.log(maxTipOut);
    return maxTipOut;
  };

  var radius = d3.scale.sqrt()
      // .domain([0, maxTooltip(toolTipArray)])
      .domain([0, 1500])
      .range([0, 3]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").select("#graph_australasia")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "map");
      // .attr("id", "graph_north_america");
    // .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    var subunits = topojson.feature(ds, ds.objects.subunits);

    console.log(subunits);
    svg.append("path")
          .datum(subunits)
          .attr("d", path);

    svg.selectAll(".subunit")
          .data(topojson.feature(ds, ds.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);

    svg.selectAll("circle")
          .data(latLonArray)
          .sort(function(a,b) {
            return b.properties.number_killed - a.properties.number_killed;
          })

          .enter()
          .append("circle")
          .attr("class", "bubble")

          // .attr("cy", function(d) {  console.log(projection(d)); return projection(d[0]["lon"]); })
          // .attr("cx", function(d) {  return projection(d[1]["lat"]); })
          .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
          .attr("r", "4px")
          // .attr("r", function(d) { return d.number_killed ; })
          // .attr("r", function(d) { return radius(d.number_killed); })
          .attr("fill", "red")
          .on("mouseover", function(d){

                    tooltip.transition()
                              .duration(500)
                              .style("opacity", .85)
                    tooltip.html("<strong>Date: </strong>" + d.date + 
                                "<br><strong>City: </strong>" + d.city +
                                "<br><strong>State/Province: </strong>" + d.state +
                                "<br><strong>Country: </strong>" + d.country +
                                "<br><strong>Target: </strong>" + d.target +
                                "<br><strong>Attack Type: </strong>" + d.attack_type +
                                "<br><strong>Weapon Used: </strong>" + d.weapon_type +
                                "<br><strong>Number Killed: </strong>" + d.number_killed +
                                "<br><strong>Motive: </strong>" + d.Motive +
                                "<br><strong>Group Name: </strong>" + d.group_name +
                                "<br><strong>Summary: </strong>" + d.summary +
                                "<br><strong>Additional Notes: </strong>" + d.additional_notes)
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");
                  })
                  .on("mouseout", function(d){
                    tooltip.transition()
                              .duration(200)
                              .style("opacity", 0);
                  })
  };

var north_america_map = function(ds){
      
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([-20, 40])
      // .rotate([4.4, 0])
      .parallels([50,60])
      .scale(350)
      .translate([width / 2, height / 2]);
  
  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "graph_north_america")
      .attr("class", "map");
    // .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    var subunits = topojson.feature(ds, ds.objects.subunits);
    
    var tooltip = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0)

    console.log(subunits);
    svg.append("path")
          .datum(subunits)
          .attr("d", path);

    svg.selectAll(".subunit")
          .data(topojson.feature(ds, ds.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);   
  };

var update_north_america_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([-20, 40])
      // .rotate([4.4, 0])
      .parallels([50,60])
      .scale(350)
      .translate([width / 2, height / 2]);

  var tooltip = d3.select("body").select(".tooltip")
                  // .append("div")
                  // .attr("class", "tooltip")
                  .style("opacity", 0)

  var maxTooltip = function(arr){
    var maxTip = [];
    for(i = 0; i<arr.length; i++){
      maxTip.push(arr[i].number_killed)
    }
    var maxTipOut = Math.max(...maxTip)
    console.log(maxTipOut);
    return maxTipOut;
  };

  var radius = d3.scale.sqrt()
      // .domain([0, maxTooltip(toolTipArray)])
      .domain([0, 1500])
      .range([0, 3]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").select("#graph_north_america")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "map");
      // .attr("id", "graph_north_america");
    // .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    var subunits = topojson.feature(ds, ds.objects.subunits);

    console.log(subunits);
    svg.append("path")
          .datum(subunits)
          .attr("d", path);

    svg.selectAll(".subunit")
          .data(topojson.feature(ds, ds.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);

    svg.selectAll("circle")
          .data(latLonArray)
          .sort(function(a,b) {
            return b.properties.number_killed - a.properties.number_killed;
          })

          .enter()
          .append("circle")
          .attr("class", "bubble")

          // .attr("cy", function(d) {  console.log(projection(d)); return projection(d[0]["lon"]); })
          // .attr("cx", function(d) {  return projection(d[1]["lat"]); })
          .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
          .attr("r", "4px")
          // .attr("r", function(d) { return d.number_killed ; })
          // .attr("r", function(d) { return radius(d.number_killed); })
          .attr("fill", "red")
          .on("mouseover", function(d){

                    tooltip.transition()
                              .duration(500)
                              .style("opacity", .85)
                    tooltip.html("<strong>Date: </strong>" + d.date + 
                                "<br><strong>City: </strong>" + d.city +
                                "<br><strong>State/Province: </strong>" + d.state +
                                "<br><strong>Country: </strong>" + d.country +
                                "<br><strong>Target: </strong>" + d.target +
                                "<br><strong>Attack Type: </strong>" + d.attack_type +
                                "<br><strong>Weapon Used: </strong>" + d.weapon_type +
                                "<br><strong>Number Killed: </strong>" + d.number_killed +
                                "<br><strong>Motive: </strong>" + d.Motive +
                                "<br><strong>Group Name: </strong>" + d.group_name +
                                "<br><strong>Summary: </strong>" + d.summary +
                                "<br><strong>Additional Notes: </strong>" + d.additional_notes)
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");
                  })
                  .on("mouseout", function(d){
                    tooltip.transition()
                              .duration(200)
                              .style("opacity", 0);
                  })

  };

var central_america_map = function(ds){
      
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 15])
      .rotate([75, 0])
      .parallels([5,30])
      .scale(1150)
      .translate([width / 2, height / 2]);
  
  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "graph_central_america")
      .attr("class", "map");
    // .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    var subunits = topojson.feature(ds, ds.objects.subunits);
    
    var tooltip = d3.select("body").append("div")
                  .attr("class", "tooltip_graph")
                  .style("opacity", 0)

    console.log(subunits);
    svg.append("path")
          .datum(subunits)
          .attr("d", path);

    svg.selectAll(".subunit")
          .data(topojson.feature(ds, ds.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);
  };

var update_central_america_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 15])
      .rotate([75, 0])
      .parallels([5,30])
      .scale(1150)
      .translate([width / 2, height / 2]);

  var tooltip = d3.select("body").select(".tooltip")
                  // .append("div")
                  // .attr("class", "tooltip")
                  .style("opacity", 0)

  var maxTooltip = function(arr){
    var maxTip = [];
    for(i = 0; i<arr.length; i++){
      maxTip.push(arr[i].number_killed)
    }
    var maxTipOut = Math.max(...maxTip)
    console.log(maxTipOut);
    return maxTipOut;
  };

  var radius = d3.scale.sqrt()
      // .domain([0, maxTooltip(toolTipArray)])
      .domain([0, 1500])
      .range([0, 3]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").select("#graph_central_america")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "map");
      // .attr("id", "graph_north_america");
    // .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    var subunits = topojson.feature(ds, ds.objects.subunits);

    console.log(subunits);
    svg.append("path")
          .datum(subunits)
          .attr("d", path);

    svg.selectAll(".subunit")
          .data(topojson.feature(ds, ds.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);

    svg.selectAll("circle")
          .data(latLonArray)
          .sort(function(a,b) {
            return b.properties.number_killed - a.properties.number_killed;
          })

          .enter()
          .append("circle")
          .attr("class", "bubble")

          // .attr("cy", function(d) {  console.log(projection(d)); return projection(d[0]["lon"]); })
          // .attr("cx", function(d) {  return projection(d[1]["lat"]); })
          .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
          .attr("r", "2px")
          // .attr("r", function(d) { return d.number_killed ; })
          // .attr("r", function(d) { return radius(d.number_killed); })
          .attr("fill", "red")
          .on("mouseover", function(d){

                    tooltip.transition()
                              .duration(500)
                              .style("opacity", .85)
                    tooltip.html("<strong>Date: </strong>" + d.date + 
                                "<br><strong>City: </strong>" + d.city +
                                "<br><strong>State/Province: </strong>" + d.state +
                                "<br><strong>Country: </strong>" + d.country +
                                "<br><strong>Target: </strong>" + d.target +
                                "<br><strong>Attack Type: </strong>" + d.attack_type +
                                "<br><strong>Weapon Used: </strong>" + d.weapon_type +
                                "<br><strong>Number Killed: </strong>" + d.number_killed +
                                "<br><strong>Motive: </strong>" + d.Motive +
                                "<br><strong>Group Name: </strong>" + d.group_name +
                                "<br><strong>Summary: </strong>" + d.summary +
                                "<br><strong>Additional Notes: </strong>" + d.additional_notes)
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");
                  })
                  .on("mouseout", function(d){
                    tooltip.transition()
                              .duration(200)
                              .style("opacity", 0);
                  })
  };







var north_america_ds = [];
d3.json("north_america.json", function(error, ds) {
    if (error) return console.error(error);
    north_america_ds = ds;
  });

var australasia_ds = [];
d3.json("australasia_and_oceania_topo.json", function(error, ds) {
    if (error) return console.error(error);
    australasia_ds = ds;
  });

var central_america_ds = [];
d3.json("central_america_topo.json", function(error, ds) {
    if (error) return console.error(error);
    central_america_ds = ds;
  });





var mapDs = [];
d3.select("#regions_all")
    .on("change", function(){

      d3.selectAll(".map").remove();
      if(regionSelected === "Australasia & Oceania"){
          australasia_map(australasia_ds);
          mapDs = australasia_ds;
        } else if(regionSelected === "North America"){
          north_america_map(north_america_ds);
          mapDs = north_america_ds;
        } else if(regionSelected === "Central America & Caribbean")
          central_america_map(central_america_ds);
          mapDs = central_america_ds;
    });

// d3.select("#year-option")
//     .on("change", function(){

//       if(regionSelected === "Australasia & Oceania"){
//           update_australasia_map(australasia_ds);
//           mapDs = australasia_ds;
//         } else if(regionSelected === "North America"){
//           north_america_map(north_america_ds);
//           mapDs = north_america_ds;
//         }

//     })
  
      
    // d3.select("#regions_all")
    //     .on("change", function(){

        
    //     mapDs = ds;
          
    //     });

      
      // console.log(ds);

      // graph1(ds);

      // d3.select("#year-option")
      //      .on("change", function(d,i){

             // regionLatLon();          
             // updategraph1(ds);
      //   });





