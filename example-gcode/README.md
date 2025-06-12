# Example G-code Files

This directory contains example G-code files that you can use to test your DIY CNC Plotter. These files are designed to help you calibrate your machine and demonstrate its capabilities.

## Basic Calibration Files

### 1. `test-square.gcode`
- Draws a 50mm × 50mm square
- Perfect for testing axis calibration and perpendicularity
- Simple file to verify basic functionality
- Use this file first when setting up your plotter

### 2. `test-circle.gcode`
- Draws a 50mm diameter circle
- Tests the machine's ability to handle curved paths
- Useful for identifying mechanical issues
- Compare X and Y measurements to check calibration

## Advanced Test Patterns

### 3. `complete-test-pattern.gcode`
- Comprehensive test pattern with multiple elements:
  - Horizontal lines with different spacing
  - Vertical lines with different spacing
  - Diagonal lines
  - Basic shapes (rectangle, triangle, circle)
  - Spiral pattern (tests smooth motion)
  - Zigzag pattern (tests direction changes)
  - Simple text drawing
- Perfect for evaluating overall machine performance
- Use this after basic calibration is complete

### 4. `jlcmc-logo.gcode`
- Draws a simplified JLCMC logo
- Demonstrates text drawing capabilities
- Shows how the plotter handles complex paths

## Running the Example Files

1. Connect your CNC Plotter to your computer
2. Open Universal G-Code Sender
3. Load one of the example G-code files
4. Set up your pen and paper
5. Click "Send" to run the file

## Creating Your Own G-code Files

After testing with these examples, you can create your own designs:

1. Create vector art in Inkscape
2. Use the Gcodetools extension as described in the [Inkscape Guide](../inkscape-guide.md)
3. Generate G-code for your custom design
4. Test and refine as needed

## Tips for Best Results

- Secure your paper firmly to prevent shifting
- Make sure your pen is properly secured in the holder
- Calibrate your Z-axis to get proper pen pressure
- Start with slower speeds for more accurate results
- Gradually increase speed as you gain confidence in your machine's performance
