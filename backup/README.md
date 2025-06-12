# DIY 3-Axis CNC Plotter Using DC Motors with Optical Encoders

![CNC Plotter Banner](images/cnc-plotter-banner.jpg)

## Introduction

This tutorial will guide you through building a 3-axis CNC plotter by repurposing parts from an old printer and DVD drive. Instead of using traditional stepper motors, we'll implement a system that uses DC motors with optical encoders controlled via PID algorithms. This approach offers a unique way to understand motor control systems while creating a functional CNC plotter.

By the end of this project, you'll have a machine capable of drawing designs with different pens, with potential applications in:
- Creating custom greeting cards
- Drawing circuit board layouts
- Making artistic designs
- Educational demonstrations of motion control

This project combines principles from mechanical engineering, electronics, and software design, making it perfect for makers interested in CNC technology, motor control, and upcycling old electronics.

## Project Overview

![CNC Plotter Complete](images/cnc-plotter-complete.jpg)

### How It Works

Our CNC plotter uses DC motors with optical encoders from an old printer for X and Y axes, plus a DVD drive mechanism for the Z-axis. Unlike traditional CNC machines that use stepper motors, we'll implement a closed-loop control system using PID (Proportional-Integral-Derivative) controllers to precisely position the motors.

### Key Features
- Closed-loop position control with optical encoders
- GRBL firmware adaptation for DC motors
- Pen holder with adjustable height
- Compatible with standard G-code
- Support for multiple pen types
- A4 paper size drawing area

## Components Required

### Electronics
| Component | Quantity | Description | Source |
|-----------|----------|-------------|--------|
| Arduino Uno R3 | 1 | Controls GRBL firmware | [JLCMC](https://jlcmc.com/) |
| Arduino Mega 2560 | 1 | Handles the PID controllers | [JLCMC](https://jlcmc.com/) |
| Arduino CNC Shield V3 | 1 | Interfaces with GRBL | [JLCMC](https://jlcmc.com/) |
| Arduino L293D Motor Shield | 1 | Drives DC motors | [JLCMC](https://jlcmc.com/) |
| A4988 Stepper Driver | 1 | Controls Z-axis stepper | [JLCMC](https://jlcmc.com/) |

### Printer Parts
| Component | Quantity | Description | Source |
|-----------|----------|-------------|--------|
| Printer Head Frame | 1 | With 2 DC motors and encoders | Recycled |
| Linear Optical Encoder | 1 | For X-axis position feedback | Recycled |
| Rotary Optical Encoder | 1 | For Y-axis position feedback | Recycled |

### DVD Drive Parts
| Component | Quantity | Description | Source |
|-----------|----------|-------------|--------|
| DVD Drive Mechanism | 1 | For Z-axis movement | Recycled |
| Stepper Motor | 1 | Controls Z-axis | Recycled |

### Hardware and Connectors
| Component | Quantity | Description | Source |
|-----------|----------|-------------|--------|
| 10KΩ Resistors | 4 | For encoder circuits | [JLCMC](https://jlcmc.com/) |
| 150Ω Resistor | 1 | For LED indicator | [JLCMC](https://jlcmc.com/) |
| XH2.54mm 4P Connectors | 2 | For encoder connections | [JLCMC](https://jlcmc.com/) |
| XH2.54mm 2P Connectors | 2 | For motor connections | [JLCMC](https://jlcmc.com/) |
| Prototype PCB | 1 | For custom circuitry | [JLCMC](https://jlcmc.com/) |
| 40pin Headers | 2 sets | Male and female | [JLCMC](https://jlcmc.com/) |
| 10mm x 10mm Shaft Coupling | 1 | Connects pen holder | [JLCMC](https://jlcmc.com/) |
| Power Supply 12V | 1 | Powers the system | [JLCMC](https://jlcmc.com/) |
| Power Supply 5V | 1 | For logic circuits | [JLCMC](https://jlcmc.com/) |
| Rainbow Cable | 2 meters | For connections | [JLCMC](https://jlcmc.com/) |
| Cable Ties | Various | For wire management | [JLCMC](https://jlcmc.com/) |

### Tools Required
- Soldering iron and solder
- Wire strippers
- Screwdrivers
- Hot glue gun
- Multimeter
- Computer for programming

### Software Required
- [GRBL firmware](https://github.com/gnea/grbl/releases)
- [Inkscape](https://inkscape.org/) for design preparation
- [Universal Gcode Sender](https://winder.github.io/ugs_website/) for machine control
- Arduino IDE

## Circuit Design and Connections

The heart of our system lies in how we connect the two Arduino boards to control the DC motors with feedback from the optical encoders.

![Circuit Diagram](images/circuit-diagram.jpg)

### Key Circuit Elements:

1. **Dual Arduino System**:
   - Arduino Uno runs GRBL firmware to interpret G-code
   - Arduino Mega implements PID control for the DC motors

2. **Encoder Feedback System**:
   - X-axis uses a linear optical encoder
   - Y-axis uses a rotary optical encoder
   - Both provide quadrature signals for position and direction detection

3. **Signal Flow**:
   - GRBL generates STEP and DIR signals
   - PID controllers on the Mega process these along with encoder feedback
   - L293D Motor Shield drives the DC motors based on PID output

### Building the Adapter Shield

We'll create a custom adapter PCB to connect the Arduino Mega to the L293D Motor Shield:

![Adapter Shield](images/adapter-shield.jpg)

1. Cut a prototype PCB to approximately 60×90mm
2. Solder stackable female headers to match the Arduino Mega pins
3. Solder male headers to connect with the L293D shield
4. Add terminal blocks for encoders and STEP/DIR connections
5. Wire according to the circuit diagram

## Understanding Optical Encoders

The key component that allows us to use DC motors in this precision application is the optical encoder system.

![Encoder Types](images/encoder-types.jpg)

### Types of Encoders in this Project

1. **Linear Optical Encoder (X-axis)**:
   - Consists of a transparent strip with dark lines
   - Optical sensor detects position as the strip moves
   - Typically 6-7 lines per mm resolution

2. **Rotary Optical Encoder (Y-axis)**:
   - Uses a rotating disk with regular patterns
   - Our salvaged encoder has 1782 CPR (Counts Per Revolution)
   - When used with quadrature decoding (X4 mode), provides 7128 pulses per revolution

### Quadrature Decoding

Both encoders provide two signals (Channels A and B) that are 90° out of phase. This allows us to detect:
- Position (by counting pulses)
- Direction (by checking which channel leads)
- Enhanced resolution (by counting both rising and falling edges)

![Quadrature Signal](images/quadrature-signal.jpg)

## PID Control System

PID (Proportional-Integral-Derivative) control is crucial for achieving precise positioning with DC motors.

![PID Control Loop](images/pid-control-loop.jpg)

### The Control Loop

1. **Setpoint**: Desired position derived from STEP/DIR signals
2. **Process Variable**: Actual position from encoder feedback
3. **Error**: Difference between setpoint and actual position
4. **PID Controller**: Calculates appropriate motor control signal
5. **Output**: PWM signal to control motor speed and direction

### Tuning Parameters

Finding optimal PID parameters is challenging but essential:
- **P (Proportional)**: Responds to present error
- **I (Integral)**: Responds to accumulated error
- **D (Derivative)**: Responds to rate of change of error

For our specific hardware, these values worked well:
```
X-axis: KP=20.0, KI=0.03, KD=0.01
Y-axis: KP=9.0, KI=0.02, KD=0.01
```

## Mechanical Assembly

### Preparing the Printer Frame

![Printer Frame Assembly](images/printer-frame-assembly.jpg)

1. Carefully disassemble the printer to extract the head frame with motors
2. Identify and mark all wiring connections before disconnecting
3. Preserve the encoder strips and sensors
4. Mount the frame to a stable base using appropriate support structures

### Z-Axis Assembly

![Z-Axis from DVD Drive](images/z-axis-assembly.jpg)

1. Extract the linear mechanism from the DVD drive
2. Mount it vertically on the printer head carriage
3. Attach the flexible coupling to the DVD drive's stepper motor
4. Secure the pen holder in the coupling

## Software Implementation

### Arduino Code Structure

Our project uses two Arduino sketches:

1. **GRBL on Arduino Uno**: 
   - Standard GRBL installation with custom settings
   - Sends STEP/DIR signals to the Mega

2. **PID Controller on Arduino Mega**:
   - Reads encoder feedback
   - Processes STEP/DIR from Uno
   - Implements PID algorithm
   - Controls motor drivers

### Required Libraries

```cpp
// For Arduino Mega
#include <PID_v1.h>         // PID control
#include <AFMotor.h>        // Motor shield control
#include <Encoder.h>        // Encoder reading
#include <FlexiTimer2.h>    // Timing control
```

### Key Code Sections

#### Encoder Setup
```cpp
// Set up pins for the Quadrature Encoder
#define EncoderX_ChannelA   18  // Interrupt 5
#define EncoderX_ChannelB   22
#define EncoderY_ChannelA   20  // Interrupt 3
#define EncoderY_ChannelB   24

// Create encoder objects
Encoder XEncoder(EncoderX_ChannelA, EncoderX_ChannelB);
Encoder YEncoder(EncoderY_ChannelA, EncoderY_ChannelB);
```

#### STEP/DIR Processing
```cpp
#define STEP_XPIN  19  // Interrupt 4
#define STEP_YPIN  21  // Interrupt 2
#define DIR_XPIN   23
#define DIR_YPIN   25

// Interrupt handlers for STEP pulses
void doXstep() {
  if (digitalRead(DIR_XPIN) == HIGH) SETPOINT_X--;
  else SETPOINT_X++;
}

void doYstep() {
  if (digitalRead(DIR_YPIN) == HIGH) SETPOINT_Y--;
  else SETPOINT_Y++;
}

void setup() {
  // Attach interrupts to detect STEP pulses
  attachInterrupt(4, doXstep, RISING);
  attachInterrupt(2, doYstep, RISING);
}
```

#### PID Control Implementation
```cpp
// PID controller instances
PID myPID_X(&INPUT_X, &OUTPUT_X, &SETPOINT_X, KP_X, KI_X, KD_X, DIRECT);
PID myPID_Y(&INPUT_Y, &OUTPUT_Y, &SETPOINT_Y, KP_Y, KI_Y, KD_Y, DIRECT);

void loop() {
  // Read encoder positions
  INPUT_X = XEncoder.read();
  INPUT_Y = YEncoder.read();
  
  // Compute PID output
  myPID_X.Compute();
  myPID_Y.Compute();
  
  // Apply motor control with deadband
  ERROR_X = (INPUT_X - SETPOINT_X);
  if (abs(ERROR_X) < DEADBW_X) {
    motorX.setSpeed(0); // Within deadband - stop motor
  } else {
    motorX.setSpeed(abs(int(OUTPUT_X)));
    if (OUTPUT_X > 0) motorX.run(FORWARD);
    else motorX.run(BACKWARD);
  }
  
  // Similar code for Y-axis...
}
```

## GRBL Configuration

GRBL needs specific configuration to work with our DC motor setup:

```
$0=10.000    (Step pulse time)
$1=25.000    (Step idle delay)
$2=0.000     (Step pulse invert)
$3=3.000     (Step direction invert)
$100=24.500  (X-axis steps/mm)
$101=192.000 (Y-axis steps/mm)
$102=53.333  (Z-axis steps/mm)
$110=20000   (X-axis maximum rate)
$111=20000   (Y-axis maximum rate)
$112=2000    (Z-axis maximum rate)
$120=50      (X-axis acceleration)
$121=20      (Y-axis acceleration)
$122=50      (Z-axis acceleration)
$130=210     (X-axis maximum travel)
$131=297     (Y-axis maximum travel)
$132=40      (Z-axis maximum travel)
```

The most critical parameters are the steps/mm calibration values, which we'll determine experimentally.

## Calibration Process

### X-Axis Calibration

1. Count the number of lines per mm on the linear encoder strip (6-7 lines/mm)
2. With X4 encoding, this gives roughly 24-28 steps/mm
3. Fine-tune by commanding specific moves and measuring actual distance

### Y-Axis Calibration

1. The rotary encoder provides 7128 pulses per revolution (with X4 encoding)
2. Command the Y-axis to move a specific distance
3. Measure actual movement and adjust steps/mm value

### Z-Axis Calibration

For the DVD stepper motor Z-axis:
```
Steps/mm = (Steps per Revolution) × (Microsteps) / (mm per Revolution)
         = 20 × 8 / 3.0 = 53.333
```

## Using the CNC Plotter

### Creating Designs with Inkscape

![Inkscape Setup](images/inkscape-setup.jpg)

1. Set up an A4 page size (210×297mm)
2. Import or create your design
3. Convert objects to paths
4. Use the Gcodetools extension:
   - Set up Tools Library (cylindrical tool)
   - Define Orientation Points (Z surface = 0, Z depth = -1mm)
   - Generate G-code with appropriate settings (Z safe height = 3mm)

### Machine Control with Universal G-Code Sender

![Universal G-Code Sender](images/universal-gcode-sender.jpg)

1. Connect to the Arduino Uno (GRBL controller)
2. Set the home position by moving axes to desired starting point
3. Reset coordinates with "Reset Zero"
4. Load your G-code file
5. Start the job and monitor progress

### Pen Selection and Mounting

Different pens can be used for various effects:
- Fine-tip markers for detailed work
- Gel pens for smooth lines
- Pencils for light sketching

The flexible coupling allows easy pen changes by loosening the set screws.

## Example Projects

![Sample Drawing](images/sample-drawing.jpg)

Here are some simple projects to test your CNC plotter:

1. **Simple Geometric Patterns**
   - Great for testing accuracy and calibration

2. **Name Tags or Labels**
   - Useful practical application

3. **Artistic Line Drawings**
   - Shows the plotter's ability to handle curves

4. **Circuit Board Layouts**
   - Demonstrates precision capabilities

## Troubleshooting

### Motor Control Issues
- **Problem**: Motors oscillate or jitter
- **Solution**: Adjust PID parameters - try reducing P and increasing D

### Positional Accuracy Problems
- **Problem**: Drawings are distorted or wrong size
- **Solution**: Recalibrate steps/mm settings in GRBL

### Z-Axis Issues
- **Problem**: Pen doesn't touch paper or presses too hard
- **Solution**: Adjust Z-axis limits and Z-depth in G-code generation

### Communication Errors
- **Problem**: Arduino Uno not receiving commands
- **Solution**: Check USB connections, GRBL settings, baud rate

## Future Enhancements

![Enhanced CNC](images/enhanced-cnc.jpg)

1. **Multiple Tool Support**
   - Add a tool changer mechanism for different pens

2. **Improved User Interface**
   - Create a custom control program with real-time visualization

3. **Laser Engraving Module**
   - Add a small laser for engraving capabilities

4. **Drawing Area Expansion**
   - Modify the frame for larger paper sizes

## Troubleshooting Common Issues

For help diagnosing and solving problems with your CNC plotter, refer to our detailed [Troubleshooting Guide](troubleshooting.md). This guide covers:

- Mechanical issues with axis movement
- Encoder and feedback problems
- Communication difficulties
- Software configuration problems
- Performance optimization tips

## Detailed Calibration Process

For precise and accurate drawings, proper calibration is essential. Follow our step-by-step [Calibration Guide](calibration-guide.md) to:

- Calibrate each axis for accurate movements
- Fine-tune the PID controller parameters
- Test and verify calibration with test patterns
- Maintain optimal performance over time

## Example G-code Files

To help you test your CNC plotter, we've included several [Example G-code Files](example-gcode/):

- Basic calibration patterns (square, circle)
- Comprehensive test patterns
- JLCMC logo example
- Reference guide for creating your own G-code

## Conclusion

Building this DIY CNC plotter demonstrates how seemingly obsolete hardware can be repurposed into a precise drawing machine. The project combines mechanical design, electronics, and software to create something both functional and educational.

By using DC motors with optical encoders and PID control, we've created a system that rivals the precision of traditional stepper motor CNC machines, while gaining insights into closed-loop control systems.

## Resources and References

- [Original Project Inspiration](https://www.instructables.com/3-AXIS-CNC-PLOTTER-FROM-DC-MOTORS-AND-OPTICAL-ENCO/)
- [GRBL Documentation](https://github.com/gnea/grbl/wiki)
- [PID Control Theory](https://en.wikipedia.org/wiki/PID_controller)
- [Arduino PID Library](https://playground.arduino.cc/Code/PIDLibrary/)
- [Inkscape Gcodetools Tutorial](https://www.thingiverse.com/thing:2052549)

## Credits

This project was adapted from work by [tuenhidiy on Instructables](https://www.instructables.com/member/tuenhidiy/), with modifications to components and implementation details to use parts available from [JLCMC](https://jlcmc.com/).

## License

This tutorial is shared under the [Creative Commons Attribution-NonCommercial-ShareAlike License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
