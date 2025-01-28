# MediShift-Align :hospital:

[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-success)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-18.x-%2361DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A healthcare coordination platform connecting medical professionals with healthcare facilities for shift management and staffing solutions.

## Table of Contents
- [Features](#features-sparkles)
- [Technology Stack](#technology-stack-computer)
- [Installation](#installation-wrench)
- [Configuration](#configuration-gear)
- [API Documentation](#api-documentation-books)
- [Screenshots](#screenshots-framed_picture)
- [Video Demo](#video-demo-movie_camera)
- [Project Structure](#project-structure-open_file_folder)

## Features :sparkles:
### Core Functionality
- **Real-time Shift Management**
  - Dynamic shift board with instant updates
  - Conflict-free scheduling with smart overlap detection
- **Credential Verification**
  - Military-grade AES-256 document encryption
  - Automated license validation via government APIs
- **Smart Matching System**
  - Context-aware matching algorithm (skills/geo/urgency)
  - Predictive staffing needs forecasting

### Advanced Capabilities
- Live shift tracking dashboard
- Compliance audit trails
- Performance analytics suite
- Multi-channel notifications (SMS/Email/Push)

## Technology Stack :computer:
**Backend Architecture**  
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

**Frontend Ecosystem**  
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white)

**Development Tools**  
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)

## Installation :wrench:
```bash
# Clone the repository
git clone https://github.com/MuhammadUzair88/Hackathon-MediShift-Align.git

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

## Configuration :gear:

MONGO_URI=mongodb+srv://<user>:<password>@cluster.example.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
PORT=5000
EMAIL_USER=service@medishift.com
EMAIL_PASS=secure_email_password
NODE_ENV=development

## API Documentation :books:

POST /api/auth/register      Create new account
POST /api/auth/login         Generate access token
GET  /api/shifts?status=open List available shifts
POST /api/shifts             Create new shift
PUT  /api/users/:id/verify   Verify professional credentials

## screenshots-framed_picture

Staff-Side:

![Image](https://github.com/user-attachments/assets/37fc6560-ec23-4aa9-89c1-b76d9fff9474)


## Video Demo :movie_camera:

https://github.com/user-attachments/assets/cdd75138-ddc3-4982-a2a4-172e5c08d4f6

## Project Structure :open_file_folder:
├── backend
│   ├── config/         # Environment configurations
│   ├── controllers/    # Business logic handlers
│   ├── models/         # MongoDB schema definitions
│   ├── routes/         # API endpoint definitions
│   └── utils/          # Helper functions
│
└── frontend
    ├── public/         # Static assets
    └── src/
        ├── components/ # Reusable UI components
        ├── features/   # Redux state management
        ├── pages/      # Application views
        └── services/   # API communication layer




