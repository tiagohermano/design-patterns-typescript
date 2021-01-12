var WeatherStation = (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.setTemperature = function (temp) {
        console.log("WeatherStation: new temperature measurement: ", temp);
        this.temperature = temp;
        this.notifyObservers();
    };
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        // this.observers = this.observers.filter(observer => observer !== o)
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        var _this = this;
        this.observers.map(function (observer) { return observer.update(_this.temperature); });
    };
    return WeatherStation;
})();
var TemperatureDisplay = (function () {
    function TemperatureDisplay(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    TemperatureDisplay.prototype.update = function (temperature) {
        console.log('TemperatureDisplay: i need to update my display');
    };
    return TemperatureDisplay;
})();
var Fan = (function () {
    function Fan(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    Fan.prototype.update = function (temperature) {
        if (temperature > 25)
            return console.log("Fan: it's cold here, turning myself on");
        return console.log("Fan: it's nice and cool, turning myself off");
    };
    return Fan;
})();
var weatherStation = new WeatherStation();
var tempDisplay = new TemperatureDisplay(weatherStation);
var fan = new Fan(weatherStation);
weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
