# PrepPal

## Description

PrepPal is a web application that simplifies cooking by generating meals with recipes by taking in user inputted ingredients.

## Table of Contents

## Tech Stack

The frontend and backend are built using Next.js in TypeScript, and styled with Tailwind CSS. For the database, it uses a NoSQL DB, MongoDB Atlas.

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

## Future Improvements

Currently, the user experiences a significant amount of time between generating meals and the meals rendering on the page. A solution I'm currently working on is to stream the data as it's being generated so users can see immediate results.
