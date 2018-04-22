  /*
    Load the whole gtd dataset in JSON format
   */
  // var gtdJSON = [];
  var gtdCSV = [];
  // d3.json("large_data/gtd.json", function(error, data){
  d3.csv("large_data/gtdMini.csv", function(error, data) {
    // console.log(data);
    if(error){
      console.log(error);
    } else {
      // console.log("************************************************");
      // console.log("Loaded the GTD full Dataset!!!");
      // // console.log(data.contents);
      // gtdJSON = data.contents;
      // console.log("************************************************\n\n\n\n");
    
      console.log("*******    gtdJSON = GTD full dataset      *******");
      // data.contents.forEach(function(contents){
      data.forEach(function(contents) {
        gtdCSV.push(contents);
      });
      console.log(gtdCSV);
      console.log("**************************************************\n\n\n\n");

    }

  });

var toolTipArray = [];
var tooltip_object = function(){
  // var toolTipArray = [];
  var selectedYear = document.getElementById("graph1year").value;
  console.log(selectedYear);
  toolTipArray = [];
  for(i = 0; i < gtdCSV.length; i++){

    if(gtdCSV[i]['iyear'] === selectedYear & gtdCSV[i]['latitude'] !== "" & gtdCSV[i]['region_txt'] === "North America") {

      toolTipArray.push({
                          lon: parseFloat(gtdCSV[i]['longitude']),
                          lat: parseFloat(gtdCSV[i]['latitude']),
                          date: String(gtdCSV[i]['imonth']) + "/" + String(gtdCSV[i]['iday']) + "/" + String(gtdCSV[i]['iyear']),
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

  
  }
    console.log(toolTipArray);
    return toolTipArray;
};







var graph1 = function(ds){
      
      
      

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
          .attr("id", "graph_north_america");
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

      

};



var updategraph1 = function(ds){
      
      
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
          .attr("id", "graph_north_america");
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

        // var locations = d3.select(".locations").selectAll('circle')
        //                     .data(toolTipArray);

        // locations.enter().append("svg:circle")
        // .attr("cy", function(d) { return projection(d.toolTipArray)[0]["lat"];})
        // .attr("cx", function(d) { return projection(d.toolTipArray)[0]["lon"];})
        // // .attr("id", function(d) { return d.label})
        // .attr("r", 4.5)
        // // .attr('d', path)
        // .on('mousemove', function(d) {
        //   tooltip[0][0].style.display = "block"
        //   var mouse = d3.mouse(locations.enter().append("svg:circle").node()).map(function(d) {
        //     return parseInt(d);
        //   });
        //   tooltip.classed('hidden', false)
        //   .attr('style', 'left:' + (mouse[0] + 15) +
        //     'px; top:' + (mouse[1]) + 'px');
        //   // .html(d.label);
        // })
        // .on('mouseout', function() {
        //   tooltip[0][0].style.display = "none"
        //   tooltip.classed('hidden', true);
        // });
        

        svg.selectAll("circle")
              .data(toolTipArray)
              .enter()
              .append("circle")
              // .attr("cy", function(d) {  console.log(projection(d)); return projection(d[0]["lon"]); })
              // .attr("cx", function(d) {  return projection(d[1]["lat"]); })
              .attr("transform", function(d) { return "translate(" + projection([d.lon,d.lat]) + ")"; })
              .attr("r", "2px")
              .attr("fill", "red")
              // .on("mouseover", )

};






  d3.json("north_america.json", function(error, ds) {
    if (error) return console.error(error);
    
      var ds = ds;
    
      // console.log(ds);

      graph1(ds);

      d3.select("#graph1year")
           .on("change", function(d,i){

             tooltip_object();          
             updategraph1(ds);
        });


  });











 //      var dots = svg.selectAll("circle")
 //                      .data(ds)
 //                      .enter()
 //                      .append("circle")
 //                      .attr({
 //                        cx: function(d) { return xScale(getDate(d.date)); },
 //                        cy: function(d) { return yScale(d.count); },
 //                        r: 3,
 //                        "fill": "#666666",
 //                        class: "circle-svg"
 //                      })
 //                      .on("mouseover", function(d){

 //                        tooltip.transition()
 //                                  .duration(500)
 //                                  .style("opacity", .85)
 //                        tooltip.html("<strong>Attack Count: " + d.count)
 //                                  .style("left", (d3.event.pageX) + "px")
 //                                  .style("top", (d3.event.pageY - 28) + "px");
 //                      })
 //                      .on("mouseout", function(d){
 //                        tooltip.transition()
 //                                  .duration(300)
 //                                  .style("opacity", 0);
 //                      })

 // var dots = svg.selectAll(".circle-svg")
 //                      .data(ds)
 //                      .transition()
 //                      .duration(1000)
 //                      .ease("linear")
 //                      .attr({
 //                        cx: function(d) { return xScale(getDate(d.date)); },
 //                        cy: function(d) { return yScale(d.count); },
 //                      });             








