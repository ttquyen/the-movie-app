# the-movie-app-be

The demo app is running on: https://quyentt-movie-app-final.netlify.app/

## Functional Specification

Welcome to our movie application, where we dive deep into the world of cinema and bring you concise and comprehensive summaries of your favorite films.

The Movie App is a website project, where we will build the API list and database based on The Movie Database.

Users can see the list of popular, now-playing, and top-rated films all over the world. They also can find their exciting films by searching and filtering their favorite genres.

Besides that users can add a movie to their favorite list, leave comments, and vote for films after enjoying them.

## User Stories

### Authentication

-   [x] As a user, I can register for a new account with name, email and password.
-   [x] As a user, I can sign in with my email and password.

### Users

-   [x] As a user, I can get my current profile info (stay signed in with refreshing page).
-   [x] As a user, I can update my profile info (name)

### Comments

-   [x] As a user, I can see a list of comments on a film.
-   [x] As a user, I can write comments on a film.
-   [x] As a user, I can update my comments.
-   [x] As a user, I can delete my comments.

### Rating

-   [x] As a user, I can rate to a film (up to 10 stars).
-   [x] As a user, I can see a list of my rated movies.

### Favorite

-   [x] As a user, I can add a film to my favorite movie list.
-   [x] As a user, I can see a list of my favorite movies.

### Movies

-   [x] As a user, I can see a list of popular, now-playing, and top-rated films.
-   [x] As a user, I can search a film by name and filter them by genre.
-   [x] As a user, I can see the film detail.
-   [x] As a user, I can see the official trailer of a film.

## Endpoint APIs

Please refer [API Endpoints](https://github.com/ttquyen/the-movie-app-be/blob/main/docs/api.endpoints.md) in document for more info mation

# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Usage

-   Please refer `.env.example` and add a new `.env` file in the same root.
-   Note that the [Back-end server](https://github.com/ttquyen/the-movie-app-be) is running.

In the project directory, you can run:

### `npm install`

Install all the packages and dependencies in the `package.json`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
