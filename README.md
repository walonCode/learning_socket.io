# Chat Application

A real-time chat application built with React, Socket.IO, and Node.js. This project allows users to communicate in real-time by connecting to a server and sending messages which are broadcasted to all connected clients.

## Features

- **Real-Time Messaging:** Users can send and receive messages in real-time using WebSockets via Socket.IO.
- **Username Authentication:** Users need to set a username before they can start messaging.
- **Simple and Intuitive UI:** A user-friendly interface built with React that is easy to use.

## Installation

Before you start, ensure you have the following installed:

- Node.js (version 14 or later)
- npm or yarn package manager

### Client
```bash
cd client
npm install
```

### Server
```bash
cd server
npm install
```

### Environment Variables
Create a `.env` file in the server directory and add the following variable:

```env
PORT=5000
```

## Usage

1. **Start the Server**:
   ```bash
   cd server
   nodemon server.js
   ```

2. **Start the Client**:
   ```bash
   cd client
   npm run dev
   ```

3. Open the application in your browser at `http://localhost:5173`.

## Technologies

- **Frontend**: React with Vite, HTML, CSS, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Tools**: npm, ESLint, Prettier, Vite

## Folder Structure

```plaintext
├── .gitignore
├── client
|  ├── .gitignore
|  ├── README.md
|  ├── eslint.config.js
|  ├── index.html
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  ├── src
|  |  ├── App.jsx
|  |  ├── assets
|  |  |  ├── react.svg
|  |  ├── index.css
|  |  ├── main.jsx
|  ├── vite.config.js
├── server
  ├── .env
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  ├── server.js
```

## Authors

- **[seniorsenior_](https://github.com/senior_danny)** (GitHub)
- **[@senior_danny](https://twitter.com/senior_danny)** (Twitter)

## Contribution

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a Pull Request.