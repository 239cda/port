/**
 * Created by InKwon on 2017-05-30.
 */
//this is a js file for time graph
//which shows the highs and lows for each variable in a single location
//start with a self-running function that draws 7 svg ( for each variable ) and 7 lines on each svg.
//the 7 charts will be redrawn each time the user hovers on a different country or a year
var timeChart = (function timeChart(){
    var _svgW = 350, _svgH = 55;
    var _data, _currentCountry;
    var _var1Array = [], _var2Array = [], _var3Array = [], _var4Array = [], _var5Array = [], _var6Array = [], _var7Array = [];
    var max1, max2, max3, max4, max5, max6, max7, min1, min2, min3, min4, min5, min6, min7;

    function _countryChange(countryCode){
        _currentCountry = countryCode;
        _drawTimeChart();
    };

    function _getData(data){
        _data = data;
        _maxMin(_data);
    }
//to find out max and min for each variable and populate currentcountryData array
    function _maxMin(_data) {
        for (i = 0; i < _data.length; i++) {
            _var1Array[i] = Number(_data[i][categories[0]]);
            _var2Array[i] = Number(_data[i][categories[1]]);
            _var3Array[i] = Number(_data[i][categories[2]]);
            _var4Array[i] = Number(_data[i][categories[3]]);
            _var5Array[i] = Number(_data[i][categories[4]]);
            _var6Array[i] = Number(_data[i][categories[5]]);
            _var7Array[i] = Number(_data[i][categories[6]]);
        }
        max1 = d3.max(_var1Array);
        max2 = d3.max(_var2Array);
        max3 = d3.max(_var3Array);
        max4 = d3.max(_var4Array);
        max5 = d3.max(_var5Array);
        max6 = d3.max(_var6Array);
        max7 = d3.max(_var7Array);

        min1 = d3.min(_var1Array);
        min2 = d3.min(_var2Array);
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
        // var _data contains the whole data (every year, every variable)

        for(i=0;i<_data.length;i++){
            if(_data[i]["Country Code"] == _currentCountry){
                _currentYears.push = _data[i]["year"];
                _currentCountryData.push({
                    var1: (_data[i][categories[0]]),
                    var2: (_data[i][categories[1]]),
                    var3: (_data[i][categories[2]]),
                    var4: (_data[i][categories[3]]),
                    var5: (_data[i][categories[4]]),
                    var6: (_data[i][categories[5]]),
                    var7: (_data[i][categories[6]]),
                    year: _data[i]["year"]
                })
            }
        }
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

        var yAxis2 = d3.svg.axis()
                .scale(yScale2)
                .orient("left")
            .ticks(5);

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

                //각 해가 있는데 currentCountry에는 valid한 year만 들어가 있는데 그래프에는 모든 year이 다 있어서
                //y값을 중간에 건너뛰고 전해야 하는데
                //그걸 어떻게 하냐고 시발아
                //존나 이 새끼한테 어떻게 알아쳐먹게 하냐고
                //지금 있는 건 전체 year, 지금 나라의 valid year, 하나씩 valid year 속에서 증가.

                var year = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015];
                var yearInData = Number(d.year);
                var value = yScale1(d["var1"]);

                // console.log(value, d.year)

                return value;

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
                var value = yScale2(d["var2"]);

                return value;
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
                var value = yScale3(d["var3"]);

                return value;
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
                var value = yScale4(d["var4"]);

                return value;
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
                var value = yScale5(d["var5"]);

                return value;
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
                var value = yScale6(d["var6"]);

                return value;
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
                var value = yScale7(d["var7"]);

                return value;
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
                var value = yScale1(d["var1"]);

                return value;
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
                var value = yScale2(d["var2"]);

                return value;
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
                var value = yScale3(d["var3"]);

                return value;
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
                var value = yScale4(d["var4"]);

                return value;
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
                var value = yScale5(d["var5"]);

                return value;
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
                var value = yScale6(d["var6"]);

                return value;
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
                var value = yScale7(d["var7"]);

                return value;
            });
        d3.select("#Time1").append("path")
            .attr("class", "line")
            .attr("d", line1(_currentCountryData));

        d3.select("#Time1").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area1);

        d3.select("#Time1").append("g")
            .attr("class", "axis")
            .call(yAxis1)
            .attr("transform", "translate(0,0)");

            // add a dot displaying exact numeric value
            d3.select("#Time1").selectAll("circle")
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
                    var value = yScale1(d["var1"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition - 30 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var1"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });

        d3.select("#Time2").append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line2)


            d3.select("#Time2").append("g")
                .attr("class", "axis")
                .call(yAxis2)
                .attr("transform", "translate(0,0)");

        d3.select("#Time2").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area2);

            d3.select("#Time2").selectAll("circle")
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
                    var value = yScale2(d["var2"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition + 40 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var2"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });


        d3.select("#Time3").append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line3);

        d3.select("#Time3").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area3);

         d3.select("#Time3").append("g")
                .attr("class", "axis")
                .call(yAxis3)
                .attr("transform", "translate(0,0)");

            d3.select("#Time3").selectAll("circle")
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
                    var value = yScale3(d["var3"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition + 90 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var3"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });

        d3.select("#Time4").append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line4);

        d3.select("#Time4").append("g")
                .attr("class", "axis")
                .call(yAxis4)
                .attr("transform", "translate(0,0)");

        d3.select("#Time4").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area4);

            d3.select("#Time4").selectAll("circle")
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
                    var value = yScale4(d["var4"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition + 160 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var4"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });


        d3.select("#Time5").append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line5)

        d3.select("#Time5").append("g")
                .attr("class", "axis")
                .call(yAxis5)
                .attr("transform", "translate(0,0)");

        d3.select("#Time5").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area5);

         d3.select("#Time5").selectAll("circle")
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
                    var value = yScale5(d["var5"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition + 220 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var5"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });

        d3.select("#Time6").append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line6)

        d3.select("#Time6").append("g")
                .attr("class", "axis")
                .call(yAxis6)
                .attr("transform", "translate(0,0)");

        d3.select("#Time6").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area6);

            d3.select("#Time6").selectAll("circle")
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
                    var value = yScale6(d["var6"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition + 280 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var6"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });

        d3.select("#Time7").append("path")
            .datum(_currentCountryData)
            .attr("class", "line")
            .attr("d", line7)


        d3.select("#Time7").append("path")
            .datum(_currentCountryData)
            .attr("class", "area")
            .attr("d", area7);

         d3.select("#Time7").append("g")
                .attr("class", "axis")
                .call(yAxis7)
                .attr("transform", "translate(0,0)");

            d3.select("#Time7").selectAll("circle")
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
                    var value = yScale7(d["var7"]);
                    return value;
                })
                .attr("fill", "grey")
                .attr("r", 3)
                .on("mouseover", function(d){
                    d3.select(this).attr("fill", highlightCol);
                    d3.select(this).attr("r", 5);

                    var xPosition = parseFloat(d3.select(this).attr("cx"));
                    var yPosition = parseFloat(d3.select(this).attr("cy"));

                    d3.select("#tooltipTime")
                        .style("left", xPosition + 300 + "px")
                        .style("top", yPosition + 340 + "px")
                        .select("#valueTime")
                        .text(d3.round(d["var7"], 2));

                    $("#tooltipTime").css("display", "block");
                    // d3.select("#tooltipTime").classed("hidden", false);
                })

                .on("mouseout", function(d){
                    d3.select(this).attr("fill", "grey");
                    d3.select(this).attr("r", 3);
                    // d3.select("#tooltipTime").classed("hidden", true);
                    $("#tooltipTime").css("display", "none");
                });

    //x axis at bottom for ticks for year
        var xScale = d3.time.scale()
            .domain([new Date(2005, 1, 1), new Date(2015, 1, 1)])
            .range([0, _svgW])

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

        d3.select("#Time8").append("g")
            .call(xAxis)
            .attr("transform", "translate(30, -5)")
    }
    }

    return{
        drawTimeChart:_drawTimeChart,
        countryChange : _countryChange,
        maxMin : _maxMin,
        getData : _getData
    }


})();