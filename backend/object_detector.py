import numpy as np
from matplotlib import font_manager
from PIL import Image, ImageFont
from torchvision.models.detection import fasterrcnn_mobilenet_v3_large_fpn, FasterRCNN_MobileNet_V3_Large_FPN_Weights
from torchvision.utils import draw_bounding_boxes
from torchvision.transforms.functional import to_pil_image, pil_to_tensor
import os

class ObjectDetector:
    def __init__(self, detect_thresh: float) -> None:
        # Step 1: Initialize model with the best available weights
        self.weights = FasterRCNN_MobileNet_V3_Large_FPN_Weights.DEFAULT
        self.model = fasterrcnn_mobilenet_v3_large_fpn(weights=self.weights, box_score_thresh=detect_thresh)
        self.model.eval()

        # Step 2: Initialize the inference transforms
        self.preprocess = self.weights.transforms()

        # Misc
        font = font_manager.FontProperties(family='sans-serif', weight='bold')
        self.font_path = font_manager.findfont(font)
    
    def get_model_name(self)->str:
        return "FasterRCNN_MobileNet_V3_Large_FPN"

    def predict(self, img: Image, bb_box_font_size=None, bb_box_border_width=None) -> Image:
        # Step 3: Apply inference preprocessing transforms
        img_tensor = pil_to_tensor(img)
        batch = [self.preprocess(img_tensor)]

        # Step 4: Use the model and visualize the prediction
        prediction = self.model(batch)[0]
        labels = [self.weights.meta["categories"][i] for i in prediction["labels"]]
        box = draw_bounding_boxes(img_tensor, boxes=prediction["boxes"], labels=labels, width=bb_box_border_width, colors="red", font=self.font_path, font_size=bb_box_font_size)
        im = to_pil_image(box.detach())
        return im, prediction, labels