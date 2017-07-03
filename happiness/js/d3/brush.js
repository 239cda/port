var brushOn = false;
var ids = [];
function callBrush(minMax, variables) {
    var _scatterH = 300;
    var _padding = 30;
    var varXY = variables;

    var svg = d3.select("#SVGScatter").append("svg")
        .attr("width", _scatterH)
        .attr("height",_scatterH)
        .attr("class", "brushSVG")
        .attr("transform", "translate(0, 0)")

//send min/max to here
    var y = d3.scale.linear()
        .domain([minMax[1], minMax[3]])
        .range([_scatterH - _padding - 20, 0]);

    var x = d3.scale.linear()
        .domain([minMax[0], minMax[2]])
        .range([_padding + 20, _scatterH]);

    var brush = d3.svg.brush()
        .x(x)
        .y(y)
        .on("brush", brushstart)
        .on("brush", brushmove)
        .on("brushend", brushend);

    d3.select("#SVGScatter").append("g")
        .attr("class", "brush")
        .call(brush);

    function brushstart(){
        ids = [];
        d3.select("#SVGScatter").call(brush.clear());
        d3.select("#SVGScatter")
            .selectAll("circle")
            .attr("fill", "grey");
        logEvent.log(varXY, null, currentYear, 2, 1);
}

// Highlight the selected circles.
    function brushmove() {
        brushOn = true;
        var e = brush.extent();

        d3.select("#SVGScatter")
            .selectAll("circle")
            .classed("hidden", function (d) {
                var _xyVar = getCurrentVar();
                return e[0][0] > Number(d[_xyVar[0]]) || Number(d[_xyVar[0]]) > e[1][0]
                    || e[0][1] > Number(d[_xyVar[1]]) || Number(d[_xyVar[1]]) > e[1][1];
            })
            .attr("fill", highlightCol);

        brushHighlight(varXY, allCountries);
    }

// If the brush is empty, select all circles.
    function brushend() {

        logEvent.log(varXY, null, currentYear, 2, 3);
        if (brush.empty()) {
            brushOn = false;
            d3.select("#SVGScatter").selectAll(".hidden").classed("hidden", false)
                .attr("fill", "grey");
        }
    }

};


