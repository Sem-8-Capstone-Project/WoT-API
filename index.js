const { Servient } = require("@node-wot/core");
const { HttpServer } = require("@node-wot/binding-http");
const { LedController } = require("./SerialInterface/LedController")
const cors = require('cors')

const servient = new Servient();
servient.addServer(new HttpServer({
	middleware: cors()
}));

const ledController = new LedController()
ledController.initializeLed(3).then(() => console.log("Led 1 intialized"))
ledController.initializeLed(5).then(() => console.log("Led 2 intialized"))
ledController.initializeLDR("A0").then(() => console.log("LDR initialized"))
ledController.initializeOLED().then(() => console.log("OLED initialized"))


servient.start().then(async (WoT) => {
	const exposingThing = await WoT.produce({
		"title": "light",
		"description": "A set of adaptive lights that turn on/off depending upon the amount of light in the room",
		"properties": {
			"light_intensity": {
				"type": "number",
				"description": "current light intensity",
				"observable": true,
				"readOnly": true
			}
		},
		"actions": {
			"led1_on": {
				"description": "turn on led 1"
			},
			"led1_off": {
				"description": "turn off led 1"
			},
			"led1_intensity": {
				"description": "set intensity of led 1",
				"uriVariables": {
					"intensity": {
						"type": "string"
					}
				}
			},
			"led2_on": {
				"description": "turn on led 2"
			},
			"led2_off": {
				"description": "turn off led 2"
			},
			"led2_intensity": {
				"description": "set intensity of led 2",
				"uriVariables": {
					"intensity": {
						"type": "string"
					}
				}
			},
			"set_username": {
				"uriVariables": {
					"username": {
						"type": "string"
					}
				}
			}
		}
	}
	)
	exposingThing.setPropertyReadHandler("light_intensity", async () => {
		const value = await ledController.readLDR()
		console.log(value)
		return value;
	});
	exposingThing.setActionHandler("led1_on", () => { ledController.turnOn(3); });
	exposingThing.setActionHandler("led1_off", () => { ledController.turnOff(3); });
	exposingThing.setActionHandler("led1_intensity", (_params, options) => { ledController.setIntensity(3, options.uriVariables.intensity); });
	exposingThing.setActionHandler("led2_on", () => { ledController.turnOn(5); });
	exposingThing.setActionHandler("led2_off", () => { ledController.turnOff(5); });
	exposingThing.setActionHandler("led2_intensity", (_params, options) => { ledController.setIntensity(5, options.uriVariables.intensity); });
	exposingThing.setActionHandler("set_username", (_params, options) => {
		ledController.turnOnDisplay();
		ledController.clearDisplay();
		ledController.drawString(1, 1, options.uriVariables.username);
	});

	await exposingThing.expose();
});