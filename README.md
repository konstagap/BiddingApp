# Bidding app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Why Next.js

Next.js allows us to write server-side rendered React apps with ease. It also allows us to write API endpoints in the same codebase. This is useful for us because we can write our API endpoints in TypeScript and share types between the frontend and backend.

## UI look

I have used Tailwind CSS and Daisy UI for this project. Both of these libraries are very easy to use and have a lot of components that can be used to build a UI quickly. Responsive design is also very easy to implement with Tailwind Css.

## Authorization and Authentication

I have used Next-Auth library with Credentials provider, which allows us to use email and password to authenticate users. I have also used JWT to authorize users. My initial plan was to use server sessions but turns out this lib is not supporting it with Credentials provider.

## Database

I choose MongoDB and Prisma ORM for this project. I have used Mongo Atlas cloud service and it is free and easy to setup. Prisma ORM lets us quickly prototype models and relations between them. It also generates types and handles migrations.

## Data Fetching

I have organized data fetching methods into separate files. This makes it easy to maintain and test. I have used SWR library for polling backend for new price.

## Project Structure

All UI and API routes live in `app/` forlder, Next.js uses file based router, each dir is a separate route, `page.tsx` is a render point in it. `api/` folder contains all API routes, each route is a serverless function. `components/` folder contains all reusable components. `lib/` contains third party packages utility functions as well as types and common configs.

## Getting Started

Before start:

- create `.env` file in a root of the project
- create `DATABASE_URL` variable with a connection string to your MongoDB database

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
