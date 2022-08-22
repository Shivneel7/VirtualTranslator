from flask import Flask, request
from flask_cors import CORS
from translate import *

api = Flask(__name__)
CORS(api)

@api.route('/translate', methods = ["POST"])
def translate():
    data = request.get_json()
    base64 = data["base64"]
    
    text_from_pic, overlayedText = getDrawnImage(base64)
    if not text_from_pic:
        return "No text detected. Please try retaking the picture.", 500
    translation = translate_text(text_from_pic)

    return {
        "detectedTexts": text_from_pic,
        "translatedTexts": translation,
        "imageWithBoxes": overlayedText
    }

if __name__ == "__main__":
    api.run(host="10.0.0.0", port=5000)

