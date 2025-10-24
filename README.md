# Chibi Corner

A delightful VS Code extension that brings a cute animated chibi character to your Explorer sidebar!

![Chibi Corner Demo](media/chibi-gif.gif)

## Features

- **Animated Chibi Character**: Watch an adorable chibi animation loop in your Explorer sidebar
- **Non-Intrusive**: Sits quietly in the Explorer panel, adding personality without disrupting your workflow
- **Transparent Background**: Clean, transparent GIF that blends seamlessly with VS Code's theme
- **Lightweight**: Minimal performance impact - just a fun little companion while you code!

## Installation

### Option 1: Install from VSIX (Recommended)
1. Download the latest `.vsix` file from the [Releases](../../releases) page
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the `...` menu at the top of the Extensions panel
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file
7. Reload VS Code

### Option 2: Build from Source
```bash
# Clone the repository
git clone https://github.com/yourusername/chibi-corner.git
cd chibi-corner

# Install vsce globally (if not already installed)
npm install -g @vscode/vsce

# Package the extension
vsce package

# Install the generated .vsix file in VS Code
```

## Usage

Once installed, the Chibi Corner will automatically appear in your Explorer sidebar!

1. Open any folder/workspace in VS Code
2. Look at the Explorer panel on the left
3. Scroll down to find "CHIBI CORNER"
4. Enjoy your animated companion!

## Customization

Want to use your own chibi GIF? 

1. Create a `media` folder in your workspace
2. Add your own `chibi-gif.gif` file
3. The extension will automatically use your custom GIF!

**Requirements for custom GIF:**
- Transparent background (recommended)
- Reasonable file size (< 10MB recommended)
- Square or portrait dimensions work best

## Work in Development

This extension is actively being developed! Here's what's coming soon:

### Planned Features
- **Multiple Chibi Characters**: Choose from a collection of different animated chibis
- **Character Customization**: Switch between different chibi styles and animations
- **Size Controls**: Adjust the animation size to your preference
- **Seasonal Themes**: Special chibi animations for holidays and events
- **Interactive Actions**: Chibis that react to coding events (commits, errors, etc.)
- **Theme Integration**: Chibi variants that match your VS Code theme

### Future Roadmap
- Community-contributed chibi designs
- Animation speed controls
- Position customization
- Multiple chibi slots
- Chibi mood system based on coding activity

Stay tuned for updates! ⭐ Star this repo to follow development progress.

## Technical Details

- **Built with**: Node.js, VS Code Extension API
- **Animation**: Transparent GIF (592 frames @ 30fps)
- **Compatibility**: VS Code 1.60.0 or higher

## Development

Want to contribute or modify the extension?

```bash
# Clone the repo
git clone https://github.com/yourusername/chibi-corner.git
cd chibi-corner

# Open in VS Code
code .

# Press F5 to run in Extension Development Host
# Make your changes and test!
```

### Creating Your Own Chibi Animation

If you want to create your own chibi GIF from PNG frames:

```bash
# Using FFmpeg (transparent GIF)
ffmpeg -framerate 30 -i frames/frame_%05d.png \
  -vf "split[s0][s1];[s0]palettegen=max_colors=256:reserve_transparent=1[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
  media/chibi-gif.gif
```
For better visuals, I would suggest using backgroundless png's

## Contributing

Contributions are welcome! Whether it's:
- Bug reports
- Feature suggestions
- New chibi designs
- Documentation improvements
- Code contributions

Please feel free to open an issue or submit a pull request!

## License

Apache 2.0 License - Use it but mention me too!

## Credits

- Extension created with love for the VS Code community
- Chibi animation: [Add attribution if applicable]
- Inspired by the need for more personality in our coding environments!

## Show Your Support

If you enjoy Chibi Corner, please:
- Star this repository
- Share it with fellow developers
- Leave feedback and suggestions
- Contribute your own chibi designs!

---