'use strict';

var selectedCountry;
var storedColorValues = [];
var idOrder = [];

//number value for each country that represents which color to paint(from 1-9)
var valuesInRange = [];
//to find out which country is being assigned each color, this has same order as valuesInRange.
//use this array to match d.id and paint only the countries that had valid values
var codeStorage = [];

function addAccessor(obj, name, value) {
    obj[name] = function (_) {
        if (typeof _ === 'undefined') return obj.properties[name] || value;
        obj.properties[name] = _;
        return obj;
    };
}
function mapColor(selectedBar){
    // returnToDefault();
    selectedCountry = selectedBar;

    hoverCountry(selectedCountry);
}
// This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).
"use strict";

var colorbrewer = { OrRd:{},
    Blues: {
    3: ["#deebf7", "#9ecae1", "#3182bd"],
    4: ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"],
    5: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
    6: ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"],
    7: ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"],
    8: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"],
    9: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"]
}};
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); }
}
var countryID = 0;

var Geomap = (function () {
    function Geomap() {
        _classCallCheck(this, Geomap);

        // Set default properties optimized for naturalEarth projection.
        this.properties = {
            geofile: null,
            height: 275,
            postUpdate: null,
            projection: d3.geo.equirectangular,
            rotate: [0, 0, 0],
            scale: 105,
            translate: [310, 160],
            unitId: 'iso3',
            unitPrefix: 'unit-',
            units: 'units',
            unitTitle: function unitTitle(d) {
                return d.properties.name;
            },
            width: 630,
            zoomFactor: 4,
            clipExtent: null
        };

        // Setup methods to access properties.
        for (var key in this.properties) {
            addAccessor(this, key, this.properties[key]);
        } // Store internal properties.
        this._ = {};
    }


    _createClass(Geomap, [{
        key: 'clicked',
        value: function clicked(d) {
            var _this = this;

            var k = 1,
                x0 = this.properties.width / 2,
                y0 = this.properties.height / 2,
                x = x0,
                y = y0;

            if (d && d.hasOwnProperty('geometry') && this._.centered !== d) {
                var centroid = this.path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = this.properties.zoomFactor;
                this._.centered = d;
            } else this._.centered = null;

            this.svg.selectAll('path.unit').classed('active', this._.centered && function (_) {
                return _ === _this._.centered;
            });

            this.svg.selectAll('g.zoom').transition().duration(750).attr('transform', 'translate(' + x0 + ', ' + y0 + ')scale(' + k + ')translate(-' + x + ', -' + y + ')');
        }

        /**
         * Load geo data once here and draw map. Call update at the end.
         *
         * By default map dimensions are calculated based on the width of the
         * selection container element so they are responsive. Properties set before
         * will be kept.
         */
    }, {
        key: 'draw',
        value: function draw(selection, self) {

            if (!self.properties.width) self.properties.width = selection.node().getBoundingClientRect().width;

            if (!self.properties.height) self.properties.height = self.properties.width / 1.92;

            if (!self.properties.scale) self.properties.scale = self.properties.width / 5.8;

            if (!self.properties.translate) self.properties.translate = [self.properties.width / 2, self.properties.height / 2];

            self.svg = selection.append('svg').attr('width', self.properties.width).attr('height', self.properties.height);

            self.svg.append('rect').attr('class', 'background').attr('width', self.properties.width).attr('height', self.properties.height).on('click', self.clicked.bind(self));

            // Set map projection and path.
            var proj = self.properties.projection().scale(self.properties.scale).translate(self.properties.translate).precision(.1);

            // Not every projection supports rotation, e. g. albersUsa does not.
            if (proj.hasOwnProperty('rotate') && self.properties.rotate) proj.rotate(self.properties.rotate);

            self.path = d3.geo.path().projection(proj);

            // Load and render geo data.
            d3.json(self.properties.geofile, function (error, geo) {
                self.geo = geo;

                self.svg.attr("class", "mapSVG");

                var mapTitle = self.properties.column;

                if (mapTitle == "gini of household income reported in Gallup, by wp5-year") {mapTitle = "GINI Index";}
                else if(mapTitle == "Healthy life expectancy at birth") {mapTitle = "Healthy Life Expectancy";}
                else if(mapTitle == "Life Ladder") {mapTitle = "Happiness Score";}

                //
                self.svg.append("text")
                    .attr("x", 250)
                    .attr("y", 250)
                    .style("font-size", "25px")
                    .style("fill", "grey")
                    .text(mapTitle)
                    .style("class","mapTitle");

                self.svg.append('g').attr('class', 'units zoom').selectAll('path')
                    .data(topojson.feature(geo, geo.objects[self.properties.units]).features).enter()
                    .append('path').attr('class', function (d) {

                   return 'unit ' + self.properties.unitPrefix + d.id;
                })
                    .attr("d", self.path).on("mouseover", function(d)
                {
                    update(d.id);
                    countryID = d.id;
                    currentCountry = countryID;
                    hoverCountry(currentCountry);
                    changeColor(currentCountry);
                })
                    .attr('d', self.path).on('click', self.clicked.bind(self)).append('title').text(self.properties.unitTitle);

               //choropleth!

                self.svg.selectAll("path.unit")
                    .style("fill", function(d){
                        var codeIndex = codeStorage.indexOf(d.id);
                        if(codeIndex>= 0){
                            var _colorCode = valuesInRange[codeIndex];

                        if(_colorCode == 1){
                            return colorbrewer["Blues"][9][0];
                        }if(_colorCode == 2){
                            return colorbrewer["Blues"][9][1];
                        }if(_colorCode == 3){
                            return colorbrewer["Blues"][9][2];
                        }if(_colorCode == 4){
                            return colorbrewer["Blues"][9][3];
                        }if(_colorCode == 5){
                            return colorbrewer["Blues"][9][4];
                        }if(_colorCode == 6){
                            return colorbrewer["Blues"][9][5];
                        }if(_colorCode == 7){
                            return colorbrewer["Blues"][9][6];
                        }if(_colorCode == 8){
                            return colorbrewer["Blues"][9][7];
                        }if(_colorCode == 9){
                            return colorbrewer["Blues"][9][8];
                        }
                        }

                    });

                self.update();

            });
        }

    }, {
        key: 'update',
        value: function update() {
            // if (this.properties.postUpdate) this.properties.postUpdate();
        }
    }]);
    return Geomap;
})();


d3.geomap = function () {
    return new Geomap();
};
'use strict';

//get the value for each country
//determine which range the country belongs to (which color)
//return the color value
//actually, since the values are all aligned based on country code, just return value and color value in order
function returnColor(_colorCode){
    if(_colorCode == 1){
        return colorbrewer["Blues"][9][0];
    }if(_colorCode == 2){
        return colorbrewer["Blues"][9][1];
    }if(_colorCode == 3){
        return colorbrewer["Blues"][9][2];
    }if(_colorCode == 4){
        return colorbrewer["Blues"][9][3];
    }if(_colorCode == 5){
        return colorbrewer["Blues"][9][4];
    }if(_colorCode == 6){
        return colorbrewer["Blues"][9][5];
    }if(_colorCode == 7){
        return colorbrewer["Blues"][9][6];
    }if(_colorCode == 8){
        return colorbrewer["Blues"][9][7];
    }if(_colorCode == 9){
        return colorbrewer["Blues"][9][8];
    }
};
var getColorValue = (function(){
    var _values = [];
    codeStorage = [];
    valuesInRange = [];

    function _getRawValues(data, variable)
    {
        d3.select("#map").selectAll("path.unit").style("fill", null);
        codeStorage = [];
        _values = [];
        valuesInRange = [];

        for (var i = 0; i <data.length; i++) {
            _values.push(data[i][variable]);
            codeStorage.push(data[i]["Country Code"]);
        };
        //format them
        var _max = d3.max(_values);
        var _min = d3.min(_values);

        //divide into 9 groups
        var _scaleValue = d3.scale.linear()
            .domain([_min, _max])
            .range([1, 9]);

        //find out which values are at the borderline and send them to the function at legend.js
        scaleValues(_scaleValue);

        //as a result, _scaleValue will return a number bw 1-9
        for (var i = 0; i < _values.length; i++) {
            var v = _scaleValue(_values[i]);
            var colorNum;
            if(v<2){colorNum = 1}
            else if(v<3){colorNum = 2}
            else if(v<4){colorNum = 3}
            else if(v<5){colorNum = 4}
            else if(v<6){colorNum = 5}
            else if(v<7){colorNum = 6}
            else if(v<8){colorNum = 7}
            else if(v<9){colorNum = 8}
            else if(v<10){colorNum = 9}
            // v = Math.round(_scaleValue(_values[i]));
            valuesInRange[i] = colorNum;
        };

    };
    function _recolorMap(){
        d3.select("#map").selectAll("path.unit").style("fill", null);
        d3.select("#map").selectAll("path.unit")
            .style("fill", function(d, i){
                var codeIndex = codeStorage.indexOf(d.id);
                if(codeIndex>= 0) {
                    var _colorCode = valuesInRange[codeIndex];
                }
                return returnColor(_colorCode);
            });

    }
    return{
        getRawValues:_getRawValues,
        recolorMap:_recolorMap
    }
})();
function scaleValues(scale){
    var values = [];
    for(var i=1;i<10;i++){
        var v = scale.invert(i);
        values.push(v.toFixed(2));
    }
    receiveLegendValues(values);
}

function hoverCountry(selectedCountry) {
// var idIndex = idOrder.indexOf(colorDelete);
// var originalColor = storedColorValues[idIndex];

//the color values are all saved in valueRangeColor;
//has to find the order of d.id in the whole countries

d3.selectAll(".unit").style("fill",function(d, i){
    if(d.id == selectedCountry){
        var location = codeStorage.indexOf(d.id);
        var rawColorCode = Number(valuesInRange[location]);
        legend.highlightLegend(rawColorCode);
        return highlightCol;
    }
    else {
        var codeIndex = codeStorage.indexOf(d.id);
        if (codeIndex >= 0) {
            var _colorCode = valuesInRange[codeIndex];

            return returnColor(_colorCode);
        }
    }
});
}

// function changeMapColor(map, data){
//     var self = map;
//     self.extent = d3.extent(data, self.columnVal.bind(self));
//
//     self.colorScale = self.properties.valueScale().domain(self.properties.domain || self.extent).range(self.properties.colors);
//
//     // Remove fill styles that may have been set previously.
//     d3.select("#map").selectAll('path.unit').style('fill', null);
//
//     // Add new fill styles based on data values.
//     data.forEach(function (d) {
//         var uid = d[self.properties.unitId].trim(),
//             val = d[self.properties.column].trim();
//
//         // selectAll must be called and not just select, otherwise the data
//         // attribute of the selected path object is overwritten with self.data.
//         var unit =  d3.select("#map").selectAll('.' + self.properties.unitPrefix + uid);
//
//         idOrder.push(uid);
//
//         // Data can contain values for non existing units and values can be empty or NaN.
//         if (!unit.empty() && self.defined(val)) {
//
//             var fill = self.colorScale(val),
//                 text = self.properties.unitTitle(unit.datum());
//             storedColorValues.push(fill);
//             if (self.properties.duration) unit.transition().duration(self.properties.duration).style('fill', fill);
//             else unit.style('fill', fill);
//
//             // New title with column and value.
//             val = self.properties.format(val);
//             unit.select('title').text(text + '\n\n' + self.properties.column + ': ' + val);
//         }
//     });
//
//     if (self.properties.legend) self.drawLegend(self.properties.legend);
//
// //to display title, check which variable is currently displayed and based on it send the data to the function
//     var currentVariableDisplayed = self.properties.column;
//   titleDisplay(currentVariableDisplayed);
// }
//
// //display map title on every run
function titleDisplay (mapTitle) {
    var mapTitle;
    if (mapTitle == "gini of household income reported in Gallup, by wp5-year") {mapTitle = "GINI Index";}
    else if(mapTitle == "Healthy life expectancy at birth") {mapTitle = "Healthy Life Expectancy";}
    else if(mapTitle == "Life Ladder") {mapTitle = "Happiness Score";}


d3.select("#map").selectAll("text").remove()



    d3.select(".mapSVG")
        .append("text")
        .attr("x", 250)
        .attr("y", 250)
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(mapTitle);

}
