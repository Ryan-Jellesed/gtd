 // var margin = {top: 40, right: 100, bottom: 50, left: 100},
 //      width = 960 - margin.left - margin.right,
 //      height = 500 - margin.top - margin.bottom;

var margin = {top: 40, right: 200, bottom: 100, left: 50},
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
var hideCSS = function(cName){
  d3.select(cName)
        .style("fill", "white")
        .style("stroke", "#777")
        .style("stroke-dasharray", "2,2")
        .style("stroke-linejoin", "round")
};


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

      var svg = d3.select("#area-1-2").append("svg")
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

  var svg = d3.select("#area-1-2").append("svg")
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

  var svg = d3.select("#area-1-2").append("svg")
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

var central_asia_map = function(ds){
      
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 40])
      .rotate([280, 0])
      .parallels([30,50])
      .scale(600)
      .translate([width / 2, height / 2]);
  
  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#area-1-2").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "graph_central_asia")
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
          .attr("class", function(d) { return "subunit " + d.id + " cAsia"; })
          .attr("d", path);
    hideCSS(".subunit.CHI");
    hideCSS(".subunit.CHH");
    hideCSS(".subunit.AFG");
    hideCSS(".subunit.RUA");
    hideCSS(".subunit.INA");
    hideCSS(".subunit.IRR");
    hideCSS(".subunit.IRK");
    hideCSS(".subunit.INX");
    hideCSS(".subunit.IRN");
    hideCSS(".subunit.PAK");
    hideCSS(".subunit.RUE");
    hideCSS(".subunit.SYX");
    hideCSS(".subunit.TUR");
    hideCSS(".subunit.RUC");

  };

var update_central_asia_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 40])
      .rotate([280, 0])
      .parallels([30,50])
      .scale(600)
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

  var svg = d3.select("body").select("#graph_central_asia")
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

var east_asia_map = function(ds){
      
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 35])
      .rotate([250, 0])
      .parallels([30,50])
      .scale(600)
      .translate([width / 2, height / 2]);
  
  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#area-1-2").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "graph_east_asia")
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
          .attr("class", function(d) { return "subunit " + d.id;})
          .attr("d", path);

  };

var update_east_asia_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 35])
      .rotate([250, 0])
      .parallels([30,50])
      .scale(600)
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

  var svg = d3.select("body").select("#graph_east_asia")
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
          .attr("class", function(d) { return "subunit " + d.id + " empty"; })
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

var eastern_europe_map = function(ds){
      
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 70])
      .rotate([-80, 0])
      .parallels([50,60])
      .scale(500)
      .translate([width / 2, height / 2 ]);
  
  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#area-1-2").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "graph_eastern_europe")
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
          .attr("class", function(d) { return "subunit " + d.id;})
          .attr("d", path);


  };

var update_eastern_europe_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 70])
      .rotate([-80, 0])
      .parallels([50,60])
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

  var svg = d3.select("body").select("#graph_eastern_europe")
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
          .attr("class", function(d) { return "subunit " + d.id + " empty"; })
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

var middle_east_and_north_africa_map = function(ds){
      
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 25])
      .rotate([-25, 0])
      .parallels([30,40])
      .scale(700)
      .translate([width / 2, height / 2 ]);
  
  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#area-1-2").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "graph_middle_east_and_north_africa")
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
          .attr("class", function(d) { return "subunit " + d.id;})
          .attr("d", path);

  };

var update_middle_east_and_north_africa_map = function(ds){
 removeBubble();
  
  var width = 960,
      height = 500;

  var projection = d3.geo.albers()
      .center([0, 25])
      .rotate([-25, 0])
      .parallels([30,40])
      .scale(700)
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

  var svg = d3.select("body").select("#graph_middle_east_and_north_africa")
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
          .attr("class", function(d) { return "subunit " + d.id + " empty"; })
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

var central_asia_ds = [];
d3.json("central_asia_topo.json", function(error, ds) {
    if (error) return console.error(error);
    central_asia_ds = ds;
  });

var east_asia_ds = [];
d3.json("east_asia_topo.json", function(error, ds) {
    if (error) return console.error(error);
    east_asia_ds = ds;
  });

var eastern_europe_ds = [];
d3.json("eastern_europe_topo.json", function(error, ds) {
    if (error) return console.error(error);
    eastern_europe_ds = ds;
    console.log(eastern_europe_ds);
  });

var middle_east_and_north_africa_ds = [];
d3.json("middle_east_and_north_africa_topo.json", function(error, ds) {
    if (error) return console.error(error);
    middle_east_and_north_africa_ds = ds;
    console.log(middle_east_and_north_africa_ds);
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
        } else if(regionSelected === "Central America & Caribbean") {
          central_america_map(central_america_ds);
          mapDs = central_america_ds;
        } else if(regionSelected === "Central Asia") {
          central_asia_map(central_asia_ds);
          mapDs = central_asia_ds;
        } else if(regionSelected === "East Asia") {
          east_asia_map(east_asia_ds);
          mapDs = east_asia_ds;
        } else if(regionSelected === "Eastern Europe") {
          eastern_europe_map(eastern_europe_ds);
          mapDs = eastern_europe_ds;
        } else if(regionSelected === "Middle East & North Africa") {
          middle_east_and_north_africa_map(middle_east_and_north_africa_ds);
          mapDs = middle_east_and_north_africa_ds;
        }
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


  var multiLineData = "large_data/attack_count_by_weaptype1_monthly.csv";

  var updateMultiTitle = function(){
    var val = document.getElementById("multiLineChartDataset").value;
    console.log(val);
    if( val === 'deaths'){
      document.querySelector("#title_1").textContent = 'Yearly Sum of Deaths by Weapon Type';
    } else if( val === "attacks"){
      document.querySelector("#title_1").textContent = 'Yearly Count of Terror Attacks by Weapon Type';
    }
  };

  var removeEverything = function(){
   d3.select("#area-2-1").remove('svg');
   d3.select("#area-2").append('svg')
      .attr("#area-2-1");
    update_buildchart();
  };




  var clearWeaponsLineChart = function(){
    removeEverything();
    // buildWeaponsLineChart();
    update_buildchart();
    // updateMultiTitle();
  };


// var margin = {top: 40, right: 200, bottom: 100, left: 50},
//       width = 960 - margin.left - margin.right,
//       height = 500 - margin.top - margin.bottom;




var buildchart = function(){
  var margin = {top: 20, right: 200, bottom: 100, left: 50},
    margin2 = { top: 430, right: 10, bottom: 20, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

  var maxY; // Initializing variable that will hold the maximium Y value when slider is changed

  var parseDate = d3.time.format("%Y%m%d").parse;   // parse the date from the data file
  var bisectDate = d3.bisector(function(d) { return d.date; }).left;  //  Bisect the date for the mouse slider below

  // Initialize a list of colors for the variables in the dataset
  var color = d3.scale.ordinal().range(['rgb(166,206,227)','rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)','rgb(227,26,28)','rgb(253,191,111)','rgb(255,127,0)','rgb(202,178,214)','rgb(106,61,154)','rgb(232, 232, 0)','rgb(177,89,40)']);

  var xScale = d3.time.scale() // Set the xScale for the svg
      .range([0, width]),
      xScale2 = d3.time.scale()
      .range([0, width]); // Duplicate xScale for brushing ref later

  var yScale = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom"),

      xAxis2 = d3.svg.axis() // xAxis for brush slider
      .scale(xScale2)
      .orient("bottom");    

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");  

  var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.count); })
      .defined(function(d) { return d.count; });  // Hiding line value defaults of 0 for missing data



  var svg = d3.select("#area-2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom) //height + margin.top + margin.bottom
    .append("g")
      .attr("class", "multi_line")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create the rect for mouse tracking 
  // Initialize as invisible
  svg.append("rect")
      .attr("width", width)
      .attr("height", height)                                    
      .attr("x", 0) 
      .attr("y", 0)
      .attr("id", "mouse-tracker")
      .style("fill", "white"); 

  //for slider part-----------------------------------------------------------------------------------
    
  var context = svg.append("g") // Brushing context box container
      .attr("transform", "translate(" + 0 + "," + 410 + ")")
      .attr("class", "context");

  /* append clip path for lines plotted, hiding those part out of bounds */

  svg.append("defs")
    .append("clipPath") 
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height); 

  //end slider part----------------------------------------------------------------------------------- 



  var ds = [];
  d3.csv(multiLineData, function(error, data) {
    console.log(data); 
    ds = data;
    color.domain(d3.keys(data[0]).filter(function(key) { // Set the domain of the color ordinal scale to be all the csv headers except "date", matching a color to an issue
      return key !== "date"; 
    }));

    
    // console.log(data);

    data.forEach(function(d) { // Make every date in the csv data a javascript date object format
      d.date = parseDate(d.date);

    });

    // console.log(data);

    var categories = color.domain().map(function(name) { // Nest the data into an array of objects with new keys

      return {
        name: name, // "name": the csv headers except date
        values: data.map(function(d) { // "values": which has an array of the dates and counts
          return {
            date: d.date, 
            count: +(d[name]),
            };
        }),
        // visible: (name === "explosives" ? true : false) // "visible": all false except for economy which is true.
      };
    });

    xScale.domain(d3.extent(data, function(d) { return d.date; })); // extent = highest and lowest points, domain is data, range is bounding box

    yScale.domain([0, 100]);

    xScale2.domain(xScale.domain()); // Setting a duplicate xdomain for brushing reference later
   
   //for slider part-----------------------------------------------------------------------------------

   var brush = d3.svg.brush()//for slider bar at the bottom
      .x(xScale2) 
      .on("brush", brushed);

    context.append("g") // Create brushing xAxis
        .attr("class", "x axis1")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    var contextArea = d3.svg.area() // Set attributes for area chart in brushing context graph
      .interpolate("monotone")
      .x(function(d) { return xScale2(d.date); }) // x is scaled to xScale2
      .y0(height2) // Bottom line begins at height2 (area chart not inverted) 
      .y1(0); // Top line of area, 0 (area chart not inverted)

    //plot the rect as the bar at the bottom
    context.append("path") // Path is created using svg.area details
      .attr("class", "area")
      .attr("d", contextArea(categories[0].values)) // pass first categories data .values to area path generator 
      .attr("fill", "#F1F1F2");
      
    //append the brush for the selection of subsection  
    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("height", height2) // Make brush rects same height 
        .attr("fill", "#E6E7E8");  
    //end slider part-----------------------------------------------------------------------------------

    // draw line graph
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        // .attr("id", "multiTitle")
        .call(yAxis)
      // .append("text")
      //   // .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("x", 550)
      //   .attr("dy", ".71em")
      //   .style("font-size", "30px")
      //   .style("text-anchor", "end")
      //   .style("text-decoration", "bold")
        // .text("Multi-line Chart Variable Counts");

  // svg.append("text")
  //       .attr("x", (width /2 ))
  //       .attr("y", 0 - (margin.top / 5))
  //       .attr("text-anchor", "middle")
  //       .style("font-size", "16px")
  //       .style("text-decoration", "underline")
  //       .text("Multi-line Chart Variable Counts")
  //       .attr("class", "multiTitle")



    var issue = svg.selectAll(".issue")
        .data(categories) // Select nested data and append to new svg group elements
      .enter().append("g")
        .attr("class", "issue");   

    issue.append("path")
        .attr("class", "line")
        .style("pointer-events", "none") // Stop line interferring with cursor
        .attr("id", function(d) {
          return "line-" + d.name.replace(" ", "").replace("/", ""); // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
        })
        .attr("d", function(d) { 
          return d.visible ? line(d.values) : null; // If array key "visible" = true then draw line, if not then don't 
        })
        .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
        .style("stroke", function(d) { return color(d.name); });


    var legend = 450 / categories.length; // 450/number of issues (ex. 40)    

    issue.append("rect")
        .attr("width", 10)
        .attr("height", 10)                                    
        .attr("x", width + (margin.right/3) - 15) 
        .attr("y", function (d, i) { return (legend)+i*(legend) - 8; })  // spacing
        .attr("fill",function(d) {
          return d.visible ? color(d.name) : "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey 
        })
        .attr("class", "legend-box")

        .on("click", function(d){ // On click make d.visible 
          d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true

          maxY = findMaxY(categories); // Find max Y count value categories data with "visible"; true
          yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
          svg.select(".y.axis")
            .transition()
            .call(yAxis);   

          issue.select("path")
            .transition()
            .attr("d", function(d){
              return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
            })

          issue.select("rect")
            .transition()
            .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";
          });
        })

        .on("mouseover", function(d){

          d3.select(this)
            .transition()
            .attr("fill", function(d) { return color(d.name); });

          d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
            .transition()
            .style("stroke-width", 2.5);  
        })

        .on("mouseout", function(d){

          d3.select(this)
            .transition()
            .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";});

          d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
            .transition()
            .style("stroke-width", 1.5);
        })
        
    issue.append("text")
        .attr("x", width + (margin.right/3)) 
        .attr("y", function (d, i) { return (legend)+i*(legend); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
        .text(function(d) { return d.name; }); 

    // Hover line 
    var hoverLineGroup = svg.append("g") 
              .attr("class", "hover-line");

    var hoverLine = hoverLineGroup // Create line with basic attributes
          .append("line")
              .attr("id", "hover-line")
              .attr("x1", 10).attr("x2", 10) 
              .attr("y1", 0).attr("y2", height + 10)
              .style("pointer-events", "none") // Stop line interferring with cursor
              .style("opacity", 1e-6); // Set opacity to zero 

    var hoverDate = hoverLineGroup
          .append('text')
              .attr("class", "hover-text")
              .attr("y", height - (height-40)) // hover date text position
              .attr("x", width - 150) // hover date text position
              .style("fill", "#E6E7E8");

    var columnNames = d3.keys(data[0]) //grab the key values from your first data row
                                       //these are the same as your column names
                    .slice(1); //remove the first column name (`date`);

    var focus = issue.select("g") // create group elements to house tooltip text
        .data(columnNames) // bind each column name date to each g element
      .enter().append("g") //create one <g> for each columnName
        .attr("class", "focus"); 

    focus.append("text") // http://stackoverflow.com/questions/22064083/d3-js-multi-series-chart-with-y-value-tracking
          .attr("class", "tooltip_multi_line")
          .attr("x", width + 20) // position tooltips  
          .attr("y", function (d, i) { return (legend)+i*(legend); }); // (return (11.25/2 =) 5.625) + i * (5.625) // position tooltips       

    // Add mouseover events for hover line.
    d3.select("#mouse-tracker") // select chart plot background rect #mouse-tracker
    .on("mousemove", mousemove) // on mousemove activate mousemove function defined below
    .on("mouseout", function() {
        hoverDate
            .text(null) // on mouseout remove text for hover date

        d3.select("#hover-line")
            .style("opacity", 1e-6); // On mouse out making line invisible
    });

    function mousemove() { 
        var mouse_x = d3.mouse(this)[0]; // Finding mouse x position on rect
        var graph_x = xScale.invert(mouse_x); // 
 
        //var mouse_y = d3.mouse(this)[1]; // Finding mouse y position on rect
        //var graph_y = yScale.invert(mouse_y);
        //console.log(graph_x);
        
        var format = d3.time.format('%b %Y'); // Format hover date text to show three letter month and full year
        
        hoverDate.text(format(graph_x)); // scale mouse position to xScale date and format it to show month and year
        
        d3.select("#hover-line") // select hover-line and changing attributes to mouse position
            .attr("x1", mouse_x) 
            .attr("x2", mouse_x)
            .style("opacity", 1); // Making line visible

        // Legend tooltips // http://www.d3noob.org/2014/07/my-favourite-tooltip-method-for-line.html

        var x0 = xScale.invert(d3.mouse(this)[0]), /* d3.mouse(this)[0] returns the x position on the screen of the mouse. xScale.invert function is reversing the process that we use to map the domain (date) to range (position on screen). So it takes the position on the screen and converts it into an equivalent date! */
        i = bisectDate(data, x0, 1), // use our bisectDate function that we declared earlier to find the index of our data array that is close to the mouse cursor
        /*It takes our data array and the date corresponding to the position of our mouse cursor and returns the index number of the data array which has a date that is higher than the cursor position.*/
        d0 = data[i - 1],
        d1 = data[i],
        /*d0 is the combination of date and count that is in the data array at the index to the left of the cursor and d1 is the combination of date and close that is in the data array at the index to the right of the cursor. In other words we now have two variables that know the value and date above and below the date that corresponds to the position of the cursor.*/
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        /*The final line in this segment declares a new array d that is represents the date and close combination that is closest to the cursor. It is using the magic JavaScript short hand for an if statement that is essentially saying if the distance between the mouse cursor and the date and close combination on the left is greater than the distance between the mouse cursor and the date and close combination on the right then d is an array of the date and close on the right of the cursor (d1). Otherwise d is an array of the date and close on the left of the cursor (d0).*/

        //d is now the data row for the date closest to the mouse position

        focus.select("text").text(function(columnName){
           //because you didn't explictly set any data on the <text>
           //elements, each one inherits the data from the focus <g>

           return (d[columnName]);
        });
    }; 

    //for brusher of the slider bar at the bottom
    function brushed() {

      xScale.domain(brush.empty() ? xScale2.domain() : brush.extent()); // If brush is empty then reset the Xscale domain to default, if not then make it the brush extent 

      svg.select(".x.axis") // replot xAxis with transition when brush used
            .transition()
            .call(xAxis);

      maxY = findMaxY(categories); // Find max Y count value categories data with "visible"; true
      yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
      
      svg.select(".y.axis") // Redraw yAxis
        .transition()
        .call(yAxis);   

      issue.select("path") // Redraw lines based on brush xAxis scale and domain
        .transition()
        .attr("d", function(d){
            return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
        });
      
    }; 



  }); // End Data callback function





    
  function findMaxY(data){  // Define function "findMaxY"
    var maxYValues = data.map(function(d) { 
      if (d.visible){
        return d3.max(d.values, function(value) { // Return max count value
          return value.count; })
      }
    });
    return d3.max(maxYValues);
  }
};




var buildchart = function(){
  var margin = {top: 20, right: 200, bottom: 100, left: 50},
    margin2 = { top: 430, right: 10, bottom: 20, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

  var maxY; // Initializing variable that will hold the maximium Y value when slider is changed

  var parseDate = d3.time.format("%Y%m%d").parse;   // parse the date from the data file
  var bisectDate = d3.bisector(function(d) { return d.date; }).left;  //  Bisect the date for the mouse slider below

  // Initialize a list of colors for the variables in the dataset
  var color = d3.scale.ordinal().range(['rgb(166,206,227)','rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)','rgb(227,26,28)','rgb(253,191,111)','rgb(255,127,0)','rgb(202,178,214)','rgb(106,61,154)','rgb(232, 232, 0)','rgb(177,89,40)']);

  var xScale = d3.time.scale() // Set the xScale for the svg
      .range([0, width]),
      xScale2 = d3.time.scale()
      .range([0, width]); // Duplicate xScale for brushing ref later

  var yScale = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom"),

      xAxis2 = d3.svg.axis() // xAxis for brush slider
      .scale(xScale2)
      .orient("bottom");    

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");  

  var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.count); })
      .defined(function(d) { return d.count; });  // Hiding line value defaults of 0 for missing data



  var svg = d3.select("#area-2-1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom) //height + margin.top + margin.bottom
    .append("g")
      .attr("class", "multi_line")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create the rect for mouse tracking 
  // Initialize as invisible
  svg.append("rect")
      .attr("width", width)
      .attr("height", height)                                    
      .attr("x", 0) 
      .attr("y", 0)
      .attr("id", "mouse-tracker")
      .style("fill", "white"); 

  //for slider part-----------------------------------------------------------------------------------
    
  var context = svg.append("g") // Brushing context box container
      .attr("transform", "translate(" + 0 + "," + 410 + ")")
      .attr("class", "context");

  /* append clip path for lines plotted, hiding those part out of bounds */

  svg.append("defs")
    .append("clipPath") 
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height); 

  //end slider part----------------------------------------------------------------------------------- 



  var ds = [];
  d3.csv(multiLineData, function(error, data) {
    console.log(data); 
    ds = data;
    color.domain(d3.keys(data[0]).filter(function(key) { // Set the domain of the color ordinal scale to be all the csv headers except "date", matching a color to an issue
      return key !== "date"; 
    }));

    
    // console.log(data);

    data.forEach(function(d) { // Make every date in the csv data a javascript date object format
      d.date = parseDate(d.date);

    });

    // console.log(data);

    var categories = color.domain().map(function(name) { // Nest the data into an array of objects with new keys

      return {
        name: name, // "name": the csv headers except date
        values: data.map(function(d) { // "values": which has an array of the dates and counts
          return {
            date: d.date, 
            count: +(d[name]),
            };
        }),
        // visible: (name === "explosives" ? true : false) // "visible": all false except for economy which is true.
      };
    });

    xScale.domain(d3.extent(data, function(d) { return d.date; })); // extent = highest and lowest points, domain is data, range is bounding box

    yScale.domain([0, 100]);

    xScale2.domain(xScale.domain()); // Setting a duplicate xdomain for brushing reference later
   
   //for slider part-----------------------------------------------------------------------------------

   var brush = d3.svg.brush()//for slider bar at the bottom
      .x(xScale2) 
      .on("brush", brushed);

    context.append("g") // Create brushing xAxis
        .attr("class", "x axis1")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    var contextArea = d3.svg.area() // Set attributes for area chart in brushing context graph
      .interpolate("monotone")
      .x(function(d) { return xScale2(d.date); }) // x is scaled to xScale2
      .y0(height2) // Bottom line begins at height2 (area chart not inverted) 
      .y1(0); // Top line of area, 0 (area chart not inverted)

    //plot the rect as the bar at the bottom
    context.append("path") // Path is created using svg.area details
      .attr("class", "area")
      .attr("d", contextArea(categories[0].values)) // pass first categories data .values to area path generator 
      .attr("fill", "#F1F1F2");
      
    //append the brush for the selection of subsection  
    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("height", height2) // Make brush rects same height 
        .attr("fill", "#E6E7E8");  
    //end slider part-----------------------------------------------------------------------------------

    // draw line graph
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        // .attr("id", "multiTitle")
        .call(yAxis)
      // .append("text")
      //   // .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("x", 550)
      //   .attr("dy", ".71em")
      //   .style("font-size", "30px")
      //   .style("text-anchor", "end")
      //   .style("text-decoration", "bold")
        // .text("Multi-line Chart Variable Counts");

  // svg.append("text")
  //       .attr("x", (width /2 ))
  //       .attr("y", 0 - (margin.top / 5))
  //       .attr("text-anchor", "middle")
  //       .style("font-size", "16px")
  //       .style("text-decoration", "underline")
  //       .text("Multi-line Chart Variable Counts")
  //       .attr("class", "multiTitle")



    var issue = svg.selectAll(".issue")
        .data(categories) // Select nested data and append to new svg group elements
      .enter().append("g")
        .attr("class", "issue");   

    issue.append("path")
        .attr("class", "line")
        .style("pointer-events", "none") // Stop line interferring with cursor
        .attr("id", function(d) {
          return "line-" + d.name.replace(" ", "").replace("/", ""); // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
        })
        .attr("d", function(d) { 
          return d.visible ? line(d.values) : null; // If array key "visible" = true then draw line, if not then don't 
        })
        .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
        .style("stroke", function(d) { return color(d.name); });


    var legend = 450 / categories.length; // 450/number of issues (ex. 40)    

    issue.append("rect")
        .attr("width", 10)
        .attr("height", 10)                                    
        .attr("x", width + (margin.right/3) - 15) 
        .attr("y", function (d, i) { return (legend)+i*(legend) - 8; })  // spacing
        .attr("fill",function(d) {
          return d.visible ? color(d.name) : "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey 
        })
        .attr("class", "legend-box")

        .on("click", function(d){ // On click make d.visible 
          d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true

          maxY = findMaxY(categories); // Find max Y count value categories data with "visible"; true
          yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
          svg.select(".y.axis")
            .transition()
            .call(yAxis);   

          issue.select("path")
            .transition()
            .attr("d", function(d){
              return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
            })

          issue.select("rect")
            .transition()
            .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";
          });
        })

        .on("mouseover", function(d){

          d3.select(this)
            .transition()
            .attr("fill", function(d) { return color(d.name); });

          d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
            .transition()
            .style("stroke-width", 2.5);  
        })

        .on("mouseout", function(d){

          d3.select(this)
            .transition()
            .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";});

          d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
            .transition()
            .style("stroke-width", 1.5);
        })
        
    issue.append("text")
        .attr("x", width + (margin.right/3)) 
        .attr("y", function (d, i) { return (legend)+i*(legend); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
        .text(function(d) { return d.name; }); 

    // Hover line 
    var hoverLineGroup = svg.append("g") 
              .attr("class", "hover-line");

    var hoverLine = hoverLineGroup // Create line with basic attributes
          .append("line")
              .attr("id", "hover-line")
              .attr("x1", 10).attr("x2", 10) 
              .attr("y1", 0).attr("y2", height + 10)
              .style("pointer-events", "none") // Stop line interferring with cursor
              .style("opacity", 1e-6); // Set opacity to zero 

    var hoverDate = hoverLineGroup
          .append('text')
              .attr("class", "hover-text")
              .attr("y", height - (height-40)) // hover date text position
              .attr("x", width - 150) // hover date text position
              .style("fill", "#E6E7E8");

    var columnNames = d3.keys(data[0]) //grab the key values from your first data row
                                       //these are the same as your column names
                    .slice(1); //remove the first column name (`date`);

    var focus = issue.select("g") // create group elements to house tooltip text
        .data(columnNames) // bind each column name date to each g element
      .enter().append("g") //create one <g> for each columnName
        .attr("class", "focus"); 

    focus.append("text") // http://stackoverflow.com/questions/22064083/d3-js-multi-series-chart-with-y-value-tracking
          .attr("class", "tooltip_multi_line")
          .attr("x", width + 20) // position tooltips  
          .attr("y", function (d, i) { return (legend)+i*(legend); }); // (return (11.25/2 =) 5.625) + i * (5.625) // position tooltips       

    // Add mouseover events for hover line.
    d3.select("#mouse-tracker") // select chart plot background rect #mouse-tracker
    .on("mousemove", mousemove) // on mousemove activate mousemove function defined below
    .on("mouseout", function() {
        hoverDate
            .text(null) // on mouseout remove text for hover date

        d3.select("#hover-line")
            .style("opacity", 1e-6); // On mouse out making line invisible
    });

    function mousemove() { 
        var mouse_x = d3.mouse(this)[0]; // Finding mouse x position on rect
        var graph_x = xScale.invert(mouse_x); // 
 
        //var mouse_y = d3.mouse(this)[1]; // Finding mouse y position on rect
        //var graph_y = yScale.invert(mouse_y);
        //console.log(graph_x);
        
        var format = d3.time.format('%b %Y'); // Format hover date text to show three letter month and full year
        
        hoverDate.text(format(graph_x)); // scale mouse position to xScale date and format it to show month and year
        
        d3.select("#hover-line") // select hover-line and changing attributes to mouse position
            .attr("x1", mouse_x) 
            .attr("x2", mouse_x)
            .style("opacity", 1); // Making line visible

        // Legend tooltips // http://www.d3noob.org/2014/07/my-favourite-tooltip-method-for-line.html

        var x0 = xScale.invert(d3.mouse(this)[0]), /* d3.mouse(this)[0] returns the x position on the screen of the mouse. xScale.invert function is reversing the process that we use to map the domain (date) to range (position on screen). So it takes the position on the screen and converts it into an equivalent date! */
        i = bisectDate(data, x0, 1), // use our bisectDate function that we declared earlier to find the index of our data array that is close to the mouse cursor
        /*It takes our data array and the date corresponding to the position of our mouse cursor and returns the index number of the data array which has a date that is higher than the cursor position.*/
        d0 = data[i - 1],
        d1 = data[i],
        /*d0 is the combination of date and count that is in the data array at the index to the left of the cursor and d1 is the combination of date and close that is in the data array at the index to the right of the cursor. In other words we now have two variables that know the value and date above and below the date that corresponds to the position of the cursor.*/
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        /*The final line in this segment declares a new array d that is represents the date and close combination that is closest to the cursor. It is using the magic JavaScript short hand for an if statement that is essentially saying if the distance between the mouse cursor and the date and close combination on the left is greater than the distance between the mouse cursor and the date and close combination on the right then d is an array of the date and close on the right of the cursor (d1). Otherwise d is an array of the date and close on the left of the cursor (d0).*/

        //d is now the data row for the date closest to the mouse position

        focus.select("text").text(function(columnName){
           //because you didn't explictly set any data on the <text>
           //elements, each one inherits the data from the focus <g>

           return (d[columnName]);
        });
    }; 

    //for brusher of the slider bar at the bottom
    function brushed() {

      xScale.domain(brush.empty() ? xScale2.domain() : brush.extent()); // If brush is empty then reset the Xscale domain to default, if not then make it the brush extent 

      svg.select(".x.axis") // replot xAxis with transition when brush used
            .transition()
            .call(xAxis);

      maxY = findMaxY(categories); // Find max Y count value categories data with "visible"; true
      yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
      
      svg.select(".y.axis") // Redraw yAxis
        .transition()
        .call(yAxis);   

      issue.select("path") // Redraw lines based on brush xAxis scale and domain
        .transition()
        .attr("d", function(d){
            return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
        });
      
    }; 



  }); // End Data callback function





    
  function findMaxY(data){  // Define function "findMaxY"
    var maxYValues = data.map(function(d) { 
      if (d.visible){
        return d3.max(d.values, function(value) { // Return max count value
          return value.count; })
      }
    });
    return d3.max(maxYValues);
  }
};

var update_buildchart = function(){
  var margin = {top: 20, right: 200, bottom: 100, left: 50},
    margin2 = { top: 430, right: 10, bottom: 20, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

  var maxY; // Initializing variable that will hold the maximium Y value when slider is changed

  var parseDate = d3.time.format("%Y%m%d").parse;   // parse the date from the data file
  var bisectDate = d3.bisector(function(d) { return d.date; }).left;  //  Bisect the date for the mouse slider below

  // Initialize a list of colors for the variables in the dataset
  var color = d3.scale.ordinal().range(['rgb(166,206,227)','rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)','rgb(227,26,28)','rgb(253,191,111)','rgb(255,127,0)','rgb(202,178,214)','rgb(106,61,154)','rgb(232, 232, 0)','rgb(177,89,40)']);

  var xScale = d3.time.scale() // Set the xScale for the svg
      .range([0, width]),
      xScale2 = d3.time.scale()
      .range([0, width]); // Duplicate xScale for brushing ref later

  var yScale = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom"),

      xAxis2 = d3.svg.axis() // xAxis for brush slider
      .scale(xScale2)
      .orient("bottom");    

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");  

  var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.count); })
      .defined(function(d) { return d.count; });  // Hiding line value defaults of 0 for missing data








  var svg = d3.select("body").select("#area-2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom) //height + margin.top + margin.bottom
    // .append("g")
      .attr("class", "multi_line")
      .attr("id", "area-2-1")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create the rect for mouse tracking 
  // Initialize as invisible
  svg.append("rect")
      .attr("width", width)
      .attr("height", height)                                    
      .attr("x", 0) 
      .attr("y", 0)
      .attr("id", "mouse-tracker")
      .style("fill", "white"); 

  //for slider part-----------------------------------------------------------------------------------
    
  var context = svg.append("g") // Brushing context box container
      .attr("transform", "translate(" + 0 + "," + 410 + ")")
      .attr("class", "context");

  /* append clip path for lines plotted, hiding those part out of bounds */

  svg.append("defs")
    .append("clipPath") 
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height); 

  //end slider part----------------------------------------------------------------------------------- 



  var ds = [];
  d3.csv(multiLineData, function(error, data) {
    console.log(data); 
    ds = data;
    color.domain(d3.keys(data[0]).filter(function(key) { // Set the domain of the color ordinal scale to be all the csv headers except "date", matching a color to an issue
      return key !== "date"; 
    }));

    
    // console.log(data);

    data.forEach(function(d) { // Make every date in the csv data a javascript date object format
      d.date = parseDate(d.date);

    });

    // console.log(data);

    var categories = color.domain().map(function(name) { // Nest the data into an array of objects with new keys

      return {
        name: name, // "name": the csv headers except date
        values: data.map(function(d) { // "values": which has an array of the dates and counts
          return {
            date: d.date, 
            count: +(d[name]),
            };
        }),
        // visible: (name === "explosives" ? true : false) // "visible": all false except for economy which is true.
      };
    });

    xScale.domain(d3.extent(data, function(d) { return d.date; })); // extent = highest and lowest points, domain is data, range is bounding box

    yScale.domain([0, 100]);

    xScale2.domain(xScale.domain()); // Setting a duplicate xdomain for brushing reference later
   
   //for slider part-----------------------------------------------------------------------------------

   var brush = d3.svg.brush()//for slider bar at the bottom
      .x(xScale2) 
      .on("brush", brushed);

    context.append("g") // Create brushing xAxis
        .attr("class", "x axis1")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    var contextArea = d3.svg.area() // Set attributes for area chart in brushing context graph
      .interpolate("monotone")
      .x(function(d) { return xScale2(d.date); }) // x is scaled to xScale2
      .y0(height2) // Bottom line begins at height2 (area chart not inverted) 
      .y1(0); // Top line of area, 0 (area chart not inverted)

    //plot the rect as the bar at the bottom
    context.append("path") // Path is created using svg.area details
      .attr("class", "area")
      .attr("d", contextArea(categories[0].values)) // pass first categories data .values to area path generator 
      .attr("fill", "#F1F1F2");
      
    //append the brush for the selection of subsection  
    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("height", height2) // Make brush rects same height 
        .attr("fill", "#E6E7E8");  
    //end slider part-----------------------------------------------------------------------------------

    // draw line graph
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        // .attr("id", "multiTitle")
        .call(yAxis)
      // .append("text")
      //   // .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("x", 550)
      //   .attr("dy", ".71em")
      //   .style("font-size", "30px")
      //   .style("text-anchor", "end")
      //   .style("text-decoration", "bold")
        // .text("Multi-line Chart Variable Counts");

  // svg.append("text")
  //       .attr("x", (width /2 ))
  //       .attr("y", 0 - (margin.top / 5))
  //       .attr("text-anchor", "middle")
  //       .style("font-size", "16px")
  //       .style("text-decoration", "underline")
  //       .text("Multi-line Chart Variable Counts")
  //       .attr("class", "multiTitle")



    var issue = svg.selectAll(".issue")
        .data(categories) // Select nested data and append to new svg group elements
      .enter().append("g")
        .attr("class", "issue");   

    issue.append("path")
        .attr("class", "line")
        .style("pointer-events", "none") // Stop line interferring with cursor
        .attr("id", function(d) {
          return "line-" + d.name.replace(" ", "").replace("/", ""); // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
        })
        .attr("d", function(d) { 
          return d.visible ? line(d.values) : null; // If array key "visible" = true then draw line, if not then don't 
        })
        .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
        .style("stroke", function(d) { return color(d.name); });


    var legend = 450 / categories.length; // 450/number of issues (ex. 40)    

    issue.append("rect")
        .attr("width", 10)
        .attr("height", 10)                                    
        .attr("x", width + (margin.right/3) - 15) 
        .attr("y", function (d, i) { return (legend)+i*(legend) - 8; })  // spacing
        .attr("fill",function(d) {
          return d.visible ? color(d.name) : "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey 
        })
        .attr("class", "legend-box")

        .on("click", function(d){ // On click make d.visible 
          d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true

          maxY = findMaxY(categories); // Find max Y count value categories data with "visible"; true
          yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
          svg.select(".y.axis")
            .transition()
            .call(yAxis);   

          issue.select("path")
            .transition()
            .attr("d", function(d){
              return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
            })

          issue.select("rect")
            .transition()
            .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";
          });
        })

        .on("mouseover", function(d){

          d3.select(this)
            .transition()
            .attr("fill", function(d) { return color(d.name); });

          d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
            .transition()
            .style("stroke-width", 2.5);  
        })

        .on("mouseout", function(d){

          d3.select(this)
            .transition()
            .attr("fill", function(d) {
            return d.visible ? color(d.name) : "#F1F1F2";});

          d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
            .transition()
            .style("stroke-width", 1.5);
        })
        
    issue.append("text")
        .attr("x", width + (margin.right/3)) 
        .attr("y", function (d, i) { return (legend)+i*(legend); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
        .text(function(d) { return d.name; }); 

    // Hover line 
    var hoverLineGroup = svg.append("g") 
              .attr("class", "hover-line");

    var hoverLine = hoverLineGroup // Create line with basic attributes
          .append("line")
              .attr("id", "hover-line")
              .attr("x1", 10).attr("x2", 10) 
              .attr("y1", 0).attr("y2", height + 10)
              .style("pointer-events", "none") // Stop line interferring with cursor
              .style("opacity", 1e-6); // Set opacity to zero 

    var hoverDate = hoverLineGroup
          .append('text')
              .attr("class", "hover-text")
              .attr("y", height - (height-40)) // hover date text position
              .attr("x", width - 150) // hover date text position
              .style("fill", "#E6E7E8");

    var columnNames = d3.keys(data[0]) //grab the key values from your first data row
                                       //these are the same as your column names
                    .slice(1); //remove the first column name (`date`);

    var focus = issue.select("g") // create group elements to house tooltip text
        .data(columnNames) // bind each column name date to each g element
      .enter().append("g") //create one <g> for each columnName
        .attr("class", "focus"); 

    focus.append("text") // http://stackoverflow.com/questions/22064083/d3-js-multi-series-chart-with-y-value-tracking
          .attr("class", "tooltip_multi_line")
          .attr("x", width + 20) // position tooltips  
          .attr("y", function (d, i) { return (legend)+i*(legend); }); // (return (11.25/2 =) 5.625) + i * (5.625) // position tooltips       

    // Add mouseover events for hover line.
    d3.select("#mouse-tracker") // select chart plot background rect #mouse-tracker
    .on("mousemove", mousemove) // on mousemove activate mousemove function defined below
    .on("mouseout", function() {
        hoverDate
            .text(null) // on mouseout remove text for hover date

        d3.select("#hover-line")
            .style("opacity", 1e-6); // On mouse out making line invisible
    });

    function mousemove() { 
        var mouse_x = d3.mouse(this)[0]; // Finding mouse x position on rect
        var graph_x = xScale.invert(mouse_x); // 
 
        //var mouse_y = d3.mouse(this)[1]; // Finding mouse y position on rect
        //var graph_y = yScale.invert(mouse_y);
        //console.log(graph_x);
        
        var format = d3.time.format('%b %Y'); // Format hover date text to show three letter month and full year
        
        hoverDate.text(format(graph_x)); // scale mouse position to xScale date and format it to show month and year
        
        d3.select("#hover-line") // select hover-line and changing attributes to mouse position
            .attr("x1", mouse_x) 
            .attr("x2", mouse_x)
            .style("opacity", 1); // Making line visible

        // Legend tooltips // http://www.d3noob.org/2014/07/my-favourite-tooltip-method-for-line.html

        var x0 = xScale.invert(d3.mouse(this)[0]), /* d3.mouse(this)[0] returns the x position on the screen of the mouse. xScale.invert function is reversing the process that we use to map the domain (date) to range (position on screen). So it takes the position on the screen and converts it into an equivalent date! */
        i = bisectDate(data, x0, 1), // use our bisectDate function that we declared earlier to find the index of our data array that is close to the mouse cursor
        /*It takes our data array and the date corresponding to the position of our mouse cursor and returns the index number of the data array which has a date that is higher than the cursor position.*/
        d0 = data[i - 1],
        d1 = data[i],
        /*d0 is the combination of date and count that is in the data array at the index to the left of the cursor and d1 is the combination of date and close that is in the data array at the index to the right of the cursor. In other words we now have two variables that know the value and date above and below the date that corresponds to the position of the cursor.*/
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        /*The final line in this segment declares a new array d that is represents the date and close combination that is closest to the cursor. It is using the magic JavaScript short hand for an if statement that is essentially saying if the distance between the mouse cursor and the date and close combination on the left is greater than the distance between the mouse cursor and the date and close combination on the right then d is an array of the date and close on the right of the cursor (d1). Otherwise d is an array of the date and close on the left of the cursor (d0).*/

        //d is now the data row for the date closest to the mouse position

        focus.select("text").text(function(columnName){
           //because you didn't explictly set any data on the <text>
           //elements, each one inherits the data from the focus <g>

           return (d[columnName]);
        });
    }; 

    //for brusher of the slider bar at the bottom
    function brushed() {

      xScale.domain(brush.empty() ? xScale2.domain() : brush.extent()); // If brush is empty then reset the Xscale domain to default, if not then make it the brush extent 

      svg.select(".x.axis") // replot xAxis with transition when brush used
            .transition()
            .call(xAxis);

      maxY = findMaxY(categories); // Find max Y count value categories data with "visible"; true
      yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
      
      svg.select(".y.axis") // Redraw yAxis
        .transition()
        .call(yAxis);   

      issue.select("path") // Redraw lines based on brush xAxis scale and domain
        .transition()
        .attr("d", function(d){
            return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
        });
      
    }; 



  }); // End Data callback function





    
  function findMaxY(data){  // Define function "findMaxY"
    var maxYValues = data.map(function(d) { 
      if (d.visible){
        return d3.max(d.values, function(value) { // Return max count value
          return value.count; })
      }
    });
    return d3.max(maxYValues);
  }
};


