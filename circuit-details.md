# Circuit Schematics for 3-Axis CNC Plotter

This document contains the detailed circuit diagrams for connecting all components of the CNC plotter.

## Main Circuit Diagram

The full circuit diagram shows the connection between:
- Arduino Uno with GRBL Shield
- Arduino Mega 2560 with L293D Motor Shield
- Optical Encoders
- DC Motors
- DVD drive stepper motor

![Main Circuit Diagram](images/circuit-diagram.jpg)

## Adapter Shield Wiring

### Input/Output connections:

| Arduino Mega Pin | Function |
|------------------|----------|
| Digital 18 | X Encoder Channel A (Interrupt 5) |
| Digital 22 | X Encoder Channel B |
| Digital 20 | Y Encoder Channel A (Interrupt 3) |
| Digital 24 | Y Encoder Channel B |
| Digital 19 | X STEP input (Interrupt 4) |
| Digital 23 | X DIR input |
| Digital 21 | Y STEP input (Interrupt 2) |
| Digital 25 | Y DIR input |

### Motor Shield Connections:

The L293D Motor Shield uses these pins:
- Digital 11: Motor 1 speed control (X axis)
- Digital 3: Motor 2 speed control (Y axis)
- Digital 4, 7, 8, 12: Direction control pins

## Optical Encoder Connections

### X-Axis Linear Encoder

| Pin | Function | Connection |
|-----|----------|------------|
| 1 | VCC | 3.3V |
| 2 | GND | GND |
| 3 | Channel A | Arduino Mega pin 18 |
| 4 | Channel B | Arduino Mega pin 22 |

Pull-up resistors: 2 × 10KΩ in parallel (equivalent to 5KΩ)

### Y-Axis Rotary Encoder

| Pin | Function | Connection |
|-----|----------|------------|
| 1 | GND | GND |
| 2 | Channel A | Arduino Mega pin 20 |
| 3 | VCC | 3.3V |
| 4 | Channel B | Arduino Mega pin 24 |

## Z-Axis DVD Drive Stepper

The DVD drive stepper motor connects to the A4988 driver on the GRBL shield:

| Motor Wire | A4988 Pin |
|------------|-----------|
| A+ | 1A |
| A- | 1B |
| B+ | 2A |
| B- | 2B |

## Power Connections

- Arduino Uno: USB or 7-12V DC input
- Arduino Mega: USB or 7-12V DC input
- L293D Motor Shield: External 12V for motors, 5V for logic
- GRBL Shield: 12V for Z-axis stepper

## Safety Notes

1. Always disconnect power before making changes to the circuits
2. Ensure correct polarity on all connections
3. Use appropriate current-limiting resistors for LEDs
4. Add bypass capacitors (100nF) near ICs for stable operation
5. Use heat sinks for the L293D chips if they get too hot
