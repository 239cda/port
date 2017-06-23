/**
 * Created by InKwon on 2017-06-18.
 */
//these functions control highlight on each chart according to change in one of the charts

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
        d3.select("#SVG1").selectAll(".bar1")
            .attr("stroke", function (d) {
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
                if (d["Country Code"] == codeBar) {
                    return highlightCol;
                }
                else {
                    return "grey"
                }
            })
    }
    else if(brushOn == true) {
        d3.select("#SVG1").selectAll(".bar1")
            .attr("stroke", function (d) {

                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);

        d3.select("#SVG2").selectAll(".bar2")
            .attr("stroke", function (d) {
                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);

        d3.select("#SVG3").selectAll(".bar3")
            .attr("stroke", function (d) {
                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG4").selectAll(".bar4")
            .attr("stroke", function (d) {
                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG5").selectAll(".bar5")
            .attr("stroke", function (d) {
                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG6").selectAll(".bar6")
            .attr("stroke", function (d) {
                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);
        d3.select("#SVG7").selectAll(".bar7")
            .attr("stroke", function (d) {
                if (d["countryCode"] == codeBar) {
                    return strokeCol;
                }
            })
            .attr("stroke-width", strokeWidth);


        d3.select("#SVGScatter").selectAll("circle")
            .attr("stroke", function (d) {

                if (d["Country Code"]== codeBar) {
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
        });

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
