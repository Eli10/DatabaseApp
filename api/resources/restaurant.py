from flask import request
from flask_restful import Resource
from marshmallow import Schema, fields, ValidationError
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from .user import connection
import os

# Loading Environment variables from .env file
load_dotenv()


class Restaurants(Resource):
    def get(self):
        print('HELLO TEST')
        try:
            get_restaurants_query = "SELECT restaurant_id, name, cuisine_type, sanitary_grade, rating from restaurants"
            print('HELLO TEST 1')
            cn = connection()
            print('HELLO TEST 1')
            cur = cn.cursor()
            print('HELLO TEST 2')
            cur.execute(get_restaurants_query)
            print('HELLO TEST 3')

            restaurants = {
                "restaurants": []

            }

            for (restaurant_id, name, cuisine_type, sanitary_grade, rating) in cur:
                restaurant = {
                    "restaurant_id": restaurant_id,
                    "name": name,
                    "cuisine_type": cuisine_type,
                    "sanitary_grade": sanitary_grade,
                    "rating": rating
                }
                restaurants["restaurants"].append(restaurant)
            return restaurants, 200
        except Error as e:
            print(e)
            return {"Msg": "Something wen wrong"},500


class RestaurantSchema(Schema):
    name = fields.Str()
    cuisine_type = fields.Str()
    sanitary_grade = fields.Str()
    rating = fields.Integer()
    street_adr = fields.Str()
    cityaddr = fields.Str()
    state = fields.Str()
    zipcode = fields.Integer()
    latitude = fields.Decimal()
    longitude = fields.Decimal()


class CreateRestaurant(Resource):
    def post(self):
        req_data = request.get_json()
        # Validating post body arguments then insert into table if valid else throw error
        try:
            result = RestaurantSchema().load(req_data)
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()
            insert_res = ("INSERT INTO restaurants "
               "(name, cuisine_type, sanitary_grade, rating) "
               "VALUES (%s, %s, %s, %s)")

            res_values = (result['name'], result['cuisine_type'], result['sanitary_grade'], result['rating'])

            cur.execute(insert_res, res_values)
            # Commits changes to the database
            cn.commit()

            last_res_id = cur.lastrowid
            print(last_res_id)


            # Inserting into Restaurant Address Table
            insert_address = ("INSERT INTO restaurant_address "
               "(restaurant_id, street_adr, cityaddr, state, zipcode, latitude, longitude) "
               "VALUES (%s,%s,%s,%s,%s,%s,%s)")

            addr_values = (last_res_id, result['street_adr'], result['cityaddr'], result['state'], result['zipcode'], result['latitude'], result['longitude'])

            cur.execute(insert_address, addr_values)
            # Commits changes to the database
            cn.commit()

            cur.close()
            cn.close()
            return 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500
