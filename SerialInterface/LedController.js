const five = require("johnny-five");
const { Board, Led, Light } = five;
const Oled = require('oled-js');
const font = require('oled-font-5x7');

class LedController {
	constructor() {
		this.board = new Board();
		this.isBoardReady = false;
		this.leds = new Map(); // Map to store LED instances
		this.ldrSensor = null; // Reference to the LDR Sensor instance
		this.oled = null;
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

	async initializeOLED() {
		if (!this.isBoardReady) {
			await new Promise((resolve) => {
				this.board.on("ready", () => {
					this.isBoardReady = true;
					resolve();
				});
			});
		}

		const opts = {
			width: 128,
			height: 64,
			address: 0x3C, // Replace with your OLED address
		};

		this.oled = new Oled(this.board, five, opts);
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

	setIntensity(pinNumber, intensity) {
		const led = this.leds.get(pinNumber);
		if (!led) {
			throw new Error(`LED on pin ${pinNumber} is not initialized. Call initializeLed method first.`);
		}
		led.brightness(intensity);
		console.log(`LED on pin ${pinNumber} set to intensity ${intensity}`);
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

	async turnOnDisplay() {
		if (!this.oled) {
			await this.initializeOLED();
		}
		this.oled.turnOnDisplay();
	}

	async turnOffDisplay() {
		if (!this.oled) {
			await this.initializeOLED();
		}
		this.oled.turnOffDisplay();
	}

	async clearDisplay() {
		if (!this.oled) {
			await this.initializeOLED();
		}
		this.oled.clearDisplay();
		this.oled.update();
	}

	async drawString(x, y, string) {
		if (!this.oled) {
			await this.initializeOLED();
		}
		this.oled.setCursor(x, y);
		this.oled.writeString(font, 2, string, 1, true, 4);
	}
}

module.exports = { LedController };