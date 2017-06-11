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
// var currentData;

//highlight color
var highlightCol = "orange";

function update(d){
    currentCountry = d;
}
//color for highlighting parts of already highlighted regions
var strokeCol = "red";
var strokeWidth = 4;


//scatterplots
function drawScatter(data, variable, variable2){
    d3.select("#SVGScatter").selectAll(".refresh").remove();
    //united states selected for now
    var _dataset = data;
    // console.log(data)
    // currentData = _dataset;

    scatterX = variable;
    scatterY = variable2;

    var _maxY;
    var _maxX;
    var _minY;
    var _minX;
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
        if(brushOn == false) {
            d3.select(this).attr("fill", highlightCol);
        }

            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);

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
        })
        .on("mouseout", function(d){
            //the line below should not run when brush is on
            if(brushOn == false) {
            d3.select(this).attr("fill", "grey");}
            if(brushOn == true){
            }
            d3.select("#tooltipScatter").classed("hidden", true);
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
        .style("font-size", "15px")
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
        .style("font-size", "15px")

        .attr("class", "refresh textY");

    d3.select(".textY")
        .attr("dx", "-15em")
        .attr("dy", "-0.3em")
        .attr("transform", "rotate(-90)")

    //
    //
    // callBrush(minMax);

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
}
var findMin = function(data, criteria){
    var _value = [];
    for(i=0;i<data.length;i++){
        //has to convert each value into numerics (are strings in the original data)
        // data[i][criteria] = Number(data[i][criteria]);

        _value.push(Number(data[i][criteria]))

    }
    return d3.min(_value)
}

var drawBar = function (data, max, min, variable, variable2, variable3, variable4, variable5, variable6, variable7){
    var _graphH = 80;
    var _countryID = countryID;
    var reset1, reset2, reset3, reset4, reset5, reset6, reset7;
        reset1 = reset2 = reset3 = reset4= reset5=reset6=reset7 = 0;
    var _dataset = data;

    d3.select("#SVG1").selectAll("*").remove();
    d3.select("#SVG2").selectAll("*").remove();
    d3.select("#SVG3").selectAll("*").remove();
    d3.select("#SVG4").selectAll("*").remove();
    d3.select("#SVG5").selectAll("*").remove();
    d3.select("#SVG6").selectAll("*").remove();
    d3.select("#SVG7").selectAll("*").remove();

    var _maxY = max[0];
    var _minY = min[0];

    var _maxY2 = max[1];
    var _minY2 = min[1];

    var _maxY3 = max[2];
    var _minY3 = min[2];

    var _maxY4 = max[3];
    var _minY4 = min[3];

    var _maxY5 = max[4];
    var _minY5 = min[4];

    var _maxY6 = max[5];
    var _minY6 = min[5];

    var _maxY7 = max[6];
    var _minY7 = min[6];

        var _yScale = d3.scale.linear()
            .domain([_minY, _maxY])
            .range([0, _graphH * 0.65]);

        var _yScale2 = d3.scale.linear()
            .domain([_minY2, _maxY2])
            .range([0, _graphH * 0.65]);

        var _yScale3 = d3.scale.linear()
            .domain([_minY3, _maxY3])
            .range([0, _graphH * 0.65]);

        var _yScale4 = d3.scale.linear()
            .domain([_minY4, _maxY4])
            .range([0, _graphH * 0.65]);

        var _yScale5 = d3.scale.linear()
            .domain([_minY5, _maxY5])
            .range([0, _graphH * 0.65]);

        var _yScale6 = d3.scale.linear()
            .domain([_minY6, _maxY6])
            .range([0, _graphH * 0.65]);

        var _yScale7 = d3.scale.linear()
            .domain([_minY7, _maxY7])
            .range([0, _graphH * 0.65]);

    var resetSort;

    function sort(mainBarNum, variable, dyScale){

        var svgNum = [1,2,3,4,5,6,7];
        var mainBar, mainBarClass;
        var resets = reset1+reset2+reset3+reset4+reset5+reset6+reset7;

        var sorted =[];

        mainBar = "#SVG" + mainBarNum;
        mainBarClass = ".bar" + mainBarNum;

        //change numbers inside svgNum based on mainBarNum
        for (i=0;i<svgNum.length;i++) {
            if(mainBarNum == svgNum[i]) {
                svgNum.splice(i, 1);
            }
        }

        if(mainBarNum == 1){
            resetSort = reset1;
        }else if(mainBarNum == 2){
            resetSort = reset2;
        }else if(mainBarNum == 3){
            resetSort = reset3;
        }else if(mainBarNum == 4){
            resetSort = reset4;
        }else if(mainBarNum == 5){
            resetSort = reset5;
        }else if(mainBarNum == 6){
            resetSort = reset6;
        }else if(mainBarNum == 7){
            resetSort = reset7;
        };

        //names array has all the country code in the order of sorted main bar graph

        sortItems = function (a, b) {
            // sorted.push({var1: a[variable] - b[variable]});
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
        if(resetSort == 0) {
            //if mainBar is bar2, make this below run.
            //and prevent bar2 from the lines farther below from running
            d3.select(mainBar).selectAll(mainBarClass)
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                   //sort works fine. the problem is it is not represented in the graph correctly
                    d.sortCode = i;
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d){
                    return _svgH - dyScale(Number(d[variable]));
                })
                .attr("height", function(d) {
                    if (dyScale(Number(d[variable])) > 0) {
                        return dyScale(Number(d[variable]));
                    }
                });

    if(mainBar != "#SVG1") {
        d3.select("#SVG1").selectAll(".bar1")
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {

                return i * (_svgW / combinedData.length)
            })
            // .attr("y", function(d){
            //     return _svgH - _yScale(Number(d["var1"]));
            // })
            // .attr("height", function(d) {
            //     var value = _yScale(Number(d["var1"]));
            //     if (value > 0) {
            //         return value;
            //     }
            // });
    }
    if(mainBar != "#SVG2") {
        d3.select("#SVG2").selectAll(".bar2")
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            // .attr("y", function(d){
            //     return _svgH - _yScale2(Number(d["var2"]));
            // })
            // .attr("height", function(d) {
            //     var value = _yScale2(Number(d["var2"]));
            //     if (value > 0) {
            //         return value;
            //     }
            // });
    }
    if(mainBar != "#SVG3") {
        d3.select("#SVG3").selectAll(".bar3")
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            // .attr("y", function (d) {
            //     return _svgH - _yScale3(Number(d["var3"]));
            // })
            // .attr("height", function (d) {
            //     var value = _yScale3(Number(d["var3"]));
            //     if (value > 0) {
            //         return value;
            //     }
            // });
    }
     if(mainBar != "#SVG4") {
         d3.select("#SVG4").selectAll(".bar4")
             .sort(sortAccordingly)
             .transition()
             .duration(1000)
             .attr("x", function (d, i) {
                 return i * (_svgW / combinedData.length)
             })
             // .attr("y", function (d) {
             //     return _svgH - _yScale4(Number(d["var4"]));
             // })
             // .attr("height", function (d) {
             //     var value = _yScale4(Number(d["var4"]));
             //     if (value > 0) {
             //         return value;
             //     }
             // });

     }
    if(mainBar != "#SVG5") {
        d3.select("#SVG5").selectAll(".bar5")
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            // .attr("y", function (d) {
            //     return _svgH - _yScale5(Number(d["var5"]));
            // })
            // .attr("height", function (d) {
            //     var value = _yScale5(Number(d["var5"]));
            //     if (value > 0) {
            //         return value;
            //     }
            // });
    }
    if(mainBar != "#SVG6") {
        d3.select("#SVG6").selectAll(".bar6")
            .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            // .attr("y", function (d) {
            //     return _svgH - _yScale6(Number(d["var6"]));
            // })
            // .attr("height", function (d) {
            //     var value = _yScale6(Number(d["var6"]));
            //     if (value > 0) {
            //         return value;
            //     }
            // });
        }
    if(mainBar != "#SVG7") {
                d3.select("#SVG7").selectAll(".bar7")
                    .sort(sortAccordingly)
                    .transition()
                    .duration(1000)
                    .attr("x", function (d, i) {
                        return i * (_svgW / combinedData.length)
                    })
                    .attr("y", function (d) {
                        return _svgH - _yScale7(Number(d["var7"]));
                    })
                    .attr("height", function (d) {
                        var value = _yScale7(Number(d["var7"]));
                        if (value > 0) {
                            return value;
                        }
                    });
            }
            if (mainBarNum == 1) {
                reset1 = 1;
            } else if (mainBarNum == 2) {
                reset2 = 1;
            }else if (mainBarNum == 3) {
                reset3 = 1;
            }else if (mainBarNum == 4) {
                reset4 = 1;
            }else if (mainBarNum == 5) {
                reset5 = 1;
            }else if (mainBarNum == 6) {
                reset6 = 1;
            }else if (mainBarNum == 7) {
                reset7 = 1;
            };

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
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.sortCode = i;
                    return i * (_svgW / combinedData.length)
                });

            d3.select("#SVG" + svgNum[0]).selectAll(".bar" + svgNum[0])
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                });
            d3.select("#SVG" + svgNum[1]).selectAll(".bar" + svgNum[1])
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                });
            d3.select("#SVG" + svgNum[2]).selectAll(".bar" + svgNum[2])
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                });

            d3.select("#SVG" + svgNum[3]).selectAll(".bar" + svgNum[3])
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                });
            d3.select("#SVG" + svgNum[4]).selectAll(".bar" + svgNum[4])
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                });
            d3.select("#SVG" + svgNum[5]).selectAll(".bar" + svgNum[5])
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                });

            if (mainBarNum == 1) {
                reset1 = 0;
            } else if (mainBarNum == 2) {
                reset2 = 0;
            }else if (mainBarNum == 3) {
                reset3 = 0;
            }else if (mainBarNum == 4) {
                reset4 = 0;
            }else if (mainBarNum == 5) {
                reset5 = 0;
            }else if (mainBarNum == 6) {
                reset6 = 0;
            }else if (mainBarNum == 7) {
                reset7 = 0;
            };
        }
//
    }
    function sort1Click(){sort(1, "var1", _yScale)};
    function sort2Click(){sort(2, "var2", _yScale2)};
    function sort3Click(){sort(3, "var3", _yScale3)};
    function sort4Click(){sort(4, "var4", _yScale4)};
    function sort5Click(){sort(5, "var5", _yScale5)};
    function sort6Click(){sort(6, "var6", _yScale6)};
    function sort7Click(){sort(7, "var7", _yScale7)};

    var currentCountryArray = [];
    for(i=0;i<_dataset.length;i++){
        var currentCode = _dataset[i]["Country Code"];
        if(currentCountryArray.indexOf(currentCode) < 0) {
            currentCountryArray.push(currentCode);
        }
        else{};
    }

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
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "barI";
        })
        .attr("y", function(d, i) {
            //if i == totalCountries.indexOf(data[i]["Country Code"] it gets the value
            //there will be 30+ countries

            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;

            //so far, I know which bar should get values and which bar should not
            //but i do not know how I can specify that specific bar
            var value = _svgH - _yScale(Number(d.var1));
            if(value > 0) {
                return value;
            }
            else {return 0};

        })
        .attr("height", function(d, i) {
            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;
            var value = _yScale(Number(d.var1));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")

    d3.select("#SVG1").selectAll(".bar1")
        //using 160+ country names;
        .on("mouseover", function(d){
        if(brushOn == false) {
            var forIndex = d.countryCode;
            var _code = totalCountries.indexOf(forIndex)

            _codeForText = _code;
            d3.select(this).attr("fill", highlightCol);
            codeBar = _code;
            selectedBar = totalCountries[_code];
            changeColorSort(forIndex);
            mapColor(selectedBar);
        }
        else if(brushOn == true) {
            var forIndex = d.countryCode;
            var _code = totalCountries.indexOf(forIndex)
            _codeForText = _code;
            codeBar = _code;
            selectedBar = totalCountries[_code];
            //display boundary for each element
            changeColorSort(forIndex);
            mapColor(selectedBar);
        }
        //tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) ;
        var yPosition = parseFloat(d3.select(this).attr("y"));

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
        .on("mouseout", function(d){
            if(brushOn == false){
                d3.select(this).attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
        })
    d3.select("#SVG1").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text("Happiness Score")

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
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "barII";
        })
        .attr("y", function(d, i) {
            //if i == totalCountries.indexOf(data[i]["Country Code"] it gets the value
            //there will be 30+ countries

            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;

            //so far, I know which bar should get values and which bar should not
            //but i do not know how I can specify that specific bar
            var value = _svgH - _yScale2(Number(d.var2));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("height", function(d, i) {
            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;
            var value = _yScale2(Number(d.var2));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")

    d3.select("#SVG2").selectAll(".bar2")
    //using 160+ country names;
        .on("mouseover", function(d){
            if(brushOn == false) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                d3.select(this).attr("fill", highlightCol);
                codeBar = _code;
                selectedBar = totalCountries[_code];
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            else if(brushOn == true) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                codeBar = _code;
                selectedBar = totalCountries[_code];
                //display boundary for each element
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90;

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
        .on("mouseout", function(d){
            if(brushOn == false){
                d3.select(this).attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
        })
    d3.select("#SVG2").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable2)

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
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "barIII";
        })
        .attr("y", function(d, i) {
            //if i == totalCountries.indexOf(data[i]["Country Code"] it gets the value
            //there will be 30+ countries

            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;

            //so far, I know which bar should get values and which bar should not
            //but i do not know how I can specify that specific bar
            var value = _svgH - _yScale3(Number(d.var3));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("height", function(d, i) {
            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;
            var value = _yScale3(Number(d.var3));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")

    d3.select("#SVG3").selectAll(".bar3")
    //using 160+ country names;
        .on("mouseover", function(d){
            if(brushOn == false) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                d3.select(this).attr("fill", highlightCol);
                codeBar = _code;
                selectedBar = totalCountries[_code];
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            else if(brushOn == true) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                codeBar = _code;
                selectedBar = totalCountries[_code];
                //display boundary for each element
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90;

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
        .on("mouseout", function(d){
            if(brushOn == false){
                d3.select(this).attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
        })
    d3.select("#SVG3").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text("GINI index")

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
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "countryIV";
        })
        .attr("y", function(d, i) {
            var value = _svgH - _yScale4(Number(d.var4));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("height", function(d, i) {
            var value = _yScale4(Number(d.var4));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            if(brushOn == false) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                d3.select(this).attr("fill", highlightCol);
                codeBar = _code;
                selectedBar = totalCountries[_code];
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            else if(brushOn == true) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                codeBar = _code;
                selectedBar = totalCountries[_code];
                //display boundary for each element
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d.name + " ");

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            if(brushOn == false) {
                d3.select(this).attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
        })

    d3.select("#SVG4").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable4)

    d3.select("#sort4").on("click", sort4Click);

    var bars5 = d3.select("#SVG5").selectAll(".bar5")
        .data(combinedData)
        .enter()
        .append("rect")
        .attr("class", "bar5");

    bars5.attr("x", function (d, i) {
        return i * (_svgW / totalCountries.length);
    })
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "countryV";
        })
        .attr("y", function(d, i) {
            var value = _svgH - _yScale5(Number(d.var5));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("height", function(d, i) {
            //then index is the location of the bar (nth bar)
            //then have to find right y value for that nth bar
            //and return 0 for where index is < 0;
            var value = _yScale5(Number(d.var5));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            if(brushOn == false) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                d3.select(this).attr("fill", highlightCol);
                codeBar = _code;
                selectedBar = totalCountries[_code];
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            else if(brushOn == true) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                codeBar = _code;
                selectedBar = totalCountries[_code];
                //display boundary for each element
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100 + 90;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d.name + " ");

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            if(brushOn == false) {
                d3.select(this).attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
        })
    d3.select("#SVG5").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable5)

    d3.select("#sort5").on("click", sort5Click);

    var bars6 = d3.select("#SVG6").selectAll(".bar6")
        .data(combinedData)
        .enter()
        .append("rect")
        .attr("class", "bar6");

    bars6.attr("x", function (d, i) {
        return i * (_svgW / totalCountries.length);
    })
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "countryVI";
        })
        .attr("y", function(d, i) {
            var value = _svgH - _yScale6(Number(d.var6));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("height", function(d, i) {
            var value = _yScale6(Number(d.var6));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            if(brushOn == false) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                d3.select(this).attr("fill", highlightCol);
                codeBar = _code;
                selectedBar = totalCountries[_code];
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            else if(brushOn == true) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                codeBar = _code;
                selectedBar = totalCountries[_code];
                //display boundary for each element
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100 + 90 + 90;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d.name + " ");

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            if(brushOn == false) {
                d3.select(this).attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
            })
    d3.select("#SVG6").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable6)

    d3.select("#sort6").on("click", sort6Click);

    var bars7 = d3.select("#SVG7").selectAll(".bar7")
        .data(combinedData)
        .enter()
        .append("rect")
        .attr("class", "bar7");

    bars7.attr("x", function (d, i) {
        return i * (_svgW / totalCountries.length);
    })
        .attr("width", function(d,i) {return (_svgW / totalCountries.length)})
        .attr("id", function(d, i){
            return i+ "countryVII";
        })
        .attr("y", function(d, i) {
            var value = _svgH - _yScale7(Number(d.var7));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("height", function(d, i) {
            var value = _yScale7(Number(d.var7));
            if(value > 0) {
                return value;
            }
            else {return 0};
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            if(brushOn == false) {
                // var _code = parseInt(this.id);
                // var forIndex = d.countryCode;
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                d3.select(this).attr("fill", highlightCol);
                codeBar = _code;
                selectedBar = totalCountries[_code];
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            else if(brushOn == true) {
                var forIndex = d.countryCode;
                var _code = totalCountries.indexOf(forIndex)
                _codeForText = _code;
                codeBar = _code;
                selectedBar = totalCountries[_code];
                //display boundary for each element
                changeColorSort(forIndex);
                mapColor(selectedBar);
            }
            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100 + 180 + 100;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d.name + " ");

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            if(brushOn == false) {
                d3.selectAll(".bar7").attr("fill", "grey");
                d3.select("#tooltip").classed("hidden", true);
            }
        })
    d3.select("#SVG7").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text("Healthy Life Expectancy")

    d3.select("#sort7").on("click", sort7Click);

};
//this runs when year changes from the slider
function updateBar(data, max, min, variable, variable2, variable3, variable4, variable5, variable6, variable7){
    var _graphH = 80;
    currentData = data;
    var codeBar;

    var _maxY = max[0];
    var _minY = min[0];

    var _maxY2 = max[1];
    var _minY2 = min[1];

    var _maxY3 = max[2];
    var _minY3 = min[2];

    var _maxY4 = max[3];
    var _minY4 = min[3];

    var _maxY5 = max[4];
    var _minY5 = min[4];

    var _maxY6 = max[5];
    var _minY6 = min[5];

    var _maxY7 = max[6];
    var _minY7 = min[6];

    var _yScale = d3.scale.linear()
        .domain([_minY, _maxY])
        .range([0, _graphH * 0.65]);

    var _yScale2 = d3.scale.linear()
        .domain([_minY2, _maxY2])
        .range([0, _graphH * 0.65]);

    var _yScale3 = d3.scale.linear()
        .domain([_minY3, _maxY3])
        .range([0, _graphH * 0.65]);

    var _yScale4 = d3.scale.linear()
        .domain([_minY4, _maxY4])
        .range([0, _graphH * 0.65]);

    var _yScale5 = d3.scale.linear()
        .domain([_minY5, _maxY5])
        .range([0, _graphH * 0.65]);

    var _yScale6 = d3.scale.linear()
        .domain([_minY6, _maxY6])
        .range([0, _graphH * 0.65]);

    var _yScale7 = d3.scale.linear()
        .domain([_minY7, _maxY7])
        .range([0, _graphH * 0.65]);

    // var currentCountryArray = [];
    // for(i=0;i<currentData.length;i++){
    //     var currentCode = currentData[i]["Country Code"];
    //     if(currentCountryArray.indexOf(currentCode) < 0) {
    //         currentCountryArray.push(currentCode);
    //     }
    //     else{};
    // }


//the error seems to occur when a user sorts a bar chart and changes the year without re-sorting the chart in the
// alphabetical order
// so I will try to sort back to alphabetical order regardless of whichever order it is currently being displayed
// whenever a user changes a year value

        sortAccordingly = function(a,b) {
            return a["name"] - b["name"];
        }
            d3.select("#SVG1").selectAll(".bar1")
                .data(combinedData)
                // .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / combinedData.length)
                })
                .attr("y", function(d, i) {
                        var value = _svgH - _yScale(Number(d.var1));
                    if(value>0){return value}
                    else{return 0;}
                })
                .attr("height", function(d, i) {
                    var value = _yScale(Number(d.var1));
                    if(value>0){return value}
                    else{return 0};
                });

        d3.select("#SVG2").selectAll(".bar2")
            .data(combinedData)
            // .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d, i) {
                var value = _svgH - _yScale2(Number(d.var2));
                if(value>0){return value}
                else{return 0};
            })
            .attr("height", function(d, i) {
                var value = _yScale2(Number(d.var2));
                if(value>0){return value}
                else{return 0};
            });

        d3.select("#SVG3").selectAll(".bar3")
            .data(combinedData)
            // .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d, i) {
                var value = _svgH - _yScale3(Number(d.var3));
                if(value>0){return value}
                else{return 0};
            })
            .attr("height", function(d, i) {
                var value = _yScale3(Number(d.var3));
                if(value>0){return value}
                else{return 0};
            });

        d3.select("#SVG4").selectAll(".bar4")
            .data(combinedData)
            // .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d, i) {
                var value = _svgH - _yScale4(Number(d.var4));
                if(value>0){return value}
                else{return 0};
            })
            .attr("height", function(d, i) {
                var value = _yScale4(Number(d.var4));
                if(value>0){return value}
                else{return 0};
            });

        d3.select("#SVG5").selectAll(".bar5")
            .data(combinedData)
            // .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d, i) {
                var value = _svgH - _yScale5(Number(d.var5));
                if(value>0){return value}
                else{return 0};
            })
            .attr("height", function(d, i) {
                var value = _yScale5(Number(d.var5));
                if(value>0){return value}
                else{return 0};
            });

        d3.select("#SVG6").selectAll(".bar6")
            .data(combinedData)
            // .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d, i) {
                var value = _svgH - _yScale6(Number(d.var6));
                if(value>0){return value}
                else{return 0};
            })
            .attr("height", function(d, i) {
                var value = _yScale6(Number(d.var6));
                if(value>0){return value}
                else{return 0};
            });

        d3.select("#SVG7").selectAll(".bar7")
            .data(combinedData)
            // .sort(sortAccordingly)
            .transition()
            .duration(1000)
            .attr("x", function (d, i) {
                return i * (_svgW / combinedData.length)
            })
            .attr("y", function(d, i) {
                var value = _svgH - _yScale7(Number(d.var7));
                if(value>0){return value}
                else{return 0};
            })
            .attr("height", function(d, i) {
                var value = _yScale7(Number(d.var7));
                if(value>0){return value}
                else{return 0};
            });
}


//changes color for every element on screen ( map, bar chart, scatterplot ) according to change in one of those charts
function changeColor(currentCountry) {
    // if brushOn == false, change color
    //if brushOn == true, display tooltip without changing color
    if (brushOn == false) {
        d3.select("#SVG1").selectAll(".bar1")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })

        d3.select("#SVG2").selectAll(".bar2")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })

        d3.select("#SVG3").selectAll(".bar3")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
        d3.select("#SVG4").selectAll(".bar4")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
        d3.select("#SVG5").selectAll(".bar5")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
        d3.select("#SVG6").selectAll(".bar6")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
        d3.select("#SVG7").selectAll(".bar7")
            .attr("fill", function (d) {
                if (d["countryCode"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })

        d3.select("#SVGScatter").selectAll("circle")
            .attr("fill", function (d) {
                if (d["Country Code"] == currentCountry) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
    }
    else if(brushOn == true) {
        d3.select("#SVG1").selectAll(".bar")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);

        d3.select("#SVG2").selectAll(".bar2")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);

        d3.select("#SVG3").selectAll(".bar3")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG4").selectAll(".bar4")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG5").selectAll(".bar5")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG6").selectAll(".bar6")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG7").selectAll(".bar7")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);


        d3.select("#SVGScatter").selectAll("circle")
            .attr("stroke", function (d, i) {
                if (d["Country Code"] == currentCountry) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
    }

}
function changeColorSort(codeBar){
    //select bars
    // if(brushOn == false) {
    // d3.select("#SVG1").selectAll(".bar1")
    //     .attr("fill", function(d, i){
    //         if (i == codeBar) {
    //             return highlightCol;
    //         }
    //         else{
    //             return "grey"
    //         }
    //     })
    if(brushOn == false) {
    d3.select("#SVG1").selectAll(".bar1")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG2").selectAll(".bar2")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG3").selectAll(".bar3")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG4").selectAll(".bar4")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG5").selectAll(".bar5")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG6").selectAll(".bar6")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG7").selectAll(".bar7")
        .attr("fill", function(d){
            if (d.countryCode == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        });


        d3.select("#SVGScatter").selectAll("circle")
            .attr("fill", function (d, i) {
                if (i == codeBar) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
    }
    else if(brushOn == true) {
        d3.select("#SVG1").selectAll(".bar")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);

        d3.select("#SVG2").selectAll(".bar2")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);

        d3.select("#SVG3").selectAll(".bar3")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG4").selectAll(".bar4")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG5").selectAll(".bar5")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG6").selectAll(".bar6")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG7").selectAll(".bar7")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);


        d3.select("#SVGScatter").selectAll("circle")
            .attr("stroke", function (d, i) {
                if (i == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
    }
}
function brushHighlight(){
    var _code = [];
    var _ID = [];
    d3.select("#SVGScatter").selectAll(".hidden")
        .attr("fill", function(d)
        {
            _code.push(d["code"]);
            _ID.push(d["Country Code"]);
        })

    d3.select("#SVG1").selectAll(".bar1")
        .attr("fill", function(d){

            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG2").selectAll(".bar2")
        .attr("fill", function(d, i){
            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG3").selectAll(".bar3")
        .attr("fill", function(d, i){
            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG4").selectAll(".bar4")
        .attr("fill", function(d, i){
            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG5").selectAll(".bar5")
        .attr("fill", function(d, i){
            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG6").selectAll(".bar6")
        .attr("fill", function(d, i){
            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG7").selectAll(".bar7")
        .attr("fill", function(d, i){
            var index = _ID.indexOf(d.countryCode);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#map").selectAll(".unit").style("fill",function(d, i){
        var index = _ID.indexOf(d.id);
        if (index >= 0) {
            //the problem is, the countries with null values are also being selected because they are also NOT IN the _ID.
            var codeIndex = codeStorage.indexOf(d.id);
            if (codeIndex >= 0) {
                var _colorCode = valuesInRange[codeIndex];

                return returnColor(_colorCode);
            }
        }
        else {
            var codeIndex = codeStorage.indexOf(d.id);
            if (codeIndex >= 0) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return highlightCol;
        }}
    });
}
