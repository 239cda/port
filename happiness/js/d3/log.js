/**
 * Created by InKwon on 2017-06-19.
 */
//create event listener for each elements in the viz
//should include the time and which variable in which chart interacted
var userData = [];

var logEvent = (function(){
    var _timeData, _hour, _minutes, _seconds;

    //scatterplot
    function _scatter(countryCode, var1, var2){
        //receive country code of the clicked or hovered circle
        //get the time data outside this function and combine them
        //get the variable
        _timeData = new Date();
        _hour = _timeData.getHours();
        _minutes = _timeData.getMinutes();
        _seconds = _timeData.getMilliseconds();

        var entry = {
            chart: "scatterplot",
            country: countryCode,
            variable: [var1, var2],
            time:[_hour, _minutes, _seconds],
            formattedTime:[_hour + ":" + _minutes + ":" + _seconds]
        };
        userData.push(entry);
    }
//bar chart
//time chart
//menu
//map
    function _viewLog(){
        console.log(userData);
    }
return {
    scatter:_scatter,
    viewLog:_viewLog
}
})();
