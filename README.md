# FizzBuzz Bot Game

Play Fizzbuzz against a bot in your browser!

## Frameworks and Libraries

### React/Vite

- **React/Vite**: Chosen for its lightweight framework and fast build tool, making it suitable for a small application like this one.

### TypeScript

- **TypeScript**: For type safety and easier debugging.

### UUID

- **UUID**: Ensures that each message in the chat can be uniquely identified, which is important for React's rendering optimization when managing lists of components.

### Custom Hooks

- **`useScore`**: A custom hook designed to manage the game's scoring logic, including tracking the current score, high score, and past scores efficiently.

### TailwindCSS for Styling

- **TailwindCSS**:  Tailwind is used for lightweight and optimized styling directly in the TSX/markup.

## Installation and Running the Project

```bash
# Clone the repository
git clone https://github.com/robinesbjornsson/fizzbuzz-bot.git

# Navigate to the project directory
cd fizzbuzz-bot

# Install dependencies
npm install

# Start the development server
npm start
