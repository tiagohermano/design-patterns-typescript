interface Subject {
  registerObserver(o: Observer)
  removeObserver(o: Observer)
  notifyObservers()
}

interface Observer {
  update(temperature: number)
}

class WeatherStation implements Subject {
  private temperature: number;
  private observers: Observer[] = []

  setTemperature(temp: number) {
    console.log("WeatherStation: new temperature measurement: ", temp)
    this.temperature = temp
    this.notifyObservers()
  }
  
  public registerObserver(o: Observer) {
    this.observers.push(o)
  }
  public removeObserver(o: Observer) {
    this.observers = this.observers.filter(observer => observer !== o)
  }
  public notifyObservers() {
    this.observers.map(observer => observer.update(this.temperature))
  }
}

class TemperatureDisplay implements Observer {
  private subject: Subject
  constructor(weatherStation: WeatherStation) {
    this.subject = weatherStation
    weatherStation.registerObserver(this)
  }
  public update(temperature: number) {
    console.log('TemperatureDisplay: i need to update my display')
  }
}

class Fan implements Observer {
  private subject: Subject
  constructor(weatherStation: WeatherStation) {
    this.subject = weatherStation
    weatherStation.registerObserver(this)
  }
  public update(temperature: number) {
    if(temperature > 25) return console.log("Fan: it's cold here, turning myself on")
    return console.log("Fan: it's nice and cool, turning myself off")
  }
}

const weatherStation = new WeatherStation()
const tempDisplay = new TemperatureDisplay(weatherStation)
const fan = new Fan(weatherStation)

weatherStation.setTemperature(20)
weatherStation.setTemperature(30)
weatherStation.setTemperature(10)
weatherStation.setTemperature(50)

