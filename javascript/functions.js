var countCountry = function(country){
  counter = 0;
  for(i = 0; i < gtdJSON.length; i++){

    if(gtdJSON[i].country_txt.toLowerCase() === String(country).toLowerCase()){

      counter++

    } 
  }
  return counter
};

var countDecade = function(ds){

  var decadeCount = { contents: [
      {
        decade: 1970,
        count: 0
      },
      {
        decade: 1980,
        count: 0
      },
      {
        decade: 1990,
        count: 0
      },
      {
        decade: 2000,
        count: 0
      },
      {
        decade: 2010,
        count: 0
      }]
  };

  for(i = 0; i < gtdJSON.length; i++){

    for(j = 0; j < decadeCount.contents.length; j++){

      if(gtdJSON[i].iyear.slice(0,3) === decadeCount.contents[j].decade.toString().slice(0,3)) {
        decadeCount.contents[j].count++;
      }

    }
    
  }
  return decadeCount;
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


/* 
    Creates the JSON object for the attacks per month by year
    Doesn't take any params - just run
    Relies on the countMonth(); function to populate the array
    This is now stored on github. MM_YY_Attacks.json
  */
var createMonthJSON = function(ds){

  ds3 = {"contents": [
        {
          "year": 1970,
          "monthlyCount": []
        },
        {
          "year": 1971,
          "monthlyCount": []
        },
        {
          "year": 1972,
          "monthlyCount": []
        },
        {
          "year": 1973,
          "monthlyCount": []
        },
        {
          "year": 1974,
          "monthlyCount": []
        },
        {
          "year": 1975,
          "monthlyCount": []
        },
        {
          "year": 1976,
          "monthlyCount": []
        },
        {
          "year": 1977,
          "monthlyCount": []
        },
        {
          "year": 1978,
          "monthlyCount": []
        },
        {
          "year": 1979,
          "monthlyCount": []
        },
        {
          "year": 1980,
          "monthlyCount": []
        },
        {
          "year": 1981,
          "monthlyCount": []
        },
        {
          "year": 1982,
          "monthlyCount": []
        },
        {
          "year": 1983,
          "monthlyCount": []
        },
        {
          "year": 1984,
          "monthlyCount": []
        },
        {
          "year": 1985,
          "monthlyCount": []
        },
        {
          "year": 1986,
          "monthlyCount": []
        },
        {
          "year": 1987,
          "monthlyCount": []
        },
        {
          "year": 1988,
          "monthlyCount": []
        },
        {
          "year": 1989,
          "monthlyCount": []
        },
        {
          "year": 1990,
          "monthlyCount": []
        },
        {
          "year": 1991,
          "monthlyCount": []
        },
        {
          "year": 1992,
          "monthlyCount": []
        },
        {
          "year": 1993,
          "monthlyCount": []
        },
        {
          "year": 1994,
          "monthlyCount": []
        },
        {
          "year": 1995,
          "monthlyCount": []
        },
        {
          "year": 1996,
          "monthlyCount": []
        },
        {
          "year": 1997,
          "monthlyCount": []
        },
        {
          "year": 1998,
          "monthlyCount": []
        },
        {
          "year": 1999,
          "monthlyCount": []
        },
        {
          "year": 2000,
          "monthlyCount": []
        },
        {
          "year": 2001,
          "monthlyCount": []
        },
        {
          "year": 2002,
          "monthlyCount": []
        },
        {
          "year": 2003,
          "monthlyCount": []
        },
        {
          "year": 2004,
          "monthlyCount": []
        },
        {
          "year": 2005,
          "monthlyCount": []
        },
        {
          "year": 2006,
          "monthlyCount": []
        },
        {
          "year": 2007,
          "monthlyCount": []
        },
        {
          "year": 2008,
          "monthlyCount": []
        },
        {
          "year": 2009,
          "monthlyCount": []
        },
        {
          "year": 2010,
          "monthlyCount": []
        },
        {
          "year": 2011,
          "monthlyCount": []
        },
        {
          "year": 2012,
          "monthlyCount": []
        },
        {
          "year": 2013,
          "monthlyCount": []
        },
        {
          "year": 2014,
          "monthlyCount": []
        },
        {
          "year": 2015,
          "monthlyCount": []
        },
        {
          "year": 2016,
          "monthlyCount": []
        },
      ]};

  for(var i = 0; i < ds3.contents.length; i++){

  // date = getDate(ds[i]['date'])
  // fullYear = date.getFullYear();
  // day = date.getDate();
  // month = date.getMonth();
    
    for(var y = 1970; y < 2017; y++){

      if(ds3.contents[i]['year'] === y){
        
        for(var m = 1; m < 13; m++){
          ds3.contents[i].monthlyCount.push({
            date: Number(String(y) + (m).pad() + (1).pad()),
            count: countMonth(y,m)
          })
        }
      }
    }
  }
  return ds3
};


// function showHeader(){
//   d3.select("body").append("h1")
//     .text("Number of Attacks per year" + "\n" + "1970 - 2016");
// };















