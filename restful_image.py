import base64
from io import BytesIO
from PIL import Image

class RESTfulImage:
    def __init__(self) -> None:
        self._img = None

    def reset(self):
        self._img = None

    def get_b64_str(self) -> str:
        return "" if self._img is None else self.encode_PIL_as_b64_str(self._img)

    def set_b64_str(self, b64_str:str):
        self._img = self.decode_b64_str_as_PIL(b64_str)
    
    def get_PIL(self) -> Image:
        return self._img

    def set_PIL(self, img:Image):
        self._img = img

    @staticmethod
    def encode_PIL_as_b64_str(img:Image)->str:
        with BytesIO() as output:
            img.save(output, 'BMP')
            img_bytes = output.getvalue()
        b_arr = base64.b64encode(img_bytes)
        return b_arr.decode('utf-8')


    @staticmethod
    def decode_b64_str_as_PIL(b64_str:str)->Image:
        return Image.open(BytesIO(base64.b64decode(b64_str)))
