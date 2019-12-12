import csv
import random



def connection():
    user = 'csc345@cybertron2'
    pwd = 'pleasework10!'
    host = 'cybertron2.mysql.database.azure.com'
    database = 'cybertron'

    try:
        c = mysql.connector.connect(user=user, database=database, password=pwd, host=host)
        return c
    except:
        print("Connection Error")
        exit(1)




def random_grade():
    arr = ["A", "B", "C"]
    return random.sample(arr, 1)[0]

def random_rating():
    arr = [1,2,3,4,5]
    return random.sample(arr, 1)[0]


with open('pizza.csv', 'r+') as file:
    reader = csv.reader(file)
    data = [r for r in reader]
    rest_name = []
    rest_id = 0
    menu_item_id = 0


    # Lists of data to insert
    rest_list = list()
    rest_addr_list = list()
    menu_item_list = list()
    menu_list = list()


    for r in data[1:]:
        if r[15] in rest_name:
            pass
            menu_item_id += 1
            menu_item = (menu_item_id, r[14], r[13])
            menu_item_list.append(menu_item)
            # print(menu_item)
            menu = (menu_item_id, rest_id, 0 if r[10] == '' else float(r[10]))
            menu_list.append(menu)
            # print(menu)
        else:
            rest_name.append(r[15])
            rest_id += 1
            category = r[2].split(',')[0]

            res_str = (rest_id, r[15], category, random_grade(), random_rating())
            rest_list.append(res_str)

            res_addr_str = (rest_id, r[1], r[3], r[20], 'NULL' if r[16] == '' else r[16], r[6], r[7] )
            rest_addr_list.append(res_addr_str)
            # print(res_str)
            # print(res_addr_str)
            menu_item_id += 1
            menu_item = (menu_item_id, r[14], r[13])
            menu_item_list.append(menu_item)
            # print(menu_item)
            menu = (menu_item_id, rest_id, 0 if r[10] == '' else float(r[10]))
            menu_list.append(menu)
            # print(menu)

    # print("INSERT into restaurants (restaurant_id, name, cuisine_type, sanitary_grade, rating) VALUES")
    # for res in rest_list:
    #     str = "{},".format(res)
    #     print(str)

    # print("INSERT into restaurant_address (restaurant_id, street_adr, cityaddr, state, zipcode, latitude, longitude) VALUES")
    # for res in rest_addr_list:
    #     str = "{},".format(res)
    #     print(str)

    # print("INSERT into menu_items (item_id, item_name, description) VALUES")
    # for res in menu_item_list:
    #     str = "{},".format(res)
    #     print(str)

    # print("INSERT into menu (item_id, restaurant_id, price) VALUES")
    # for res in menu_list:
    #     str = "{},".format(res)
    #     print(str)



    import mysql.connector
    cn = connection()
    cur = cn.cursor()
    cur.execute("""

                """)
    cn.commit()
    cur.close()
    cn.close()






"""
Restaurant Table Columns Needed

name - row 15
cousine_type - pizza
sanitary_grade - random choice between A - C
rating - random choice between 1 - 5


Restaurant Address table Columns Needed

street_adr - row 1
cityaddr - row 3
state - row 20
zipcode - row 16
latitude - row 6
longitude - row 7

menu_items
name - 14
description - 13

menu
item_id
restuarant_id
price - row 10


"""
