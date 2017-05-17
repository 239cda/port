// /**
//  * Created by InKwon on 2017-05-11.
//  */
// //brushing effect
// //when selecting part of scatterplot -> highlight same parts in bar graph + world Map
// //same for bar graph -> scatterplot + world map

function callBrush(minMax) {
    //minMax = [_minX,_minY,_maxX,_maxY];
// console.log(minMax)

    var _scatterH = 350;
    var _padding = 60;
    var svg = d3.select("#SVGScatter").append("svg")
        .attr("width", _scatterH)
        .attr("height",_scatterH)
        .attr("class", "brushSVG")
        .attr("transform", "translate(300, 0)")

//send min/max to here
    var y = d3.scale.linear()
        .domain([minMax[1], minMax[3]])
        .range([_scatterH - _padding - 10, 20]);

    var x = d3.scale.linear()
        .domain([minMax[0], minMax[2]])
        .range([_padding, _scatterH - 20]);

    var brush = d3.svg.brush()
        .x(x)
        .y(y)
        .on("brush", brushstart)
        .on("brush", brushmove)
        .on("brushend", brushend);

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushstart(){
        d3.select("#SVGScatter").call(brush.clear());
    }

// Highlight the selected circles.
    function brushmove() {
         var e = brush.extent();
        var selectedCircles = [];
        d3.select("#SVGScatter")
            .selectAll("circle")
            .classed("hidden", function (d) {

            return e[0][0] > Number(d["Life Ladder"]) || Number(d["Life Ladder"]) > e[1][0]
                || e[0][1] > Number(d["Log GDP per capita"]) || Number(d["Log GDP per capita"]) > e[1][1];
        })
            .attr("fill", highlightCol);
      // d3.select("#SVGScatter").selectAll("circle").selectAll(".hidden")
      //     .attr("fill", function(d) {
      //         return "Yellow";
      //     });
              brushHighlight();
    }

// If the brush is empty, select all circles.
    function brushend() {
        if (brush.empty()) d3.select("#SVGScatter").selectAll(".hidden").classed("hidden", false)
            .attr("fill", "grey");
    }

};


