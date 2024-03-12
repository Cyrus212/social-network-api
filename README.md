# Social Network API

## Description

This project is a social network API built with MongoDB, a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. The API is designed for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

The motivation behind this project is to understand and implement the technologies that social networking platforms use in their full-stack applications. This project solves the problem of handling large amounts of unstructured data in a social media application.

## Table of Contents

- [Social Network API](#social-network-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all necessary packages.

## Usage

To use the API, start the server by running `npm start` in the terminal. The server will start and the Mongoose models will be synced to the MongoDB database. You can then use a tool like Insomnia to test the API routes.

## Features

- User and Thought models with various fields and schema settings.
- API routes for creating, reading, updating, and deleting users and thoughts.
- API routes for adding and removing friends from a user's friend list.
- API routes for creating and deleting reactions to thoughts.