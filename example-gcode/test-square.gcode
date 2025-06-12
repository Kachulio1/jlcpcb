; Test Square 50mm x 50mm
; For DIY CNC Plotter calibration
; Draws a 50mm square starting from current position

G21 ; Set units to millimeters
G90 ; Absolute positioning
G92 X0 Y0 Z0 ; Set current position as origin

; Raise pen
G1 Z3 F1000

; Move to starting point
G0 X0 Y0

; Lower pen
G1 Z-1 F100

; Draw square
G1 X50 F1000 ; Bottom line
G1 Y50 F1000 ; Right line
G1 X0 F1000  ; Top line
G1 Y0 F1000  ; Left line

; Raise pen
G1 Z3 F1000

; Return to origin
G0 X0 Y0

M5 ; Turn off spindle (pen up)
M2 ; End program
