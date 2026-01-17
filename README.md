# Address Circle Mapper

A web application that allows users to search for addresses and draw customizable circles on OpenStreetMap with the address as the center. The application supports exporting the map as a high-resolution PNG image.

## Features

- Address search using OpenStreetMap's Nominatim API
- Customizable circle overlay with adjustable radius (in meters)
- Color and opacity customization for the circle
- Collapsible side panel for more map space
- Modern UI with Poppins font
- Responsive design for different screen sizes

## Prerequisites

To run this application, you need to have the following installed on your Linux system:

- Python 3.x (for the built-in HTTP server)

You can install Python 3 on most Linux distributions using the package manager:

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install python3
```

### CentOS/RHEL/Fedora:
```bash
sudo dnf install python3
```

### Arch Linux:
```bash
sudo pacman -S python
```

## Running the Application

1. Clone or download this repository to your local machine
2. Navigate to the project directory:
```bash
cd radius-map-osm
```
3. Start the built-in Python HTTP server:
```bash
python3 -m http.server 8000
```
4. Open your web browser and go to `http://localhost:8000`

The application will be accessible at `http://localhost:8000` until you stop the server (typically with Ctrl+C).

## Usage

1. Enter an address in the search field (e.g., "Times Square, New York")
2. Click the "Search" button to find the location and display it on the map
3. Adjust the circle radius using the slider or input field
4. Customize the circle color using the color picker
5. Adjust the circle opacity using the slider
6. Use the toggle button (◀/▶) to collapse or expand the side panel
7. The map will automatically update as you change settings

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please contact the author or submit a Pull Request to this project.

## License

MIT License

Copyright (c) 2026 Isaias V. Prestes  , Prestes Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

Isaias V. Prestes    
Prestes Labs  
2026