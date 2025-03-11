# Recruitment Website

This is a full-stack recruitment website built with a React frontend and a Node.js/Express backend. The website allows job seekers to search and apply for jobs, and employers to post and manage job listings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Features

- User authentication and authorization (Job Seeker and Employer roles)
- Job seekers can search and apply for jobs
- Employers can post, update, and delete job listings
- Employers can view applications from job seekers
- Responsive design with Tailwind CSS
- Real-time form validation and error handling

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - Vite
  - Axios
  - React Router
  - React Icons
  - React Hot Toast

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT (JSON Web Token)
  - Cloudinary (for resume uploads)
  - dotenv
  - bcrypt
  - cookie-parser
  - express-fileupload

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Cloudinary account for resume uploads

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/Recruitment_Website.git
    cd Recruitment_Website/Backend
    ```

2. Install backend dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `Backend` directory and add the following environment variables:

    ```env
    PORT=4000
    Cloudinary_Client_Name=your_cloudinary_client_name
    Cloudinary_Client_API=your_cloudinary_api_key
    Cloudinary_Client_SECRET=your_cloudinary_api_secret
    FRONTEND_URL=http://localhost:5173
    MONGO_URI=mongodb://127.0.0.1:27017/recruitment_website
    JWT_SECRET_KEY=your_jwt_secret_key
    JWT_EXPIRE=7d
    COOKIE_EXPIRE=5
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `Frontend` directory:

    ```sh
    cd ../Frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your web browser and navigate to `http://localhost:5173`
2. Register as a new user or log in with existing credentials
3. Explore the features of the recruitment website
4. Employers can post, update, and delete job listings, and view applications from job seekers.

## Project Structure

```
Recruitment_Website/
├── Backend/
│   ├── app.js
│   ├── config/
│   │   └── config.env
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── database/
│   │   └── dbConnection.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── catchAsyncError.js
│   │   └── error.js
│   ├── models/
│   │   ├── applicationSchema.js
│   │   ├── jobSchema.js
│   │   └── userSchema.js
│   ├── routes/
│   │   ├── applicationRouter.js
│   │   ├── jobRouter.js
│   │   └── userRouter.js
│   ├── utils/
│   │   └── jwtToken.js
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Application/
│   │   │   ├── Auth/
│   │   │   ├── Home/
│   │   │   ├── Job/
│   │   │   ├── Layout/
│   │   │   └── NotFound/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── vite.config.js
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

### User Routes

- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login a user
- `GET /api/v1/user/logout` - Logout a user
- `GET /api/v1/user/getuser` - Get the authenticated user's details
- `PUT /api/v1/user/updateProfile` - Update the authenticated user's profile

### Job Routes

- `GET /api/v1/job/getAll` - Get all job listings
- `POST /api/v1/job/post` - Post a new job (Employer only)
- `GET /api/v1/job/getMyJobs` - Get jobs posted by the authenticated employer
- `PUT /api/v1/job/update/:id` - Update a job listing (Employer only)
- `DELETE /api/v1/job/delete/:id` - Delete a job listing (Employer only)
- `GET /api/v1/job/:id` - Get a single job listing

### Application Routes

- `GET /api/v1/application/jobSeeker/getAll` - Get all applications by the authenticated job seeker
- `GET /api/v1/application/employer/getAll` - Get all applications for jobs posted by the authenticated employer
- `DELETE /api/v1/application/delete/:id` - Delete an application (Job Seeker only)
- `POST /api/v1/application/post` - Submit a job application (Job Seeker only)
