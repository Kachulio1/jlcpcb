# Step-by-Step Calibration Guide for CNC Plotter

Proper calibration is essential for your CNC plotter to produce accurate drawings. This guide provides detailed instructions for calibrating each axis of your DIY CNC plotter.

## Preparation for Calibration

### Tools Required:
- Ruler or digital calipers (with 0.1mm precision)
- Fine-tip marker (for testing)
- A4 paper
- Scotch tape (to secure paper)
- Small screwdriver
- Calculator
- Computer with Universal G-Code Sender installed

### Initial Setup:
1. Ensure your CNC plotter is fully assembled and connected
2. Power on the system
3. Connect the Arduino Uno to your computer via USB
4. Launch Universal G-Code Sender and connect to the Arduino
5. Secure a sheet of A4 paper to the drawing surface
6. Insert a fine-tip marker into the pen holder

## X-Axis Calibration

### Step 1: Understand Current Settings
1. In UGS command console, type `$$` and press Enter
2. Find the line `$100=XX.XXX` (X-axis steps/mm)
3. Note down the current value

### Step 2: Measure Actual Movement
1. Position the pen at the left edge of the paper
2. Use UGS to zero all axes (click "Reset Zero")
3. In the command console, enter: `G91` (to use relative positioning)
4. Enter: `G0 X100` (move 100mm in X direction)
5. Measure the actual distance traveled with your ruler
6. Example: If you commanded a 100mm move but measured only 92mm

### Step 3: Calculate New Steps/mm Value
1. Use this formula:
   ```
   New Steps/mm = Current Steps/mm × (Commanded Distance ÷ Actual Distance)
   ```
2. Example:
   ```
   If Current Steps/mm = 24.5, Commanded Distance = 100mm, and Actual Distance = 92mm
   New Steps/mm = 24.5 × (100 ÷ 92) = 26.63
   ```

### Step 4: Update GRBL Settings
1. In the command console, type:
   ```
   $100=26.63
   ```
   (Replace with your calculated value)
2. Verify with `$$` command
3. Test again with another 100mm move
4. Repeat the process if needed until measurement error is less than 0.5mm over 100mm

## Y-Axis Calibration

### Step 1: Understand Current Settings
1. In UGS command console, type `$$` and press Enter
2. Find the line `$101=XXX.XXX` (Y-axis steps/mm)
3. Note down the current value

### Step 2: Measure Actual Movement
1. Position the pen at the bottom edge of the paper
2. Use UGS to zero all axes (click "Reset Zero")
3. In the command console, enter: `G91` (to use relative positioning)
4. Enter: `G0 Y100` (move 100mm in Y direction)
5. Measure the actual distance traveled with your ruler
6. Example: If you commanded a 100mm move but measured 105mm

### Step 3: Calculate New Steps/mm Value
1. Use this formula:
   ```
   New Steps/mm = Current Steps/mm × (Commanded Distance ÷ Actual Distance)
   ```
2. Example:
   ```
   If Current Steps/mm = 192.0, Commanded Distance = 100mm, and Actual Distance = 105mm
   New Steps/mm = 192.0 × (100 ÷ 105) = 182.86
   ```

### Step 4: Update GRBL Settings
1. In the command console, type:
   ```
   $101=182.86
   ```
   (Replace with your calculated value)
2. Verify with `$$` command
3. Test again with another 100mm move
4. Repeat the process if needed until measurement error is less than 0.5mm over 100mm

## Z-Axis Calibration

### Step 1: Understand Current Settings
1. In UGS command console, type `$$` and press Enter
2. Find the line `$102=XX.XXX` (Z-axis steps/mm)
3. Note down the current value

### Step 2: Check Pen Movement
1. Position the pen above the paper
2. In the command console, enter: `G91` (to use relative positioning)
3. Enter: `G0 Z-5` (move 5mm down)
4. The pen should lower and touch the paper
5. Enter: `G0 Z5` (move 5mm up)
6. The pen should raise off the paper

### Step 3: Calibrate Z-Axis Travel
1. Measure the physical distance between pen-up and pen-down positions
2. If this doesn't match the commanded movement, adjust steps/mm:
   ```
   New Steps/mm = Current Steps/mm × (Commanded Distance ÷ Actual Distance)
   ```
3. Enter the new value:
   ```
   $102=XX.XXX
   ```
   (Replace with your calculated value)

## Fine-Tuning the Pen Pressure

### Step 1: Test Drawing Pressure
1. Create a simple test G-code file with horizontal and vertical lines
2. Run the test file
3. Observe the quality of the drawn lines

### Step 2: Adjust Z-Axis Depth
1. If lines are too light:
   - In Inkscape, increase Z depth (e.g., from -1.0mm to -1.5mm)
   - OR adjust Z offset in UGS by changing the Z zero point

2. If lines are too heavy or the pen drags:
   - In Inkscape, decrease Z depth (e.g., from -1.0mm to -0.8mm)
   - OR adjust Z offset in UGS by changing the Z zero point

## Testing Calibration Accuracy

### Square Test
1. Create a G-code file that draws a perfect 50mm × 50mm square
2. Run the file on your CNC plotter
3. Measure both sides of the square with a ruler
4. Both dimensions should be 50mm ± 0.5mm
5. If not, repeat calibration for the inaccurate axis

### Circle Test
1. Create a G-code file that draws a perfect 50mm diameter circle
2. Run the file on your CNC plotter
3. Measure the diameter in both X and Y directions
4. Both measurements should be 50mm ± 0.5mm
5. If measurements differ, check for mechanical issues or repeat calibration

## PID Tuning for Smoother Movement

For experts, fine-tuning the PID parameters can improve drawing quality:

### Step 1: Observe Current Performance
1. Run a simple drawing and observe motor behavior
2. Look for oscillations, overshooting, or sluggish response

### Step 2: Adjust P Value
1. If motors oscillate: Reduce P value by 10-20%
2. If motors respond too slowly: Increase P value by 10-20%
3. Modify P values in the Arduino Mega code and upload

### Step 3: Adjust D Value
1. If motors overshoot positions: Increase D value
2. If motors take too long to settle: Decrease D value

### Step 4: Adjust I Value
1. If there is a persistent error: Increase I value slightly
2. If the system becomes unstable: Decrease I value

### Step 5: Test and Iterate
1. After each adjustment, run a simple test drawing
2. Make small changes and test until performance improves
3. Document your final values for future reference

## Saving Calibration Settings

### Save GRBL Settings
1. After successful calibration, type these commands in UGS:
   ```
   $$ > calibration_settings.txt
   ```
   This saves your settings to a file for reference

2. Also record your settings in a notebook or document

### Save PID Values
1. Record the final PID values from your Arduino Mega code:
   ```
   X-axis: KP=XX.X, KI=X.XX, KD=X.XX
   Y-axis: KP=XX.X, KI=X.XX, KD=X.XX
   ```
2. Keep these values safe in case you need to re-upload the code

## Regular Calibration Maintenance

For best results, repeat calibration:
- After any mechanical adjustments
- If drawing accuracy deteriorates
- After replacing any parts
- Every 10-20 hours of operation

## Advanced Calibration Techniques

### Backlash Compensation
If you notice gaps when the axes change direction, consider implementing backlash compensation:

1. Measure backlash by:
   - Moving axis from negative to positive direction
   - Marking the point where movement begins
   - Moving back to negative direction
   - Marking where movement begins
   - Measuring the distance between marks

2. Modify Arduino code to compensate (advanced users only)

### Temperature Compensation
For professional accuracy:
1. Calibrate in the temperature where the plotter will operate
2. Note any accuracy changes with temperature variations
3. Consider recalibrating if operating temperature changes significantly

By following this calibration guide, you'll achieve the best possible accuracy from your DIY CNC plotter. Take your time with each step, as proper calibration will significantly improve the quality of your drawings.
