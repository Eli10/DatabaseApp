from flask import request
from flask_restful import Resource
from marshmallow import Schema, fields, ValidationError
import mysql.connector
from dotenv import load_dotenv
from .user import connection
import os

# Loading Environment variables from .env file
load_dotenv()

class GetMenuItems(Resource):
    def get(self, restaurant_id):
        try:
            menu_item_query = "select * from menu m left join menu_items mu on m.item_id = mu.item_id where restaurant_id={}".format(restaurant_id)
            cn = connection()
            cur = cn.cursor()
            cur.execute(menu_item_query)

            menu_items = []

            for row in cur:
                item = {
                    "item_id": row[0],
                    "restaurant_id": row[1],
                    "price": float(row[2]),
                    "item_name": row[4],
                    "description": row[5]
                }
                menu_items.append(item)
            return menu_items, 200
        except:
            return {"Msg": "Some error occurred"}, 500


class AddMenuItemSchema(Schema):
    item_name = fields.Str()
    description = fields.Str()
    restaurant_id = fields.Integer()
    price = fields.Decimal()

class UpdateMenuItemSchema(Schema):
    item_id = fields.Integer()
    item_name = fields.Str()
    description = fields.Str()
    price = fields.Decimal()

class DeleteMenuItemSchema(Schema):
    item_id = fields.Integer()


class MenuItem(Resource):

    def delete(self):
        req_data = request.get_json()

        # Validating post body arguments then insert into table if valid else throw error
        try:
            result = DeleteMenuItemSchema().load(req_data)
            print("Hello")
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()
            delete_item = "DELETE from menu_items WHERE item_id={}".format(result['item_id'])
            print(delete_item)
            cur.execute(delete_item)
            # Commits changes to the database
            cn.commit()


            # Updating into Menu Table
            delete_menu = "DELETE from menu WHERE item_id={}".format(result['item_id'])

            print(delete_menu)
            cur.execute(delete_menu)
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
            result = UpdateMenuItemSchema().load(req_data)
            print("Hello")
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()
            update_item = "UPDATE menu_items SET item_name = '{}', description = '{}' WHERE item_id={}".format(result['item_name'], result['description'], result['item_id'])
            print("Hello")
            print(update_item)
            cur.execute(update_item)
            # Commits changes to the database
            cn.commit()


            # Updating into Menu Table
            update_menu_price = "UPDATE menu SET price={} WHERE item_id={}".format(result['price'], result['item_id'])

            print(update_menu_price)
            cur.execute(update_menu_price)
            # Commits changes to the database
            cn.commit()

            cur.close()
            cn.close()
            return 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500

    def post(self):
        req_data = request.get_json()
        # Validating post body arguments then insert into table if valid else throw error
        try:
            result = AddMenuItemSchema().load(req_data)
            print(result)
            print(type(result))
            cn = connection()
            cur = cn.cursor()
            insert_item = ("INSERT INTO menu_items "
               "(item_name, description) "
               "VALUES (%s,%s)")

            item_values = (result['item_name'], result['description'])

            cur.execute(insert_item, item_values)
            # Commits changes to the database
            cn.commit()

            last_item_id = cur.lastrowid
            print(last_item_id)


            # Inserting into Menu Table
            insert_menu = ("INSERT INTO menu "
               "(item_id, restaurant_id, price) "
               "VALUES (%s,%s,%s)")

            menu_values = (last_item_id, result['restaurant_id'], result['price'])

            cur.execute(insert_menu, menu_values)
            # Commits changes to the database
            cn.commit()

            cur.close()
            cn.close()
            return 200
        except ValidationError as err:
            return err.messages, 500
        except:
            return {"Msg": "Some error occurred"}, 500
