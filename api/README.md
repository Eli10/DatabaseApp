# Flask API

- Uses a specific flask extension (flask_restful_swagger)

Steps to Run (For Mac)
- Install dependencies `pip3 install -r requirements.txt`
- Need to have the .env file in the `/users` folder to connect to the sql database
- Start api `python3 app.py`


## Api Routes

Users
- /users Able to get all users
- /user/email/<email> - Get a user by email
- /sign-up - Sign up a new user
- /sign-in - Login as a user


## To-Do
- Dockerize Api
- Add Database Models once we get schemas
