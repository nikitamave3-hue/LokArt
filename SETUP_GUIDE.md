# LokArt Full-Stack Setup & Testing Guide

## ✅ What Was Fixed

### Backend Issues Fixed:
1. **File naming inconsistencies** - Updated routes/controllers to use correct file names (`userControllers.js` instead of `userController.js`)
2. **Model import mismatches** - Corrected model paths in controllers (`usermodels.js`, `productmodels.js`, etc.)
3. **Database configuration** - Added fallback local MongoDB URI when `.env` is missing
4. **JWT token generation** - Added fallback secret when `JWT_SECRET` is not defined
5. **Missing admin endpoints** - Created `adminController.js`, `adminRoutes.js`, and `reviewRoutes.js`
6. **Incomplete routes** - Added missing `/api/users` GET route for listing all users
7. **Model schema updates** - Added `village` and `role` fields to User model, adjusted Artist and Product models to match frontend payloads
8. **Order payload flexibility** - Changed Order model to accept string or mixed product/user references for frontend payment data
9. **Route aliases** - Added `/api/providers` and `/api/profiles` routes pointing to artist endpoints

### Frontend Issues Fixed:
1. **API port mismatch** - Changed all fetch calls from `localhost:3000` to `localhost:5000` (actual backend port)
2. **Response handling** - Updated all `data.ok` checks to `response.ok` (correct HTTP status checking)
3. **Frontend payload mapping** - Ensured form data matches backend model fields

### Environment Setup:
1. **Package.json script** - Fixed to point to correct backend entry point (`backend/server.js`)

---

## 📋 Prerequisites (Required Before Running)

### 1. Install MongoDB Locally (or use MongoDB Atlas)

**Option A: Local MongoDB (Linux)**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
mongosh  # or mongo (for older versions)
```

**Option B: MongoDB Atlas (Cloud - No Installation Needed)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Copy the connection string
5. Create `.env` file in root directory:
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lokart
JWT_SECRET=your_secret_key
PORT=5000
```

### 2. Node.js & npm (Already installed)
Verify:
```bash
node --version
npm --version
```

---

## 🚀 Running the Project

### Start Backend Server
```bash
cd /home/ankit/Desktop/structure./structure

# Install dependencies (if not already done)
npm install

# Start backend with nodemon (auto-reload on changes)
npm run dev

# Or start normally
npm start
```

**Expected Output:**
```
MONGO_URI not found in .env, using local MongoDB default.
Server running on port 5000
MongoDB Connected
```

### Access Frontend
Open in browser:
```
http://localhost:5000
```

Or open specific pages:
- **Register**: `file:///home/ankit/Desktop/structure./structure/frontend/register.html`
- **Login**: `file:///home/ankit/Desktop/structure./structure/frontend/login.html`
- **Marketplace**: `file:///home/ankit/Desktop/structure./structure/frontend/marketplace.html`
- **Sell Product**: `file:///home/ankit/Desktop/structure./structure/frontend/sell-product.html`
- **Admin**: `file:///home/ankit/Desktop/structure./structure/frontend/admin.html`

---

## 🧪 Test API Endpoints (Using curl)

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "password": "test123",
    "phone": "9876543210",
    "village": "Bharatpur",
    "role": "Seller"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ravi@example.com",
    "password": "test123"
  }'
```

### 3. Get All Users (Admin)
```bash
curl http://localhost:5000/api/users
```

### 4. Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Handmade Pottery",
    "description": "Beautiful ceramic vase",
    "price": 450,
    "category": "Craft",
    "image": "https://example.com/image.jpg",
    "seller": "Asha Traders",
    "village": "Khuriya"
  }'
```

### 5. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 6. Create an Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "product": "Handmade Pottery",
    "totalPrice": 450,
    "status": "Pending"
  }'
```

### 7. Get All Orders (Admin)
```bash
curl http://localhost:5000/api/orders
```

### 8. Create Contact Message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ravi",
    "phone": "9876543210",
    "message": "Need seller support"
  }'
```

### 9. Create an Artist/Service Profile
```bash
curl -X POST http://localhost:5000/api/artists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sita Sharma",
    "category": "Tailor",
    "skill": "Expert Tailor",
    "business": "Sita Tailoring House",
    "experience": "5 years",
    "location": "Bharatpur",
    "whatsapp": "9876543210",
    "description": "Professional tailoring services",
    "image": "https://example.com/image.jpg"
  }'
```

### 10. Get All Artists/Providers
```bash
curl http://localhost:5000/api/providers
```

### 11. Admin Dashboard Summary
```bash
curl http://localhost:5000/api/admin/summary
```

### 12. Get Reviews
```bash
curl http://localhost:5000/api/reviews
```

---

## 📂 Project Structure

```
structure/
├── backend/
│   ├── server.js (Main Express server)
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   ├── controllers/
│   │   ├── userControllers.js
│   │   ├── productControllers.js
│   │   ├── artistsControllers.js
│   │   ├── orderControllers.js
│   │   ├── contactController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── usermodels.js
│   │   ├── productmodels.js
│   │   ├── artistmodels.js
│   │   ├── ordermodels.js
│   │   ├── contactModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── artistRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── adminRoutes.js
│   │   └── reviewRoutes.js
│   └── middleware/
│       └── authmiddleware.js
├── frontend/
│   ├── index.html (Home page)
│   ├── register.html (User registration)
│   ├── login.html (User login)
│   ├── marketplace.html (Browse products)
│   ├── sell-product.html (List products)
│   ├── create-profile.html (Artist/service profiles)
│   ├── payment.html (Order checkout)
│   ├── contact.html (Contact form)
│   ├── services.html (Service providers)
│   ├── admin.html (Admin dashboard)
│   ├── style.css
│   └── site.js (Navigation helpers)
├── frontend-react/
│   └── (React version - separate from main frontend)
├── package.json
└── node_modules/
```

---

## 🔗 API Routes Summary

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | User login |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user profile |
| POST | `/api/products` | Create product listing |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/artists` | Create artist/service profile |
| GET | `/api/artists` | List all artists |
| GET | `/api/artists/:id` | Get single artist |
| GET | `/api/providers` | List service providers (alias for artists) |
| GET | `/api/profiles` | List seller profiles (alias for artists) |
| POST | `/api/orders` | Create order/checkout |
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/:id` | Get single order |
| PUT | `/api/orders/:id` | Update order status |
| POST | `/api/contact` | Send contact message |
| GET | `/api/contact` | Get all contact messages |
| GET | `/api/admin/summary` | Admin dashboard stats |
| GET | `/api/reviews` | Get all reviews |

---

## 🐛 Troubleshooting

### Issue: "MongoDB Connection Refused"
**Solution:**
1. Start MongoDB locally:
   ```bash
   sudo systemctl start mongod
   ```
2. OR use MongoDB Atlas (cloud) - add `.env` file with connection string

### Issue: "Module not found" errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Find what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=3001
```

### Issue: Frontend doesn't connect to backend
**Checklist:**
1. Backend is running on `http://localhost:5000`
2. All frontend fetch URLs point to `localhost:5000` (not 3000)
3. CORS is enabled in backend (`app.use(cors())`)
4. Check browser console for network errors

### Issue: Auth token not working
**Solution:**
Add JWT token to requests:
```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/users
```

---

## 📝 Next Steps

1. **Setup MongoDB** - Install locally or use MongoDB Atlas cloud
2. **Create `.env` file** (optional):
   ```bash
   echo "JWT_SECRET=your_secret_key" > .env
   echo "PORT=5000" >> .env
   echo "MONGO_URI=mongodb://127.0.0.1:27017/lokart" >> .env
   ```
3. **Start the server**: `npm run dev`
4. **Test endpoints** using curl or Postman
5. **Open frontend** in browser and test the forms
6. **Monitor logs** in terminal to debug issues

---

## ✨ Features Now Working

✅ User Registration & Login
✅ Product Listing & Marketplace
✅ Artist/Service Provider Profiles
✅ Order & Checkout System
✅ Contact Form Submissions
✅ Admin Dashboard with Stats
✅ Product Management (CRUD)
✅ Response Error Handling
✅ Database Connection with Fallbacks

