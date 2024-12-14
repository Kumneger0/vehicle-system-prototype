# Vehicle System Backend Service Documentation

## Overview

This simple backend service provides endpoints to manage vehicles in a database. The service interacts with a cloud-based MongoDB Atlas database using Mongoose.

---

## File Structure

The project is organized as follows:

```
vehicleServer/
│
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── Readme.md
├── dist/
├── eslint.config.mjs
├── node_modules/
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── config/
│   │   └── index.ts
│   ├── controllers/
│   │   └── vehicle.controller.ts
│   ├── helpers/
│   │   └── db.ts
│   ├── models/
│   │   └── vehicle.model.ts
│   ├── routes/
│   │   └── vehicle.routes.ts
│   ├── types/
│   │   ├── types.ts
│   └── utils/
│       └── utility_file
└── tsconfig.json
```

### Directories

- **`src/app`**: Contains the main application entry points (`app.ts` and `server.ts`).
- **`src/config`**: Houses configuration files (e.g., database configurations).
- **`src/controllers`**: Includes controller logic for handling requests.
- **`src/helpers`**: Contains utility functions for database interactions.
- **`src/models`**: Defines Mongoose schemas and models.
- **`src/routes`**: Defines API routes and their mappings to controllers.
- **`src/types`**: Stores TypeScript type definitions.
- **`src/utils`**: Includes reusable utility functions.

---

## Endpoints

### 1. **Get All Vehicles**

- **Endpoint**: `/api/vehicles/all`
- **Method**: `GET`
- **Description**: Retrieves a list of all vehicles stored in the database.

---

### 2. **Add a New Vehicle**

- **Endpoint**: `/api/vehicles/add`
- **Method**: `POST`
- **Description**: Adds a new vehicle to the database.
- **Request Body**: JSON object with the following fields:
  ```json
  {
      "name": "<vehicle_name>",
      "status": "<vehicle_status>",
      "lastUpdated": "<date>"
  }
  ```

---

### 3. **Update Vehicle Status**

- **Endpoint**: `/api/vehicles/update/:id`
- **Method**: `PUT`
- **Description**: Updates the status of an existing vehicle using its unique ID.
- **Path Parameters**:
  - `:id` (string) - The unique ID of the vehicle to be updated.
- **Request Body**: JSON object with the updated fields:
  ```json
  {
      "status": "<new_status>",
      "lastUpdated": "<date>"
  }
  ```

---

## Database Interaction

### Database Technology

- **Database**: MongoDB Atlas 
- **ORM**: Mongoose 

### Vehicle Schema

The following schema defines the structure of a vehicle document in the database:

```javascript
const vehicleSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    lastUpdated: { type: Date, required: true },
});
```

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment Variables**:
   Set up a `.env` file with the following details:

   ```env
   MONGO_URI=<your-mongodb-atlas-connection-string>
   ```

4. **Run the Service**:

   ```bash
   pnpm run dev:both
   ```

---
