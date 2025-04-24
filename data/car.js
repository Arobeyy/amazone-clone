class Car {
  brand;
  model;
  speed;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    this.speed = 0;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
  }

  go() {
    const MAX_SPEED = 200;
    const INCREMENT = 40;
  
    const newSpeed = this.speed + INCREMENT;

    //Math.min(value1, value2)
    //This returns the smaller of the two values.
    //So if this.speed + INCREMENT goes beyond MAX_SPEED, it will limit it to MAX_SPEED.
    this.speed = Math.min(newSpeed, MAX_SPEED);
  
    if (newSpeed > MAX_SPEED) {
      console.log(`🚫 Cannot speed up. Your car reached the max speed: ${this.speed}, Max speed is: ${MAX_SPEED}`);
    } else {
      console.log(`🚗 Your car is speeding up: ${this.speed}, Max speed is: ${MAX_SPEED}`);
    }
  }
  

  brake() {
    const MIN_SPEED = 0;
    const DECREMENT = 40;

    this.speed = Math.max(this.speed - DECREMENT, MIN_SPEED);

    if (this.speed === MIN_SPEED) {
      console.log(`🛑 Your car has stopped. Speed is now: ${this.speed}`);
    } else {
      console.log(`🔻 Your car is slowing down. Current speed: ${this.speed}`);
    }
  }
}



const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();
