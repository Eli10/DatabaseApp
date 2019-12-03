# Flask API

- Uses a specific flask extension (flask_restful_swagger)

Steps to Run (For Mac)
- Install dependencies `pip3 install -r requirements.txt`
- Need to have the .env file in the `/users` folder to connect to the sql database
- Start api `python3 app.py`


## Api Routes

Users
- GET /users Able to get all users
- GET /user/email/<email> - Get a user by email
- POST /sign-up - Sign up a new user
- GET /sign-in - Login as a user

Restaurants
- GET /restaurants
- POST /create_restaurant


Menu Items
- GET /<restaurant_id>/menu_items
- POST /add_item


## To-Do
- Dockerize Api
- Add Database Models once we get schemas
