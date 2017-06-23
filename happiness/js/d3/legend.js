/**
 * Created by InKwon on 2017-05-10.
 */



function receiveLegendValues(values){
    var receivedValues = values;
    legend.legendText(receivedValues)
}
// function receiveLegendValuesGDP(values){
//     var receivedValues = values;
//     for(var i = 0;i<receivedValues.length;i++){
//         if(Number(receivedValues[i])>0){
//             receivedValues[i] = Math.exp(Number(receivedValues[i]));
//         }
//         else{receivedValues[i] = null}
//     }
//     legend.legendText(receivedValues);
// }

var legend = (function(){
    var _width = 600;
    var _height = 15;
    var _eachW = _width/30;
    var _colorCode = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"];
    var isGDP;
    var variable;

function _legendForGDP(){
    isGDP = true;
}
function _getVar(v){
    variable = v;
}

function _drawLegend (){
    var svg = d3.select("#legendSVG");

    svg.append("rect")
        .attr("x", 0)
        .attr("y",  0)
        .attr("height", 100)
        .attr("width", _height)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5);

    svg.selectAll("rect")
        .data(_colorCode)
        .enter()
        .append("rect")
        .attr("x",  0)
        // .attr("y", function(d, i){return _width - (_eachW * i + 40);})
        .attr("y", function(d, i){return (_eachW * i + 0);})
        .attr("height", _eachW)
        .attr("width", _height)
        .attr("fill", function(d, i){
            return _colorCode[i];
        })
        .attr("id", function(d,i){
            return "rect" + (i + 1);
        })
        .attr("class", "legendBar")
        // .attr("stroke", "black");
}
  function _legendText(data) {
      var svg = d3.select("#legendSVG");

      svg.selectAll("text").remove();

   if(variable == categories[1]) {
       svg.selectAll("text")
           .data(data)
           .enter()
           .append("text")
           .attr("y", function (d, i) {
               return _eachW * i + 20;
           })
           .attr("x", 20)
           .attr("fill", "black")
           .attr("font-size", 90)
           .text(function (d, i) {
               var comma = d3.format(",f");
               return "$"+ comma(d3.round(Math.exp(Number(data[i])), 2));
           })

   }
   else {
       svg.selectAll("text")
           .data(data)
           .enter()
           .append("text")
           .attr("y", function (d, i) {
               return _eachW * i + 20;
           })
           .attr("x", 20)
           .attr("fill", "black")
           .attr("font-size", 90)
           .text(function (d, i) {
               return data[i];
           })
   }
   }
  function _highlightLegend(value){

      var svg = d3.select("#legendSVG");
      svg.selectAll(".legendBar").attr("stroke","black")
          .attr("stroke-width", 0);

      var id = "#rect"+ value;

      svg.select(id)
          .attr("stroke", highlightCol)
          .attr("stroke-width", 5);

  }
  return{
      drawLegend:_drawLegend,
      legendText:_legendText,
      highlightLegend:_highlightLegend,
      legendForGDP: _legendForGDP,
      getVar:_getVar
  }

})();
