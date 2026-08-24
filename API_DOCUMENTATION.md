# LokArt Backend API Documentation

## Overview
LokArt is a rural marketplace platform that connects artisans, farmers, and small businesses with buyers. The backend provides REST API endpoints for:
- User authentication (Register/Login)
- Product management
- Artist/service provider profiles
- Orders and checkout
- Contact messages
- Admin analytics

## Backend Architecture

### Technology Stack
- **Server**: Express.js (Node.js)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Encryption**: bcryptjs for password hashing

### Environment Variables
Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lokart
JWT_SECRET=your_secret_key_here
```

If not provided, the app uses safe defaults:
- `PORT`: 5000
- `MONGO_URI`: mongodb://127.0.0.1:27017/lokart (local)
- `JWT_SECRET`: "supersecret" (for development only)

---

## API Endpoints Reference

### Users API

#### Register User
**POST** `/api/users/register`
```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "secure123",
  "phone": "9876543210",
  "village": "Bharatpur",
  "role": "Seller"
}
```
**Response** (201 Created):
```json
{
  "_id": "648a1f2c3d4e5f6g7h8i9j0k",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9876543210",
  "village": "Bharatpur",
  "role": "Seller",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
**POST** `/api/users/login`
```json
{
  "email": "ravi@example.com",
  "password": "secure123"
}
```
**Response** (200 OK):
```json
{
  "_id": "648a1f2c3d4e5f6g7h8i9j0k",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9876543210",
  "village": "Bharatpur",
  "role": "Seller",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get All Users
**GET** `/api/users`
**Response** (200 OK): Array of user objects

#### Get User Profile
**GET** `/api/users/:id`
**Response** (200 OK):
```json
{
  "_id": "648a1f2c3d4e5f6g7h8i9j0k",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9876543210",
  "village": "Bharatpur",
  "role": "Seller",
  "createdAt": "2023-06-15T10:30:00.000Z",
  "updatedAt": "2023-06-15T10:30:00.000Z"
}
```

---

### Products API

#### Create Product
**POST** `/api/products`
```json
{
  "name": "Handmade Pottery",
  "description": "Beautiful ceramic vase with traditional design",
  "price": 450,
  "category": "Craft",
  "image": "https://example.com/pottery.jpg",
  "seller": "Asha Traders",
  "village": "Khuriya",
  "stock": 5
}
```
**Response** (201 Created): Product object with `_id`

#### Get All Products
**GET** `/api/products`
**Response** (200 OK): Array of product objects

#### Get Single Product
**GET** `/api/products/:id`
**Response** (200 OK): Product object

#### Update Product
**PUT** `/api/products/:id`
```json
{
  "price": 500,
  "stock": 10
}
```
**Response** (200 OK): Updated product object

#### Delete Product
**DELETE** `/api/products/:id`
**Response** (200 OK):
```json
{
  "message": "Product deleted successfully"
}
```

---

### Artists/Providers API

#### Create Artist Profile
**POST** `/api/artists` (or `/api/providers` or `/api/profiles`)
```json
{
  "name": "Sita Sharma",
  "category": "Tailor",
  "skill": "Expert Tailor",
  "business": "Sita Tailoring House",
  "experience": "5 years",
  "location": "Bharatpur",
  "whatsapp": "9876543210",
  "description": "Professional tailoring with 5+ years experience",
  "image": "https://example.com/sita.jpg"
}
```
**Response** (201 Created): Artist object with `_id`

#### Get All Artists
**GET** `/api/artists` (or `/api/providers` or `/api/profiles`)
**Response** (200 OK): Array of artist objects

#### Get Single Artist
**GET** `/api/artists/:id`
**Response** (200 OK): Artist object

#### Update Artist
**PUT** `/api/artists/:id`
```json
{
  "experience": "7 years",
  "whatsapp": "9876543211"
}
```
**Response** (200 OK): Updated artist object

#### Delete Artist
**DELETE** `/api/artists/:id`
**Response** (200 OK):
```json
{
  "message": "Artist deleted successfully"
}
```

---

### Orders API

#### Create Order (Checkout)
**POST** `/api/orders`
```json
{
  "product": "Handmade Pottery",
  "totalPrice": 450,
  "status": "Pending"
}
```
**Response** (201 Created): Order object with `_id`

#### Get All Orders
**GET** `/api/orders`
**Response** (200 OK): Array of order objects

#### Get Single Order
**GET** `/api/orders/:id`
**Response** (200 OK): Order object

#### Update Order Status
**PUT** `/api/orders/:id`
```json
{
  "status": "Processing"
}
```
**Valid statuses**: `Pending`, `Processing`, `Shipped`, `Delivered`

**Response** (200 OK): Updated order object

---

### Contact API

#### Create Contact Message
**POST** `/api/contact`
```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210",
  "message": "Need help with seller onboarding"
}
```
**Response** (201 Created): Contact message object

#### Get All Contact Messages
**GET** `/api/contact`
**Response** (200 OK): Array of contact messages (admin only)

---

### Admin API

#### Get Admin Dashboard Summary
**GET** `/api/admin/summary`
**Response** (200 OK):
```json
{
  "users": 15,
  "products": 42,
  "orders": 28,
  "reviews": 0
}
```

---

### Reviews API

#### Get All Reviews
**GET** `/api/reviews`
**Response** (200 OK):
```json
[
  {
    "rating": 4.9,
    "comment": "Great local purchase, fast response.",
    "user": "Rita Sharma"
  },
  {
    "rating": 4.7,
    "comment": "Seller was helpful and the product quality was good.",
    "user": "Aman Verma"
  }
]
```

---

## Error Handling

All endpoints return errors in this format:

**400 Bad Request**:
```json
{
  "message": "User already exists"
}
```

**404 Not Found**:
```json
{
  "message": "Product not found"
}
```

**500 Server Error**:
```json
{
  "message": "Internal server error details"
}
```

---

## Authentication

Currently, the backend accepts requests with or without JWT tokens. To use protected routes (in future), include:

```
Authorization: Bearer <token>
```

Replace `<token>` with the token received from login/register response.

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  phone: String,
  village: String,
  role: String (Customer|Seller|Service Provider),
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  image: String,
  seller: String,
  village: String,
  stock: Number (default: 1),
  createdAt: Date,
  updatedAt: Date
}
```

### Artists Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  category: String (required),
  skill: String,
  business: String,
  experience: String,
  location: String (required),
  whatsapp: String,
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: Mixed,
  product: Mixed (required),
  quantity: Number (default: 1),
  totalPrice: Number (required),
  status: String (Pending|Processing|Shipped|Delivered),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  phone: String,
  message: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ravi","email":"ravi@test.com","password":"test123","phone":"9876543210","village":"Bharatpur","role":"Seller"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ravi@test.com","password":"test123"}'

# List products
curl http://localhost:5000/api/products

# Create product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Pottery","description":"Beautiful vase","price":450,"category":"Craft","seller":"Asha","village":"Khuriya"}'

# Get admin stats
curl http://localhost:5000/api/admin/summary
```

---

## Notes

- All responses use standard HTTP status codes (200, 201, 400, 404, 500)
- Dates are returned in ISO 8601 format
- Passwords are hashed using bcryptjs before storage
- Database uses MongoDB with Mongoose ODM
- CORS is enabled for cross-origin requests from frontend

