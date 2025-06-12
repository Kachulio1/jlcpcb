# Arduino Code for 3-Axis CNC Plotter

This document contains the Arduino code for both the Arduino Uno (GRBL) and Arduino Mega 2560 (PID controller) used in the CNC plotter project.

## Arduino Mega 2560 Code (PID Controller)

```cpp
/*
 * DC Servo Controller for CNC Plotter
 * Based on original work by cswiger and tuenhidiy
 * 
 * Uses PID control to drive DC motors with optical encoder feedback
 * Receives STEP/DIR signals from GRBL running on Arduino Uno
 */

#include <PID_v1.h>        // PID Library by Brett Beauregard
#include <AFMotor.h>       // Adafruit Motor Shield Library
#include <Encoder.h>       // Encoder Library by Paul Stoffregen
#include <FlexiTimer2.h>   // Timer for regular updates

// Set up pins for the Quadrature Encoder
#define EncoderX_ChannelA   18  // Interrupt 5
#define EncoderX_ChannelB   22
#define EncoderY_ChannelA   20  // Interrupt 3
#define EncoderY_ChannelB   24

// Set up pins for STEP/DIR signals from GRBL
#define STEP_XPIN  19  // Interrupt 4
#define STEP_YPIN  21  // Interrupt 2
#define DIR_XPIN   23
#define DIR_YPIN   25

// Define steps per millimeter for each axis (should match GRBL settings)
#define STEPSPERMM_X      24.5  // X-axis linear encoder resolution
#define STEPSPERMM_Y      192.0 // Y-axis rotary encoder resolution

// Define deadband width to prevent motor oscillation
#define DEADBW_X          4.5   // ~0.18mm deadband for X
#define DEADBW_Y          19.2  // ~0.1mm deadband for Y

// Create motor instances using the Adafruit Motor Shield
AF_DCMotor motorX(1, MOTOR12_8KHZ); // X-axis motor on M1
AF_DCMotor motorY(2, MOTOR12_8KHZ); // Y-axis motor on M2

// Create encoder instances
Encoder XEncoder(EncoderX_ChannelA, EncoderX_ChannelB);
Encoder YEncoder(EncoderY_ChannelA, EncoderY_ChannelB);

// PID variables
double SETPOINT_X = 0;  // Desired position for X axis
double INPUT_X = 0;     // Actual position from encoder
double OUTPUT_X = 0;    // Control signal to motor
double ERROR_X = 0;     // Error between setpoint and input

double SETPOINT_Y = 0;  // Desired position for Y axis
double INPUT_Y = 0;     // Actual position from encoder
double OUTPUT_Y = 0;    // Control signal to motor
double ERROR_Y = 0;     // Error between setpoint and input

// PID tuning parameters
double KP_X = 20.0;   // P for X motor
double KI_X = 0.03;   // I for X motor
double KD_X = 0.01;   // D for X motor

double KP_Y = 9.0;    // P for Y motor
double KI_Y = 0.02;   // I for Y motor
double KD_Y = 0.01;   // D for Y motor

// Create PID controllers
PID myPID_X(&INPUT_X, &OUTPUT_X, &SETPOINT_X, KP_X, KI_X, KD_X, DIRECT);
PID myPID_Y(&INPUT_Y, &OUTPUT_Y, &SETPOINT_Y, KP_Y, KI_Y, KD_Y, DIRECT);

// Variables for debugging
boolean debugMode = false;
unsigned long lastDebugTime = 0;
const int debugInterval = 1000; // Debug output interval in ms

// Interrupt handlers for STEP signals
void doXstep() {
  if (digitalRead(DIR_XPIN) == HIGH)
    SETPOINT_X--;
  else
    SETPOINT_X++;
}

void doYstep() {
  if (digitalRead(DIR_YPIN) == HIGH)
    SETPOINT_Y--;
  else
    SETPOINT_Y++;
}

// Update X axis motor
void updateMotorX() {
  ERROR_X = (INPUT_X - SETPOINT_X);
  
  // Only move if outside deadband
  if (abs(ERROR_X) < DEADBW_X) {
    motorX.setSpeed(0); // Stop motor within deadband
  } else {
    // Set motor direction based on PID output
    if (OUTPUT_X > 0) {
      motorX.run(FORWARD);
    } else {
      motorX.run(BACKWARD);
    }
    motorX.setSpeed(abs(int(OUTPUT_X))); // Set speed based on PID output
  }
}

// Update Y axis motor
void updateMotorY() {
  ERROR_Y = (INPUT_Y - SETPOINT_Y);
  
  // Only move if outside deadband
  if (abs(ERROR_Y) < DEADBW_Y) {
    motorY.setSpeed(0); // Stop motor within deadband
  } else {
    // Set motor direction based on PID output
    if (OUTPUT_Y > 0) {
      motorY.run(FORWARD);
    } else {
      motorY.run(BACKWARD);
    }
    motorY.setSpeed(abs(int(OUTPUT_Y))); // Set speed based on PID output
  }
}

// Timer callback function
void timerCallback() {
  // Read encoder values
  INPUT_X = XEncoder.read();
  INPUT_Y = YEncoder.read();
  
  // Compute PID outputs
  myPID_X.Compute();
  myPID_Y.Compute();
  
  // Update motors
  updateMotorX();
  updateMotorY();
}

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  Serial.println("DC Servo Controller for CNC Plotter");
  
  // Configure input pins
  pinMode(DIR_XPIN, INPUT_PULLUP);
  pinMode(DIR_YPIN, INPUT_PULLUP);
  pinMode(STEP_XPIN, INPUT_PULLUP);
  pinMode(STEP_YPIN, INPUT_PULLUP);
  
  // Attach interrupts for STEP signals
  attachInterrupt(4, doXstep, RISING);  // PIN 19 (Interrupt 4)
  attachInterrupt(2, doYstep, RISING);  // PIN 21 (Interrupt 2)
  
  // Initialize motors
  motorX.setSpeed(0);
  motorX.run(RELEASE);
  motorY.setSpeed(0);
  motorY.run(RELEASE);
  
  // Configure PID controllers
  myPID_X.SetMode(AUTOMATIC);
  myPID_X.SetOutputLimits(-255, 255); // PWM range
  myPID_X.SetSampleTime(10);          // 10ms sample time
  
  myPID_Y.SetMode(AUTOMATIC);
  myPID_Y.SetOutputLimits(-255, 255); // PWM range
  myPID_Y.SetSampleTime(10);          // 10ms sample time
  
  // Set up timer for regular updates
  FlexiTimer2::set(10, 1.0/1000, timerCallback); // 10ms interval
  FlexiTimer2::start();
  
  Serial.println("Initialization complete.");
}

void loop() {
  // Only for debugging - print values every debugInterval
  if (debugMode && millis() - lastDebugTime > debugInterval) {
    Serial.print("X - SET:");
    Serial.print(SETPOINT_X);
    Serial.print(" IN:");
    Serial.print(INPUT_X);
    Serial.print(" ERR:");
    Serial.print(ERROR_X);
    Serial.print(" OUT:");
    Serial.println(OUTPUT_X);
    
    Serial.print("Y - SET:");
    Serial.print(SETPOINT_Y);
    Serial.print(" IN:");
    Serial.print(INPUT_Y);
    Serial.print(" ERR:");
    Serial.print(ERROR_Y);
    Serial.print(" OUT:");
    Serial.println(OUTPUT_Y);
    
    lastDebugTime = millis();
  }
  
  // Check for serial commands (for debugging)
  if (Serial.available()) {
    char cmd = Serial.read();
    switch (cmd) {
      case 'd': // Toggle debug mode
        debugMode = !debugMode;
        Serial.print("Debug mode: ");
        Serial.println(debugMode ? "ON" : "OFF");
        break;
      case 'r': // Reset encoder positions
        XEncoder.write(0);
        YEncoder.write(0);
        SETPOINT_X = 0;
        SETPOINT_Y = 0;
        Serial.println("Encoders reset to 0");
        break;
    }
  }
}
```

## Arduino Uno Setup Instructions (GRBL)

1. Download GRBL v1.1 from GitHub
2. Open Arduino IDE and Install GRBL
3. Upload GRBL to Arduino Uno
4. Configure GRBL with these settings:

```
$0=10.000    (Step pulse time)
$1=25.000    (Step idle delay)
$2=0.000     (Step pulse invert)
$3=3.000     (Step direction invert)
$4=0.000     (Invert step enable pin)
$5=0.000     (Invert limit pins)
$6=0.000     (Invert probe pin)
$10=1.000    (Status report options)
$11=0.010    (Junction deviation)
$12=0.002    (Arc tolerance)
$13=0.000    (Report in inches)
$20=0.000    (Soft limits enable)
$21=0.000    (Hard limits enable)
$22=0.000    (Homing cycle enable)
$23=0.000    (Homing direction invert)
$24=25.000   (Homing locate feed rate)
$25=500.000  (Homing search seek rate)
$26=250.000  (Homing switch de-bounce delay)
$27=1.000    (Homing switch pull-off distance)
$30=1000.000 (Maximum spindle speed)
$31=0.000    (Minimum spindle speed)
$32=0.000    (Laser-mode enable)
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

## Encoder Library Installation

1. In Arduino IDE, go to Sketch > Include Library > Manage Libraries
2. Search for "Encoder" by Paul Stoffregen
3. Install the library

## PID Library Installation

1. Download PID library from: https://github.com/br3ttb/Arduino-PID-Library/
2. In Arduino IDE, go to Sketch > Include Library > Add .ZIP Library
3. Select the downloaded PID library ZIP file

## AFMotor Library Installation

1. Download Adafruit Motor Shield Library from: https://github.com/adafruit/Adafruit-Motor-Shield-library
2. In Arduino IDE, go to Sketch > Include Library > Add .ZIP Library
3. Select the downloaded AFMotor library ZIP file

## FlexiTimer2 Library Installation

1. Download FlexiTimer2 from: https://playground.arduino.cc/Main/FlexiTimer2/
2. In Arduino IDE, go to Sketch > Include Library > Add .ZIP Library
3. Select the downloaded FlexiTimer2 library ZIP file
