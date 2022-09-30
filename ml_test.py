from flask import Flask
from flask_restful import Resource, Api

def create_app():
    ml_test_app = Flask(__name__)
    ml_test_api = Api(ml_test_app)
    # Add resources
    ml_test_api.add_resource(Test, '/')
    return ml_test_app

class Test(Resource):
    def get(self):
        return {"Hello":"World"}