# Alexa Clone

This project is an Alexa clone built with Next.js, utilizing the Gorq SDK for AI capabilities, ShadCN UI for the user interface, Tailwind CSS for styling, and both the Web Speech API for speech synthesis and React Speech to Text for voice recognition.

## Features

- **Voice Recognition**: Use React Speech to Text to convert user speech into text.
- **Speech Synthesis**: Implement Web Speech API to read responses back to users.
- **AI Integration**: Leverage the Gorq SDK for intelligent responses and interactions.
- **Responsive UI**: Built with ShadCN UI components and styled with Tailwind CSS for a modern look.

## Prerequisites

- Node.js (>=14.x)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alexa-clone.git
   cd alexa-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables for the Gorq SDK and any other required configurations.

### Running the Project

To start the development server, run:
```bash
npm run dev
# or
yarn dev
```
Open your browser and navigate to `http://localhost:3000` to see your Alexa clone in action!

### Building for Production

To build the project for production, use:
```bash
npm run build
# or
yarn build
```
To start the production server, run:
```bash
npm start
# or
yarn start
```

## Usage

- Speak into the microphone to interact with the Alexa clone.
- Ask questions or give commands, and the AI will respond accordingly.
- The interface is designed to be intuitive and responsive across devices.

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **Gorq SDK**: For AI functionalities and natural language processing.
- **ShadCN UI**: A component library for building user interfaces.
- **Tailwind CSS**: For utility-first styling.
- **Web Speech API**: For converting text to speech.
- **React Speech to Text**: For converting speech to text.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Gorq SDK](https://gorq.io/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [React Speech to Text](https://github.com/MathieuDartus/react-speech-to-text)

---
