# Simple E-commerce API & Frontend

## Project Overview
This is a simple full-stack e-commerce application built with Node.js, Express, MongoDB (Mongoose), and a vanilla HTML/CSS/JS frontend. It supports user authentication, role-based admin features, product management (with image upload), cart and order management, and a clean, modern UI.

### Features
- User registration and login (JWT-based authentication)
- Role-based access: Admins can add/edit/delete products
- Product image upload (file or URL)
- Add products to cart (server-side cart, not localStorage)
- Update/remove cart items
- Place orders (cart items are moved to orders, cart is cleared)
- View order history
- Responsive, simple frontend (HTML/CSS/JS)

## Folder Structure
```
project-root/
├── controllers/         # Express controllers for auth, products, cart, orders
├── middleware/          # Auth and role middleware
├── models/              # Mongoose models (User, Product, Cart, Order)
├── public/              # Frontend HTML, CSS, JS
├── routes/              # Express routes for API endpoints
├── config/              # Database config
├── server.js            # Main Express server
├── package.json         # NPM dependencies and scripts
└── ...
```

## Prerequisites
- Node.js (v14 or newer recommended)
- MongoDB (local or Atlas)

## Setup & Run Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd SimpleEcommerce
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```env
     MONGODB_URI=mongodb://localhost:27017/simple-ecommerce
     JWT_SECRET=your-secret-key
     PORT=5000
     ```
   - Adjust values as needed for your environment.

4. **Start MongoDB**
   - Make sure your MongoDB server is running locally or update the URI for Atlas.

5. **Run the server**
   ```sh
   node server.js
   ```
   - Or use `npm start` if you have a start script.

6. **Access the frontend**
   - Open your browser and go to: [http://localhost:5000/](http://localhost:5000/)
   - You can register, login, browse products, add to cart, and place orders.

## API Endpoints (Summary)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/products` — List all products
- `POST /api/products` — Add product (admin only)
- `POST /api/cart` — Add to cart (authenticated)
- `GET /api/cart` — Get cart (authenticated)
- `PUT /api/cart/:productId` — Update cart item
- `DELETE /api/cart/:productId` — Remove from cart
- `POST /api/orders` — Place order (moves cart items to orders)
- `GET /api/orders` — Get user's orders

## Notes
- Admin users can access the admin page to manage products.
- Product images can be uploaded or provided as a URL.
- Cart and order management is fully server-side (persistent per user).
- All API endpoints require JWT in the `Authorization: Bearer <token>` header after login.

---

Feel free to customize this project for your needs!
