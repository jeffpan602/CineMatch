# CineMatch (CSDS 338 - Software Engineering Final Project)

Authors:

 - Jeffrey Pan 
 - Alex DelGarbino 
 - Ulises Soto 
 - Joel Hottinger 
 - Saurav Giri 
 - Brian Xu

# About the Project

CineMatch is a simple web application that provides personalized movie recommendations based on user preferences. It allows users to maintain lists of watched and to-watch movies, rate and review films, and view personalized recommendations using The Movie Database (TMDB) API. 

Project features include:

 1. User-generated movie lists (watched-list & to-watch list)
 2. User review module
 3. User aggregated stats 
 4. Movie recommendation system

Software Architecture & Design:

 - Frontend: Built using React.js 
 - Backend: Built using Django 
 - TMDB API used for acquiring movie data
 - fetchTMDB used for making HTTP requests 

# How to Run Locally

Clone the CineMatch repo with your desired method 

**Frontend**

 1. Create a new terminal 
 2. Run `npm install`
 3. `cd cinematch-client` and run `npm install` again
 4. Run `npm start` to start Cinematch's frontend 
 
 **Backend**
 
 5. Create a new terminal and ensure that a virtual Python environment is running 
 6. `cd cinematch-server`
 7. Install Python dependencies by `pip install django djangorestframework django-cors-headers axios`
 8. `cd django-backend`
 9. Run `python manage.py runserver` to start running Cinematch's backend
