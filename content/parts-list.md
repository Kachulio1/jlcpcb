# Parts List and Sourcing Guide

This document provides detailed information on sourcing components for the 3-axis CNC plotter project, with specific emphasis on parts available from [JLCMC](https://jlcmc.com/).

## Electronic Components

### Microcontrollers and Shields

| Component | Quantity | Description | JLCMC Category |
|-----------|----------|-------------|---------------|
| Arduino Uno R3 | 1 | Main controller with GRBL | Controllers/Electrical Components |
| Arduino Mega 2560 | 1 | PID controller | Controllers/Electrical Components |
| Arduino CNC Shield V3 | 1 | GRBL interface board | Controllers/Electrical Components |
| Arduino L293D Motor Shield | 1 | DC motor driver | Controllers/Electrical Components |
| A4988 Stepper Driver | 1 | Z-axis stepper driver | Controllers/Electrical Components |

### Motor Components

| Component | Quantity | Description | JLCMC Category |
|-----------|----------|-------------|---------------|
| DC Motors | 2 | From old printer (alternatively can purchase) | Controllers/Electrical Components |
| Linear Optical Encoder | 1 | From old printer | Sensors/Switches |
| Rotary Optical Encoder | 1 | From old printer | Sensors/Switches |
| DVD Stepper Motor | 1 | From old DVD drive | Controllers/Electrical Components |

### Connectors and Wiring

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| XH2.54mm 4P Connector | 2 | For encoder connections | [JLCMC Wire Connectors](https://jlcmc.com/product/G07/air-hose-fittings-%26-flow-control-valve) |
| XH2.54mm 2P Connector | 2 | For motor connections | [JLCMC Wire Connectors](https://jlcmc.com/product/G07/air-hose-fittings-%26-flow-control-valve) |
| Rainbow Ribbon Cable | 2m | For internal connections | [JLCMC Cable Products](https://jlcmc.com/product/G05/tubes-%26-tube-accessories) |
| Cable Ties | Various | For wire management | [JLCMC Fasteners](https://jlcmc.com/product/E02/screws) |

### Electronic Components

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| 10KΩ Resistors | 4 | For encoder circuits | Controllers/Electrical Components |
| 150Ω Resistor | 1 | For LED indicator | Controllers/Electrical Components |
| Prototype PCB | 1 | For adapter shield | [JLCPCB](https://jlcpcb.com/) |

### Power Supply

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| 12V Power Supply | 1 | For motors | Controllers/Electrical Components |
| 5V Power Supply | 1 | For logic circuits | Controllers/Electrical Components |

## Mechanical Components

### Linear Motion Components

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| Linear Shafts (from printer) | 2 | X-axis guides | [JLCMC Linear Shafts](https://jlcmc.com/product/B08/linear-shafts) |
| Linear Bearings (from printer) | 2-4 | X-axis bearings | [JLCMC Linear Bearings](https://jlcmc.com/product/B02/linear-bearing) |
| DVD Drive Lead Screw | 1 | Z-axis movement | [JLCMC Trapezoidal Screws](https://jlcmc.com/product/B05/trapezoidal-screw-and-screw-related-parts) |

### Transmission Components

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| 10mm x 10mm Shaft Coupling | 1 | For pen holder | [JLCMC Shaft Couplings](https://jlcmc.com/product/C01/shaft-couplings) |
| Timing Belt (from printer) | 1 | Y-axis drive | [JLCMC Timing Belts](https://jlcmc.com/product/C02/timing-belts) |
| Timing Belt Pulleys (from printer) | 2 | Y-axis drive | [JLCMC Timing Belt Pulleys](https://jlcmc.com/product/C03/timing-belt-pulleys) |

### Fasteners and Hardware

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| M3 Screws | ~20 | General assembly | [JLCMC Screws](https://jlcmc.com/product/E02/screws) |
| M3 Nuts | ~20 | General assembly | [JLCMC Nuts](https://jlcmc.com/product/E04/nuts) |
| M3 Washers | ~20 | General assembly | [JLCMC Washers](https://jlcmc.com/product/E06/washers) |
| M4 Screws | ~10 | Frame assembly | [JLCMC Screws](https://jlcmc.com/product/E02/screws) |
| M4 Nuts | ~10 | Frame assembly | [JLCMC Nuts](https://jlcmc.com/product/E04/nuts) |

## Frame and Structural Components

| Component | Quantity | Description | JLCMC Reference |
|-----------|----------|-------------|----------------|
| Aluminum Extrusion Profiles | As needed | For frame construction | [JLCMC Aluminum Extrusion](https://jlcmc.com/product/T01/aluminum-extrusion-profiles) |
| Corner Brackets | 8+ | For frame assembly | [JLCMC Profile Accessories](https://jlcmc.com/product/T02/specialized-accessories-for-profiles) |
| Base Plate | 1 | For mounting (acrylic or wood) | Locally sourced |

## Tools Required

| Tool | Use |
|------|-----|
| Soldering Iron | Circuit assembly |
| Wire Cutters/Strippers | Preparing wires |
| Screwdrivers (Phillips and flat) | Assembly |
| Allen Keys | Assembly |
| Multimeter | Testing connections |
| Hot Glue Gun | Securing components |

## Recycled Components

The following components should be salvaged from old equipment:

1. **From Printer**:
   - Print head carriage assembly
   - DC motors (2)
   - Linear optical encoder
   - Rotary optical encoder
   - Guide rods
   - Linear bearings
   - Timing belt system

2. **From DVD Drive**:
   - Stepper motor
   - Lead screw mechanism
   - Linear slide

## Alternative Sources

If you cannot find specific components at JLCMC, consider these alternatives:

1. **Electronic components**: Standard electronic component suppliers
2. **Mechanical parts**: Machine shops or hardware stores
3. **3D Printed parts**: Custom parts can be ordered through [JLC3DP](https://jlc3dp.com/) service
4. **Custom PCBs**: Can be ordered through [JLCPCB](https://jlcpcb.com/)

## Purchasing Tips

When ordering from JLCMC:

1. **Group similar items**: Order similar components together to save on shipping
2. **Check compatibility**: Ensure mechanical parts match your exact requirements
3. **Order extra parts**: Having spares of small components like resistors and fasteners is always useful
4. **Verify specifications**: Double-check voltage/current ratings for electronic components
5. **Consider shipping time**: Order well in advance of when you plan to start the project

## Budget Planning

Approximate cost breakdown:

- **Recycled components**: $0 (assuming you have old printers/DVD drives)
- **Arduino boards and shields**: $30-50
- **Mechanical components**: $20-40
- **Electronic components**: $10-20
- **Power supplies**: $15-25
- **Fasteners and hardware**: $10-15

**Total estimated cost**: $85-150 depending on how many parts you can recycle
