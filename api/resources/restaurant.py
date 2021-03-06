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

class UpdateRestaurantSchema(Schema):
    restaurant_id = fields.Integer()
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

class DeleteRestaurantSchema(Schema):
    restaurant_id = fields.Integer()


class Restaurants(Resource):

    def delete(self):
        req_data = request.get_json()
        # Validating post body arguments then insert into table if valid else throw error
        try:
            result = DeleteRestaurantSchema().load(req_data)
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()

            delete_address = "DELETE FROM restaurant_address WHERE restaurant_id={}".format(result['restaurant_id'])

            print(delete_address)
            cur.execute(delete_address)
            # Commits changes to the database
            cn.commit()

            delete_menu = "DELETE FROM menu WHERE restaurant_id={}".format(result['restaurant_id'])
            print(delete_menu)
            cur.execute(delete_menu)
            # Commits changes to the database
            cn.commit()


            # Deleting from Restaurant  Table
            delete_res = "DELETE FROM restaurants WHERE restaurant_id={}".format(result['restaurant_id'])
            print(delete_res)
            cur.execute(delete_res)
            # Commits changes to the database
            cn.commit()

            cur.close()
            cn.close()
            return 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500


    def put(self):
        req_data = request.get_json()
        # Validating post body arguments then insert into table if valid else throw error
        try:
            result = UpdateRestaurantSchema().load(req_data)
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()
            update_res = """
                UPDATE restaurants SET name = '{}', cuisine_type = '{}', sanitary_grade = '{}', rating={} WHERE restaurant_id={}
                """.format(result['name'].replace('\'', ''), result['cuisine_type'], result['sanitary_grade'], result['rating'], result['restaurant_id'])
            print(update_res)
            cur.execute(update_res)
            # Commits changes to the database
            cn.commit()


            # Inserting into Restaurant Address Table
            update_address = "UPDATE restaurant_address SET street_adr='{}', cityaddr='{}', state='{}', zipcode={}, latitude={}, longitude={} WHERE restaurant_id={}".format(result['street_adr'], result['cityaddr'], result['state'], result['zipcode'], result['latitude'], result['longitude'], result['restaurant_id'])

            print(update_address)
            cur.execute(update_address)
            # Commits changes to the database
            cn.commit()

            cur.close()
            cn.close()
            return 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500



    def get(self):
        try:
            get_restaurants_query = "SELECT r.restaurant_id, r.name, r.cuisine_type, r.sanitary_grade, r.rating, a.street_adr, a.cityaddr, a.state, a.zipcode, a.latitude, a.longitude from restaurants r JOIN restaurant_address a ON r.restaurant_id = a.restaurant_id"
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

            for (restaurant_id, name, cuisine_type, sanitary_grade, rating, street_adr, cityaddr, state, zipcode, latitude, longitude) in cur:
                restaurant = {
                    "restaurant_id": restaurant_id,
                    "name": name,
                    "cuisine_type": cuisine_type,
                    "sanitary_grade": sanitary_grade,
                    "rating": rating,
                    "street": street_adr,
                    "city": cityaddr,
                    "state": state,
                    "zipcode": zipcode,
                    "latitude": float(latitude),
                    "longitude": float(longitude)
                }
                restaurants["restaurants"].append(restaurant)
            return restaurants, 200
        except Error as e:
            print(e)
            return {"Msg": "Something wen wrong"},500

class GetRestaurant(Resource):
    def get(self, restaurant_id):
        try:
            get_restaurant_query = "SELECT r.restaurant_id, r.name, r.cuisine_type, r.sanitary_grade, r.rating, a.street_adr, a.cityaddr, a.state, a.zipcode, a.latitude, a.longitude from restaurants r JOIN restaurant_address a ON r.restaurant_id = a.restaurant_id WHERE r.restaurant_id={}".format(restaurant_id)
            print('HELLO TEST 1')
            cn = connection()
            print('HELLO TEST 1')
            cur = cn.cursor()
            print('HELLO TEST 2')
            cur.execute(get_restaurant_query)
            print('HELLO TEST 3')

            for (restaurant_id, name, cuisine_type, sanitary_grade, rating, street_adr, cityaddr, state, zipcode, latitude, longitude) in cur:
                restaurant = {
                    "restaurant_id": restaurant_id,
                    "name": name,
                    "cuisine_type": cuisine_type,
                    "sanitary_grade": sanitary_grade,
                    "rating": rating,
                    "street": street_adr,
                    "city": cityaddr,
                    "state": state,
                    "zipcode": zipcode,
                    "latitude": float(latitude),
                    "longitude": float(longitude)
                }
                return restaurant, 200
        except Error as e:
            print(e)
            return {"Msg": "Something went wrong"},500


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
