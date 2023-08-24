# Teebay - Demo Marketplace for Buying, Selling, and Renting Products

Welcome to **Teebay**, your one-stop online marketplace for all your buying, selling, and renting needs. Teebay is built using a modern tech stack, including ***React, Vite, Tailwind CSS, Apollo Client, Redux*** in the frontend, and ***Express.js, GraphQL, Apollo Server, Prisma, and PostgreSQL*** in the backend. It also utilizes ***JWT*** for user authentication.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Features](#features)
3.  [Tech Stack](#tech-stack)
4.  [Getting Started](#getting-started)
5.  [Project Structure](#project-structure)
6.  [Authentication](#authentication)
7.  [Database](#database)
8.  [API Endpoints](#api-endpoints)
9.  [Deployment](#deployment)
10.  [Contributing](#contributing)
11.  [License](#license)


## [Introduction](#introduction)

Teebay is a versatile e-commerce platform designed to facilitate the buying, selling, and renting of a wide range of products. With its modern and intuitive user interface, Teebay offers a seamless shopping experience for both buyers and sellers. Users can create accounts, list products, search for items, and engage in secure transactions.

## [Features](#features)

-   User Registration
-	Login
-	Authentication using JWT
-	Product Listing 
-	Multicategory Assign
-	Update product 
-	Delete Product
-	Buy Product
-	Sell Product
-	Rent product 
-	View Counts
(Upcoming Features - Search and Filtering, Payment Processing, User Profile Management, User reviews and Ratings, Real-time notification)

## [Tech Stack](#tech-stack)

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Apollo Client
-   Redux
-   JWT for Authentication

### Backend

-   Express.js
-   GraphQL
-   Apollo Server
-   Prisma
-   PostgreSQL
-   JWT for Authentication

## [Getting Started](#getting-started)

Follow these steps to get the Teebay project up and running locally:

1.  Clone the repository:

    `git clone https://github.com/your-username/teebay.git`


## [Project Structure](project-structure)

The project is structured as follows:
```
teebay/
├── teebay_be/
│   ├── src/
│   │   ├── graphql/
│   │   ├── prisma/
│   │   ├── db/
│   │   └── server.js
│   ├── package.json
│   ├── ...
├── teebay/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── apollo.js
│   │   └── ...
│   ├── package.json
│   ├── ...
├── README.md
├── .gitignore
├── ...
```
