# MERN Interview Test: Whiteboard App

This project is a solution for the MERN Full Stack Developer technical interview test. It is a fully functional Whiteboard App built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to create, view, update, and delete drawings consisting of lines, shapes, and text annotations.

## Table of Contents

- [Live Sites](#Live-Sites "Deployed on Vercel ")
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [API Endpoints](#api-endpoints)
- [Sample Data](#sample-data)
- [Project Structure](#project-structure)
- [Best Practices and Code Quality](#best-practices-and-code-quality)

## Live Sites (Deployed on Vercel)

#### Client-Side: [React UI](https://whiteboard-react-ui.vercel.app "Frontend")

#### Server-Side: [REST API](https://whiteboard-app-server.vercel.app/ "Node-Mongo-ExpressJS")


## Features

### Section I: MongoDB Schema

- Designed a MongoDB schema for a Whiteboard App that includes:
  - Lines
  - Shapes
  - Text annotations
- Includes sample data for two drawings.

### Section II: RESTful API (Express.js)

- Created a RESTful API with the following endpoints:
  - `POST /api/drawings` - Create a new drawing
  - `GET /api/drawings` - [Get all drawings](https://whiteboard-app-server.vercel.app/api/drawings)
  - `GET /api/drawings/:id` - [Get a specific drawing by ID](https://whiteboard-app-server.vercel.app/api/drawings/66e3c6372a22628e914b3664)
  - `PUT /api/drawings/:id` - Update a drawing
  - `DELETE /api/drawings/:id` - Delete a drawing

### Section III: React.js Frontend

- Created a React.js frontend for the Whiteboard App.
- Users can:
  - View all drawings
  - View a specific drawing by ID
  - Draw lines and shapes, and add text annotations on the whiteboard

### Section IV: Node.js Server

- Configured a production-ready Node.js server to serve the React frontend.
- The server communicates with the Express.js API.
- Proper error handling is in place to ensure graceful failures.

## Technologies Used

- **MongoDB**: For storing drawing data.
- **Express.js**: For building the RESTful API.
- **React.js**: For the frontend interface.
- **Vite.js**: For the frontend tooling and bundling.
- **Node.js**: As the backend server.
- **Tailwind CSS**: For styling the frontend (if applicable).
- **Vercel**: For deployment.

## Installation and Setup

### Prerequisites:

- Node.js
- MongoDB

### Steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/MERN-Interview-Test.git
   cd MERN-Interview-Test
   ```
2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```
3. Install client dependencies:

   ```bash
   cd client
   npm install
   ```
4. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Add your MongoDB connection string, port, and other necessary configurations.
5. Start the server:

   ```bash
   cd server
   npm run start
   ```
6. Start the React frontend:

   ```bash
   cd client
   npm run dev
   ```
7. Visit the app on `http://localhost:3000` for the frontend and `http://localhost:5000` for API calls.

## API Endpoints

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| POST   | /api/drawings     | Create a new drawing   |
| GET    | /api/drawings     | Get all drawings       |
| GET    | /api/drawings/:id | Get a drawing by ID    |
| PUT    | /api/drawings/:id | Update a drawing by ID |
| DELETE | /api/drawings/:id | Delete a drawing by ID |

## Sample Data

Sample drawings have been added to the MongoDB database, including lines, shapes, and text annotations. You can use these as examples when interacting with the API or frontend.

## Project Structure

```bash
MERN-Interview-Test/
│
├── client/               # React frontend
│   ├── src/              # React components and pages
│   └── public/           # Static assets
│
├── server/               # Express API and Node.js server
│   ├── api
|   |	├── data/             # MongoDB schema
│   |	├── routes/           # API routes
│   |	└── controllers/      # Handles HTTP requests and invokes the service layer to process data
|   |	└── services/         # Business logic for API
│   └──dbClient.js
|   └──index.js
|
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

## Best Practices and Code Quality

- **Modular structure**: Separated components, routes, and controllers to ensure scalability.
- **Error Handling**: API endpoints include proper error handling and validation.
- **Clean Code**: Followed best practices with meaningful variable names, comments, and DRY principles.
- **Version Control**: Commits are frequent and include descriptive messages to track progress.

## License

This project is licensed under the MIT License.

---

Feel free to customize it with your own project details, and replace the placeholders where necessary!
