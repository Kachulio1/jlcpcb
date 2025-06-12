; JLCMC Logo - Simple Version
; For DIY CNC Plotter project
; Draws a simplified "JLCMC" text with underline

G21 ; Set units to millimeters
G90 ; Absolute positioning
G92 X0 Y0 Z0 ; Set current position as origin

; Raise pen
G1 Z3 F1000

; Draw "J"
G0 X10 Y30 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X20 Y30 F1000 ; Draw top of J
G1 X15 Y30 F1000 ; Move to middle of top
G1 X15 Y10 F1000 ; Draw stem
G1 X10 Y10 F1000 ; Draw hook

; Draw "L"
G1 Z3 F1000 ; Raise pen
G0 X25 Y30 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X25 Y10 F1000 ; Draw vertical line
G1 X35 Y10 F1000 ; Draw horizontal line

; Draw "C"
G1 Z3 F1000 ; Raise pen
G0 X50 Y30 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X40 Y30 F1000 ; Draw top
G1 X40 Y10 F1000 ; Draw vertical
G1 X50 Y10 F1000 ; Draw bottom

; Draw "M"
G1 Z3 F1000 ; Raise pen
G0 X55 Y10 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X55 Y30 F1000 ; Draw left stem
G1 X60 Y20 F1000 ; Draw middle down
G1 X65 Y30 F1000 ; Draw middle up
G1 X65 Y10 F1000 ; Draw right stem

; Draw "C"
G1 Z3 F1000 ; Raise pen
G0 X80 Y30 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X70 Y30 F1000 ; Draw top
G1 X70 Y10 F1000 ; Draw vertical
G1 X80 Y10 F1000 ; Draw bottom

; Draw underline
G1 Z3 F1000 ; Raise pen
G0 X5 Y5 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X85 Y5 F1000 ; Draw underline

; Raise pen and return to origin
G1 Z3 F1000
G0 X0 Y0

M5 ; Turn off spindle (pen up)
M2 ; End program
