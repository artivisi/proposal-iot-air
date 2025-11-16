# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a water sensor monitoring system proposal generator that creates professional PDF documents from Markdown source files. The project contains:

- A business proposal document (`src/proposal.md`) for developing an IoT water monitoring system
- Automated PDF generation using Pandoc and custom LaTeX templates
- UI mockups generated with Playwright screenshots
- Mermaid diagrams for architecture visualization

## Architecture

The project follows a documentation generation workflow:

1. **Source files** in `src/` directory contain proposal content, templates, and assets
2. **Build process** generates diagrams, screenshots, and compiles PDF output to `dist/`
3. **Docker container** provides consistent Pandoc/LaTeX build environment
4. **NPM scripts** orchestrate the entire build pipeline

Key components:
- `src/proposal.md` - Main proposal content in Markdown
- `src/template.tex` - Custom LaTeX template for PDF generation
- `src/diagram.mmd` - Mermaid architecture diagram
- `src/mockups/screens.html` - HTML mockups for UI screenshots
- `scripts/capture_screens.js` - Playwright automation for screenshot generation

## Development Commands

### Initial Setup
```bash
npm install
```

### Docker Build (required once or when Dockerfile changes)
```bash
npm run docker:build
# or directly:
podman build -t endymuhardin/pandoc-latex .
```

### Build Process (RECOMMENDED)
```bash
# Complete build pipeline (working TOC + logo + diagram labels)
npm run build
```

### Individual Steps (for debugging)
```bash
npm run clean              # Clean dist directory
npm run prepare            # Setup dist/assets and copy static assets
npm run build:assets       # Generate diagrams and screenshots
npm run build:pdf          # Generate PDF from source files
```

### Asset Generation
```bash
# Generate enhanced Mermaid diagram with HIGH VISIBILITY labels
npm run generate:diagram

# Generate UI mockup screenshots (requires Playwright)
npm run generate:screenshots
```

### Known Issues & Solutions
- **TOC only showing title**: Fixed by correcting markdown heading levels (# ## ###)
- **Logo not displaying**: Fixed with PNG conversion using Podman container tools
- **Diagram labels not visible**: Fixed with enhanced contrast and bold text
- **SVG rendering issues**: Fixed by converting SVG to PNG using rsvg-convert in container
- **PNG files missing**: Fixed with automated PNG conversion in build process

### SVG to PNG Conversion
The build process now automatically converts SVG files to PNG using the Pandoc Docker container:
- Uses `rsvg-convert` utility available in the pandoc-latex image
- Logo converted to 600x300 PNG for cover page
- Diagram converted to 1200x800 PNG for better quality in PDF
- All PNG files are generated during `npm run build` process

## Technical Details

### PDF Generation (RELIABLE & SIMPLIFIED)
The project uses a custom Docker image with:
- Pandoc for Markdown to LaTeX conversion
- XeLaTeX engine for PDF generation with proper font support
- **Simplified LaTeX template** that ensures all elements display reliably
- **Text-based company logo** to avoid image loading issues
- **Clean TOC formatting** without complex styling
- **Enhanced diagram labels** with high contrast and bold text
- Custom color scheme and typography

### Enhanced Diagram Features (HIGH VISIBILITY)
The Mermaid diagram includes:
- **High-contrast labels** with black text on light backgrounds
- **Bold text** for component names and data flow labels
- **Thick borders** (3px) for better visual separation
- **Clear section headers** (SENSOR DEVICES, CLOUD INFRASTRUCTURE, USER INTERFACE)
- **Technical details** included (ports: 1883/8883, protocols, formats)
- **Professional styling** with consistent color scheme

### Mockup Screenshots
UI mockups are created by:
1. Rendering HTML screens in `src/mockups/screens.html`
2. Using Playwright to capture screenshots of specific screen elements
3. Outputting high-quality PNG files to `dist/assets/`

### Template Customization
- **Modern cover page**: Edit `src/template.tex` cover section
- **Color scheme**: Modify color definitions in template
- **Typography**: Lato font with proper weight variations
- **Layout**: Professional spacing and header/footer design
- **Client information**: Edit metadata in package.json build script
- **Proposal content**: Edit `src/proposal.md`
- **UI design**: Update `src/mockups/screens.html`

## File Structure
```
src/                     # Source files
├── assets/              # Static assets (logos, images)
├── mockups/             # UI mockup HTML
├── diagram.mmd          # Mermaid diagram source
├── proposal.md          # Main proposal content
└── template.tex         # LaTeX template

scripts/                 # Build automation
└── capture_screens.js   # Playwright screenshot generator

dist/                    # Generated output
└── assets/              # Generated diagrams and screenshots
```