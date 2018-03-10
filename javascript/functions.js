var countCountry = function(country){
    counter = 0;
    for(i = 0; i < gtdJSON.length; i++){

      if(gtdJSON[i].country_txt.toLowerCase() === String(country).toLowerCase()){
  
        counter++

      } 

    }
    return counter
  };

  function getDate(d){

    //19700101

    var strDate = new String(d);

    var year = strDate.substring(0,4);
    var month = strDate.substring(4,6)-1;
    var day = strDate.substring(6,8);

    return new Date(year, month, day);
  };

  Number.prototype.pad = function(size) {

    /*
      (9).pad();  //returns "09"

      (7).pad(3);  //returns "007"
     */
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  };

  

  var countYear = function(year) {

    counter = 0;
    
    for(var i = 0; i < gtdJSON.length; i++) {
      // if(i % 10000 === 0){
      //   console.log(i);
      // };

      date = getDate(gtdJSON[i]['date'])
      fullYear = date.getFullYear();
      day = date.getDate();
      month = date.getMonth();
      
      if(fullYear === year) {
        counter++
      } else { 
      continue
      }
      
    }
    return(counter) 
  };

  var countMonth = function(yyyy, mm) {
    
    counter = 0;  
    
    for(var i = 0; i < gtdJSON.length; i++) {

      // if(i % 10000 === 0){
      //   console.log(i);
      // };

      date = getDate(gtdJSON[i]['date'])
      fullYear = date.getFullYear();
      day = date.getDay();
      month = date.getMonth();

      if((fullYear === yyyy) && (month === mm - 1)) {
        counter++;
      } 
      
    }
    return(counter) 
  };  

  var attacksByYearArray = function(arr) {
    
    attacksByYear = [];

    for(var i = 1970; i < 2017; i++){
      attacksByYear.push({x: Number(i), y: countYear(i)});
    }
    // console.log("xy is: " + nKillByYear);
    return attacksByYear
    console.log(attacksByYear);
  };

  // create an object within an array that holds the year and month (which is an object containing month number and count of attacks in that month)
  var attacksYearMonthArray = function(arr){

    attacksYearMonth = [];

    for(var i = 1970; i < 2017; i++) {
      for(var j = 1; j < 13; j++){
        attacksYearMonth.push({
                             year: Number(i), 
                             month: 
                                {
                                  x: Number(j), 
                                  y: countMonth(i, j)
                                }
                            });   
      }
    };
    return attacksYearMonth
    console.log(attacksYearMonth);
  };

  var monthAttacks = function(arr){
      
      contents = [];
      
      for( var k = 1970; k < 2017; k++){
        contents.push({
          year: k,
          month: []
        })
      };

      for(var i = 0; i < attacksYearMonth.length; i++){;

        for(var j = 0; j < contents.length; j++) {
          if(contents[j].year === attacksYearMonth[i].year){
            contents[j].month.push(attacksYearMonth[i].month);
              }
            }
          };
        return contents
        console.log(contents)
  };