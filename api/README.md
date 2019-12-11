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
- GET /restaurants - Lists all restaurants
- PUT /restaurants - Update restaurant info
- DELETE /restaurants
- GET /restaurant/<restaurant_id>
- POST /create_restaurant

Menu Items
- GET /<restaurant_id>/menu_items
- POST /menu_item - Create new item for menu
- PUT /menu_item - Update existing item
- DELETE /menu_item

- GET /closest_restaurant/<user_id> - returns array of 5 closest pizza restaurants


## To-Do
- Dockerize Api
