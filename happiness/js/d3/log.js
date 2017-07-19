/**
 * Created by InKwon on 2017-06-19.
 */
//action types: viewTooltip, changeVariable, lock, unlock, brushOn, brushOff, zoom, sortByName, sortByValue, moveBar...
//this is the array holding entire for one session
var userData = [];
var userDataTotal = [];

var logEvent = (function(){
    var _timeData, _hour, _minutes, _seconds, _secondsM, _month, _day;
    var _categories = ["Life Ladder",    "Log GDP per capita",    "gini of household income reported in Gallup, by wp5-year", "Perceptions of corruption", "Democratic Quality","Social support", "Healthy life expectancy at birth" ];
    var VisElem = ["Bar Chart", "Map", "ScatterPlot", "Line Chart", "Time Line Slider", "Main Menu", "Scatter Menu", "Bar Chart Labels"];

    var VisElemAction={
        act0:"click",
        act1:"brush start", act2:"brush", act3:"brush end",
        act4:"zoom in", act5:"zoom out",
        act6:"drag start", act7:"drag", act8:"drag end",
        act9:"sort", act10:"re-order",
        act11:"slide",
        act12:"mouse over", act13:"mouse out",
        act14:"lock", act15:"unlock",
        act16:"remove"};

    function _log(variable, countryCode, year, chartType, actionType){
        function addZero(x,n) {
            while (x.toString().length < n) {
                x = "0" + x;
            }
            return x;
        }
        _timeData = new Date();
        _hour = addZero(_timeData.getHours(), 2);
        _minutes = addZero(_timeData.getMinutes(), 2);
        _secondsM = addZero(_timeData.getMilliseconds(), 3);
        _seconds = addZero(_timeData.getSeconds(), 2);
        _month = _timeData.getMonth() + 1;
        _day = _timeData.getDate();

        if(typeof(variable) == "number"){
            variable = _categories[variable - 1];
        };

        var log = {
            Category: "Happiness Score",
            Variable:variable,
            Country:countryCode,
            Year:year,
            VisElem:VisElem[chartType],
            VisElemAction:VisElemAction["act"+actionType],
            Date:_month + ", " + _day,
            TimeStamp:[_hour + ":" + _minutes + ":" + _seconds + ":" + _secondsM]
    }
        userData.push(log);
        userDataTotal.push(log);
    }
    function _viewLog(){
        console.log(userDataTotal);
        DATA.insertUser(userData)
    }
    return {
    log:_log,
    viewLog :_viewLog
    }
})();

//function for sending logged data (in an array) to the database
var DATA = (function() {
    var _apiKey = "S5bp6OFlGZY1SkqczrNNJ9B2KVh86NTD";
    var _QueryApiKey = "&apiKey=S5bp6OFlGZY1SkqczrNNJ9B2KVh86NTD";
    var _baseURL = "https://api.mlab.com/api/1/databases/data_viz/collections/userData?apiKey=";
    var _baseQueryURL = "https://api.mlab.com/api/1/databases/data_viz/collections/userData?";

    var _insertUser = function (userInfo) {
        $.ajax({
            url: _baseQueryURL + 'q={' +
            // '"chartType":"' + userInfo.chart + '", "countryCode":"' + userInfo.country + '", ' +
            // '"variable":"' + userInfo.variable + '", "timeWhole":"' + userInfo.formattedTime + '", ' +
            // '"timeByType":"' + userInfo.time + '"}&c=true' + _QueryApiKey,
            '"Category":"' + userInfo.Category + '", "Variable":"' + userInfo.Variable + '", ' +
            '"Country":"' + userInfo.Country + '", "Year":"' + userInfo.Year + '", ' +
            '"VisElem":"' + userInfo.VisElem + '", "VisElemAction":"' + userInfo.VisElemAction + '", ' +
            '"Date":"' + userInfo.Date + '", "TimeStamp":"' + userInfo.TimeStamp + '"}&c=true' + _QueryApiKey,

            type: "GET",
            contentType: "application/json"
        }).done(function (data) {
            $.ajax({
                url: _baseURL + _apiKey,
                data: JSON.stringify(userInfo),
                type: "POST",
                contentType: "application/json"
            }).done(function (data) {
                //userLogged = data;
                console.log("success");
            }).fail(function (error) {
                console.log("Error" + error);
            });
        }).fail(function (error) {
            console.log("Error" + error);
        });
    };

    return{
        insertUser:_insertUser
    }
})();
//logging for 5 min interval
function callLog() {
    setInterval(function(){DATA.insertUser(userData);userData = [];}, 180000);
    // setInterval(function(){DATA.insertUser(userData);userData = [];}, 3000);
}
callLog();

//
// var logEvent = (function(){
//     var _timeData, _hour, _minutes, _seconds;
//     var _categories = ["Life Ladder",	"Log GDP per capita",	"gini of household income reported in Gallup, by wp5-year", "Perceptions of corruption",
//         "Democratic Quality","Social support", "Healthy life expectancy at birth" ];
//
//     //scatterplot when hover
//     function _scatter(countryCode, var1, var2, year){
//         //receive country code of the clicked or hovered circle
//         //get the time data outside this function and combine them
//         //get the variable
//         _timeData = new Date();
//         _hour = _timeData.getHours();
//         _minutes = _timeData.getMinutes();
//         _seconds = _timeData.getMilliseconds();
//
//         var entry = {
//             element: "scatterplot",
//             country: countryCode,
//             variable: [var1, var2],
//             yearData :year,
//             time:[_hour, _minutes, _seconds],
//             formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//             actionType: "viewTooltip"
//         };
//         userData.push(entry);
//     }
// //bar chart when hover
//     function _bar(countryCode, yearData, barNum, chartType)
//     {
//         _timeData = new Date();
//         _hour = _timeData.getHours();
//         _minutes = _timeData.getMinutes();
//         _seconds = _timeData.getMilliseconds();
//
//         var _chart = ["barChart", "trendChart"];
//
//         var entry = {
//             element: _chart[chartType],
//             country: countryCode,
//             variable: _categories[barNum],
//             yearData: yearData,
//             time:[_hour, _minutes, _seconds],
//             formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//             actionType:"viewTooltip"
//         };
//         userData.push(entry);
//     }
//     function _menuHover(variable){
//         _timeData = new Date();
//         _hour = _timeData.getHours();
//         _minutes = _timeData.getMinutes();
//         _seconds = _timeData.getMilliseconds();
//
//         var entry = {
//             element: "menuBar",
//             country: null,
//             variable: variable,
//             yearData: null,
//             time:[_hour, _minutes, _seconds],
//             formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//             actionType:"viewMenuExplanation"
//         };
//         userData.push(entry);
//     }
// //menu bar, year slider, scatterplot slider when changed
//     function _change(variable, chartType)
//     {
//         _timeData = new Date();
//         _hour = _timeData.getHours();
//         _minutes = _timeData.getMinutes();
//         _seconds = _timeData.getMilliseconds();
//
//         var _chart = ["menuBar", "scatterplot", "yearSlider"];
//         var entry;
//         switch(chartType) {
//             case 0:
//             case 1:
//                 entry = {
//                     element: _chart[chartType],
//                     country: null,
//                     variable: variable,
//                     yearData: null,
//                     time:[_hour, _minutes, _seconds],
//                     formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//                     actionType:"changeVariable"
//                 };
//                 break;
//             case 2:
//                 entry = {
//                     element: _chart[chartType],
//                     country: null,
//                     variable: null,
//                     yearData: variable,
//                     time:[_hour, _minutes, _seconds],
//                     formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//                     actionType:"changeYear"
//                 };
//                 break;
//         }
//         userData.push(entry);
//     }
// //map
//     function _map(countryCode){
//         _timeData = new Date();
//         _hour = _timeData.getHours();
//         _minutes = _timeData.getMinutes();
//         _seconds = _timeData.getMilliseconds();
//
//         var entry = {
//             element: "map",
//             country: countryCode,
//             variable: null,
//             yearData: null,
//             time:[_hour, _minutes, _seconds],
//             formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//             actionType:"viewTooltip"
//         };
//         userData.push(entry);
//     }
//     function _viewLog(){
//         console.log(userData);
//         // DATA.insertUser(userData);
//     }
//     //click action(lock, unlock)
//     //brush
//     function _brush(countryCode, onOff){
//         _timeData = new Date();
//         _hour = _timeData.getHours();
//         _minutes = _timeData.getMinutes();
//         _seconds = _timeData.getMilliseconds();
//
//         var entry = {
//             element: "brush",
//             country: countryCode,
//             variable: null,
//             yearData: null,
//             time:[_hour, _minutes, _seconds],
//             formattedTime:[_hour + ":" + _minutes + ":" + _seconds],
//             actionType:"brush" + onOff
//         };
//         userData.push(entry);
//     }
//     //bar chart sort
//     //moving bar chart
// return {
//     scatter:_scatter,
//     bar:_bar,
//     change: _change,
//     viewLog:_viewLog,
//     menuHover: _menuHover,
//     map:_map,
//     brush:_brush
// }
// })();
//
//
window.onbeforeunload = function(e) {
    return 'Please press the Logout button to logout.';
};