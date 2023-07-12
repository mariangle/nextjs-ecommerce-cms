<p align="center">
  <a href="https://nextjs-ecommerce-cms.vercel.app/">
    <img alt="ecommerce cms screenshot" src=https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/236ffe58-7c47-41cc-a6e9-3329545dc273
>
    <h1 align="center">Ecommerce CMS</h1>
  </a>
</p>

<p align="center">
  A full stack application built with TypeScript and Next.js
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#usage"><strong>Usage</strong></a> ·
  <a href="#database-design"><strong>Database Design</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<p align="center">
  <a href="https://www.linkedin.com/in/maria-nguyen-le">
    <img src="https://img.shields.io/badge/-MariaLe-blue?style=plastic-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/maria-nguyen-le/" alt="License" />
  </a>
</p>
<br/>

<!-- ABOUT THE PROJECT -->

## Introduction

The Ecommerce CMS is a tool developed to simplify the management of online stores. With its integrated API, connect and integrate your online store with this CMS. This allows for easy and convenient management of your store's data.

Here are some of the key features:

- [Manage multiple stores](#multiple-stores)
- [Advanced product customization](#product-customization)
- [Fetching from the API](#fetching-from-the-api)

### Multiple stores

Create and manage multiple stores. Each store gets its unique store ID, making it simple to keep track of all your ventures.

![STORES](https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/ce698c16-9cb0-4a68-a323-8e79facf9a30)

### Product Customization

You have the ability to customize your store by creating billboards, as well as improve your product offerings by creating different variants based on size, color, brand, storage, or condition. Additionally, this flexibility allows you to set different prices for each variant, enabling you to offer a diverse range of products that cater to various markets.

![PRODUCTS](https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/f7d9961c-43a2-44db-9530-9962bd44fdfb)

![VARIANTS](https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/4889cc3b-0406-4658-9247-dd0f1026cc10)

### Fetching from the API

Utilizing the API, you can retrieve lists of entities for each entity type, which can be dynamically rendered on your website. For instance, you can fetch categories and display them in your frontend store's navigation bar. To see an example implementation, you can refer to this [GitHub repository](https://github.com/mariangle/nextjs-ecommerce-store).


![API LISTS](https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/c534195e-822d-464a-baf4-959445b4c158)

### API Filtering

The API allows you directly to filter when fetching data. This functionality allows you to filter products based on specific criteria or sort them by price.

Here are some examples:

   ```sh
   /api/{store-id}/products/?isFeatured=true
   ```

   ```sh
   /api/{store-id}/products/?q=macbook
   ```

   ```sh
   /api/{store-url}/product-variants/?sorting=lowest
   ```

   ```sh
   /api/{store-id}/product-variants/?brandId={brand-id}?colorId={color-id}
   ```

## Tech stack

- [Next.js](https://nextjs.org/) - framework
- [TypeScript](https://www.typescriptlang.org/) - language
- [Tailwind](https://tailwindcss.comm) - CSS
- [MySql](https://mysql.com) - database
- [Clerk](https://clerk.com/) - auth
- [Vercel](https://vercel.com/) - hosting

## Usage

To fetch from the API, copy the URL from the settings page into a .env file for your front end store.

![image](https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/5908abcb-fdd3-423f-8a1c-da215244c4d5)


<!-- GETTING STARTED )-->

## Database Design

While this project shares similarities with [my first ecommerce project](https://github.com/mariangle/ecommerce-app-ms-sql-net-react), it primarily distinguishes itself through its backend architecture. Focusing on the API and database as standalone components, this project represents a significant improvement in several areas.

**Dynamic API Endpoint**

This project introduces a dynamic API endpoint that can be used for different stores. It offers flexibility and adaptability to cater to various store requirements.

**Improved Data Organization**

The new project implements a well-structured database design, where the store table establishes a one-to-many relationship with all other tables. This allows for efficient retrieval of entity data specific to each store, improving data organization and accessibility.

**Improved Modularity and Separation of Tables**

Unlike the previous project, this new design focuses on modularization and separation of tables. It addresses previous challenges related to adding new features by improving the separation between tables. This separation improves the flexibility and scalability of the database.

**Better Normalization**

The database in this project is properly normalized, addressing previous issues related to duplicate products and poorly organized data. This ensures that you don't create multiple products with the same descriptions and names, resulting in a more efficient and organized database structure.

**Entity-based Approach**

In this project, entities such as brands are treated as separate entities. This allows for easier editing and management. Any changes made to an entity, such as correcting a typing error, will automatically update all products associated with that entity.


![image](https://github.com/mariangle/nextjs-ecommerce-cms/assets/124585244/6877aaf5-e0c3-4720-8971-1a675aa6cdb8)


## Installation

To get a local copy up and running, follow these steps.

1. Clone the repository:

   ```sh
   git clone https://github.com/mariangle/nextjs-ecommerce-cms.git
   ```

2. Configure your environment variables in a .env file. Include the following variables:

   ```sh
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    This was inserted by `prisma init`:
    Environment variables declared in this file are automatically made available to Prisma.
    See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
    Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
    See the documentation for all the connection string options: https://pris.ly/d/connection-strings
    
    DATABASE_URL=''
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
    STRIPE_API_KEY=
    FRONTEND_STORE_URL=http://localhost:3001
    STRIPE_WEBHOOK_SECRET=
   ```

3. Install the required npm packages:

    ```sh
    npm install
    ````

4. Set up the database:

   ````sh
   px prisma generate
   npx prisma db push   ```

   ````

5. Start the development server:

   ```sh
   npm run dev
   ```

## License

<details>
  <summary><b>MIT License</b></summary>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

</details>
