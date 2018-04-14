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


var tooltip_object = function(){
  var toolTipArray = [];
  var selectedYear = document.getElementById("graph1-year").value;
  // var selectedRegion = document.getElementById("regions_all").value;
  for(i = 0; i < gtdJSON.length; i++){

    if(gtdJSON[i]['iyear'] === selectedYear & gtdJSON[i]['latitude'] !== "" & gtdJSON[i]['region_txt'] === "North America") {
      toolTipArray.push({
                    lon: parseFloat(gtdJSON[i]['longitude']),
                    lat: parseFloat(gtdJSON[i]['latitude']),
                    city: gtdJSON[i]['city'],
                    state: gtdJSON[i]['provstate'],
                    target: gtdJSON[i]['target1'],
                    group_name: gtdJSON[i]['gname'],
                    motive: gtdJSON[i]['motive'],
                    attack_type: gtdJSON[i]['attacktype1_txt'],
                    weapon_type: gtdJSON[i]['weaptype1_txt'],
                    number_killed: gtdJSON[i]['nkill'],
                    summary: gtdJSON[i]['summary'],
                    additional_notes: gtdJSON[i]['addnotes']
                  });
    }
  };
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
          .attr("height", height);
        // .append("svg")
        //   .attr("width", width)
        //   .attr("height", height);

        var subunits = topojson.feature(ds, ds.objects.subunits);
        
        console.log('one');

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


// var updateGraph1 = function(ds) {



// };


  d3.json("north_america.json", function(error, ds) {
    if (error) return console.error(error);
    
    console.log("two");
    
    console.log(ds);

      graph1(ds);

      // d3.select("#graph1-year")
      //      .on("change", function(d,i){

      //         tooltip_object();          
      //         updateGraph1(ds);
      //   });)


  });






















