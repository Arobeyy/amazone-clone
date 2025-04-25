class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;
  maxSpeed;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.maxSpeed = carDetails.maxSpeed;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";

    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h , Max speed: ${this.maxSpeed}, Trunk: ${trunkStatus}`
    );
  }

  go() {
    const INCREMENT = 40;
  
    if (this.isTrunkOpen) {
      console.log('🚫 Cannot go with the trunk open.');
      return;
    }
  
    const prevSpeed = this.speed;
    this.speed = Math.min(this.speed + INCREMENT, this.maxSpeed);
  
    if (this.speed === prevSpeed) {
      console.log(`🚫 Cannot speed up. Your car is already at max speed: ${this.speed}`);
    } else {
      console.log(`🚗 Speeding up! Current speed: ${this.speed}, Max speed: ${this.maxSpeed}`);
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

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
      console.log("Trunk is opening...");
    } else {
      console.log("Cannot open trunk. Your car is running");
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

  getBrand() {
    return this.#brand;
  }

  getModel() {
    return this.#model;
  }
}

class RaceCar extends Car{
  turboEnabled;
  boostPower;
  nitroCount;

  constructor(carDetails) {
    super(carDetails);
    this.turboEnabled = false;
    this.boostPower = carDetails.boostPower;
    this.nitroCount = carDetails.nitroCount;
  }

  enableTurbo() {
    if(this.nitroCount > 0 && !this.turboEnabled) {
      this.turboEnabled = true;
      this.speed += this.boostPower;
      this.nitroCount--;
      console.log(`💥 Turbo ON! Speed boosted to: ${this.speed}. Nitros left: ${this.nitroCount}`);
    } else {
      console.log(`❌ No nitro left or turbo already active.`);
    }
  }

  disableTurbo() {
    if (this.turboEnabled) {
      this.speed -= this.boostPower;
      this.turboEnabled = false;
      console.log(`🧯 Turbo OFF. Back to speed: ${this.speed}`);
    }
  }

  // Override trunk methods
  openTrunk() {
    console.log("❌ Race car doesn't have a trunk.");
  }

  closeTrunk() {
    console.log("❌ Race car doesn't have a trunk.");
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";

    console.log(
      `${this.getBrand()} ${this.getModel()}, Speed: ${this.speed} km/h , Max speed: ${this.maxSpeed}`
    );
  }
}


const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
  maxSpeed: 200
});

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
  maxSpeed: 200
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();
// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();


const raceCar = new RaceCar({
  brand: "Ferrari",
  model: "F1-X",
  maxSpeed: 500,
  boostPower: 80,
  nitroCount: 3,
});

console.log("🏁 Starting race simulation...\n");

raceCar.displayInfo();
raceCar.go(); // Normal go
raceCar.enableTurbo(); // Enable turbo
raceCar.go(); // Go again with turbo effect
raceCar.brake(); // Slow down
raceCar.disableTurbo(); // Disable turbo
raceCar.openTrunk(); // Should show trunk not available
raceCar.closeTrunk(); // Same
