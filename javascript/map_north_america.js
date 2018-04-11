//   var projection = d3.geo.albers()
//       .center([-10, 40])
//       // .rotate([4.4, 0])
//       .parallels([50,60])
//       .scale(350)
//       .translate([width / 2, height / 2]);

//   var width = 960,
//       height = 500;

//   var path = d3.geo.path()
//       .projection(projection);
      
  
//   var svg = d3.select("#area-2").append("svg")
//       .attr("width", width)
//       .attr("height", height);


// d3.json("north_america.json", function(error, north_america) {
//   if (error) return console.error(error);
//   console.log(north_america);

//   var subunits = topojson.feature(north_america, north_america.objects.subunits);
//   console.log(subunits);
  
      
//   svg.append("path")
//         .datum(subunits)
//         .attr("d", path);
    

//   svg.selectAll(".subunit")
//     .data(topojson.feature(north_america, north_america.objects.subunits).features)
//   .enter().append("path")
//     .attr("class", function(d) { return "subunit " + d.id; })
//     .attr("d", path);

//   // svg.append("path")
//   //       .datum(topojson.feature(north_america, north_america.objects.places))
//   //       .attr("d", path)
//   //       .attr("class", "place");

//   // svg.selectAll(".place-label")
//   //       .data(topojson.feature(north_america, north_america.objects.places).features)
//   //   .enter().append("text")
//   //       .attr("class", "place-label")
//   //       .attr("transform", function(d) {return "translate(" + projection(d.geometry.coordinates) + ")"; })
//   //       .attr("dy", ".35em")
//   //       .text(function(d) {return d.properties.name; });

//   // svg.selectAll(".place-label")
//   //   .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
//   //   .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });



// });






  d3.json("./north_america.json", function(error, north_america) {
    if (error) return console.error(error);
    console.log(north_america);

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

  var svg = d3.select("#area-2").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("svg")
      .attr("width", width)
      .attr("height", height);

    var subunits = topojson.feature(north_america, north_america.objects.subunits);
    console.log(subunits);
    svg.append("path")
          .datum(subunits)
          .attr("d", path);

    svg.selectAll(".subunit")
          .data(topojson.feature(north_america, north_america.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);

  });






















