from flask import Flask
from flask_restful import Resource, Api
from users.user import UserByEmail, UsersAll, SignUp, SignIn

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

if __name__ == '__main__':
    app.run(debug=True)
