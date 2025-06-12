# Troubleshooting Guide for CNC Plotter

This guide helps you diagnose and solve common problems you might encounter while building or operating your DIY CNC plotter.

## Mechanical Issues

### Problem: Axis Movement is Jerky or Stutters

**Possible Causes and Solutions:**

1. **PID Tuning Parameters Need Adjustment**
   - Symptoms: Motors oscillate, stutter, or make buzzing sounds
   - Solution: Adjust PID values in the Arduino Mega code
     - If oscillating: Reduce P value by 10-20%
     - If slow to respond: Increase P value by 10-20%
     - If overshooting: Increase D value slightly
     - If never reaching target: Increase I value slightly

2. **Mechanical Friction or Binding**
   - Symptoms: Motors struggle at certain positions, movement is inconsistent
   - Solution: 
     - Check for debris in linear guides
     - Apply appropriate lubricant to moving parts
     - Ensure all parts are properly aligned
     - Check for over-tightened screws restricting movement

3. **Insufficient Power Supply**
   - Symptoms: Motors struggle under load or when moving both axes simultaneously
   - Solution:
     - Measure voltage at motor driver inputs (should be 12V)
     - Try a power supply with higher current rating
     - Check for voltage drop in wiring

### Problem: Pen Doesn't Lower or Raise Properly

**Possible Causes and Solutions:**

1. **Z-axis Mechanism Issues**
   - Check DVD drive mechanism for binding or damage
   - Verify stepper motor connections
   - Ensure the flexible coupling is secure

2. **GRBL Configuration Issues**
   - Verify Z-axis settings in GRBL ($102, $112, $122, $132)
   - Check if Z-axis direction is correct ($3 parameter)

3. **Mechanical Issues**
   - Inspect for any obstruction in Z-axis movement
   - Check if the pen holder is securely attached

## Electronic Issues

### Problem: Encoder Problems

**Possible Causes and Solutions:**

1. **No Encoder Feedback**
   - Check wiring connections to the Arduino Mega
   - Verify 3.3V power is reaching the encoders
   - Test encoder signals with a multimeter or oscilloscope
   - Check encoder pull-up resistors

2. **Erratic Encoder Readings**
   - Look for loose connections in encoder wiring
   - Check for electromagnetic interference (keep encoder wires away from motor wires)
   - Add capacitors (0.1µF) near the encoder connections to filter noise
   - Verify the encoder strip/disk is clean and undamaged

### Problem: Communication Issues Between Arduinos

**Possible Causes and Solutions:**

1. **STEP/DIR Signals Not Being Detected**
   - Check wiring between Arduino Uno and Mega
   - Verify ground connection between both Arduinos
   - Test STEP pin signals with oscilloscope or LED
   - Check interrupt attachments in the Arduino Mega code

2. **Motor Driver Issues**
   - Verify L293D shield is properly seated on Arduino Mega
   - Check for overheating on L293D chips
   - Try reducing motor speed to reduce current draw

## Software Issues

### Problem: GRBL Won't Connect or Responds with Errors

**Possible Causes and Solutions:**

1. **Wrong Port or Baud Rate**
   - Verify COM port selection in UGS
   - Confirm baud rate is set to 115200
   - Try a different USB cable

2. **GRBL Configuration Issues**
   - Try reloading GRBL firmware to Arduino Uno
   - Reset GRBL to defaults with `$RST=`
   - Check GRBL version compatibility with UGS

3. **Arduino Recognition Problems**
   - Check if the Arduino is recognized by your computer
   - Try a different USB port
   - Reinstall Arduino drivers if necessary

### Problem: G-code File Doesn't Run Correctly

**Possible Causes and Solutions:**

1. **Incorrect G-code Format**
   - Verify Inkscape settings for G-code generation
   - Check post-processor settings (should be GRBL)
   - Look for obvious errors in the G-code file

2. **Scaling or Position Issues**
   - Verify steps/mm calibration in GRBL
   - Check that your work area is properly defined
   - Reset work coordinates before starting the job

3. **Communication Timeouts**
   - Reduce feed rate in the G-code
   - Simplify complex paths in your design
   - Increase the buffer size in GRBL if possible

## Calibration Issues

### Problem: Poor Drawing Accuracy

**Possible Causes and Solutions:**

1. **Steps/mm Calibration Incorrect**
   - Recalibrate steps/mm for each axis
   - For X-axis: Count actual lines per mm on linear encoder
   - For Y-axis: Calculate based on encoder CPR and mechanical ratio
   - Update GRBL settings with correct values

2. **Mechanical Backlash**
   - Check for loose couplings or belt tension
   - Apply backlash compensation in software if possible
   - Ensure all mechanical connections are tight

3. **Encoder Resolution Limitations**
   - Understand the resolution limits of your encoders
   - Avoid designs requiring precision beyond your system's capabilities
   - Consider upgrading encoders if higher precision is needed

## Performance Optimization

### Problem: Slow Operation

**Possible Causes and Solutions:**

1. **Conservative GRBL Settings**
   - Increase maximum rate settings ($110, $111, $112)
   - Increase acceleration values ($120, $121, $122)
   - Test incrementally to find optimal values

2. **Inefficient G-code**
   - Enable path optimization in Inkscape
   - Reduce unnecessary pen movements in your design
   - Consider using G-code optimization tools

3. **PID Response Too Slow**
   - Adjust PID parameters for faster response
   - Increase P value cautiously to improve response time
   - Be careful to avoid oscillation

## Maintenance Tips

Regular maintenance will prevent many problems before they occur:

1. **Mechanical Maintenance**
   - Clean dust from linear rails and bearings
   - Apply appropriate lubricant to moving parts
   - Check and tighten all screws periodically
   - Inspect belts and couplings for wear

2. **Electrical Maintenance**
   - Check all connections for corrosion or looseness
   - Inspect cables for wear, especially near moving parts
   - Verify voltage levels periodically
   - Keep electronics clear of dust

3. **Software Maintenance**
   - Back up your PID settings and GRBL configuration
   - Update firmware and software when new versions are available
   - Document any modifications you make

## When to Seek Help

If you've tried the troubleshooting steps and still have issues:

1. Take clear photos or videos of the problem
2. Document exactly what you've tried so far
3. Share your specific GRBL settings and Arduino code
4. Post in relevant forums or communities:
   - Arduino Forums
   - GRBL GitHub Issues
   - CNC-related subreddits
   - Instructables comment section on the original project

## Advanced Debugging Techniques

1. **Enable Debug Mode**
   - Use serial monitor to view encoder positions and errors
   - Send 'd' character to the Arduino Mega to toggle debug mode

2. **Test Components Individually**
   - Test DC motors directly with power supply
   - Verify encoders with simple test sketch
   - Check Z-axis stepper separately from X/Y axes

3. **Analyze Signal Integrity**
   - Use oscilloscope to check for clean STEP/DIR signals
   - Look for noise on encoder signal lines
   - Verify PWM signals reaching motor drivers

By systematically troubleshooting issues with your CNC plotter, you can resolve most problems and achieve reliable operation for your creative projects.
