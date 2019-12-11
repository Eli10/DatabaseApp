from flask_restful import Resource
import mysql.connector
from dotenv import load_dotenv
from .user import connection
import os

# Loading Environment variables from .env file
load_dotenv()


class ClosestRestaurant(Resource):
    def get(self, user_id):
        try:
            get_user_query = """
                select restaurants.name, restaurants.rating, restaurant_address.restaurant_id ,restaurant_address.street_adr, restaurant_address.cityaddr , restaurant_address.state, restaurant_address.zipcode, restaurant_address.latitude, restaurant_address.longitude from restaurant_address join user_address on user_address.zipcode > restaurant_address.zipcode-2000 and user_address.zipcode < restaurant_address.zipcode+2000 JOIN restaurants ON restaurants.restaurant_id = restaurant_address.restaurant_id where user_id = {} order by abs(user_address.zipcode - restaurant_address.zipcode) asc limit 5;
            """.format(user_id)
            print(get_user_query)
            cn = connection()
            cur = cn.cursor()
            cur.execute(get_user_query)

            restaurants = []

            for (name, rating, restaurant_id, street_adr, cityaddr, state, zipcode, latitude, longitude) in cur:
                restaurant = {
                    'name': name,
                    'rating': rating,
                    'restaurant_id': restaurant_id,
                    'street_adr': street_adr,
                    'cityaddr': cityaddr,
                    'state': state,
                    'zipcode': zipcode,
                    'latitude': float(latitude),
                    'longitude': float(longitude)
                        }
                restaurants.append(restaurant)
            return {"restaurants": restaurants}, 200
        except:
            return {"Msg": "Some error occurred"}, 500
