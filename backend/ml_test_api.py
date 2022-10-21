from flask import Flask, render_template, request
from flask_restful import Resource, Api
from object_detector import ObjectDetector
from restful_image import RESTfulImage
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[r"http://localhost:*", r"http://127.0.0.1:*"])
api = Api(app)
detect_thresh = 0.9
object_detector = ObjectDetector(detect_thresh)
staged_image = RESTfulImage()
bb_box_border_width=5
bb_box_text_font_size=75
# result_image = RESTfulImage() # A potentially smarter way to do this would be have result image resource and actually have the REST API use itself to put it when a result image is generated, then this result image resource can be queried for the current result

class ObjectDetectorResource(Resource):
    def __init__(self) -> None:
        super().__init__()

    def get(self):
        img = staged_image.get_PIL()
        model_name = object_detector.get_model_name()
        res = {'model_name':model_name, 'detect_thresh':detect_thresh}
        if img is None:
            return res
        object_detector_image, _, _ = object_detector.predict(img, bb_box_border_width=bb_box_border_width, bb_box_font_size=bb_box_text_font_size)
        object_detector_image = RESTfulImage.encode_PIL_as_b64_str(object_detector_image)
        res['result_image'] = object_detector_image
        return res

class StagedImageResource(Resource):
    def __init__(self) -> None:
        super().__init__()

    def put(self):
        form_dict = request.get_json()
        if (form_dict is None) or ('image' not in form_dict):
            return "Form did not have image", 400
        b64_str = form_dict['image']
        staged_image.set_b64_str(b64_str)

    def get(self):
        return {'image' : staged_image.get_b64_str()}
    
    def delete(self):
        staged_image.reset()

# Add resources
api.add_resource(ObjectDetectorResource, '/object-detector')
api.add_resource(StagedImageResource, '/object-detector/image')

@app.route('/')
def index_page():
    return render_template('index.html')