import numpy as np
from PIL import Image
import torch
import torchvision
from torchvision.io.image import read_image
from torchvision.models.detection import fasterrcnn_mobilenet_v3_large_fpn, FasterRCNN_MobileNet_V3_Large_FPN_Weights
from torchvision.utils import draw_bounding_boxes
from torchvision.transforms.functional import to_pil_image, pil_to_tensor

class ObjectDetector:
    def __init__(self, detect_thresh: float) -> None:
        # Step 1: Initialize model with the best available weights
        self.weights = FasterRCNN_MobileNet_V3_Large_FPN_Weights.DEFAULT
        self.model = fasterrcnn_mobilenet_v3_large_fpn(weights=self.weights, box_score_thresh=detect_thresh)
        self.model.eval()

        # Step 2: Initialize the inference transforms
        self.preprocess = self.weights.transforms()
    
    def get_model_name(self)->str:
        return "FasterRCNN_MobileNet_V3_Large_FPN"

    def predict(self, img: Image) -> Image:
        # Step 3: Apply inference preprocessing transforms
        img_tensor = pil_to_tensor(img)
        batch = [self.preprocess(img_tensor)]

        # Step 4: Use the model and visualize the prediction
        prediction = self.model(batch)[0]
        labels = [self.weights.meta["categories"][i] for i in prediction["labels"]]
        box = draw_bounding_boxes(img_tensor, boxes=prediction["boxes"], labels=labels, colors="red", width=4, font_size=30)
        im = to_pil_image(box.detach())
        return im, prediction, labels