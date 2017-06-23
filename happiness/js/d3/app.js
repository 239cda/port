/**
 * Created by InKwon on 2017-02-11.
 */
var selectedBar;
var codeBar;
//for dragging, what is current value displayed in each axis
var scatterX;
var scatterY;

//for barcharts ( current hovered country id)
var currentCountry;

//highlight color
var highlightCol = "orange";

function update(d){
    currentCountry = d;
}
//color for highlighting parts of already highlighted regions
var strokeCol = "red";
var strokeWidth = 4;

//a listenr for each sort icon. when same icon is clicekd twice, it will run resetSort to change arrangement of charts
var resetSort = 0;

//scatterplots
function drawScatter(data, variable, variable2){
    d3.select("#SVGScatter").selectAll(".refresh").remove();
    var _dataset = data;

    scatterX = variable;
    scatterY = variable2;

    var _maxY,_maxX,_minY,_minX;
    var _scatterH = 260;
    var _padding = 55;
    var _paddingV = 10;

    _maxX = findMax(_dataset, variable);
    _maxY = findMax(_dataset, variable2);
    _minX = findMin(_dataset, variable);
    _minY = findMin(_dataset, variable2);

    var minMax = [_minX,_minY,_maxX,_maxY];

    var yScale = d3.scale.linear()
        .domain([_minY, _maxY])
        .range([_scatterH, 20]);

    var xScale = d3.scale.linear()
        .domain([_minX, _maxX])
        .range([0, _scatterH - 20]);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');

    d3.select("#SVGScatter")
        .append("g")
        .call(yAxis)
        .attr("transform", "translate(" + _padding + ", -15)")
        .attr("id", "yAxisScatter")
        .attr("class", "axis refresh");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');

    d3.select("#SVGScatter")
        .append("g")
        .call(xAxis)
        .attr("transform", "translate(" + _padding + ", 245)")
        .attr("id","xAxisScatter")
        .attr("class", "axis refresh");

    callBrush(minMax);

    d3.select("#SVGScatter")
        .selectAll("circle")
        .data(_dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){
            var x = d[variable];
            //below is for brushing. to get scaled value instead of raw values
                if(x > 0) {
                    _dataset[i].currentX = xScale(d[variable]);
                    return xScale(d[variable]);
                }
            else{
                // d["Country Code"]= "XXX";
                return 500;
            }
        })
        .attr("cy", function(d, i){
            var x = xScale(d[variable]);
            var y = d[variable2];
          if(y > 0){
                _dataset[i].currentY = yScale(d[variable2]);
                return yScale(d[variable2]);
                    }
            else{
              // d["Country Code"] = "XXX";
              return 500;
            }
        })
        .attr("fill", "grey")
        .attr("r", 5)
        .on("mouseover", function(d){
            // if(isCountrySelected == true), let the circles be colored and charts contents changed
            //while keeping the highlight in the single country
            //that is selected in other map or this scatterplot.
            if(isCountrySelected == false){
                if (brushOn == false) {
                    d3.select(this).attr("fill", highlightCol);
                }

                codeBar = d["Country Code"];
                selectedBar = d["Country Code"];
                changeColorSort(codeBar);
                mapColor(selectedBar);

                // else{
                //     d3.select(this).attr("stroke", strokeCol)
                //         .attr("stroke-width", strokeWidth);
                // };
            }
            //if country is already selected
            else{
              // the problem is that the highlight effect of brush just goes away when hovered.
                // it seems the color provided at .on("click"...) takes precedence over brush.
                d3.select(this).attr("fill", highlightCol);

                if(brushOn == true){
                d3.select(this).attr("stroke", strokeCol)
                                .attr("stroke-width", strokeWidth);
                    }
            }
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("cx"));
                var yPosition = parseFloat(d3.select(this).attr("cy"));
//Update the tooltip position and value
                d3.select("#tooltipScatter")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#valueScatter")
                    .text(d["country"]);
//Show the tooltip
                d3.select("#tooltipScatter").classed("hidden", false);
                d3.select(this).attr("fill", highlightCol);

                //for logging, send current country code to log.js
            logEvent.scatter(d["Country Code"], scatterX, scatterY);
        })
        .on("mouseout", function(d){
            d3.select("#tooltipScatter").classed("hidden", true);
            //the line below should not run when brush is on
            if(isCountrySelected == false) {
                if (brushOn == false) {
                    d3.select(this).attr("fill", "grey");
                }
                if (brushOn == true) {
                }

                if (isCountrySelected == true) {
                    changeColorSort(currentCountry);
                    mapColor(currentCountry);
                }
                if (brushOn == false) {
                    d3.select(this).attr("fill", "grey");
                }
            }
            else if(isCountrySelected == true) {
                if (brushOn == false) {
                    var selected = currentCountry;
                    d3.select("#SVGScatter").selectAll("circle")
                        .attr("fill", function (d) {
                            if (selected == d["Country Code"]) {
                                console.log(d["Country Code"], selected)
                                return highlightCol
                            }
                            else {
                                return "grey"
                            };
                        });
                }
                else if (brushOn == true) {
                    // d3.select(this).attr("stroke", "none");
                }
            }
        })
        .on("click", function(d){
            if(isCountrySelected == false) {

                update(d["Country Code"]);
                countryID = d["Country Code"];
                currentCountry = countryID;

                hoverCountry(currentCountry);
                changeColor(currentCountry);

                isCountrySelected = true;
            }

            else if(isCountrySelected == true){
                if (brushOn == false) {
                    currentCountry = d["Country Code"];
                    var selected = currentCountry;
                    d3.select("#SVGScatter").selectAll("circle")
                        .attr("fill", function (d) {
                            if (selected == d["Country Code"]) {
                                console.log(d["Country Code"], selected)
                                return highlightCol
                            }
                            else {
                                return "grey"
                            }
                            ;
                        });
                }
                else if (brushOn == true) {
                    // d3.select(this).attr("stroke", "none");
                }
            }
                //if a user selects a different country, the coloring changes immediately to reflect change
                else {
                    update(d["Country Code"]);
                    countryID = d["Country Code"];
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }
                //for logging
                logEvent.scatter(d["Country Code"], scatterX, scatterY);
        })
        .attr("transform", "translate(" + _padding + ", -15)")
        .attr("class", "refresh");

    //text labels
    d3.select("#SVGScatter")
        .append("text")
        .attr("x", 150)
        .attr("y", _scatterH + 15 )
        .text(function(d){
            if(variable == "Life Ladder"){return "Happiness Score"}
            else if(variable == "gini of household income reported in Gallup, by wp5-year") {return "GINI Index"}
            else if(variable == "Healthy life expectancy at birth") {return "Healthy Life Expectancy"}
            else{return variable}})
        .style("font-size", "14px")
        .attr("class", "refresh");

    d3.select("#SVGScatter")
        .append("text")
        .attr("x", 0)
        .attr("y", 40)
        .text(function(d){
            if(variable2 == "Life Ladder"){return "Happiness Score"}
            else if(variable2 == "gini of household income reported in Gallup, by wp5-year") {return "GINI Index"}
            else if(variable2 == "Healthy life expectancy at birth") {return "Healthy Life Expectancy"}
            else{return variable2}})
        .style("font-size", "14px")

        .attr("class", "refresh textY");

    d3.select(".textY")
        .attr("dx", "-15em")
        .attr("dy", "-0.8em")
        .attr("transform", "rotate(-90)")
}
//bar graph min/max val
var findMax = function(data, criteria){
    var _value = [];
    for(i=0;i<data.length;i++){
        //has to convert each value into numerics (are strings in the original data)
        // data[i][criteria] = Number(data[i][criteria]);
        // _value.push(Number(data[i][criteria]))
        _value.push(Number(data[i][criteria]))
    }
    return d3.max(_value)
};
var findMin = function(data, criteria){
    var _value = [];
    for(i=0;i<data.length;i++){
        //has to convert each value into numerics (are strings in the original data)
        // data[i][criteria] = Number(data[i][criteria]);

        _value.push(Number(data[i][criteria]))
    }
    return d3.min(_value)
};

var drawBar = (function (){
    var _graphH = 80;
    var _countryID = countryID;
    var reset1, reset2, reset3, reset4, reset5, reset6, reset7;
        reset1 = reset2 = reset3 = reset4= reset5=reset6=reset7 = 0;
    var _dataset;
    var _maxY, _minY, _maxY2, _minY2, _maxY3, _minY3, _maxY4, _minY4, _maxY5, _minY5, _minY6, _maxY6, _maxY7, _minY7;
    var categories = ["Life Ladder",	"Log GDP per capita",	"gini of household income reported in Gallup, by wp5-year", "Perceptions of corruption",
        "Democratic Quality","Social support", "Healthy life expectancy at birth" ];
    var _yScale, _yScale2, _yScale3, _yScale4, _yScale5, _yScale6, _yScale7;
    var yScale1A, yScale2A, yScale3A, yScale4A, yScale5A, yScale6A, yScale7A;


    var variable = categories[0];
    var variable2 = categories[1];
    var variable3 = categories[2];
    var variable4 = categories[3];
    var variable5 = categories[4];
    var variable6 = categories[5];
    var variable7 = categories[6];

    //this variable is used for updateBar function, when it determines which bar chart to display sorted
    //same as mainBarNum
    var currentSort;

    //this value sees if sort is used at least once. only if this is true, the regular sort function runs.
    //if not, sort will not run when year changes. (just values change, not their position)
    var isSortUsed;
    //this value adds + 1 when sort icon clicked.
    //when it is clicked twice, resetSort will be changed and chart arranged in a diff order
    //when it is clicked only once, resetSort stays the same and chart stays in same order
    //only changes value of the chart depending on year
    var isYearChanged;

    function _getDataBar(data, max, min){
         _dataset = data;
         _maxY = max[0], _minY = min[0], _maxY2 = max[1], _minY2 = min[1], _maxY3 = max[2], _minY3 = min[2], _maxY4 = max[3];
         _minY4 = min[3], _maxY5 = max[4],_minY5 = min[4],_maxY6 = max[5],_minY6 = min[5],_maxY7 = max[6],_minY7 = min[6];
         _scaleSetUp();
     };
    function _scaleSetUp() {
        _yScale = d3.scale.linear()
            .domain([_minY, _maxY])
            .range([0, _graphH * 0.65]);


        _yScale2 = d3.scale.linear()
            .domain([_minY2, _maxY2])
            .range([0, _graphH * 0.65]);

        // _yScale2 = d3.scale.log()
        //     .base(Math.E)
        //     // .domain([0, 12])
        //     .domain([Math.exp(0), Math.exp(12)])
        //     .range([0, _graphH * 0.65]);

        _yScale3 = d3.scale.linear()
            .domain([_minY3, _maxY3])
            .range([0, _graphH * 0.65]);

        _yScale4 = d3.scale.linear()
            .domain([_minY4, _maxY4])
            .range([0, _graphH * 0.65]);

        //scale for democratic quality
        _yScale5 = d3.scale.linear()
            .domain([_minY5, _maxY5])
            .range([0, _graphH * 0.65]);

        _yScale6 = d3.scale.linear()
            .domain([_minY6, _maxY6])
            .range([0, _graphH * 0.65]);

        _yScale7 = d3.scale.linear()
            .domain([_minY7, _maxY7])
            .range([0, _graphH * 0.65]);

        //another y scales because I set the wrong range for yscales above and since I have been using them everywhere, there are
        //more work to do if I am to correct those scales rather than just make new ones so...

        yScale1A = d3.scale.linear()
            .domain([_minY, _maxY])
            .range([_graphH * 0.65, 0]);


        //scale for GDP (as it is log GDP, scale is log)
        yScale2A = d3.scale.linear()
            .domain([_minY2, _maxY2])
            .range([_graphH * 0.65, 0]);

        // yScale2A = d3.scale.log()
        //     .base(Math.E)
        //     .domain([Math.exp(0), Math.exp(12)])
        //     .range([_graphH * 0.65, 0]);

        yScale3A = d3.scale.linear()
            .domain([_minY3, _maxY3])
            .range([_graphH * 0.65, 0]);

        yScale4A = d3.scale.linear()
            .domain([_minY4, _maxY4])
            .range([_graphH * 0.65, 0]);

        yScale5A = d3.scale.linear()
            .domain([_minY5, _maxY5])
            .range([_graphH * 0.65, 0]);

        yScale6A = d3.scale.linear()
            .domain([_minY6, _maxY6])
            .range([_graphH * 0.65, 0]);

        yScale7A= d3.scale.linear()
            .domain([_minY7, _maxY7])
            .range([_graphH * 0.65, 0]);
    }


    function sort(mainBarNum, variable, dyScale){

        var svgNum = [1,2,3,4,5,6,7];
        var mainBar, mainBarClass;

        currentSort = mainBarNum;
        var sorted =[];

        mainBar = "#SVG" + mainBarNum;
        mainBarClass = ".bar" + mainBarNum;

        //change numbers inside svgNum based on mainBarNum
        for (i=0;i<svgNum.length;i++) {
            if(mainBarNum == svgNum[i]) {
                svgNum.splice(i, 1);
            }
        }
        //below means, it evaluates if the clicked icon is clicked twice.
        //should not run when year changes
        if(isYearChanged != true) {
            if (mainBarNum == 1) {
                resetSort = reset1;
            } else if (mainBarNum == 2) {
                resetSort = reset2;
            } else if (mainBarNum == 3) {
                resetSort = reset3;
            } else if (mainBarNum == 4) {
                resetSort = reset4;
            } else if (mainBarNum == 5) {
                resetSort = reset5;
            } else if (mainBarNum == 6) {
                resetSort = reset6;
            } else if (mainBarNum == 7) {
                resetSort = reset7;
            };
        }
        //names array has all the country code in the order of sorted main bar graph

        sortItems = function (a, b) {
            // sorted.push({var1: a[variable] - b[variable]});
            return a[variable] - b[variable];
        };
        sortItemsBar5 = function (a, b) {
           // var result = a[variable] - b[variable];

            if(Number(a[variable]) == 0){
                a[variable] = -100;
            }
            if(Number(b[variable] == 0)){
                b[variable] = -100;
            }
            return a[variable] - b[variable];
        };

        sortAccordingly = function(a, b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names
            return a.sortCode - b.sortCode;
            // return d3.ascending(a.name - b.name);
        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex

        //d = combinedData

        if(resetSort == 0) {
         if(mainBar == "#SVG5") {
             d3.select(mainBar).selectAll(mainBarClass)
                 .data(combinedData)
                 .sort(sortItemsBar5)
                 .transition()
                 .duration(1000)
                 .attr("x", function (d, i) {

                     d.sortCode = i;
                     return i * (_svgW / combinedData.length)
                 })
                 .attr("y", function (d) {
                     var value;
                     if (d.var5 != '') {
                         value = _svgH - _yScale5(Number(d.var5))
                     }
                     else {
                         value = null};

                     if (value != null) {
                         return value;
                     }
                     else {return _svgH};
                 })
                 .attr("height", function (d) {
                     var value;
                     if (d.var5 != '') {
                         value = _yScale5(Number(d.var5))
                     }
                     else {
                         value = null};

                     if (value != null) {
                         return value;
                     }
                     else {
                     }
                     ;
                 })

         }
         else {
             d3.select(mainBar).selectAll(mainBarClass)
                 .data(combinedData)
                 .sort(sortItems)
                 .transition()
                 .duration(1000)
                 .attr("x", function (d, i) {

                     //sort works fine. the problem is it is not represented in the graph correctly
                     d.sortCode = i;
                     return i * (_svgW / combinedData.length)
                 })
                 .attr("y", function (d) {
                     var value = _svgH - dyScale(Number(d[variable]));
                     if(d[variable] != "") {
                         return value;
                     }
                     else{return _svgH;}
                 })
                 .attr("height", function (d) {
                     if (dyScale(Number(d[variable])) > 0) {
                         return dyScale(Number(d[variable]));
                     }
                 });
         }
         //announcement for all bars below
            //use "var" + mainBarNum and find out if that property returns 0
            //if so, x should be - 50, or some value out of the range of bar graph svg;
            //or, just make the height 0 as it looks better on transition;
    if(mainBar != "#SVG1") {
        d3.select("#SVG1").selectAll(".bar1")
            .data(combinedData)
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length);
            })
            .attr("y", function(d){
                var value = "var" + mainBarNum;
                //if below code is commented in (??)--not commented--the bars without data for all 7 variables will disappear
                    // if (d[value] == 0) {
                    //     return _svgH;
                    // }
                    // else{
                        if(d["var1"] != ""){
                            return _svgH - _yScale(Number(d["var1"]));}
                        else{return _svgH;}
                    // }
            })
                .attr("height", function(d){
                        // var value = "var" + mainBarNum;
                        //
                        // if (d[value] == 0) {
                        //     return 0;
                        // }
                        // else{
                            if(d["var1"] != ""){
                                return _yScale(Number(d["var1"]));}
                            else{return 0;}
                        // }
                    });
    }
    if(mainBar != "#SVG2") {
        d3.select("#SVG2").selectAll(".bar2")
            .data(combinedData)
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d){
                // var value = "var" + mainBarNum;
                // if (d[value] == 0) {
                //     return _svgH;
                // }
                // else{
                    if(d["var2"] != ""){
                        return _svgH - _yScale2(Number(d["var2"]));}
                    else{return _svgH;}
                // }
            })
            .attr("height", function(d){
                // var value = "var" + mainBarNum;
                // if (d[value] == 0) {
                //     return 0;
                // }
                // else{
                    if(d["var2"] != ""){
                    return _yScale2(Number(d["var2"]));}
                    else{return 0;}
                // }
            });
    }
    if(mainBar != "#SVG3") {
        d3.select("#SVG3").selectAll(".bar3")
            .data(combinedData)
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d){
                // var value = "var" + mainBarNum;
                // if (d[value] == 0) {
                //     return _svgH;
                // }
                // else{
                    if(d["var3"] != ""){
                        return _svgH - _yScale3(Number(d["var3"]));}
                    else{return _svgH;}
                // }
            })
            .attr("height", function(d){
                    // var value = "var" + mainBarNum;
                    // if (d[value] == 0) {
                    //     return 0;
                    // }
                    // else{
                        if(d["var3"] != ""){
                            return _yScale3(Number(d["var3"]));}
                        else{return 0;}
                    // }
                });
    }
     if(mainBar != "#SVG4") {
         d3.select("#SVG4").selectAll(".bar4")
             .data(combinedData)
             .sort(sortAccordingly)
             .transition()
             .duration(1000)
             .attr("x", function (d, i) {
                 return i * (_svgW / combinedData.length)
             })
             .attr("y", function(d){
                 // var value = "var" + mainBarNum;
                 // if (d[value] == 0) {
                 //     return _svgH;
                 // }
                 // else{
                     if(d["var4"] != ""){
                         return _svgH - _yScale4(Number(d["var4"]));}
                     else{return _svgH;}
                 // }
             })
             .attr("height", function(d){
                 // var value = "var" + mainBarNum;
                 // if (d[value] == 0) {
                 //     return 0;
                 // }
                 // else{
                     if(d["var4"] != ""){
                         return _yScale4(Number(d["var4"]));}
                     else{return 0;}
                 // }
             });

     }
    if(mainBar != "#SVG5") {
        d3.select("#SVG5").selectAll(".bar5")
            .data(combinedData)
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d){
                // var value = "var" + mainBarNum;
                // if (d[value] == 0) {
                //     return _svgH;
                // }
                // else{
                    if(d["var5"] != ""){
                        return _svgH - _yScale5(Number(d["var5"]));}
                    else{return _svgH;}
                // }
            })
            .attr("height", function(d){
                // var value = "var" + mainBarNum;
                // if (d[value] == 0) {
                //     return 0;
                // }
                // else{
                    if(d["var5"] != ""){
                        return _yScale5(Number(d["var5"]));}
                    else{return 0;}
                // }
            });
    }
    if(mainBar != "#SVG6") {
        d3.select("#SVG6").selectAll(".bar6")
            .data(combinedData)
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d){
                // var value = "var" + mainBarNum;
                // if (d[value] == 0) {
                //     return _svgH;
                // }
                // else{
                    if(d["var6"] != ""){
                        return _svgH - _yScale6(Number(d["var6"]));}
                    else{return _svgH;}
                // }
            })
            .attr("height", function(d){
                    // var value = "var" + mainBarNum;
                    // if (d[value] == 0) {
                    //     return 0;
                    // }
                    // else{
                        if(d["var6"] != ""){
                            return _yScale6(Number(d["var6"]));}
                        else{return 0;}
                    // }
                });
        }
    if(mainBar != "#SVG7") {
                d3.select("#SVG7").selectAll(".bar7")
                    .data(combinedData)
                    .sort(sortAccordingly)
                    .transition()
                    .duration(1000)
                    .attr("x", function (d, i) {
                        return i * (_svgW / combinedData.length)
                    })
                    .attr("y", function(d){
                        // var value = "var" + mainBarNum;
                        // if (d[value] == 0) {
                        //     return _svgH;
                        // }
                        // else{
                            if(d["var7"] != ""){
                                return _svgH - _yScale7(Number(d["var7"]));}
                            else{return _svgH;}
                        // }
                    })
                    .attr("height", function(d){
                        // var value = "var" + mainBarNum;
                        // if (d[value] == 0) {
                        //     return 0;
                        // }
                        // else{
                            if(d["var7"] != ""){
                                return _yScale7(Number(d["var7"]));}
                            else{return 0;}
                        // }
                        });
            }
        }

//when this runs, this will display the bars in alphabetical order
        else if(resetSort == 1){

            sortItems2 = function (a, b) {
                return d3.ascending(a.name, b.name);
                // return a["code"] - b["code"];
            };
            sortAccordingly = function(a,b) {
                return a.sortCode - b.sortCode;
            };

            d3.select(mainBar).selectAll(mainBarClass)
                .data(combinedData)
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.sortCode = i;
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + mainBarNum;
                    var var_yScale;
                    var_yScale = whichScale(mainBarNum);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
                    })
                .attr("height", function(d){
                    var variable = "var" + mainBarNum;
                    var var_yScale;
                    var_yScale = whichScale(mainBarNum);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                    });

            d3.select("#SVG" + svgNum[0]).selectAll(".bar" + svgNum[0])
                .data(combinedData)
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + svgNum[0];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[0]);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
                })
                .attr("height", function(d){
                    var variable = "var" + svgNum[0];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[0]);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                });

            d3.select("#SVG" + svgNum[1]).selectAll(".bar" + svgNum[1])
                .data(combinedData)
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + svgNum[1];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[1]);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
                })
                .attr("height", function(d){
                    var variable = "var" + svgNum[1];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[1]);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                });

            d3.select("#SVG" + svgNum[2]).selectAll(".bar" + svgNum[2])
                .data(combinedData)
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + svgNum[2];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[2]);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
            })
                .attr("height", function(d){
                    var variable = "var" + svgNum[2];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[2]);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                });

            d3.select("#SVG" + svgNum[3]).selectAll(".bar" + svgNum[3])
                .data(combinedData)
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + svgNum[3];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[3]);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
                })
                .attr("height", function(d){
                    var variable = "var" + svgNum[3];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[3]);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                });

            d3.select("#SVG" + svgNum[4]).selectAll(".bar" + svgNum[4])
                .data(combinedData)
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + svgNum[4];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[4]);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
                })
                .attr("height", function(d){
                    var variable = "var" + svgNum[4];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[4]);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                });

            d3.select("#SVG" + svgNum[5]).selectAll(".bar" + svgNum[5])
                .data(combinedData)
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    var variable = "var" + svgNum[5];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[5]);

                    if(d[variable] != "") {
                        return _svgH - var_yScale(Number(d[variable]));
                    }
                    else{return _svgH;}
                })
                .attr("height", function(d){
                    var variable = "var" + svgNum[5];
                    var var_yScale;
                    var_yScale = whichScale(svgNum[5]);

                    if(d[variable] != "") {
                        return var_yScale(Number(d[variable]));
                    }
                    else{
                        return 0;
                    }
                });
            //make resetSort(reset1, reset2...) only change when isYearChanged == false (year value is the same)
            // var sum = [clicked1,clicked2,clicked3,clicked4,clicked5,clicked6,clicked7];
            //
            // for(i=0;i<6;i++){
            //     if(sum[i] > 0){
            //         resetSortFunction(0);
            //     }
            // }
        }
    }
    function resetSortFunction(num){
        if (currentSort == 1) {
            reset1 = num;
        } else if (currentSort == 2) {
            reset2 = num;
        } else if (currentSort == 3) {
            reset3 = num;
        } else if (currentSort == 4) {
            reset4 = num;
        } else if (currentSort == 5) {
            reset5 = num;
        } else if (currentSort == 6) {
            reset6 = num;
        } else if (currentSort == 7) {
            reset7 = num;
        };
    }
    function whichScale(mainBarNum){
        switch(mainBarNum){
            case(1):
                return _yScale;
                break;
            case(2):
                return _yScale2;
                break;
            case(3):
                return _yScale3;
                break;
            case(4):
                return _yScale4;
                break;
            case(5):
                return _yScale5;
                break;
            case(6):
                return _yScale6;
                break;
            case(7):
                return _yScale7;
                break;
        }
    }
    //resetSort 관장한다 alphabetical order인지 value order인지
    //이 resetSort 값은 only if 같은 아이콘이 두 번 클릭되었을 때만 바껴야 함
    //to know when same icon is clicekd twice, each icon has its own value saving how many times it hasb een  clicked
    //it starts with 0, then goes up to 1 when clicked once.
    //when clicked twice, it changes to 2 and then it is reset to 0. because if it is clicekd twice, resetSort is changed
    //근데 문제가 연도가 바뀔 때도 같은 펑션을 쓰니까 구별이 안 되어서 계속 리셋되는 거.
    //결국 한 아이콘 두 번 이어서 클릭하거나, 맨 처음 클릭할 경우는 리셋되어야 하고.

    function sort1Click() {
        isSortUsed = true;
        sort(1, "var1", _yScale);
        reset1 = reset1 + 1;
        if (reset1 > 1) {
            reset1 = 0;
        };
    }
    function sort2Click() {
        isSortUsed = true;
        sort(2, "var2", _yScale2);
        reset2 = reset2 + 1;
        if (reset2 > 1) {
            reset2 = 0;
        };
    }
    function sort3Click() {
        isSortUsed = true;
        sort(3, "var3", _yScale3);
        reset3 = reset3 + 1;
        if (reset3 > 1) {
            reset3 = 0;
        };
    }
    function sort4Click() {
        isSortUsed = true;
        sort(4, "var4", _yScale4);
        reset4 = reset4 + 1;
        if (reset4 > 1) {
            reset4 = 0;
        };
    }
    function sort5Click() {
        isSortUsed = true;
        sort(5, "var5", _yScale5);
        reset5 = reset5 + 1;
        if (reset5 > 1) {
            reset5 = 0;
        };
    }
    function sort6Click() {
        isSortUsed = true;
        sort(6, "var6", _yScale6);
        reset6 = reset6 + 1;
        if (reset6 > 1) {
            reset6 = 0;
        };
    }
    function sort7Click() {
        isSortUsed = true;
        sort(7, "var7", _yScale7);
        reset7 = reset7 + 1;
        if (reset7 > 1) {
            reset7 = 0;
        };
    }

    //function runs when a year changes
    function _update(){
        //newly received combineddata
        var scale = whichScale(currentSort);
        //this var gets true always because this update function runs only when year changes from the slider
        // isYearChanged = true;

        //when year changes without first sorting bar charts at least once:
        //run sort(as sort has transition) but set resetSort =1;
        if(isSortUsed != true){
            reset1 = 1;
            sort(1, "var1", _yScale);
            reset1 = 0;
        }
        else{
            isYearChanged = true;
            sort(currentSort, "var"+ currentSort, scale);
            isYearChanged = false;
        };

        //1. year changes : sort() runs. sortReset stays the same as before.
        //2. sort icon clicked: sort()runs.
        //3. when sort icon clicked again: sortReset should have been changed.
        //4. when year changes instead: sortRest should not change.


    };

    //from below, drawing bar chart at startup
    function _drawBar(combinedData) {

        d3.select("#SVG1").selectAll("*").remove();
        d3.select("#SVG2").selectAll("*").remove();
        d3.select("#SVG3").selectAll("*").remove();
        d3.select("#SVG4").selectAll("*").remove();
        d3.select("#SVG5").selectAll("*").remove();
        d3.select("#SVG6").selectAll("*").remove();
        d3.select("#SVG7").selectAll("*").remove();

        var bars = d3.select("#SVG1").selectAll(".bar1")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar1");

        bars.attr("x", function (d, i) {
            //there should be 160+ bars, including countries that are not included in this year's data
            //index of totalCountries * bar width
            return i * (_svgW / combinedData.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "barI";
            })
            .attr("y", function (d, i) {
                //if i == totalCountries.indexOf(data[i]["Country Code"] it gets the value
                //there will be 30+ countries

                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;

                //so far, I know which bar should get values and which bar should not
                //but i do not know how I can specify that specific bar
                var value = _svgH - _yScale(Number(d.var1));


                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                };

            })
            .attr("height", function (d, i) {
                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;
                var value = _yScale(Number(d.var1));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                };
            })
            .attr("fill", "grey")

        d3.select("#SVG1").selectAll(".bar1")
        //using 160+ country names;
            .on("mouseover", function (d) {
                //if no country currently selected == color + other charts highligths should change on hover
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)

                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex);
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                // //when country is selected and brush is on (<-- causing problem right now)
                //when a country is selected == two bars should be highlighted (1. currentCountry, 2. another one change on hover)
                //it should not affect other charts
                else if(isCountrySelected == true) {
                    //this is only problematic when a brush is on (when off, works fine)
                    if(brushOn == true){
                        //find out code of the country selected + highlighed by brush <--should stay same when mouse out
                        //run d3.selectAll for all bars in this #SVG1 and color that country bar
                        //and color the bar (this) <-- which should return to gray in mouseout
                        brushHighlight();
                    }
                }

                d3.select(this).attr("fill", highlightCol);
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x"));
                var yPosition = parseFloat(d3.select(this).attr("y"));

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition - 40 + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        d3.select(this).attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    if(brushOn == true){
                    }
                    else if(brushOn == false){
                        d3.select("#SVG1").selectAll("rect")
                            .attr("fill", function (d) {
                                if (d.countryCode == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    return "grey"
                                };
                            })
                    }
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG1").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text("Happiness Score");

        //y-axis
        var yAxis1 = d3.svg.axis()
            .scale(yScale1A)
            .orient("left")
            .ticks(5);

        d3.select("#SVG1").append("g")
            .attr("class", "axis")
            .call(yAxis1)
            .attr("transform", "translate(20, 28)");

        d3.select("#sort1").on("click", sort1Click);

        var bars2 = d3.select("#SVG2").selectAll(".bar2")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar2");

        bars2.attr("x", function (d, i) {
            //there should be 160+ bars, including countries that are not included in this year's data
            //index of totalCountries * bar width
            return i * (_svgW / totalCountries.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "barII";
            })
            .attr("y", function (d, i) {
                //if i == totalCountries.indexOf(data[i]["Country Code"] it gets the value
                //there will be 30+ countries

                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;

                //so far, I know which bar should get values and which bar should not
                //but i do not know how I can specify that specific bar
                // var value = _svgH - _yScale2(Number(d.var2));

                var value = _svgH - (_yScale2(Number(d.var2)));
                // console.log(value)
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                }
                ;
            })
            .attr("height", function (d, i) {
                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;
                var value = (_yScale2(Number(d.var2)));
                if (value > 0) {

                    return value;
                }
                else {
                    return 0
                };
            })
            .attr("fill", "grey")

        d3.select("#SVG2").selectAll(".bar2")
        //using 160+ country names;
            .on("mouseover", function (d) {
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                else if(isCountrySelected == true){
                    if(brushOn == true){
                        brushHighlight();
                    }
                }
                d3.select(this).attr("fill", highlightCol);
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 30 + 90;

                var _codeForText;

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {

                    if (brushOn == false) {
                        d3.select(this).attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    if(brushOn == false) {
                        d3.select("#SVG2").selectAll("rect")
                            .attr("fill", function (d) {
                                if (d.countryCode == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    return "grey"
                                };
                            })
                    }
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG2").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text("GDP per capita");
        // .text(variable2);

        var tickLabels = [Math.exp(7)/1000, Math.exp(8)/1000, Math.exp(9)/1000, Math.exp(10)/1000, Math.exp(11)/1000];
        var formatter = d3.format(",.0f");
        var yAxis2 = d3.svg.axis()
            .scale(yScale2A)
            .orient("left")
            .ticks(5)
            .tickFormat(function(d,i){
                    return formatter(tickLabels[i]) + "K"}) ;

        d3.select("#SVG2").append("g")
            .attr("class", "axis")
            .call(yAxis2)
            .attr("transform", "translate(24, 28)");


        d3.select("#sort2").on("click", sort2Click);

        var bars3 = d3.select("#SVG3").selectAll(".bar3")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar3");

        bars3.attr("x", function (d, i) {
            //there should be 160+ bars, including countries that are not included in this year's data
            //index of totalCountries * bar width
            return i * (_svgW / totalCountries.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "barIII";
            })
            .attr("y", function (d, i) {
                //if i == totalCountries.indexOf(data[i]["Country Code"] it gets the value
                //there will be 30+ countries

                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;

                //so far, I know which bar should get values and which bar should not
                //but i do not know how I can specify that specific bar
                var value = _svgH - _yScale3(Number(d.var3));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                }
                ;
            })
            .attr("height", function (d, i) {
                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;
                var value = _yScale3(Number(d.var3));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                }
                ;
            })
            .attr("fill", "grey")

        d3.select("#SVG3").selectAll(".bar3")
        //using 160+ country names;
            .on("mouseover", function (d) {
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                else if(isCountrySelected == true){
                    if(brushOn == true){
                        brushHighlight();
                    }
                }
                d3.select(this).attr("fill", highlightCol);
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 30 + 90;

                var _codeForText;

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + 90 + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        d3.select(this).attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    if(brushOn == false) {
                        d3.select("#SVG3").selectAll("rect")
                            .attr("fill", function (d) {
                                if (d.countryCode == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    return "grey"
                                }
                                ;
                            })
                    }
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG3").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text("GINI index")

        var yAxis3 = d3.svg.axis()
            .scale(yScale3A)
            .orient("left")
            .ticks(5);

        d3.select("#SVG3").append("g")
            .attr("class", "axis")
            .call(yAxis3)
            .attr("transform", "translate(20, 28)");

        d3.select("#sort3").on("click", sort3Click);


        var bars4 = d3.select("#SVG4").selectAll(".bar4")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar4");

        bars4.attr("x", function (d, i) {
            //there should be 160+ bars, including countries that are not included in this year's data
            //index of totalCountries * bar width
            return i * (_svgW / totalCountries.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "countryIV";
            })
            .attr("y", function (d, i) {
                var value = _svgH - _yScale4(Number(d.var4));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                }
                ;
            })
            .attr("height", function (d, i) {
                var value = _yScale4(Number(d.var4));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                }
                ;
            })
            .attr("fill", "grey")
            .on("mouseover", function (d) {
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                d3.select(this).attr("fill", highlightCol);
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 30 + 90 + 90 + 100;

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        d3.select(this).attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    d3.select("#SVG4").selectAll("rect")
                        .attr("fill", function (d) {
                            if (d.countryCode == currentCountry) {
                                return highlightCol;
                            }
                            else {
                                return "grey"
                            }
                            ;
                        })
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG4").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text(variable4);

        var yAxis4 = d3.svg.axis()
            .scale(yScale4A)
            .orient("left")
            .ticks(5);

        d3.select("#SVG4").append("g")
            .attr("class", "axis")
            .call(yAxis4)
            .attr("transform", "translate(20, 28)");

        d3.select("#sort4").on("click", sort4Click);

        var bars5 = d3.select("#SVG5").selectAll(".bar5")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar5");

        bars5.attr("x", function (d, i) {
            return i * (_svgW / totalCountries.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "countryV";
            })
            .attr("y", function (d, i) {
                var value;
                if (d.var5 != "") {
                    value = _svgH - _yScale5(Number(d.var5))
                }
                else {
                    value = null
                };

                if (value != null) {
                    return value;
                }
                else {
                    return _graphH
                };
            })
            .attr("height", function (d, i) {
                //then index is the location of the bar (nth bar)
                //then have to find right y value for that nth bar
                //and return 0 for where index is < 0;
                var value;
                if (d.var5 != "") {
                    value = _yScale5(Number(d.var5))
                }
                else {
                    value = null};

                if (value != null) {
                    return value;
                }
                else {
                    return 0};
            })
            .attr("fill", "grey")
            .on("mouseover", function (d) {
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                else if(isCountrySelected == true){
                    if(brushOn == true){
                        brushHighlight();
                    }
                }

                d3.select(this).attr("fill", highlightCol);
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 30 + 90 + 90 + 100 + 90;

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        d3.select(this).attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    if(brushOn == false) {
                        d3.select("#SVG5").selectAll("rect")
                            .attr("fill", function (d) {
                                if (d.countryCode == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    return "grey"
                                };
                            })
                    }
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG5").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text(variable5);

        var yAxis5 = d3.svg.axis()
            .scale(yScale5A)
            .orient("left")
            .ticks(5);

        d3.select("#SVG5").append("g")
            .attr("class", "axis")
            .call(yAxis5)
            .attr("transform", "translate(20, 28)");

        d3.select("#sort5").on("click", sort5Click);

        var bars6 = d3.select("#SVG6").selectAll(".bar6")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar6");

        bars6.attr("x", function (d, i) {
            return i * (_svgW / totalCountries.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "countryVI";
            })
            .attr("y", function (d, i) {
                var value = _svgH - _yScale6(Number(d.var6));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                };
            })
            .attr("height", function (d, i) {
                var value = _yScale6(Number(d.var6));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                };
            })
            .attr("fill", "grey")
            .on("mouseover", function (d) {
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                else if(isCountrySelected == true){
                    if(brushOn == true){
                        brushHighlight();
                    }
                }
                d3.select(this).attr("fill", highlightCol);

                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 30 + 90 + 90 + 100 + 90 + 90;

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        d3.select(this).attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    if(brushOn == false) {
                        d3.select("#SVG6").selectAll("rect")
                            .attr("fill", function (d) {
                                if (d.countryCode == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    return "grey"
                                };
                            })
                    }
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG6").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text(variable6)

        var yAxis6 = d3.svg.axis()
            .scale(yScale6A)
            .orient("left")
            .ticks(5);

        d3.select("#SVG6").append("g")
            .attr("class", "axis")
            .call(yAxis6)
            .attr("transform", "translate(20, 28)");

        d3.select("#sort6").on("click", sort6Click);

        var bars7 = d3.select("#SVG7").selectAll(".bar7")
            .data(combinedData)
            .enter()
            .append("rect")
            .attr("class", "bar7");

        bars7.attr("x", function (d, i) {
            return i * (_svgW / totalCountries.length);
        })
            .attr("width", function (d, i) {
                return (_svgW / totalCountries.length)
            })
            .attr("id", function (d, i) {
                return i + "countryVII";
            })
            .attr("y", function (d, i) {
                var value = _svgH - _yScale7(Number(d.var7));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                };
            })
            .attr("height", function (d, i) {
                var value = _yScale7(Number(d.var7));
                if (value > 0) {
                    return value;
                }
                else {
                    return 0
                };
            })
            .attr("fill", "grey")
            .on("mouseover", function (d) {
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        // var _code = parseInt(this.id);
                        // var forIndex = d.countryCode;
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;

                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                    else if (brushOn == true) {
                        var forIndex = d.countryCode;
                        var _code = totalCountries.indexOf(forIndex)
                        _codeForText = _code;
                        codeBar = _code;
                        selectedBar = totalCountries[_code];
                        //display boundary for each element
                        changeColorSort(forIndex);
                        mapColor(selectedBar);
                    }
                }
                else if(isCountrySelected == true){
                    if(brushOn == true){
                        brushHighlight();
                    }
                }

                d3.select(this).attr("fill", highlightCol);
                //tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 30 + 90 + 90 + 100 + 180 + 100;

//Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.name + " ");

//Show the tooltip
                d3.select("#tooltip").classed("hidden", false);

            })
            .on("mouseout", function (d) {
                d3.select("#tooltip").classed("hidden", true);
                if (isCountrySelected == false) {
                    if (brushOn == false) {
                        d3.selectAll(".bar7").attr("fill", "grey");
                    }
                    else{
                        d3.select(this).attr("fill", "grey")
                    }
                }
                else if (isCountrySelected == true) {
                    if(brushOn == false) {
                        d3.select("#SVG7").selectAll("rect")
                            .attr("fill", function (d) {
                                if (d.countryCode == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    return "grey"
                                };
                            })
                    }
                }
            })
            .on("click", function (d) {
                if (isCountrySelected == false) {
                    update(d.countryCode);
                    countryID = d.countryCode;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);

                    isCountrySelected = true;
                }

                else if (isCountrySelected == true) {
                    var formerColored = currentCountry;

                    if (d.countryCode == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                            var codeIndex = codeStorage.indexOf(d.countryCode);
                            isCountrySelected = false;
                            if (codeIndex >= 0) {
                                var _colorCode = valuesInRange[codeIndex];
                                return returnColor(_colorCode);
                            }
                        })
                    }
                    //if a user selects a different country, the coloring changes immediately to reflect change

                    else {
                        update(d.countryCode);
                        countryID = d.countryCode;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                    }
                }
            })
            .attr("transform", "translate(20, 0)");

        d3.select("#SVG7").append("text")
            .attr("x", 320)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("fill", "grey")
            .text("Healthy Life Expectancy");

        var yAxis7 = d3.svg.axis()
            .scale(yScale7A)
            .orient("left")
            .ticks(5);

        d3.select("#SVG7").append("g")
            .attr("class", "axis")
            .call(yAxis7)
            .attr("transform", "translate(20, 28)");

        d3.select("#sort7").on("click", sort7Click);
    }
    return {
        updateYear:_update,
        drawBar:_drawBar,
        getDataBar:_getDataBar
    }
})();
