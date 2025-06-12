; Test Pattern for CNC Plotter
; Includes lines, curves, text and patterns
; Great for testing drawing quality and accuracy

G21 ; Set units to millimeters
G90 ; Absolute positioning
G92 X0 Y0 Z0 ; Set current position as origin

; Raise pen
G1 Z3 F1000

; Draw horizontal lines with different spacing
; Move to starting point
G0 X10 Y10
G1 Z-1 F100 ; Lower pen
G1 X60 Y10 F1000 ; Draw line

G1 Z3 F1000 ; Raise pen
G0 X10 Y15 ; Move to next line
G1 Z-1 F100 ; Lower pen
G1 X60 Y15 F1000 ; Draw line

G1 Z3 F1000 ; Raise pen
G0 X10 Y25 ; Move to next line with wider spacing
G1 Z-1 F100 ; Lower pen
G1 X60 Y25 F1000 ; Draw line

; Draw vertical lines
G1 Z3 F1000 ; Raise pen
G0 X10 Y30 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X10 Y80 F1000 ; Draw line

G1 Z3 F1000 ; Raise pen
G0 X20 Y30 ; Move to next line
G1 Z-1 F100 ; Lower pen
G1 X20 Y80 F1000 ; Draw line

G1 Z3 F1000 ; Raise pen
G0 X35 Y30 ; Move to next line with wider spacing
G1 Z-1 F100 ; Lower pen
G1 X35 Y80 F1000 ; Draw line

; Draw diagonal lines
G1 Z3 F1000 ; Raise pen
G0 X70 Y10 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X100 Y40 F1000 ; Draw line

G1 Z3 F1000 ; Raise pen
G0 X70 Y20 ; Move to next line
G1 Z-1 F100 ; Lower pen
G1 X100 Y50 F1000 ; Draw line

; Draw shapes - Rectangle
G1 Z3 F1000 ; Raise pen
G0 X70 Y60 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X100 Y60 F1000 ; Draw bottom line
G1 X100 Y80 F1000 ; Draw right side
G1 X70 Y80 F1000 ; Draw top line
G1 X70 Y60 F1000 ; Draw left side and complete rectangle

; Draw triangle
G1 Z3 F1000 ; Raise pen
G0 X110 Y60 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X140 Y60 F1000 ; Draw base
G1 X125 Y80 F1000 ; Draw right side
G1 X110 Y60 F1000 ; Draw left side and complete triangle

; Draw circle
G1 Z3 F1000 ; Raise pen
G0 X125 Y25 ; Move to starting point (center + radius in X)
G1 Z-1 F100 ; Lower pen
G3 X125 Y25 I-15 J0 F1000 ; Draw complete circle (radius 15mm)

; Draw spiral (approximation with arcs)
G1 Z3 F1000 ; Raise pen
G0 X50 Y110 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G3 X45 Y115 I-5 J0 F1000 ; First arc
G3 X40 Y110 I0 J-5 F1000 ; Second arc
G3 X45 Y105 I5 J0 F1000 ; Third arc
G3 X50 Y110 I0 J5 F1000 ; Fourth arc to complete first loop

G3 X55 Y120 I5 J5 F1000 ; Continue spiral outward
G3 X40 Y120 I-7.5 J0 F1000
G3 X40 Y100 I0 J-10 F1000
G3 X60 Y100 I10 J0 F1000
G3 X60 Y120 I0 J10 F1000

; Draw zigzag pattern
G1 Z3 F1000 ; Raise pen
G0 X80 Y100 ; Move to starting point
G1 Z-1 F100 ; Lower pen
G1 X90 Y120 F1000
G1 X100 Y100 F1000
G1 X110 Y120 F1000
G1 X120 Y100 F1000
G1 X130 Y120 F1000

; Draw "CNC" text (simplified with line segments)
G1 Z3 F1000 ; Raise pen
G0 X150 Y100 ; Move to starting point for "C"
G1 Z-1 F100 ; Lower pen
G1 X140 Y100 F1000
G1 X140 Y120 F1000
G1 X150 Y120 F1000

G1 Z3 F1000 ; Raise pen
G0 X155 Y100 ; Move to starting point for "N"
G1 Z-1 F100 ; Lower pen
G1 X155 Y120 F1000
G1 X165 Y100 F1000
G1 X165 Y120 F1000

G1 Z3 F1000 ; Raise pen
G0 X170 Y100 ; Move to starting point for "C"
G1 Z-1 F100 ; Lower pen
G1 X180 Y100 F1000
G1 X180 Y120 F1000
G1 X170 Y120 F1000

; Raise pen and return to origin
G1 Z3 F1000
G0 X0 Y0

M5 ; Turn off spindle (pen up)
M2 ; End program
