# Vehicle System Prototype

A full-stack web application for managing vehicles, built with TypeScript, React, Express, and MongoDB.

## Features

- View a list of vehicles
- Add new vehicles
- Update vehicle status

## Prerequisites

- Node.js (v18+)
- pnpm
- MongoDB

## Technology Stack

### Frontend

- React
- SWR (State Management)
- TailwindCSS
- Tanstack/react-table

### Backend

- Express
- TypeScript
- MongoDB

## Getting Started

1. Clone the Repository

```sh
   git clone https://github.com/kumneger0/vehicle-system-prototype.git
   cd vehicle-system-prototype
```

2. Install Dependencies

   # Install pnpm if not already installed

```sh
   npm install -g pnpm
```

# Install project dependencies

```sh
  pnpm install
```

3. Set Up Environment Variables

   Create `.env` file in `vehicle-system-prototype/vehicleServer` directory and fill in your own MongoDB connection string and JWT secret:

```env
   MONGO_URI=
   PORT=
```

4. Start the Server

   # Navigate to the vehicleServer directory

   cd vehicleServer

   ```sh
   pnpm dev:both
   ```

   Access the Application Open your browser and navigate to http://localhost:5173
