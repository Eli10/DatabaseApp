from flask import request
from flask_restful import Resource
from marshmallow import Schema, fields, ValidationError
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

# Loading Environment variables from .env file
load_dotenv()


def connection():
    user = os.getenv('MYSQL_USER')
    pwd = os.getenv('MYSQL_PASS')
    host = os.getenv('MYSQL_HOST')
    database = os.getenv('MYSQL_DATABASE')

    try:
        c = mysql.connector.connect(user=user, database=database, password=pwd, host=host, ssl_disabled=True)
        return c
    except Error as e:
        print(e)
        print("Connection Error")


class UserSignInSchema(Schema):
    email = fields.Email()
    password = fields.Str()

class UserAndAddressSchema(Schema):
    first_name = fields.Str()
    last_name = fields.Str()
    email = fields.Email()
    password = fields.Str()
    address = fields.Str()
    city = fields.Str()
    state = fields.Str()
    zipcode = fields.Integer()

class SignUp(Resource):

    def post(self):
        req_data = request.get_json()
        # Validating post body arguments then insert into table if valid else throw error
        try:
            result = UserAndAddressSchema().load(req_data)
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()
            insert_user = ("INSERT INTO users "
               "(first_name, last_name, email, password) "
               "VALUES (%s, %s, %s, %s)")

            user_values = (result['first_name'], result['last_name'], result['email'], result['password'])
            email = result['email']

            cur.execute(insert_user, user_values)
            # Commits changes to the database
            cn.commit()

            last_user_id = cur.lastrowid


            # Inserting into Address Table
            insert_address = ("INSERT INTO user_address "
               "(user_id, street_adr, cityaddr, state, zipcode) "
               "VALUES (%s,%s,%s,%s,%s)")

            addr_values = (last_user_id, result['address'], result['city'], result['state'], result['zipcode'])

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


class SignIn(Resource):
    def post(self):
        req_data = request.get_json()
        try:
            result = UserSignInSchema().load(req_data)

            get_user_query = "SELECT email, password FROM users where email='{}'".format(result['email'])
            print(get_user_query)
            cn = connection()
            cur = cn.cursor()
            cur.execute(get_user_query)



            for (email, password) in cur:
                print(email)
                if email == result['email'] and password == result['password']:
                    cur.close()
                    cn.close()
                    return 200
                else:
                    cur.close()
                    cn.close()
                    return {'Message': 'Invalid creds'}, 400
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500


class UserByEmail(Resource):
    def get(self, email):
        try:
            get_user_query = "SELECT user_id, first_name, last_name, email, password FROM users where email='{}'".format(email)
            print(get_user_query)
            cn = connection()
            cur = cn.cursor()
            cur.execute(get_user_query)



            for (user_id, first_name, last_name, email, password) in cur:
                user = {
                    'user_id': user_id,
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'password': password
                        }
                return user, 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500

class UsersAll(Resource):

    def get(self):
        cn = connection()
        cur = cn.cursor()
        u = {'users': []}
        cur.execute("""
                    select u.user_id, u.first_name, u.last_name, u.email, u.password, \
                    a.street_adr, a.cityaddr, a.state, a.zipcode from users u
                    join user_address a on u.user_id = a.user_id
                    """)
        for (user_id, first_name, last_name, email, password, street_adr, cityaddr, state, zipcode) in cur:
            user = {
                'user_id': user_id,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password,
                'address': street_adr,
                'city': cityaddr,
                'state': state,
                'zip': zipcode
                    }
            u['users'].append(user)
        cur.close()
        cn.close()
        return u
