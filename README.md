# Filmbase

## ** ABOUT **

This is a movie platform app where you can browse popular movies, save your favorite movies and share reviews with other users. The data is provided by The Movie Database API and it updates daily, so you can follow what's new in theaters right now.

### The aim of this project

I built this app to learn to store data in a relational database, and fetch/update the data with React Query on the client side. Knowing that React Query would be the best choice to manage server state in React apps, I decided to introduce it into my project instead of writing reducers and logic with thunks. That improved the app with less complex code, and also saved lots of time to handle errors and loading states. Caching is another feature that I first implemented on this project, which made it really fast to refetch the data.

### Some of the challenges I faced through this project

Understanding how React Query works was the most challenging thing at the beginning. Reading the official document over and over again and searching for sample codes in GitHub was quite helpful to solve this problem. There is more yet to learn about various use-cases of React Query, so I'll keep on exploring this useful library!

### The technologies I used for this app

#### Frontend
- React
- React Query
- Redux Toolkit
- Sass
- Firebase
- GitHub Actions

#### Backend 👉 <https://github.com/AyakaYasuda/filmbase-backend>
- Node.js
- Express
- PostgreSQL
- Passport
- Heroku
- GitHub Actions

## ** Preview **

### [kakeibo](https://kakeibo-a9b29.web.app/)

Popular movies
<img width="1440" alt="popular movies" src="https://user-images.githubusercontent.com/60804249/180625086-fe0d487e-3c45-4fa4-9067-cce57689aa15.png">

Movie modal
<img width="1440" alt="movie detail" src="https://user-images.githubusercontent.com/60804249/180630676-239ea7d9-91fd-4872-b48c-617f401f48ff.png">

Reviews
<img width="1440" alt="reviews" src="https://user-images.githubusercontent.com/60804249/180625088-37295456-ed65-47d8-b378-e73fe2c310c3.png">

Users who liked the review
<img width="1440" alt="users who liked" src="https://user-images.githubusercontent.com/60804249/180625089-1d4edf3e-3e1a-4b90-bb9f-d0aa66547be1.png">
