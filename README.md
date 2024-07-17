# **Health-chatbot**

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Introduction

Health Chatbot is a web-based application designed to facilitate seamless communication between patients and doctors. The application offers various features such as appointment booking, symptom checking, feedback, real-time chat, and much more. The goal is to improve the efficiency and accessibility of healthcare services.

## Features

- User Authentication (Signup/Login)
- Role-Based Access Control (Admin, Doctor, Patient)
- Appointment Booking and Cancellation
- Doctor Availability Management
- Real-Time Chat between Patients and Doctors
- Symptom Checker using NLP
- Feedback and Ratings for Doctors
- Profile Management with Profile Picture Upload
- Notifications for Appointments
- Analytics Dashboard for Admin

## Technologies Used

### Frontend

- React: Library for building user interfaces.
- Material-UI: UI framework for React to design responsive and visually appealing components.
- Axios: HTTP client for making API requests.
- React Router: Routing library for navigating between different views.

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- WebSocket (Socket.io)
- JWT for Authentication
- Multer for File Uploads
- Nodemailer for Email Notifications
- Twilio for SMS Notifications

### Testing

- Jest
- Chai
- Sinon
- Supertest

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nyakuji/health-chatbot.git
   cd health-chatbot

2. **Install dependencies:**

   ```bash
   For backend:
   cd backend
   npm install

   For frontend:
   cd frontend
   npm install

## **Usage**

1. **Signup/Login:**
   - Create an account as a patient, doctor, or admin.
   - Login using your credentials.

2. **Profile Management:**
   - Update your profile details and upload a profile picture.

3. **Symptom Checking**
   - Patients can check their symptoms using AI driven chat interface.

4. **Appointment Booking:**
   - Patients can book appointments with doctors.
   - View and manage your appointments.

5. **Real-Time Chat:**
   - Communicate with healthcare professionals.

6. **Feedback System:**
    - Submit feedback for doctors.
    - View feedback provided by other patients.

7. **Admin management**
   - There is admin dashboard for analytics and many more.
