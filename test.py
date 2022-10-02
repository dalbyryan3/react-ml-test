from unicodedata import decimal
import unittest
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np

from restful_image import RESTfulImage

class TestRESTfulImage(unittest.TestCase):
    def test_encode_decode(self, test_visually=False):
        orig_img = Image.open('DogsandCats.jpg')
        rest_img = RESTfulImage()
        enc_img = rest_img.encode_PIL_as_b64_str(orig_img)
        dec_img = rest_img.decode_b64_str_as_PIL(enc_img)
        # To test visually
        if test_visually:
            fig, (ax1, ax2) = plt.subplots(1,2)
            ax1.imshow(np.array(orig_img))
            ax2.imshow(np.array(dec_img))
            plt.show()
        self.assertEqual(orig_img.size, dec_img.size)


if __name__ == '__main__':
    unittest.main()