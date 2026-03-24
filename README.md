# 📚 Full-Stack Bookstore Application

A complete full-stack web application for managing and selling books with user authentication and admin controls.

## 🎯 Features

✅ **User Authentication**
- User registration with validation
- Login with JWT tokens
- Secure token storage

✅ **Book Management (Admin)**
- Add new books
- Update existing books
- Delete books
- View all books

✅ **User Features**
- Browse all books
- View book details
- Search and filter books
- Responsive design

✅ **Technical Features**
- JWT-based authentication
- MongoDB database
- RESTful API
- Clean MVC architecture
- Error handling
- CORS enabled

---

## 🛠️ Tech Stack

### **Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Bcryptjs for password hashing

### **Frontend**
- React.js
- React Router DOM
- Axios
- CSS3 for styling

### **Database**
- MongoDB (Local or Cloud)

---

## 📁 Project Structure

```
bookstore-app/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Book.js               # Book schema
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── bookController.js     # Book CRUD logic
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── bookRoutes.js         # Book endpoints
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── server.js                  # Main server file
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html            # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js         # Navigation component
    │   │   ├── BookCard.js       # Book card component
    │   │   └── ProtectedRoute.js # Route protection
    │   ├── pages/
    │   │   ├── LoginPage.js      # Login form
    │   │   ├── RegisterPage.js   # Registration form
    │   │   ├── HomePage.js       # Books listing
    │   │   ├── BookDetailsPage.js # Book details
    │   │   ├── AddBookPage.js    # Add book form
    │   │   └── EditBookPage.js   # Edit book form
    │   ├── services/
    │   │   └── api.js            # API calls
    │   ├── styles/
    │   │   ├── Navbar.css
    │   │   ├── BookCard.css
    │   │   ├── Auth.css
    │   │   ├── HomePage.css
    │   │   ├── BookDetailsPage.css
    │   │   └── BookForm.css
    │   ├── App.js                # Main App component
    │   ├── App.css               # Global styles
    │   ├── index.js              # React entry point
    │   └── .env                  # Environment variables
    ├── package.json
    ├── .gitignore
    └── .env
```

---

## 🗄️ MongoDB Schema

### **User Schema**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### **Book Schema**
```javascript
{
  _id: ObjectId,
  title: String (required),
  author: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Children', 'Other']),
  isbn: String (required, unique),
  pages: Number (required),
  publishedYear: Number (required),
  coverImage: String,
  stockQuantity: Number (default: 10),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Routes Explanation

### **Authentication Routes**

#### Register User
```
POST /api/auth/register
Body: {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}
Response: { success: boolean, token: string, user: object }
```

#### Login User
```
POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: { success: boolean, token: string, user: object }
```

### **Book Routes**

#### Get All Books (Public)
```
GET /api/books
Response: { success: boolean, books: array }
```

#### Get Single Book (Public)
```
GET /api/books/:id
Response: { success: boolean, book: object }
```

#### Create Book (Admin Only)
```
POST /api/books
Headers: Authorization: Bearer <token>
Body: {
  title: string,
  author: string,
  description: string,
  price: number,
  category: string,
  isbn: string,
  pages: number,
  publishedYear: number,
  coverImage: string (optional),
  stockQuantity: number (optional)
}
Response: { success: boolean, book: object }
```

#### Update Book (Admin Only)
```
PUT /api/books/:id
Headers: Authorization: Bearer <token>
Body: { title, author, description, price, category, isbn, pages, publishedYear, coverImage, stockQuantity }
Response: { success: boolean, book: object }
```

#### Delete Book (Admin Only)
```
DELETE /api/books/:id
Headers: Authorization: Bearer <token>
Response: { success: boolean, message: string }
```

---

## 📋 Prerequisites

Before running the project, make sure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org)
2. **npm** (comes with Node.js)
3. **MongoDB** running locally or MongoDB Atlas cloud account
4. **Git** (optional, for cloning)

---

## 🚀 Step-by-Step Setup & Run Instructions

### **Step 1: Install MongoDB**

#### Option A: Local MongoDB
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and run MongoDB service
- Default connection: `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/bookstore`

---

### **Step 2: Backend Setup & Run**

#### 2.1 Navigate to Backend Folder
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Configure Environment Variables

Edit the `.env` file in the backend folder:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/bookstore

# Server Configuration
PORT=5000

# JWT Secret Key (Keep it secure!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Node Environment
NODE_ENV=development

# CORS Origin
CORS_ORIGIN=http://localhost:3000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore
```

#### 2.4 Start Backend Server
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📚 Bookstore API is ready to use
```

✅ **Backend is running successfully!**

---

### **Step 3: Frontend Setup & Run**

#### 3.1 Open New Terminal and Navigate to Frontend Folder
```bash
cd frontend
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Configure Environment Variables

The `.env` file should already have:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

(No changes needed if your backend is running on port 5000)

#### 3.4 Start Frontend Server
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

You should see:
```
Compiled successfully!

You can now view bookstore-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is running successfully!**

---

## 🔐 Test the Application

### **Step 1: Create an Admin Account**
1. Go to `http://localhost:3000`
2. Click "Register"
3. Fill in the form:
   - Name: `Admin User`
   - Email: `admin@bookstore.com`
   - Password: `admin123`
   - Confirm Password: `admin123`
4. Click "Register"
5. ✅ You're now logged in as an admin!

### **Step 2: Add a Book (Admin Feature)**
1. Click "Add Book" in the navbar
2. Fill in the form with book details:
   - Title: `The Great Gatsby`
   - Author: `F. Scott Fitzgerald`
   - Description: `A classic novel about love and ambition`
   - Price: `299`
   - Category: `Fiction`
   - ISBN: `978-0743273565`
   - Pages: `180`
   - Published Year: `1925`
3. Click "Add Book"
4. ✅ Book added successfully!

### **Step 3: View Books**
1. Click "Home" in the navbar
2. See all books in grid format
3. Click on a book to view details
4. Only admins see "Edit" and "Delete" buttons

### **Step 4: Test User Account**
1. Logout
2. Click "Register" to create a user account
3. User accounts can only view books (no edit/delete)

---

## 🧪 Sample Test Data

You can add these books to test:

**Book 1:**
- Title: `To Kill a Mockingbird`
- Author: `Harper Lee`
- Description: `A gripping tale of racial injustice`
- Price: `349`
- Category: `Fiction`
- ISBN: `978-0061120084`
- Pages: `281`
- Published Year: `1960`

**Book 2:**
- Title: `1984`
- Author: `George Orwell`
- Description: `A dystopian novel about totalitarianism`
- Price: `299`
- Category: `Fiction`
- ISBN: `978-0451524935`
- Pages: `328`
- Published Year: `1949`

**Book 3:**
- Title: `The Selfish Gene`
- Author: `Richard Dawkins`
- Description: `A groundbreaking book on evolution`
- Price: `450`
- Category: `Science`
- ISBN: `978-0199291151`
- Pages: `224`
- Published Year: `1976`

---

## 🔧 Environment Variables Explained

### **Backend .env**

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGODB_URI` | Database connection string | `mongodb://localhost:27017/bookstore` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret key for token signing | `your_secret_key` |
| `NODE_ENV` | Environment type | `development` or `production` |
| `CORS_ORIGIN` | Allowed frontend URL | `http://localhost:3000` |

### **Frontend .env**

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 🐛 Troubleshooting

### **MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
- Windows: Check MongoDB service in Services
- Mac/Linux: Run `mongod` command

### **Backend Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` to another port (e.g., 5001)

### **Frontend Can't Connect to Backend**
```
Error: Network Error
```
**Solution:** 
- Check if backend is running on port 5000
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check CORS_ORIGIN in backend `.env`

### **Token Expired or Invalid**
**Solution:** Clear localStorage
```javascript
// In browser console
localStorage.clear()
```

---

## 📝 Key Code Explanations

### **Authentication Flow**

1. **Registration:** User data → Password hashed → Saved to DB → Token generated
2. **Login:** Email/password validated → Token generated → Stored in localStorage
3. **Protected Routes:** Token checked → If valid, render page → If invalid, redirect to login

### **Book CRUD Operations**

- **Create:** Only admins can add books
- **Read:** Everyone can view books
- **Update:** Only the admin who created can edit
- **Delete:** Only the admin who created can delete

### **JWT Token**

Tokens contain user ID and role, valid for 7 days. Sent with every protected API request in Authorization header:
```
Authorization: Bearer <token>
```

---

## 📦 Dependencies

### **Backend Dependencies**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT generation and verification
- `cors` - Cross-origin requests
- `dotenv` - Environment variable management

### **Frontend Dependencies**
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-scripts` - Create React App scripts

---

## 🚢 Deployment Tips

### **Backend Deployment (Heroku, Railway, Render)**
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables in platform
4. Deploy

### **Frontend Deployment (Vercel, Netlify)**
1. Build: `npm run build`
2. Deploy the `build` folder
3. Update `REACT_APP_API_URL` to production backend URL

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Verify all dependencies are installed: `npm install`
3. Clear cache and reinstall: `rm -rf node_modules package-lock.json && npm install`
4. Check console for error messages

---

## ✨ Features to Add in Future

- Shopping cart functionality
- Payment integration (Stripe/Razorpay)
- Book reviews and ratings
- Order history
- Admin dashboard with analytics
- Email notifications
- Search and filtering
- Book recommendations
- Wishlist feature

---

## 📄 License

This project is open source and free to use for educational purposes.

---

## 🎓 Learning Outcomes

By building this project, you'll learn:
- ✅ Full-stack web development
- ✅ REST API development with Express
- ✅ Database design with MongoDB
- ✅ User authentication with JWT
- ✅ React component development
- ✅ State management
- ✅ Error handling
- ✅ MVC architecture

---

## 👨‍💻 Happy Coding!

Enjoy building with this bookstore application! Feel free to customize and extend it with your own features.

**Created with ❤️ for Learning**
#   i n t e r n s h i p p r o j e c t  
 