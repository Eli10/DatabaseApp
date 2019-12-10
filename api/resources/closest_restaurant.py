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
                select restaurant_address.restaurant_id ,restaurant_address.street_adr, restaurant_address.cityaddr , restaurant_address.state, restaurant_address.zipcode from restaurant_address join user_address on user_address.zipcode > restaurant_address.zipcode-2000 and user_address.zipcode < restaurant_address.zipcode+2000 where user_id = {} order by abs(user_address.zipcode - restaurant_address.zipcode) asc limit 5;
            """.format(user_id)
            print(get_user_query)
            cn = connection()
            cur = cn.cursor()
            cur.execute(get_user_query)

            restaurants = []

            for (restaurant_id, street_adr, cityaddr, state, zipcode) in cur:
                restaurant = {
                    'restaurant_id': restaurant_id,
                    'street_adr': street_adr,
                    'cityaddr': cityaddr,
                    'state': state,
                    'zipcode': zipcode
                        }
                restaurants.append(restaurant)
            return {"restaurants": restaurants}, 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500
