from flask import Flask
from flask_restful import Resource, Api
from resources.user import UserByEmail, UsersAll, SignUp, SignIn
from resources.restaurant import Restaurants, CreateRestaurant, GetRestaurant
from resources.menu_items import GetMenuItems, MenuItem
from resources.closest_restaurant import ClosestRestaurant

#Testing Azure

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {"response": "Hello World"}

api.add_resource(HelloWorld, '/hello')
api.add_resource(UserByEmail, '/user/email/<string:email>')
api.add_resource(UsersAll, '/users')
api.add_resource(SignUp, '/sign-up')
api.add_resource(SignIn, '/sign-in')

api.add_resource(Restaurants, '/restaurants')
api.add_resource(GetRestaurant, '/restaurant/<string:restaurant_id>')
api.add_resource(CreateRestaurant, '/create_restaurant')

api.add_resource(GetMenuItems, '/<string:restaurant_id>/menu_items')
api.add_resource(MenuItem, '/menu_item')

api.add_resource(ClosestRestaurant, '/closest_restaurant/<string:user_id>')


if __name__ == '__main__':
    app.run(debug=True)
