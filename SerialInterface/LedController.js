const { Board, Led, Light } = require("johnny-five");

class LedController {
	constructor() {
		this.board = new Board();
		this.isBoardReady = false;
		this.leds = new Map(); // Map to store LED instances
		this.ldrSensor = null; // Reference to the LDR Sensor instance
	}

	async initializeLed(pinNumber) {
		if (!this.isBoardReady) {
			await new Promise((resolve) => {
				this.board.on("ready", () => {
					this.isBoardReady = true;
					resolve();
				});
			});
		}

		const led = new Led(pinNumber);
		this.leds.set(pinNumber, led);

		return led; // Return the LED instance
	}

	async initializeLDR(pinNumber) {
		if (!this.isBoardReady) {
			await new Promise((resolve) => {
				this.board.on("ready", () => {
					this.isBoardReady = true;
					resolve();
				});
			});
		}

		this.ldrSensor = new Light({
			pin: pinNumber,
			type: "analog",
		});

		return this.ldrSensor; // Return the LDR Sensor instance
	}

	turnOn(pinNumber) {
		const led = this.leds.get(pinNumber);
		if (!led) {
			throw new Error(`LED on pin ${pinNumber} is not initialized. Call initializeLed method first.`);
		}
		led.on();
		console.log(`LED on pin ${pinNumber} turned on`);
	}

	turnOff(pinNumber) {
		const led = this.leds.get(pinNumber);
		if (!led) {
			throw new Error(`LED on pin ${pinNumber} is not initialized. Call initializeLed method first.`);
		}
		led.off();
		console.log(`LED on pin ${pinNumber} turned off`);
	}

	readLDR() {
		if (!this.ldrSensor) {
			throw new Error("LDR sensor is not initialized. Call initializeLDR method first.");
		}

		return new Promise((resolve, reject) => {
			this.ldrSensor.on("change", (value) => {
				resolve(value);
			});
		});
	}
}

module.exports = LedController;
