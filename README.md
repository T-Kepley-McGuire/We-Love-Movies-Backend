# We Love Movies

### A Thinkful Capstone Project

This application is for saving and reading movies, the theaters they're showing at, critics, and their reviews of said movies

This project is currently [deployed](https://we-love-movies-backend-d1zx.onrender.com)
The API works. Please dont abuse.

## Usage

All GET and DELETE commmands must be to a valid path and have an ID that is currently saved (if applicable)

PUT /reviews/:reviewId Must be of the following shape:
```
{
  "data": {
    "content": "place content here",
    "score": 5
  }
}
```
Exact Contents are not strictly policed so be nice. Available keys are "content", "score", "critic_id", and "movie_id"

### Available Commands

| HTTP verb	| Path	| Description |
|---|---|---|
| GET	| /moives |	Retrieve a list of all movies
| GET | /movies?is_showing=true | Retrieves a list of all movies currently showing
| GET	| /movies/:movieId |	Retrieve a movie by ID
| GET	| /moivies/:movieId/reviews |	Retrieves the list of reviews of movie ID
| GET |	/movies/:movieId/theaters |	Retrieves the list of theaters a movie ID is currently showing at
| DELETE |	/reviews/:reviewId |	Deletes a review by ID
| PUT | /reviews/:reviewId | Updates a review by ID
| GET | /theaters | Retrieves a list of all theaters with all movies showing at each

## Implementation

The server is created with Express.js for server logic and Knex.js for communicating with the database

The database is a free tier database hosted by ElephantSQL

## Installation

1. Fork and Clone repository
2. Open terminal to local repo
3. run ```npm install``` and ```npm start``` or ```npm run start:dev``` for a server that refreshes on file changes
