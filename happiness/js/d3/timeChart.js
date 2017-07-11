/**
 * Created by InKwon on 2017-05-30.
 */
//this is a js file for time graph
//which shows the highs and lows for each variable in a single location
//start with a self-running function that draws 7 svg ( for each variable ) and 7 lines on each svg.
//the 7 charts will be redrawn each time the user hovers on a different country or a year
var timeChart = (function timeChart(){
    //svgW changed due to added padding to timeChartSVG (20)
    var _svgW = 385, _svgH = 55;
    var _data, _currentCountry;
    var _var1Array = [], _var2Array = [], _var2_oriArray = [], _var3Array = [], _var4Array = [], _var5Array = [], _var6Array = [], _var7Array = [];
    var max1, max2, max3, max4, max5, max6, max7, min1, min2, min3, min4, min5, min6, min7;

    function _countryChange(countryCode){
        _currentCountry = countryCode;
        _maxMin(_data);
        _drawTimeChart();
    };

    function _getData(data){
        _data = data;
    }
//to find out max and min for each variable and populate currentcountryData array
    function _maxMin(_data) {
        for (i = 0; i < _data.length; i++) {
            //the yScale is based on max and min for each country
            if(_data[i]["Country Code"] == _currentCountry){
            _var1Array.push(Number(_data[i][categories[0]]));
            _var2Array.push(Number(_data[i][categories[1]]));
            _var2_oriArray.push(Math.exp(Number(_data[i][categories[1]])));
            _var3Array.push(Number(_data[i][categories[2]]));
            _var4Array.push(Number(_data[i][categories[3]]));
            _var5Array.push(Number(_data[i][categories[4]]));
            _var6Array.push(Number(_data[i][categories[5]]));
            _var7Array.push(Number(_data[i][categories[6]]));
            }
        }
        max1 = d3.max(_var1Array);
        max2 = d3.max(_var2_oriArray);
        // max2 = d3.max(_var2Array);
        max3 = d3.max(_var3Array);
        max4 = d3.max(_var4Array);
        max5 = d3.max(_var5Array);
        max6 = d3.max(_var6Array);
        max7 = d3.max(_var7Array);

        min1 = d3.min(_var1Array);
        min2 = d3.min(_var2_oriArray);
        // min2 = d3.min(_var2Array);
        min3 = d3.min(_var3Array);
        min4 = d3.min(_var4Array);
        min5 = d3.min(_var5Array);
        min6 = d3.min(_var6Array);
        min7 = d3.min(_var7Array);

        _drawTimeChart();

    }

    function _drawTimeChart() {
        // console.log(max1, max2, max3, max4, max5, max6, max7, min1, min2, min3, min4, min5, min6, min7)
        var totalYear = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
        var _currentYears = [];
        if (_currentCountry == undefined) {
            _currentCountryData = [];
        }

        //each variable is represented by categories[i];
        //create array for each variable ---> an array contains every value for a single variable for entire years
        else {
        var _currentCountryData = [];
        var j = 2005;

        for(i=0;i<_data.length;i++){
            if(_data[i]["Country Code"] == _currentCountry){
                //if the year == 2005, just run below code
                //it it is not 2005, insert 0 for every property
                //istd of for loop, use var j for 2005 and increment it at the end of the outer for loop
                if(_data[i]["year"] == j) {
                        _currentYears.push = _data[i]["year"];
                        _currentCountryData.push({
                            var1: (_data[i][categories[0]]),
                            var2: (_data[i][categories[1]]),
                            var2_ori:d3.round(Math.exp(Number(_data[i][categories[1]]))),
                            var3: (_data[i][categories[2]]),
                            var4: (_data[i][categories[3]]),
                            var5: (_data[i][categories[4]]),
                            var6: (_data[i][categories[5]]),
                            var7: (_data[i][categories[6]]),
                            year: _data[i]["year"]
                        })
                    }
                    else{
                        _currentCountryData.push({
                            var1: null,
                            var2: null,
                            var2_ori: null,
                            var3: null,
                            var4: null,
                            var5: null,
                            var6: null,
                            var7: null,
                            year: j
                        })
                    i = i - 1;
                    }
                j = j + 1;
            }

        }
            var xScale = d3.time.scale()
                .domain([new Date(2005, 1, 1), new Date(2015, 12, 31)])
                .range([0, _svgW]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom');

            var xAxisNoTick = d3.svg.axis()
                .scale(xScale)
                .ticks(0)
                .orient('bottom')

       // the domain of yScale determined by max and min out of entire values -- scale stays the same while country changes
        //but still need diff scale for each variable

        var yScale1 = d3.scale.linear()
            .domain([min1, max1])
            .range([_svgH , 0]);

         var yAxis1 = d3.svg.axis()
                     .scale(yScale1)
                     .orient("left")
             .ticks(5);

        var yScale2 = d3.scale.linear()
            .domain([min2, max2])
            .range([_svgH , 0]);

        // var yScale2GDP = d3.scale.ordinal()
        //     .domain(["7", "54", "403", "2980", "22026"])
        //     .rangePoints([_svgH , 0]);

        var yAxis2 = d3.svg.axis()
                .scale(yScale2)
                .orient("left")
                .ticks(5)
                .tickFormat(function(d){
                    return d/1000 + "K";
                });

                // .tickValues([7, 54, 403, 2980, 22026]);
                // .tickValues(["a", "aa", "aaa", "aaaa", "aaaaa"]);
                // .tickValues([0, 1,2,3,4]);

        var yScale3 = d3.scale.linear()
            .domain([min3, max3])
            .range([_svgH , 0]);

         var yAxis3 = d3.svg.axis()
                .scale(yScale3)
                .orient("left")
             .ticks(5);

        var yScale4 = d3.scale.linear()
            .domain([min4, max4])
            .range([_svgH , 0]);

        var yAxis4 = d3.svg.axis()
                .scale(yScale4)
                .orient("left")
                .ticks(5);

        var yScale5 = d3.scale.linear()
            .domain([min5, max5])
            .range([_svgH , 0]);

        var yAxis5 = d3.svg.axis()
                .scale(yScale5)
                .orient("left")
                .ticks(5);

        var yScale6 = d3.scale.linear()
            .domain([min6, max6])
            .range([_svgH , 0]);

         var yAxis6 = d3.svg.axis()
                .scale(yScale6)
                .orient("left")
             .ticks(5);

        var yScale7 = d3.scale.linear()
            .domain([min7, max7])
            .range([_svgH , 0]);

        var yAxis7 = d3.svg.axis()
                .scale(yScale7)
                .orient("left")
                .ticks(5);


        var line1 = d3.svg.line()
            .x(function(d, i) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);

            })
            .y(function(d, i) {
                //지금 있는 건 전체 year, 지금 나라의 valid year, 하나씩 valid year 속에서 증가.

                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var1"];

                if(value != null) {return yScale1(value);
                } else if(value == null) {return _svgH;}
            });

        var line2 = d3.svg.line()
            .x(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y(function(d) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var2_ori"];
                // var value = d["var2"];

                if(value != null) {return yScale2(value);
                } else if(value == null) {return _svgH;}
            });
        var line3 = d3.svg.line()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y(function(d) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var3"];

                if(value != null) {return yScale3(value);
                } else if(value == null) {return _svgH;}
            });
        var line4 = d3.svg.line()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y(function(d) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var4"];

                if(value != null) {return yScale4(value);
                } else if(value == null) {return _svgH;}
            });
        var line5 = d3.svg.line()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y(function(d) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var5"];

                if(value != null) {return yScale5(value);
                } else if(value == null) {return _svgH;}
            });
        var line6 = d3.svg.line()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y(function(d) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var6"];

                if(value != null) {return yScale6(value);
                } else if(value == null) {return _svgH;}
            });
        var line7 = d3.svg.line()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y(function(d) {
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var7"];

                if(value != null) {return yScale7(value);
                } else if(value == null) {return _svgH;}
            });

        var area1 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var1"];

                if(value != null) {return yScale1(value);
                }
                else if(value == null) {return _svgH;}
            });
        var area2 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var2_ori"];
                // var value = d["var2"];

                if(value != null) {return yScale2(value);
                } else if(value == null) {return _svgH;}
            });
        var area3 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var3"];

                if(value != null) {return yScale3(value);
                } else if(value == null) {return _svgH;}
            });
        var area4 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var4"];

                if(value != null) {return yScale4(value);
                } else if(value == null) {return _svgH;}
            });
        var area5 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var5"];

                if(value != null) {return yScale5(value);
                } else if(value == null) {return _svgH;}
            });
        var area6 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var6"];

                if(value != null) {return yScale6(value);
                } else if(value == null) {return _svgH;}
            });
        var area7 = d3.svg.area()
            .x(function(d,i){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var index = year.indexOf(yearInData);
                var value = index * (_svgW / _currentCountryData.length);
                return index * (_svgW / _currentCountryData.length);
            })
            .y0(_svgH)
            .y1(function(d){
                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = d["var7"];

                if(value != null) {return yScale7(value);
                } else if(value == null) {return _svgH;}
            });

var area_time1 = d3.select("#Time1").append("g");
var area_time2 = d3.select("#Time2").append("g");
var area_time3 = d3.select("#Time3").append("g");
var area_time4 = d3.select("#Time4").append("g");
var area_time5 = d3.select("#Time5").append("g");
var area_time6 = d3.select("#Time6").append("g");
var area_time7 = d3.select("#Time7").append("g");


            area_time1.append("path")
                .attr("class", "line")
                .attr("d", line1(_currentCountryData));

            area_time1.append("path")
                .datum(_currentCountryData)
                .attr("class", "area")
                .attr("d", area1);

        d3.select("#Time1").append("g")
            .attr("class", "axis")
            .call(yAxis1)
            .attr("transform", "translate(0,0)");

            d3.select("#Time1").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");


            // add a dot displaying exact numeric value
            area_time1.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * (_svgW / _currentCountryData.length);
                    return index * (_svgW / _currentCountryData.length);
                })
                .attr("cy", function(d, i){
                    var value = d["var1"];

                    if(value != null) {return yScale1(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(1, d["countryCode"], d["year"], 3, 12);

                    var tooltipVal = d["var1"];

                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + "px")
                        .style("top", yPosition - 30 + "px")
                        .select("#valueTime")
                        .text(function(d){
                            if(tooltipVal != null) {
                                return d3.round(tooltipVal, 2);
                            }
                            else{
                                return "no data";
                            }
                        });

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(1, d["countryCode"], d["year"], 3, 13);
                });

        area_time2.append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line2)

            area_time2.append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area2);

            d3.select("#Time2").append("g")
                .attr("class", "axis")
                .call(yAxis2)
                .attr("transform", "translate(0,0)");

            d3.select("#Time2").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");

            area_time2.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * (_svgW / _currentCountryData.length);
                    return index * (_svgW / _currentCountryData.length);
                })
                .attr("cy", function(d, i){
                    var value = d["var2_ori"];
                    // var value = d["var2"];

                    if(value != null) {return yScale2(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(2, d["countryCode"], d["year"], 3, 12);
                    var tooltipVal = d["var2"];
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + 30 + "px")
                        .select("#valueTime")
                        .text(function(d){
                            if(tooltipVal != null) {
                                var logVal = tooltipVal;
                                var oriVal = d3.round(Math.exp(logVal), 2);
                                return "$"+ oriVal;
                                // return d3.round(tooltipVal, 2);
                            }
                            else{
                                return "no data";
                            }
                        });

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(2, d["countryCode"], d["year"], 3, 13);
                });


        area_time3.append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line3);

            area_time3.append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area3);

         d3.select("#Time3").append("g")
                .attr("class", "axis")
                .call(yAxis3)
                .attr("transform", "translate(0,0)");

            d3.select("#Time3").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");

            area_time3.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * (_svgW / _currentCountryData.length);
                    return index * (_svgW / _currentCountryData.length);
                })
                .attr("cy", function(d){
                    var value = d["var3"];

                    if(value != null) {return yScale3(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(3, d["countryCode"], d["year"], 3, 12);
                    var tooltipVal = d["var3"];
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition  + "px")
                        .style("top", yPosition + 90 + "px")
                        .select("#valueTime")
                        .text(function(d){
                            if(tooltipVal != null) {
                                return d3.round(tooltipVal, 2);
                            }
                            else{
                                return "no data";
                            }
                        });

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(3, d["countryCode"], d["year"], 3, 13);
                });

            area_time4.append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line4);

            area_time4.append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area4);

            d3.select("#Time4").append("g")
                .attr("class", "axis")
                .call(yAxis4)
                .attr("transform", "translate(0,0)");

            d3.select("#Time4").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");

            area_time4.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * (_svgW / _currentCountryData.length);
                    return index * (_svgW / _currentCountryData.length);
                })
                .attr("cy", function(d, i){
                    var value = d["var4"];

                    if(value != null) {return yScale4(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(4, d["countryCode"], d["year"], 3, 12);
                    var tooltipVal = d["var4"];
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + 160 + "px")
                        .select("#valueTime")
                        .text(function(d){
                        if(tooltipVal != null) {
                            return d3.round(tooltipVal, 2);
                        }
                        else{
                            return "no data";
                        }
                    });

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(4, d["countryCode"], d["year"], 3, 13);
                });


            area_time5.append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line5)



            area_time5.append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area5);

            d3.select("#Time5").append("g")
                .attr("class", "axis")
                .call(yAxis5)
                .attr("transform", "translate(0,0)");

            d3.select("#Time5").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");

            area_time5.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * (_svgW / _currentCountryData.length);
                    return index * (_svgW / _currentCountryData.length);
                })
                .attr("cy", function(d, i){
                    var value = d["var5"];

                    if(value != null) {return yScale5(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(5, d["countryCode"], d["year"], 3, 12);
                    var tooltipVal = d["var5"];

                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + 220 + "px")
                        .select("#valueTime")
                        .text(function(d){
                            if(tooltipVal != null) {
                                return d3.round(tooltipVal, 2);
                            }
                            else{
                                return "no data";
                            }
                        });

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(5, d["countryCode"], d["year"], 3, 13);
                });

            area_time6.append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line6)

            area_time6.append("path")
                .datum(_currentCountryData)
                .attr("class", "area")
                .attr("d", area6);

        d3.select("#Time6").append("g")
                .attr("class", "axis")
                .call(yAxis6)
                .attr("transform", "translate(0,0)");

        d3.select("#Time6").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");



            area_time6.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * (_svgW / _currentCountryData.length);
                    return index * (_svgW / _currentCountryData.length);
                })
                .attr("cy", function(d, i){
                    var value = d["var6"];

                    if(value != null) {return yScale6(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(6, d["countryCode"], d["year"], 3, 12);
                    var tooltipVal = d["var6"];
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + 280 + "px")
                        .select("#valueTime")
                        .text(function(d){
                            if(tooltipVal != null) {
                                return d3.round(tooltipVal, 2);
                            }
                            else{
                                return "no data";
                            }
                        });

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(6, d["countryCode"], d["year"], 3, 13);
                });

            area_time7.append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line7);

            area_time7.append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area7);

         d3.select("#Time7").append("g")
                .attr("class", "axis")
                .call(yAxis7)
                .attr("transform", "translate(0,0)");

            d3.select("#Time7").append("g")
                .attr("class", "axis")
                .call(xAxisNoTick)
                .attr("transform", "translate(0,54)");

            area_time7.selectAll("circle")
                .data(_currentCountryData)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                    var yearInData = Number(d.year);
                    var index = year.indexOf(yearInData);
                    var value = index * ((_svgW) / _currentCountryData.length);

                    return value;
                })
                .attr("cy", function(d, i){
                    var value = d["var7"];

                    if(value != null) {return yScale7(value);
                    } else if(value == null) {return _svgH;}
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    logEvent.log(7, d["countryCode"], d["year"], 3, 12);
                    var tooltipVal = d["var7"];

                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + 350 + "px")
                        .select("#valueTime")
                        .text(function(d){
                            if(tooltipVal != null) {
                                return d3.round(tooltipVal, 2);
                            }
                            else{
                                return "no data";
                            }
                        });

                    $("#tooltipTime").css("display", "block");
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                    logEvent.log(7, d["countryCode"], d["year"], 3, 13);
                });

    //x axis at bottom for ticks for year


        d3.select("#Time8").append("g")
            .call(xAxis)
            .attr("class", "axis")
            .attr("transform", "translate(33, 5)")
    }
    }

    return{
        drawTimeChart:_drawTimeChart,
        countryChange : _countryChange,
        maxMin : _maxMin,
        getData : _getData
    }


})();