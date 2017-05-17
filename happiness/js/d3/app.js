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
// function syncData(d){
//     currentData = d;
// }
//scatterplots
function drawScatter(data, variable, variable2){
    d3.select("#SVGScatter").selectAll(".refresh").remove();
    //united states selected for now
    var _dataset = data;
    //
    // currentData = _dataset;

    scatterX = variable;
    scatterY = variable2;

    var _maxY;
    var _maxX;
    var _minY;
    var _minX;
    var _scatterH = 280;
    var _padding = 60;
    var _paddingV = 100;

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
        .attr("transform", "translate(" + _padding + ", 0)")
        .attr("id", "yAxisScatter")
        .attr("class", "axis refresh");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');

    d3.select("#SVGScatter")
        .append("g")
        .call(xAxis)
        .attr("transform", "translate(" + _padding + "," + _scatterH + ")")
        .attr("id","xAxisScatter")
        .attr("class", "axis refresh");

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
        .attr("r", 5)
        .attr("fill","grey")
        .on("mouseover", function(d){

            d3.select(this).attr("fill", highlightCol);
            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);

            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("cx"));
            var yPosition = parseFloat(d3.select(this).attr("cy")) + 330;
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
            d3.select(this).style("fill", "grey");
            d3.select("#tooltipScatter").classed("hidden", true);
        })
        .attr("transform", "translate(" + _padding + ", 0)")
        .attr("class", "refresh");

    //text labels
    d3.select("#SVGScatter")
        .append("text")
        .attr("x", 250)
        .attr("y", _scatterH - 20 )
        .text(function(d){
            if(variable == "Life Ladder"){return "Happiness Score"}
            else if(variable == "gini of household income reported in Gallup, by wp5-year") {return "GINI Index"}
            else{return variable}})
        .attr("class", "refresh");

    d3.select("#SVGScatter")
        .append("text")
        .attr("x", 0)
        .attr("y", 40)
        .text(function(d){
            if(variable2 == "Life Ladder"){return "Happiness Score"}
            else if(variable2 == "gini of household income reported in Gallup, by wp5-year") {return "GINI Index"}
            else{return variable2}})
        .attr("class", "refresh textY");

    d3.select(".textY")
        .attr("dx", "-15em")
        .attr("dy", "-.5em")
        .attr("transform", "rotate(-90)")

    callBrush(minMax);

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
function receiveMaxMin(max, min){

}
var drawBar = function (data, max, min, variable, variable2, variable3, variable4, variable5, variable6, variable7){
    var _graphH = 80;
    var _countryID = countryID;

    var reset = 0;
    var reset2 = 0;
    var reset3 = 0;
    var reset4 = 0;
    var reset5 = 0;
    var reset6 = 0;
    var reset7 = 0;

var _dataset = data;
// currentData = data;

        d3.select("#SVG1").selectAll("*").remove();
        d3.select("#SVG2").selectAll("*").remove();
        d3.select("#SVG3").selectAll("*").remove();
        d3.select("#SVG4").selectAll("*").remove();
        d3.select("#SVG5").selectAll("*").remove();
        d3.select("#SVG6").selectAll("*").remove();
        d3.select("#SVG7").selectAll("*").remove();

        // var _maxY = findMax(data, variable);
        // var _minY = findMin(data, variable);
        //
        // var _maxY2 = findMax(data, variable2);
        // var _minY2 = findMin(data, variable2);
        // console.log(_maxY2)
        // console.log(_minY2)
        //
        // var _maxY3 = findMax(data, variable3);
        // var _minY3 = findMin(data, variable3);
        //
        // var _maxY4 = findMax(data, variable4);
        // var _minY4 = findMin(data, variable4);
        //
        // var _maxY5 = findMax(data, variable5);
        // var _minY5 = findMin(data, variable5);
        //
        // var _maxY6 = findMax(data, variable6);
        // var _minY6 = findMin(data, variable6);
        //
        // var _maxY7 = findMax(data, variable7);
        // var _minY7 = findMin(data, variable7);

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


    var bars = d3.select("#SVG1").selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")

        .attr("class", "bar");

    bars.attr("y", function(d, i) {return _svgH - _yScale(Number(data[i][variable]))})
        .attr("height", function(d, i) { if(Number(data[i][variable]) > 0) {
            return _yScale(Number(data[i][variable]))
        }})
        .attr("x", function (d, i) {return i * (_svgW / data.length)})
        .attr("width", function(d,i) {return (_svgW / data.length)})
        .attr("fill", "grey")

        .on("mouseover", function(d){

            d3.select(this).attr("fill", "orange");
                codeBar = d["code"];
                selectedBar = d["Country Code"];
                changeColorSort(codeBar);
                mapColor(selectedBar);

            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) - 30;
//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d["country"]);

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            //is it because of this.
            d3.select(this).attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })


    d3.select("#SVG1").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text("Happiness Score")



    d3.select("#sort1").on("click", sort1);

    //function for sorting bar graphs
    function sort1(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable] - b[variable];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
        // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
if(reset == 0) {
    d3.select("#SVG1").selectAll(".bar")
        .sort(sortItems)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
            d.code = i;
            // namesArray.push((d["Country Code"]));
            return i * (_svgW / _dataset.length);
        });


    d3.select("#SVG2").selectAll(".bar2")
        .sort(sortAccordingly)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        });

    d3.select("#SVG3").selectAll(".bar3")
        .sort(sortAccordingly)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        });
    d3.select("#SVG4").selectAll(".bar4")
        .sort(sortAccordingly)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        });
    d3.select("#SVG5").selectAll(".bar5")
        .sort(sortAccordingly)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        });
    d3.select("#SVG6").selectAll(".bar6")
        .sort(sortAccordingly)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        });
    d3.select("#SVG7").selectAll(".bar7")
        .sort(sortAccordingly)
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        });
    reset = 1;
}
        else if(reset == 1){
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            reset = 0;
        }

        // changeColor(selectedBar);
    }

    var bars2 = d3.select("#SVG2").selectAll(".bar2")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar2");

    bars2.attr("y", function(d, i) {
        return _svgH - _yScale2(Number(data[i][variable2]))})
        .attr("height", function(d, i) {
            //null values are not processed correctly
            //min is 6, but null values are 0. so there goes the error.
            if(Number(data[i][variable2]) > 0) {
                return _yScale2(Number(data[i][variable2]))
            }
            })
        .attr("x", function (d, i) {
            return i * (_svgW / _dataset.length)
        })
        .attr("width", function (d, i) {
            return (_svgW / _dataset.length)
        })
        .attr("fill", "grey")
        .attr("id", function (d, i) {
            return "second" + i;
        }).on("mouseover", function(d){

        d3.select(this).attr("fill", highlightCol);
        codeBar = d["code"];
        selectedBar = d["Country Code"];
        changeColorSort(codeBar);
        mapColor(selectedBar);

        //tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
        var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90;

//Update the tooltip position and value
        d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(d["country"]);

//Show the tooltip
        d3.select("#tooltip").classed("hidden", false);

    })
        .on("mouseout", function(d){

            d3.select(this).attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })

    d3.select("#SVG2").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable2)

    d3.select("#sort2").on("click", sort2);


    //function for sorting bar graphs
    function sort2(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable2] - b[variable2];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
            // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
        if (reset2 == 0) {
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
                    d.code = i;
                    namesArray.push((d["Country Code"]));

                    return i * (_svgW / _dataset.length);
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            reset2 = 1;
        }
        else{
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });



            reset2 = 0;
        }
    }
    var bars3 = d3.select("#SVG3").selectAll(".bar3")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar3");

    bars3.attr("y", function(d, i) {
        if(data[i][variable3]>0){
        return _svgH - _yScale3(data[i][variable3])}
        else{return 0};
        })
        .attr("height", function(d, i) {

            if(data[i][variable3]>0){
                return _yScale3(data[i][variable3])}
            else{return 0};
        })

        .attr("x", function (d, i) {
            return i * (_svgW / data.length)
        })
        .attr("width", function (d, i) {
            return (_svgW / data.length)
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            d3.select(this).attr("fill", highlightCol);
            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);

            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d["country"]);

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            d3.select(this).attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })

    d3.select("#SVG3").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text("GINI index")

    d3.select("#sort3").on("click", sort3);


    //function for sorting bar graphs
    function sort3(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable3] - b[variable3];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
            // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
        if (reset3 == 0) {
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
                    d.code = i;

                    return i * (_svgW / _dataset.length);
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            reset3 = 1;
        }
        else{
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            reset3 = 0;
        }
    }

    var bars4 = d3.select("#SVG4").selectAll(".bar4")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar4");

    bars4.attr("y", function(d, i) { return _svgH - _yScale4(data[i][variable4])})
        .attr("height", function(d, i) { if(Number(data[i][variable4]) > 0) {
            return _yScale4(data[i][variable4])
        }})
        .attr("x", function (d, i) {
            return i * (_svgW /data.length)
        })
        .attr("width", function (d, i) {
            return (_svgW /data.length)
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            d3.select(this).attr("fill", highlightCol);
            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);

            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d["country"]);

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            d3.select(this).attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })

    d3.select("#SVG4").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable4)

    d3.select("#sort4").on("click", sort4);


    //function for sorting bar graphs
    function sort4(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable4] - b[variable4];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
            // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
        if (reset4 == 0) {
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
                    d.code = i;
                    namesArray.push((d["Country Code"]));

                    return i * (_svgW / _dataset.length);
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            reset4 = 1;
        }
        else{
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            reset4 = 0;
        }
    }

    var bars5 = d3.select("#SVG5").selectAll(".bar5")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar5");

    bars5.attr("y", function(d, i) {
        if(data[i][variable5]>0){
            return _svgH - _yScale5(data[i][variable5])}
        else{return 0};
    })
        .attr("height", function(d, i) {

            if(data[i][variable5]>0){
                return _yScale5(data[i][variable5])}
            else{return 0};
        })
        .attr("x", function (d, i) {
            return i * (_svgW / data.length);
        })
        .attr("width", function (d, i) {
            return (_svgW / data.length)
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            d3.select(this).attr("fill", highlightCol);
            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);

            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100 + 90;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d["country"]);

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            d3.select(this).attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })
    d3.select("#SVG5").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable5)


    d3.select("#sort5").on("click", sort5);


    //function for sorting bar graphs
    function sort5(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable5] - b[variable5];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
            // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
        if (reset5 == 0) {
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
                    d.code = i;
                    namesArray.push((d["Country Code"]));

                    return i * (_svgW / _dataset.length);
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            reset5 = 1;
        }
        else{
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            reset5 = 0;
        }
    }

    var bars6 = d3.select("#SVG6").selectAll(".bar6")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar6");

    bars6.attr("y", function (d, i) { return _svgH - _yScale6(data[i][variable6])})
        .attr("height", function(d, i) { if(Number(data[i][variable6]) > 0) {
            return _yScale6(data[i][variable6])
        }})
        .attr("x", function (d, i) {
            return i * (_svgW /data.length) ;
        })
        .attr("width", function (d, i) {
            return (_svgW /data.length)
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            d3.select(this).attr("fill", highlightCol);
            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);

            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100 + 90 + 90;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d["country"]);

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            d3.select(this).attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })
    d3.select("#SVG6").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(variable6)

    d3.select("#sort6").on("click", sort6);


    //function for sorting bar graphs
    function sort6(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable6] - b[variable6];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
            // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
        if (reset6 == 0) {
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
                    d.code = i;
                    namesArray.push((d["Country Code"]));

                    return i * (_svgW / _dataset.length);
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            reset6 = 1;
        }
        else{
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG5").selectAll(".bar5")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            reset6 = 0;
        }
    }
    var bars7 = d3.select("#SVG7").selectAll(".bar7")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar7");

    bars7.attr("y", function (d, i) { return _svgH - _yScale7(data[i][variable7])})
        .attr("height", function(d, i) { if(Number(data[i][variable7]) > 0) {
            return _yScale7(data[i][variable7])
        }})
        .attr("x", function (d, i) {
            return i * (_svgW /data.length) ;
        })
        .attr("width", function (d, i) {
            return (_svgW /data.length)
        })
        .attr("fill", "grey")
        .on("mouseover", function(d){
            d3.select(this).attr("fill", highlightCol);
            codeBar = d["code"];
            selectedBar = d["Country Code"];
            changeColorSort(codeBar);
            mapColor(selectedBar);



            //tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) - 10;
            var yPosition = parseFloat(d3.select(this).attr("y")) -30 + 90 + 90 + 100 + 180 + 100;

//Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text(d["country"]);

//Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function(d){
            d3.selectAll(".bar7").attr("fill", "grey");
            d3.select("#tooltip").classed("hidden", true);
        })
    d3.select("#SVG7").append("text")
        .attr("x", 320)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("fill", "grey")
        .text("Healthy Life Expectancy")

    d3.select("#sort7").on("click", sort7);


    //function for sorting bar graphs
    function sort7(){
        //names array has all the country code in the order of sorted main bar graph
        var names = [];
        var namesArray = [];
        sortItems = function (a, b) {
            return a[variable7] - b[variable7];
        };

        sortAccordingly = function(a,b) {
            //find matching value in whole dataset
            //reorder and return the value
            //not alphabetical order, in the order of names

            return a["code"] - b["code"];
            // return namesArray[a["Country Code"]] - namesArray[b["Country Code"]];

        }
        //the result has to be country code of a - country code of b
        // in the order of names
        //[names[a]] part should be first element of names, for ex
        if (reset7 == 0) {
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    // names.push({"code": (d["Country Code"]), "bar2value":d[variable2]});
                    d.code = i;
                    namesArray.push((d["Country Code"]));

                    return i * (_svgW / _dataset.length);
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortAccordingly)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    return i * (_svgW / _dataset.length)
                });

            reset7 = 1;
        }
        else{
            sortItems2 = function (a, b) {
                return d3.ascending(a["Country Code"], b["Country Code"]);
            }
            d3.select("#SVG7").selectAll(".bar7")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {
                    d.code = i;
                    return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG1").selectAll(".bar")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG2").selectAll(".bar2")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG3").selectAll(".bar3")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            d3.select("#SVG4").selectAll(".bar4")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });
            d3.select("#SVG6").selectAll(".bar6")
                .sort(sortItems2)
                .transition()
                .duration(1000)
                .attr("x", function (d, i) {return i * (_svgW / _dataset.length)
                });

            reset7 = 0;
        }
    }

};
function updateBar(data, max, min, variable, variable2, variable3, variable4, variable5, variable6, variable7){
    var _graphH = 80;
    // currentData = data;
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
    //
    // var _maxY = findMax(data, variable);
    // var _minY = findMin(data, variable);
    //
    // var _maxY2 = findMax(data, variable2);
    // var _minY2 = findMin(data, variable2);
    //
    // var _maxY3 = findMax(data, variable3);
    // var _minY3 = findMin(data, variable3);
    //
    // var _maxY4 = findMax(data, variable4);
    // var _minY4 = findMin(data, variable4);
    //
    // var _maxY5 = findMax(data, variable5);
    // var _minY5 = findMin(data, variable5);
    //
    // var _maxY6 = findMax(data, variable6);
    // var _minY6 = findMin(data, variable6);
    //
    // var _maxY7 = findMax(data, variable7);
    // var _minY7 = findMin(data, variable7);

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

//add hover function
    var bar1 = d3.select("#SVG1").selectAll(".bar")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale(Number(data[i][variable]))})
        .attr("height", function(d, i) {
            if (_yScale(Number(data[i][variable])) > 0) {
                return _yScale(Number(data[i][variable]))
            }
            else{return 0;}
        });
    //

    var bar2 = d3.select("#SVG2").selectAll(".bar2")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale2(Number(data[i][variable2]))})
        .attr("height", function(d, i){ if(Number(data[i][variable2]) > 0) {
            return _yScale2(Number(data[i][variable2]))
        }});

    var bar3 = d3.select("#SVG3").selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale3(data[i][variable3])})
        .attr("height", function(d, i){ if(Number(data[i][variable3]) > 0) {
            return _yScale3(data[i][variable3])
        }});

    var bar4 = d3.select("#SVG4").selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale4(data[i][variable4])})
        .attr("height", function(d, i){ if(Number(data[i][variable4]) > 0) {
            return _yScale4(data[i][variable4])
        }});

    var bar5 = d3.select("#SVG5").selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale5(data[i][variable5])})
        .attr("height", function(d, i){ if(Number(data[i][variable5]) > 0) {
            return _yScale5(data[i][variable5])
        }});

    var bar6 = d3.select("#SVG6").selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale6(data[i][variable6])})
        .attr("height", function(d, i){ if(Number(data[i][variable6]) > 0) {
            return _yScale6(data[i][variable6])
        }});

    var bar7 = d3.select("#SVG7").selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d, i) {return _svgH - _yScale7(data[i][variable7])})
        .attr("height", function(d, i){ if(Number(data[i][variable7]) > 0) {
            return _yScale7(data[i][variable7])
        }})

}

function changeColor(currentCountry){
//it does not work for years <= 2010

    d3.select("#SVG1").selectAll(".bar")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG2").selectAll(".bar2")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG3").selectAll(".bar3")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG4").selectAll(".bar4")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG5").selectAll(".bar5")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG6").selectAll(".bar6")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG7").selectAll(".bar7")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVGScatter").selectAll("circle")
        .attr("fill", function(d){
            if (d["Country Code"] == currentCountry) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
}
function changeColorSort(codeBar){


    //select bars
    d3.select("#SVG1").selectAll(".bar")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG2").selectAll(".bar2")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG3").selectAll(".bar3")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG4").selectAll(".bar4")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG5").selectAll(".bar5")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG6").selectAll(".bar6")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG7").selectAll(".bar7")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVGScatter").selectAll("circle")
        .attr("fill", function(d, i){
            if (i == codeBar) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
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

    d3.select("#SVG1").selectAll(".bar")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG2").selectAll(".bar2")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })

    d3.select("#SVG3").selectAll(".bar3")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG4").selectAll(".bar4")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG5").selectAll(".bar5")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG6").selectAll(".bar6")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
            if (index < 0) {
                return highlightCol;
            }
            else{
                return "grey"
            }
        })
    d3.select("#SVG7").selectAll(".bar7")
        .attr("fill", function(d, i){
            var index = _code.indexOf(i);
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