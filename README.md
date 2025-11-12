# 🔗 URL Shortener API - CodeAlpha Project

This project implements a functional URL shortening service, built as a RESTful API using the **Node.js** ecosystem. It allows users to submit long URLs and receive a short, unique code that redirects to the original link.

## ✨ Key Features

* **Short URL Generation:** Creates a unique, short alphanumeric code for every long URL submitted.
* **Redirection:** Implements a direct redirect from the short URL path to the original long URL.
* **Database Storage:** Uses MongoDB (via Mongoose) to persistently store the mapping between the short code and the original URL.
* **Validation:** Basic input validation to ensure a valid URL format is submitted.
* **Error Handling:** Custom error messages for invalid inputs or expired/non-existent short codes.

## 💻 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Utility:** `dotenv` for environment variables.

## 🛠️ Setup and Installation

### 1. Prerequisites

Ensure you have **Node.js** and **npm** installed.

### 2. Installation

1.  Clone the repository:
    ```bash
    git clone [YOUR REPO URL]
    cd CodeAlpha_URLShortener
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```

### 3. Configuration

1.  Create a **`.env`** file in the root directory.
2.  Add your MongoDB connection string and the base URL for the server:
    ```env
    MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/UrlShortenerDB?retryWrites=true&w=majority"
    PORT=5000
    # The base URL where your shortener service runs
    BASE_URL=http://localhost:5000
    ```
    **(Note: Ensure the MONGO_URI here has the updated, secure password.)**

### 4. Run the Server

Start the application:
```bash
node server.js