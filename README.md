# VibeForum - A Modern Forum Platform

VibeForum is a sleek, modern forum platform built with HTML, CSS, and JavaScript. It features a responsive design, dark/light theme support, and a user-friendly interface for creating and managing discussions.

## Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations and transitions
- **Theme Support**: Seamless dark/light mode toggle with persistent theme preference
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Category Management**: Easy navigation through different discussion categories
- **Thread Creation**: Simple interface for creating new discussion threads
- **Comment System**: Nested comments with reply functionality
- **Voting System**: Upvote/downvote threads and comments
- **User Authentication**: Secure login and registration system
- **Glass Morphism**: Modern glass-like UI elements with backdrop blur effects
- **Customizable**: Easy to customize colors and styles through CSS variables

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vibe-forum.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vibe-forum
   ```

3. Open `index.html` in your browser to view the forum.

## Project Structure

```
vibe-forum/
├── index.html              # Main forum page
├── login.html              # Login page
├── signup.html             # Registration page
├── styles/
│   ├── styles.css          # Main stylesheet
│   └── auth.css            # Authentication page styles
├── js/
│   ├── theme.js            # Theme toggle functionality
│   ├── forum.js            # Forum functionality
│   ├── auth.js             # Authentication functionality
│   └── three-background.js # Background effects (optional)
├── assets/
│   └── icons/
│       ├── moon.svg        # Dark theme icon
│       └── sun.svg         # Light theme icon
└── README.md               # Project documentation
```

## Theme Customization

The forum supports both dark and light themes, which can be toggled using the theme button in the bottom-right corner. The theme preference is saved in localStorage and persists between sessions.

### Customizing Colors

You can customize the colors by modifying the CSS variables in `styles/styles.css`:

```css
:root {
    /* Dark theme variables */
    --primary-color: #404040;
    --secondary-color: #0575e6;
    --background-color: #050505;
    --text-color: #e0e0e0;
    /* ... more variables ... */
}

body.morning-theme {
    /* Light theme variables */
    --text-color: #333;
    --primary-color: #f8b500;
    --secondary-color: #fceabb;
    /* ... more variables ... */
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspiration from modern UI/UX design trends

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/vibe-forum](https://github.com/yourusername/vibe-forum) 
