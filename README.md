# FoodBlog (FoodTour)

FoodBlog is a full-stack MERN-based web application that enables users to create, manage, and explore food recipes through a clean and user-friendly interface. The project demonstrates real-world implementation of frontend–backend integration, secure authentication, and RESTful API design.

---

## Features

- User authentication (Register / Login)
- Create, update, and manage food recipes
- Browse and explore recipes
- Secure backend with JWT-based authentication
- Clean and modular codebase
- Scalable REST API architecture

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- HTML5, CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## Project Structure

```text
FoodBlog/
├── .gitignore
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── Frontend/
    └── food-blog-app/
        ├── src/
        ├── public/
        ├── package.json
        └── vite.config.js
```
## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Backend Setup
- cd Backend
- npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Start the backend server:
npm start

### Frontend Setup
- cd Frontend/food-blog-app
- npm install
- npm run dev
### Environment Variables
Environment variables are not committed to GitHub for security reasons.
Make sure to configure the required variables locally before running the application. 
## License
This project is intended for educational and learning purposes.
## After Adding README
- git add README.md
- git commit -m "Add project README"
- git push

---

### Why this structure looks professional
- Uses **tree-style hierarchy**
- Easy to scan visually
- Matches GitHub and industry README standards
- Clean for recruiters and reviewers

If you want next:
- Add screenshots section
- Add API endpoints documentation
- Prepare deployment guide


