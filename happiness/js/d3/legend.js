/**
 * Created by InKwon on 2017-05-10.
 */
function receiveLegendValues(values){
    var receivedValues = values;
    legend.legendText(receivedValues)
}
var legend = (function(){
    var _width = 600;
    var _height = 30;
    var _eachW = _width/9;
    var _colorCode = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"];

function _drawLegend (){
    var svg = d3.select("#legendSVG");
    svg.selectAll("rect")
        .data(_colorCode)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return _eachW * i + 40;
        })
        .attr("y", 0)
        .attr("height", _height)
        .attr("width", _eachW)
        .attr("fill", function(d, i){
            return _colorCode[i];
        })
        .attr("id", function(d,i){
            return "rect" + (i + 1);
        })
        .attr("class", "legendBar")
        .attr("stroke", "black");
}
  function _legendText(data) {
      var svg = d3.select("#legendSVG");

      svg.selectAll("text").remove();

      svg.selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .attr("x", function (d, i) {return _eachW * i + 40;})
          .attr("y", 45)
          .attr("fill", "black")
          .attr("font-size", 100)
          .text(function(d,i){return data[i];})
  }
  function _highlightLegend(value){

      var svg = d3.select("#legendSVG");
      svg.selectAll(".legendBar").attr("stroke","black")
          .attr("stroke-width", 1);

      var id = "#rect"+ value;

      svg.select(id)
          .attr("stroke", highlightCol)
          .attr("stroke-width", 5);

  }
  return{
      drawLegend:_drawLegend,
      legendText:_legendText,
      highlightLegend:_highlightLegend
  }

})();
