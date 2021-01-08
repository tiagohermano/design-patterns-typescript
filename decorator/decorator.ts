abstract class Car {
  public description: string;
  public getDescription(): string {
    return this.description;
  }
  public abstract cost(): number;
}

class ModelS extends Car {
  public description = "Model S"

  public cost(): number {
    return 73000
  }
}

class ModelX extends Car {
  public description = "Model X"

  public cost(): number {
    return 77000
  }
}

abstract class CarOptions extends Car {
  decoratedCar: Car

  public abstract getDescription(): string
  public abstract cost(): number
}

class EnhancedAutoPilot extends CarOptions {
  decoratedCar: Car
  constructor(car: Car) {
    super()
    this.decoratedCar = car
  }

  public getDescription(): string {
    return `${this.decoratedCar.description}, Enhanced AutoPilot`
  }

  public cost(): number {
    return this.decoratedCar.cost() + 5000
  }
}

class RearFacingSeats extends CarOptions {
  decoratedCar: Car
  constructor(car: Car) {
    super()
    this.decoratedCar = car
  }

  public getDescription(): string {
    return `${this.decoratedCar.description}, Rear Facing Seats`
  }

  public cost(): number {
    return this.decoratedCar.cost() + 4000
  }
}

let newTesla = new ModelS()
newTesla = new RearFacingSeats(newTesla)
newTesla = new EnhancedAutoPilot(newTesla)

console.log(newTesla.getDescription())
console.log(newTesla.cost())
