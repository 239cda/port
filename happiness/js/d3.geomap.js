'use strict';

var selectedCountry;
var storedColorValues = [];
var idOrder = [];
var isCountrySelected = false;

//number value for each country that represents which color to paint(from 1-9)
var valuesInRange = [];
//to find out which country is being assigned each color, this has same order as valuesInRange.
//use this array to match d.id and paint only the countries that had valid values
var codeStorage = [];
var mouseX, mouseY;
var kZoom = 2,
    x0 = 200,
    y0 = 100;
var isZoomed = false;

function addAccessor(obj, name, value) {
    obj[name] = function (_) {
        if (typeof _ === 'undefined') return obj.properties[name] || value;
        obj.properties[name] = _;
        return obj;
    };
}
function mapColor(selectedBar) {
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
            height: 200,
            postUpdate: null,
            projection: d3.geo.equirectangular,
            rotate: [0, 0, 0],
            scale: 85,
            translate: [265, 115],
            unitId: 'iso3',
            unitPrefix: 'unit-',
            units: 'units',
            unitTitle: function unitTitle(d) {

                return d.properties.name;
            },
            width: 650,
            zoomFactor: 4,
            clipExtent: null
        }
        // Setup methods to access properties.
        for (var key in this.properties) {
            addAccessor(this, key, this.properties[key]);
        } // Store internal properties.
        this._ = {};
    }

    _createClass(Geomap, [{
        key: 'clicked',
        value: function clicked(d) {
            //this part disabled because I wanted to select a country by click.
            //zoom changed to scrolling.

        //     var _this = this;
        //     var k = 1,
        //         x0 = this.properties.width / 2,
        //         y0 = this.properties.height / 2,
        //         x = x0,
        //         y = y0;
        //
        //     if (d && d.hasOwnProperty('geometry') && this._.centered !== d) {
        //         var centroid = this.path.centroid(d);
        //         x = centroid[0];
        //         y = centroid[1];
        //         k = this.properties.zoomFactor;
        //         this._.centered = d;
        //     } else this._.centered = null;
        //
        //     this.svg.selectAll('path.unit').classed('active', this._.centered && function (_) {
        //         return _ === _this._.centered;
        //     });
        //
        //     this.svg.selectAll('g.zoom').transition().duration(750).attr('transform', 'translate(' + x0 + ', ' + y0 + ')scale(' + k + ')translate(-' + x + ', -' + y + ')');
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

                var zoom = d3.behavior.zoom()
                    .translate(geo.transform.translate)
                    .scale(geo.transform.scale)
                    .scaleExtent([275, 8 * 275])
                    .on("zoom", zooming);

                d3.select("#map").call(zoom);

                var pastX;
                var pastY;
                function zooming() {
                    if(event == undefined){
                    }
                    else if(event.deltaY > 0){
                        self.svg.selectAll('g.zoom').transition().duration(750).attr('transform', 'scale(1)');
                        logEvent.log(currentVar[0], null, currentYear, 1, 5);
                    }
                    else if(event.deltaY < 0){
                        self.svg.selectAll('g.zoom').transition().duration(750).attr('transform', 'translate(' + x0 + ', ' + y0 + ')scale(' + kZoom + ')translate(-' + mouseX  + ', -' + mouseY + ')');
                        logEvent.log(currentVar[0], null, currentYear, 1, 4);
                    }
                    pastX = mouseX;
                    pastY = mouseY;
                }

                self.svg.append('g').attr('class', 'units zoom').selectAll('path')
                    .data(topojson.feature(geo, geo.objects[self.properties.units]).features).enter()
                    .append('path').attr('class', function (d) {

                   return 'unit ' + self.properties.unitPrefix + d.id;
                })

                    .attr("d", self.path).on("mouseover", function(d)
                {

                    var svg = d3.select("#map")
                    var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });

                    mouseX = mouse[0];
                    mouseY = mouse[1];

                    //Update the tooltip position and value
                    d3.select("#tooltipMap")
                        .style("left", mouse[0] + 20 +"px")
                        .style("top", mouse[1] + 10 + "px")
                        .select("#valueMap")
                    .text(d.properties.name);

                    //Show the tooltip
                    d3.select("#tooltipMap").classed("hiddenMap", false);

                    if(isCountrySelected == false) {
                        update(d.id);
                        countryID = d.id;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);
                    }
                    else if(isCountrySelected == true) {
                        countryID = d.id;

                        var thisCountry = countryID;
                        if(brushOn == false) {
                            d3.selectAll(".unit").style("fill", function (d) {
                                if (d.id == thisCountry) {
                                    var location = codeStorage.indexOf(d.id);
                                    var rawColorCode = Number(valuesInRange[location]);
                                    // legend.highlightLegend(rawColorCode);
                                    return highlightCol;
                                }
                                else if (d.id == currentCountry) {
                                    return highlightCol;
                                }
                                else {
                                    var codeIndex = codeStorage.indexOf(d.id);
                                    if (codeIndex >= 0) {
                                        var _colorCode = valuesInRange[codeIndex];
                                        return returnColor(_colorCode);
                                    }
                                }
                                ;
                            })
                        }
                        else if(brushOn == true) {
                            if (isCountrySelected == true) {
                                d3.selectAll(".unit").style("stroke", function (d) {
                                    if (d.id == thisCountry || d.id == currentCountry) {
                                        return strokeCol;
                                    }
                                })
                            }
                            else {
                                hoverCountry(currentCountry);
                                changeColor(currentCountry);
                                d3.selectAll(".unit")
                                    .style("fill", function (d) {
                                        if (thisCountry == d.id) {
                                            return highlightCol;
                                        }
                                        else if (brushed.indexOf(d.id) >= 0) {
                                            return highlightCol;
                                        }
                                        else {
                                            var codeIndex = codeStorage.indexOf(d.id);
                                            if (codeIndex >= 0) {
                                                var _colorCode = valuesInRange[codeIndex];
                                                return returnColor(_colorCode);
                                            }
                                        }
                                        ;
                                    })

                                d3.selectAll(".unit").style("stroke", function (d) {
                                    if (d.id == thisCountry || d.id == currentCountry) {
                                        return strokeCol;
                                    }
                                })
                            }
                        }
                    };
                    logEvent.log(currentVar[0], d.id, currentYear, 1, 12);
                })
                    .attr("d", self.path).on("mouseout", function(d)
                {
                    d3.select("#tooltipMap").classed("hiddenMap", true);
                    countryID = d.id;
                    var thisCountry = countryID;
                    if(brushOn == false) {
                        if (isCountrySelected == false) {
                            refresh();
                        }
                        else if (isCountrySelected == true) {

                            d3.selectAll(".unit").style("fill", function (d) {
                                if (d.id == currentCountry) {
                                    var location = codeStorage.indexOf(d.id);
                                    var rawColorCode = Number(valuesInRange[location]);
                                    // legend.highlightLegend(rawColorCode);
                                    return highlightCol;
                                }
                                else {
                                    var codeIndex = codeStorage.indexOf(d.id);
                                    if (codeIndex >= 0) {
                                        var _colorCode = valuesInRange[codeIndex];
                                        return returnColor(_colorCode);
                                    }
                                }
                            })
                        }
                    }
                   else if(brushOn == true){
                        d3.selectAll(".unit").style("stroke", function (d){
                            if (d.id == currentCountry) {
                                return strokeCol;
                            }})
                            .style("fill", function (d) {
                            if (brushed.indexOf(d.id) >= 0) {
                                return highlightCol;
                            }
                            else {
                                var codeIndex = codeStorage.indexOf(d.id);
                                if (codeIndex >= 0) {
                                    var _colorCode = valuesInRange[codeIndex];
                                    return returnColor(_colorCode);
                                }
                            }})
                    }
                    logEvent.log(currentVar[0], d.id, currentYear, 1, 13);
                })
                    .attr('d', self.path).on('click', function(d){

                    //save selected country and keep highlight. keep showing this country for scatterplot and line chart.
                    //this continues until user clicks another country.
                    //to do that, first, create a value that says if a country is being selected or not. -> var countrySelected
                    //if not selected, it will highlight a country. If already selected, it will delete highlight from formerly selcted country.
                    //also, mouseover should be modified. if countryselected == 1, hover should show highlights but not change data.
                    if(isCountrySelected == false) {
                        update(d.id);
                        countryID = d.id;
                        currentCountry = countryID;
                        hoverCountry(currentCountry);
                        changeColor(currentCountry);

                        isCountrySelected = true;
                        logEvent.log(currentVar[0], d.id, currentYear, 1, 14);
                    }

                    else if(isCountrySelected == true){
                        var formerColored = currentCountry;
                        if (d.id == currentCountry) {
                        d3.selectAll(".unit").style("fill", function (d) {

                                var codeIndex = codeStorage.indexOf(d.id);
                                isCountrySelected = false;
                                if (codeIndex >= 0) {
                                    var _colorCode = valuesInRange[codeIndex];
                                    return returnColor(_colorCode);
                                }
                        })
                            refresh();

                            logEvent.log(currentVar[0], d.id, currentYear, 1, 15);
                        }
                        //if a user selects a different country, the coloring changes immediately to reflect change

                        else {
                            update(d.id);
                            countryID = d.id;
                            currentCountry = countryID;
                            hoverCountry(currentCountry);
                            changeColor(currentCountry);

                            isCountrySelected = true;
                            logEvent.log(currentVar[0], d.id, currentYear, 1, 14);
                        }
                    };

                })
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
    if(_colorCode == 0){
        return null;
    }
    else if(_colorCode == 1){
        return colorbrewer["Blues"][9][0];
    }else if(_colorCode == 2){
        return colorbrewer["Blues"][9][1];
    }else if(_colorCode == 3){
        return colorbrewer["Blues"][9][2];
    }else if(_colorCode == 4){
        return colorbrewer["Blues"][9][3];
    }else if(_colorCode == 5){
        return colorbrewer["Blues"][9][4];
    }else if(_colorCode == 6){
        return colorbrewer["Blues"][9][5];
    }else if(_colorCode == 7){
        return colorbrewer["Blues"][9][6];
    }else if(_colorCode == 8){
        return colorbrewer["Blues"][9][7];
    }else if(_colorCode == 9){
        return colorbrewer["Blues"][9][8];
    }
};
var getColorValue = (function(){
    var _values = [];
    codeStorage = [];
    valuesInRange = [];

    function _getRawValues(data, variable)
    {
        var property;

        if(variable == categories[0]){property = "var1";}
        else if(variable == categories[1]){property = "var2";}
        else if(variable == categories[2]){property = "var3";}
        else if(variable == categories[3]){property = "var4";}
        else if(variable == categories[4]){property = "var5";}
        else if(variable == categories[5]){property = "var6";}
        else if(variable == categories[6]){property = "var7";}

        //display a label for a map
        d3.select("#map").selectAll("text").remove();

        var mapTitle = variable;
        if (mapTitle == "gini of household income reported in Gallup, by wp5-year") {mapTitle = "GINI Index";}
        else if(mapTitle == "Healthy life expectancy at birth") {mapTitle = "Healthy Life Expectancy";}
        else if(mapTitle == "Life Ladder") {mapTitle = "Happiness Score";}
        else if(mapTitle == categories[1]){mapTitle = "GDP per Capita"}

        d3.select("#map").append("text")
            // .attr("x", 600)
            // .attr("y", 600)`
            .style("font-size", "18px")
            .style("fill", "grey")
            .text(mapTitle)
            .attr("class","mapTitle");

        codeStorage = [];
        _values = [];
        valuesInRange = [];

        for (var i = 0; i <data.length; i++) {
            if (data[i][property] > 0) {
                _values.push(data[i][property]);
                codeStorage.push(data[i]["countryCode"]);
            }
        };

        legend.getVar(variable);

        if(variable == categories[1]){
            // legend.legendForGDP();
            //run a different function that converts the values to inverse log first
            getValueGDP(_values);
        }
        else{
        //format them
        var _max = d3.max(_values);
        var _min = d3.min(_values);

        //divide into 9 groups
        var _scaleValue = d3.scale.linear()
            .domain([_min, _max])
            .range([1, 9]);

        //find out which values are at the borderline and send them to the function at legend.js
        scaleValues(_scaleValue, variable);

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
        }
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
function getValueGDP(data) {
    var _convertedVal = data;
    var _convertedValLegend = [];

    for(var i = 0;i<_convertedVal.length;i++){
            _convertedVal[i] = Number(_convertedVal[i]);
            _convertedValLegend[i] = Math.exp(Number(_convertedVal[i]));
    }
    var _max = d3.max(_convertedVal);
    var _min = d3.min(_convertedVal);

    var _maxLeg = d3.max(_convertedValLegend);
    var _minLeg = d3.min(_convertedValLegend);

    //divide into 9 groups
    var _scaleValue = d3.scale.linear()
        .domain([_min, _max])
        .range([1, 9]);

    var _scaleValueLeg = d3.scale.linear()
        .domain([_minLeg, _maxLeg])
        .range([1, 9]);

    //find out which values are at the borderline and send them to the function at legend.js
    scaleValues(_scaleValue);
    // scaleValues(_scaleValueLeg);

    //as a result, _scaleValue will return a number bw 1-9
    for (var i = 0; i < _convertedVal.length; i++) {
        var v = _scaleValue(_convertedVal[i]);

        var colorNum;
        if(_convertedVal[i] == null) {
            colorNum = 0;
        }
        else{
        if (v < 2) {
            colorNum = 1
        }
        else if (v < 3) {
            colorNum = 2
        }
        else if (v < 4) {
            colorNum = 3
        }
        else if (v < 5) {
            colorNum = 4
        }
        else if (v < 6) {
            colorNum = 5
        }
        else if (v < 7) {
            colorNum = 6
        }
        else if (v < 8) {
            colorNum = 7
        }
        else if (v < 9) {
            colorNum = 8
        }
        else if (v < 10) {
            colorNum = 9
        }
        }
        // v = Math.round(_scaleValue(_values[i]));
        valuesInRange[i] = colorNum;
    }
}
//colors selected region in the map
function hoverCountry(selectedCountry) {
d3.select("#SVG1").selectAll("rect").style("stroke", "none");
d3.select("#SVG2").selectAll("rect").style("stroke", "none");
d3.select("#SVG3").selectAll("rect").style("stroke", "none");
d3.select("#SVG4").selectAll("rect").style("stroke", "none");
d3.select("#SVG5").selectAll("rect").style("stroke", "none");
d3.select("#SVG6").selectAll("rect").style("stroke", "none");
d3.select("#SVG7").selectAll("rect").style("stroke", "none");

d3.select("#Time1").selectAll("*").remove();
d3.select("#Time2").selectAll("*").remove();
d3.select("#Time3").selectAll("*").remove();
d3.select("#Time4").selectAll("*").remove();
d3.select("#Time5").selectAll("*").remove();
d3.select("#Time6").selectAll("*").remove();
d3.select("#Time7").selectAll("*").remove();
d3.select("#Time8").selectAll("*").remove();


d3.select("#SVGScatter").selectAll("circle").style("stroke", "none");
d3.select("#map").selectAll("path").style("stroke", "black").style("stroke-width", .5);

//the color values are all saved in valueRangeColor;
//has to find the order of d.id in the whole countries

    timeChart.countryChange(selectedCountry);

    if (brushOn == false) {
        d3.selectAll(".unit").style("fill", function (d, i) {
            if (d.id == selectedCountry || d.id == currentCountry) {
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
    };
    if (brushOn == true) {
        d3.select("#SVGScatter").selectAll("circle").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })

        d3.select("#SVG1").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })
        d3.select("#SVG2").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })
        d3.select("#SVG3").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })
        d3.select("#SVG4").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })
        d3.select("#SVG5").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })
        d3.select("#SVG6").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })
        d3.select("#SVG7").selectAll("rect").style("stroke", function (d, i) {
            if (d.id == selectedCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
        if (d.id == selectedCountry) {
            return strokeWidth};
            })

        d3.select("#map").selectAll("path").style("stroke", function (d, i) {
            if (d.id == selectedCountry || d.id == currentCountry) {
                var location = codeStorage.indexOf(d.id);
                var rawColorCode = Number(valuesInRange[location]);
                legend.highlightLegend(rawColorCode);
                return strokeCol;
            }
        })
            .style("stroke-width", function(d,i){
                if (d.id == selectedCountry || d.id == currentCountry) {
                    return strokeWidth};
            })
    }
}

// //display map title on every run
function titleDisplay (mapTitle) {
    var mapTitle;
    if (mapTitle == "gini of household income reported in Gallup, by wp5-year") {mapTitle = "GINI Index";}
    else if(mapTitle == "Healthy life expectancy at birth") {mapTitle = "Healthy Life Expectancy";}
    else if(mapTitle == "Life Ladder") {mapTitle = "Happiness Score";}


d3.select("#map").selectAll("text").remove();

    d3.select(".mapSVG")
        .append("text")
        .attr("x", 250)
        .attr("y", 250)
        .style("font-size", "25px")
        .style("fill", "grey")
        .text(mapTitle);

}
