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
      // // console.log(data.contents);
      // gtdJSON = data.contents;
      // console.log("************************************************\n\n\n\n");
    
      console.log("*******    gtdJSON = GTD full dataset      *******");
      data.contents.forEach(function(contents){
        gtdJSON.push(contents);
      });
      console.log(gtdJSON);
      console.log("**************************************************\n\n\n\n");

      
    }

  });

var toolTipArray = [];
var tooltip_object = function(){
  var toolTipArray = [];
  var selectedYear = document.getElementById("graph1year").value;
  console.log(selectedYear);

    for(i = 0; i < gtdJSON.length; i++){

      if(gtdJSON[i]['iyear'] === selectedYear & gtdJSON[i]['latitude'] !== "" & gtdJSON[i]['region_txt'] === "North America") {

        toolTipArray.push({
                      lon: parseFloat(gtdJSON[i]['longitude']),
                      lat: parseFloat(gtdJSON[i]['latitude']),
                      date: String(gtdJSON[i]['imonth']) + "/" + String(gtdJSON[i]['iday']) + "/" + String(gtdJSON[i]['iyear']),
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

        

};






  d3.json("north_america.json", function(error, ds) {
    if (error) return console.error(error);
    

    
      // console.log(ds);

      graph1(ds);

      d3.select("#graph1year")
           .on("change", function(d,i){

             tooltip_object();          

        });


  });






















