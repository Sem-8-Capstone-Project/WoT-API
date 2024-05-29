# WoT API for IoT Management System

This repository contains the Web of Things (WoT) API component of our IoT management system. This API is responsible for interacting with IoT hardware, providing a standardized interface for controlling and monitoring various sensors and devices. Utilizing the Johnny-Five library for hardware interaction and WoT technology for a standardized interface, this component ensures seamless communication between the hardware components and the backend system.

## Features

- **Standardized Device Interaction**: Utilizes WoT technology to provide a uniform interface for all connected devices.
- **Sensor Data Collection**: Collects data from temperature sensors, light intensity sensors, and other IoT hardware.
- **Device Control**: Allows for remote control of connected devices such as fans, LEDs, and displays.
- **Real-Time Monitoring**: Supports real-time data updates and monitoring capabilities.
- **Interoperability**: Ensures compatibility with a wide range of IoT devices and platforms.

## Architecture Overview

- **User Interface**: Accessible via any user device (smartphones, computers) through a web browser.
- **Raspberry Pi Backend**: The central hub that integrates all components, including Web API, WoT API, and Serial Interface for direct hardware communication.
- **Arduino Uno**: Manages temperature sensors, fans, light intensity sensors, LEDs, and OLED displays.
- **Camera**: Connected to the Raspberry Pi for real-time monitoring.

## Technologies Used

- **Backend**: Node.js, Express.js
- **WoT Framework**: Node-WoT (Web of Things framework for Node.js)
- **Hardware Control**: Johnny-Five (JavaScript Robotics and IoT library)
- **Hardware**: Raspberry Pi, Arduino Uno
- **Protocols**: HTTP, WebSockets for real-time communication

## Getting Started

### Prerequisites

- Node.js and npm installed
- Raspberry Pi and Arduino Uno setup
- Necessary sensors and devices connected
