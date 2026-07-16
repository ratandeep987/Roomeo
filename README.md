# 🏨 Roomeo – MERN Hotel Booking System (Backend)

<div align="center">

### Secure Hotel Booking Backend API built with Node.js, Express & MongoDB

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/Status-In%20Development-blue)

</div>

---

# 📖 Overview

Roomeo is a MERN Stack Hotel Booking System currently under development.

This repository currently contains the complete **Backend REST API**, which supports user authentication, hotel management, room management, and hotel room booking.

The React frontend is currently under development.

---

# ✨ Current Features

## 👤 Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

## 🏨 Hotel Management

Hotel Owners can:

- Create Hotels
- View Their Hotels

Public Users can:

- View All Hotels
- View Hotel Details

---

## 🛏 Room Management

Hotel Owners can:

- Add Rooms
- Update Rooms
- Delete Rooms

Public Users can:

- View Rooms by Hotel
- View Room Details

---

## 📅 Booking Management

Authenticated Users can:

- Book Available Rooms
- Prevent Double Booking
- View Booking History
- View Booking Details
- Cancel Future Bookings

---

# 🚀 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## Tools

- Git
- GitHub
- Postman
- VS Code

---

# 🏗 Project Architecture

```
Client (Frontend)
        │
 REST API Requests
        │
        ▼
Express Server
        │
 ┌──────┼─────────┐
 │      │         │
Auth  Hotels   Bookings
        │
        ▼
    MongoDB
```

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
Verify Credentials
      │
      ▼
Generate JWT Token
      │
      ▼
Send Token
      │
      ▼
Access Protected APIs
```

---

# 🗄 Database Models

## User

```javascript
{
  name,
  email,
  password,
  role
}
```

## Hotel

```javascript
{
  name,
  description,
  address,
  city,
  country,
  owner
}
```

## Room

```javascript
{
  roomNumber,
  type,
  price,
  capacity,
  description,
  isAvailable,
  hotel
}
```

## Booking

```javascript
{
  user,
  room,
  checkInDate,
  checkOutDate,
  totalPrice,
  status
}
```

---

# 📁 Project Structure

```
server
│
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── app.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/ratandeep987/Roomeo.git
```

Move into the project

```bash
cd Roomeo/server
```

Install dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📬 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile
```

---

## Hotels

```
GET /api/hotels

GET /api/hotels/:id

GET /api/hotels/my-hotels

POST /api/hotels
```

---

## Rooms

```
GET /api/rooms/hotel/:hotelId

GET /api/rooms/:id

POST /api/rooms

PUT /api/rooms/:id

DELETE /api/rooms/:id
```

---

## Bookings

```
POST /api/bookings

GET /api/bookings/my

GET /api/bookings/:id

PUT /api/bookings/:id/cancel
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Mongoose Validation
- Secure Environment Variables

---

# 🚧 Upcoming Features

- React Frontend
- Responsive UI
- Image Upload
- Hotel Search & Filters
- Payment Integration
- Booking Calendar
- Owner Dashboard UI
- Deployment

---

# 📚 What I Learned

This project helped me understand:

- REST API Development
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Password Hashing
- MVC Architecture
- Role-Based Access Control (RBAC)
- CRUD Operations
- API Testing using Postman
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Ratan Deep**

B.Tech in Computer Science & Information Technology (2023–2027)

GitHub: https://github.com/ratandeep987

---

## ⭐ Project Status

🚧 **Backend Completed**

🚀 **Frontend Development In Progress**
