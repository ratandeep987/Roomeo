# 🏨 Roomeo - Full Stack Hotel Booking Platform

<div align="center">

### Book. Manage. Stay.

A modern full-stack hotel booking platform built using the MERN Stack with secure authentication, role-based access control, hotel management, room booking, and admin analytics.

![MERN](https://img.shields.io/badge/MERN-FullStack-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![NodeJS](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

</div>

---

## 📖 Overview

Roomeo is a production-grade hotel booking platform that enables users to discover hotels, explore rooms, make bookings, and manage reservations seamlessly.

The platform supports multiple user roles including customers, hotel owners, and administrators, each with dedicated functionalities and secure access controls.

---

## ✨ Features

### 👤 User Features

* User Registration
* Secure Login & Logout
* JWT Authentication
* Browse Hotels
* Search Hotels
* Filter Hotels
* View Hotel Details
* View Room Details
* Book Rooms
* Cancel Bookings
* Booking History
* Responsive Design

---

### 🏨 Hotel Owner Features

* Add Hotels
* Edit Hotel Details
* Add Rooms
* Manage Room Availability
* Upload Hotel Images
* View Bookings
* Manage Reservations

---

### 🛡️ Admin Features

* Manage Users
* Manage Hotels
* Manage Bookings
* Dashboard Analytics
* User Monitoring
* Platform Management

---

## 🚀 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT Authentication
* bcrypt Password Hashing
* Protected Routes
* Role-Based Access Control (RBAC)

### Development Tools

* Git
* GitHub
* Postman
* VS Code

---

## 🏗️ System Architecture

```text
Client (React)
      │
      ▼
 REST API Requests
      │
      ▼
Express Server
      │
 ┌────┼────┐
 ▼    ▼    ▼
Auth Hotels Bookings
 │     │      │
 └─────┼──────┘
       ▼
   MongoDB
```

---

## 🔐 Authentication Flow

```text
User Login
     │
     ▼
Verify Credentials
     │
     ▼
Generate JWT Token
     │
     ▼
Send Token to Client
     │
     ▼
Protected Route Access
```

---

## 🗄️ Database Design

### User

```javascript
{
  name,
  email,
  password,
  role
}
```

### Hotel

```javascript
{
  name,
  description,
  location,
  images,
  owner
}
```

### Room

```javascript
{
  hotel,
  roomType,
  price,
  capacity,
  availability
}
```

### Booking

```javascript
{
  user,
  hotel,
  room,
  checkIn,
  checkOut,
  totalPrice,
  status
}
```

---

## 📁 Project Structure

```text
Roomeo
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── services
│   │   ├── hooks
│   │   ├── context
│   │   └── utils
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/Roomeo.git

cd Roomeo
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key
```

---

## 📬 API Endpoints

### Authentication

```http
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile
```

### Hotels

```http
GET /api/hotels

GET /api/hotels/:id

POST /api/hotels

PUT /api/hotels/:id

DELETE /api/hotels/:id
```

### Bookings

```http
POST /api/bookings

GET /api/bookings/my-bookings

DELETE /api/bookings/:id
```

---

## 🔒 Security Features

* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Input Validation
* Error Handling
* Secure Environment Variables

---

## 📈 Future Enhancements

* Payment Gateway Integration
* Email Notifications
* Hotel Reviews & Ratings
* Wishlist Feature
* Real-time Availability Tracking
* AI-Based Hotel Recommendations
* Admin Analytics Dashboard
* Cloud Image Storage

---

## 🎯 Learning Outcomes

Through this project I learned:

* MERN Stack Development
* REST API Design
* JWT Authentication
* MongoDB Data Modeling
* Backend Architecture
* Protected Routes
* Role-Based Access Control
* Full Stack Application Development
* Git & GitHub Workflow
* Production-Level Project Structure

---

## 👨‍💻 Author

**Ratan Deep**

B.Tech CSIT (2023–2027)

Passionate about Full Stack Development, Software Engineering, and Building Scalable Web Applications.

---

⭐ If you like this project, consider giving it a star.
