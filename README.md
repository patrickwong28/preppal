# PrepPal

## Description

PrepPal is a web application that simplifies cooking by generating meals with recipes by taking in user inputted ingredients.

## Table of Contents

## Tech Stack

The frontend and backend are built using Next.js in TypeScript, and styled with Tailwind CSS. For the database, it uses a NoSQL document database, MongoDB Atlas.

## Installation

For individuals that would like to run PrepPal locally, use the following steps:

Cloning the project

```bash
git clone git@github.com:patrickwong28/preppal.git
```

Installing dependencies

```bash
npm install
```

Running development environment

```bash
npm run dev
```

Before running the development environment, you must create a .env.local file in the root directory. It must to include the following API keys (DB_URI refers to MongoDB Atlas):

```bash
OPENAI_API_KEY
DB_URI
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
PEXELS_API_KEY
```

For the Clerk sign-in and sign-up pages:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Future Improvements

Currently, the user experiences a significant amount of time between generating meals and the meals rendering on the page. A solution I'm currently working on is to stream the data as it's being generated so users can see immediate results.
