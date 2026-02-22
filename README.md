# 🌿GreenTech – Mobile E-Commerce App

> A modern Android e-commerce mobile application built with **Apache Cordova** and **Framework7**.

GreenTech is a fully functional mobile shopping application that simulates a real-world e-commerce experience. The app features dynamic product loading, detailed product pages, shopping cart management, and local persistence using `localStorage`.

## 📱Features

- 🏠 Home page with dynamic product listing

- 🔎 Product details page

- 🛒 Fully functional shopping cart

- ➕➖ Quantity control

- 💾 Persistent storage using LocalStorage

- 🔔 Toast notifications

- 📦 Product data loaded from a local JSON backend

- 🎨 Modern UI built with Framework7

## 🛠️Technologies Used

- Apache Cordova

- Framework7

- JavaScript (ES6)

- jQuery

- HTML5

- JSON (Mock Backend)

- CSS3

- LocalStorage API

## 📂Project Structure
`
greentech/
│
└── www/
    │
    ├── index.html
    ├── details.html
    ├── cart.html
    ├── favorite_page.html
    ├── search_page.html
    ├── user_page.html
    │
    ├── js/
    │   ├── backend.json
    │   ├── index.js
    │   ├── details.js
    │   ├── cart.js
    │   └── routes.js
    │
    └── css/
        ├── index.css
        ├── details.css
        ├── carts.css
        ├── favorite_page.css
        └── remixicon/
`

## Application Flow
### 🏠Home (`index.js`)

- Fetches product data from `backend.json`

- Stores products in `localStorage`

- Dynamically renders product cards

- Navigates to product details page

- Updates cart item counter

### 🔎Product Details (`details.js`)

- Retrieves selected product ID

- Displays full product information

- Builds dynamic features table

- Adds items to cart

Displays confirmation toast

### 🛒Shopping Cart (cart.js)

- Retrieves cart from `localStorage`

- Dynamically renders cart items

- Increase / decrease quantity

- Remove individual items

- Clear entire cart

- Automatically calculates subtotal

- Currency formatted using `toLocaleString()`

## 📦Product Data Structure

Products are stored locally in `backend.json`.

Example:
### JSON
`
{
  "id": 1,
  "name": "Airpod",
  "rating": 4.5,
  "price": 239.99,
  "promotional_price": 229.99,
  "details": [
    {
      "feature": "Connectivity",
      "details": "Bluetooth 5.0"
    }
  ]
}
`

## How to Run the Project
### 1️⃣ Install Cordova
`npm install -g cordova`
### 2️⃣ Add Android Platform
`cordova platform add android`
### 3️⃣ Build the Project
`cordova build android`
### 4️⃣ Run on Device or Emulator
`cordova run android`

## 💾 Data Persistence

The application uses:

- localStorage to store:

  - Product list

  - Selected product ID

 - Shopping cart

The app works fully offline and does not require an external API.

## 📄 License

This project is open-source and available for educational and portfolio purposes.
