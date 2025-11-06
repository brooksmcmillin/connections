# 🌈 Picture Connections for Little Ones

A fun and educational matching game for toddlers and young children. Find groups of related pictures by connecting animals, food, vehicles, and more!

## 🎮 How to Play

1. Look at the 12 pictures on the screen
2. Click on 4 pictures that belong together (like all animals or all fruits)
3. Click "Make a Group!" to check your answer
4. Keep going until you find all 3 groups!

## 🚀 Getting Started

### Quick Start (No Setup Required)
Simply open `index.html` in any web browser to play immediately!

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   This will start a live server with auto-reload at `http://localhost:8080`

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
toddler-connections/
├── index.html      # Main game page
├── styles.css      # Game styling
├── script.js       # Game logic
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## 🛠️ Development

- **Live Server**: Files automatically reload when you make changes
- **Modular Code**: CSS and JavaScript are separated for easier maintenance
- **Git Ready**: Version control set up with appropriate `.gitignore`

## 🎯 Game Features

- **12 Categories**: Animals, food, vehicles, colors, weather, toys, nature, fruits, ocean, farm, sports, and space
- **Random Selection**: Each game randomly picks 3 categories for variety
- **Kid-Friendly Design**: Large buttons, bright colors, and fun animations
- **Responsive**: Works on desktop, tablet, and mobile devices

## 📝 Adding New Categories

To add new picture categories, edit the `allCategories` object in `script.js`:

```javascript
newCategory: {
    icons: ['🎵', '🎸', '🎹', '🎤'],
    title: '🎵 Music',
    color: '#FF6B6B'
}
```

## 🐳 Docker Deployment

### Quick Start with Docker Compose (Recommended)

1. **Build and run the container:**
   ```bash
   docker-compose up -d
   ```

2. **Access the game:**
   Open your browser to `http://localhost:8085`

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Using Docker Directly

1. **Build the image:**
   ```bash
   docker build -t toddler-connections .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 8085:8085 --name toddler-connections-game toddler-connections
   ```

3. **Access the game:**
   Open your browser to `http://localhost:8085`

4. **Stop the container:**
   ```bash
   docker stop toddler-connections-game
   docker rm toddler-connections-game
   ```

### Docker Features
- **Lightweight**: Uses nginx-alpine for minimal image size
- **Health checks**: Automatic container health monitoring
- **Port 8085**: Consistent with the development server port
- **Production-ready**: Optimized for deployment with gzip compression and caching

## 🚀 Other Deployment Options

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Game will be available at `https://yourusername.github.io/toddler-connections`

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build` (optional)
3. Publish directory: `./` (root)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the game works correctly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for little learners!