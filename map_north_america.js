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
                          country: gtdCSV[i]['country_txt'],
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
          .center([0, 40])
          .rotate([280, 0])
          .parallels([30,50])
          .scale(600)
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

 var removeBubble = function(){
  d3.selectAll(".bubble").remove();
}

var updategraph1 = function(ds){
     removeBubble();
      
      var width = 960,
          height = 500;

      var projection = d3.geo.albers()
          .center([-20, 40])
          .rotate([4.4, 0])
          .parallels([50,60])
          .scale(200)
          .translate([width / 2, height / 2]);

      var tooltip = d3.select("body").select(".tooltip_graph")
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
              .data(toolTipArray)
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

var mapDs = [];
  // d3.json("north_america.json", function(error, ds) {
  d3.json("central_asia_topo.json", function(error, ds) {
    if (error) return console.error(error);
    
      var mapDs = ds;
    
      // console.log(ds);

      graph1(ds);

      d3.select("#graph1year")
           .on("change", function(d,i){

             tooltip_object();          
             updategraph1(mapDs);
        });

  });








