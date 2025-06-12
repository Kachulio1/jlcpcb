# Using Universal G-Code Sender with Your CNC Plotter

This guide explains how to set up and use Universal G-Code Sender (UGS) to control your CNC plotter.

## Installing Universal G-Code Sender

1. Download the latest version of UGS from [the official website](https://winder.github.io/ugs_website/download/)
2. Choose the "Platform" version for the best experience
3. Extract the downloaded file to a convenient location
4. Run UGS:
   - On Windows: Run the `.bat` file
   - On macOS: Run the `.command` file
   - On Linux: Run the `.sh` file

## Connecting to Your CNC Plotter

1. Connect your Arduino Uno (GRBL controller) to your computer via USB
2. In UGS, go to the "Connection" section:
   - Select the correct COM port (Arduino)
   - Set Baud Rate to 115200
   - Set Firmware to GRBL
3. Click "Connect"
4. If connected successfully, you'll see the GRBL version information in the console

## Initial Setup

### Checking GRBL Settings

1. Click on the "Commands" tab
2. Type `$$` and press Enter
3. This will display all current GRBL settings
4. Verify the settings match those recommended in this tutorial:
   - $100=24.500 (X-axis steps/mm)
   - $101=192.000 (Y-axis steps/mm)
   - $102=53.333 (Z-axis steps/mm)

### Setting Work Coordinates

Before starting any job, you need to establish a home position:

1. Go to the "Machine Control" tab
2. Use the jog controls to move the pen to your desired starting position
   - X and Y should be at the bottom-left corner of your paper
   - Z should be just above the paper surface
3. Click "Reset Zero" to set this position as the origin (0,0,0)

## Loading and Running G-code

1. Click on the "File" tab
2. Click "Browse" and select your G-code file (generated from Inkscape)
3. Once loaded, the G-code will be displayed in the file viewer
4. The "Visualizer" tab will show a preview of the tool path
5. Check that the drawing fits within your work area
6. When ready, click "Send" to start the job

## Controlling Your CNC Plotter

### Manual Controls

The "Machine Control" tab provides several controls:

- **Jog Controls**: Move the axes manually
  - Use the directional buttons to move X and Y axes
  - Use Z+ and Z- to raise or lower the pen
  - Adjust step size for precision movements

- **Feed Rate Control**: Adjust the speed of movement
  - Starting at 50% is recommended for new machines
  - Increase gradually if everything runs smoothly

### Command Console

The "Commands" tab allows you to send direct GRBL commands:

- `G0 X10 Y10`: Rapid move to position X=10mm, Y=10mm
- `G1 X20 Y20 F1000`: Linear move to X=20mm, Y=20mm at feed rate 1000mm/min
- `M3 S0`: Lower the pen (Z-axis down)
- `M5`: Raise the pen (Z-axis up)

## Common Operations

### Pausing and Resuming

If you need to pause the job:
1. Click "Pause" on the "File" tab
2. The machine will stop immediately
3. When ready to resume, click "Resume"

### Stopping a Job

If you need to stop the job completely:
1. Click "Cancel" on the "File" tab
2. The machine will stop, and the job cannot be resumed
3. You would need to start over from the beginning

### Changing Pens

To change pens during or between jobs:
1. Pause the current job or wait for completion
2. Use the jog controls to raise the Z-axis high enough
3. Replace the pen
4. Lower the Z-axis to the correct height
5. Resume your job or start the next one

## Advanced Features

### Macro Buttons

UGS allows you to create macro buttons for common operations:

1. Go to Actions > Edit Macros
2. Add a new macro with a name and GRBL command
3. For example, create a "Lower Pen" macro with command `M3 S0`
4. Create a "Raise Pen" macro with command `M5`

### Machine Status

The Status panel shows:
- Current position (machine coordinates)
- Work position (relative to your zero point)
- Real-time feed rate
- State (Idle, Run, Hold, etc.)

### Troubleshooting Connection Issues

If you can't connect to your CNC plotter:
1. Check that the Arduino is properly connected and powered
2. Ensure the correct COM port is selected
3. Try unplugging and reconnecting the USB cable
4. Restart UGS
5. If still not working, try uploading GRBL to the Arduino again

## Tips for Better Results

1. **Run Test Patterns**: Before attempting complex designs, run simple test patterns to verify calibration
2. **Monitor the First Run**: Watch the machine closely during the first run of a new file
3. **Secure Your Paper**: Use tape or clips to secure the paper to prevent movement
4. **Regular Calibration**: Check your machine's calibration periodically
5. **Save Your Settings**: Once you have good settings, note them down for future reference

## Safety Notes

1. Always keep hands away from moving parts
2. Monitor the machine during operation
3. Have the emergency stop (Cancel button) ready
4. Don't leave the machine unattended during operation

## Keyboard Shortcuts

- **Arrow Keys**: Jog X and Y axes
- **Page Up/Down**: Jog Z axis
- **Escape**: Emergency stop
- **Space**: Pause/Resume

By mastering Universal G-Code Sender, you'll have complete control over your CNC plotter, allowing you to create precise and complex drawings with ease.
