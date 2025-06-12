; Test Circle 50mm Diameter
; For DIY CNC Plotter calibration
; Draws a 50mm diameter circle using G-code arcs

G21 ; Set units to millimeters
G90 ; Absolute positioning
G92 X0 Y0 Z0 ; Set current position as origin

; Raise pen
G1 Z3 F1000

; Move to starting point (right side of circle)
G0 X25 Y0

; Lower pen
G1 Z-1 F100

; Draw circle (two half circles)
G3 X-25 Y0 I-25 J0 F1000 ; First half-circle (counterclockwise)
G3 X25 Y0 I25 J0 F1000 ; Second half-circle (counterclockwise)

; Raise pen
G1 Z3 F1000

; Return to origin
G0 X0 Y0

M5 ; Turn off spindle (pen up)
M2 ; End program
