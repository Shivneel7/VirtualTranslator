import os
from google.cloud import vision
from google.cloud import translate_v2 as translate
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] ="key.json" # should be the .json with key

translate_client = translate.Client()
vision_client = vision.ImageAnnotatorClient()

languages = {}

for language in translate_client.get_languages():
    code = language['language']
    name = language['name']
    languages[code] = name

def overlayText(bounds, image1, textOutput, widthOfAllDrawnBoxes):
    translatedText = translate_text(textOutput)[0]
    translatedTextList = translatedText.split(" ")
    draw = ImageDraw.Draw(image1)
    fontsize = 1
    font = ImageFont.truetype("arial.ttf", fontsize)
    
    while widthOfAllDrawnBoxes > font.getsize(translatedText)[0] + 200:
        fontsize += 1
        font = ImageFont.truetype("arial.ttf", fontsize)
    
    maxHeight = 0

    for bound in bounds:
        if bound[2].y - bound[0].y > maxHeight:
            maxHeight = bound[2].y - bound[0].y
    if maxHeight != 0 and font.getsize(translatedText)[1] != 0:
        while maxHeight < font.getsize(translatedText)[1]:
            fontsize = fontsize - 2
            font = ImageFont.truetype("arial.ttf", fontsize)

    for bound in bounds:
        draw.polygon(
            [
                bound[0].x,
                bound[0].y,
                bound[1].x,
                bound[1].y,
                bound[2].x,
                bound[2].y,
                bound[3].x,
                bound[3].y
            ],
            "black",
            "black"
        )
        count = -1
        tempString = ""
        while (font.getsize(tempString)[0] < (bound[1].x - bound[0].x)):
            count += 1
            if count >= len(translatedTextList):
                break
            tempString = tempString + " " + translatedTextList[count]
        if font.getsize(tempString)[0] > (bound[1].x - bound[0].x):
            tempString = tempString.replace((" " + translatedTextList[count]), "")
            count = count - 1
        del translatedTextList[0:count + 1]
        draw.text([
            bound[0].x,
            bound[0].y
        ], tempString, font = font)

    return image1


def getDrawnImage(path):
    # source for accessing vision API's break type enums: 
    # https://googleapis.dev/python/vision/latest/vision_v1/types.html?highlight=break#google.cloud.vision_v1.types.TextAnnotation.DetectedBreak.BreakType
    breaks = vision.TextAnnotation.DetectedBreak.BreakType
    content = path

    image = vision.Image(content=content)

    response = vision_client.document_text_detection(image=image)
    if not response:
        return (None, None)

    # source for parsing the text line by line: 
    # https://stackoverflow.com/questions/51972479/get-lines-and-paragraphs-not-symbols-from-google-vision-api-ocr-on-pdf
    image1 = Image.open(BytesIO(base64.b64decode(path)))
    for block in response.full_text_annotation.pages[0].blocks:
        for paragraph in block.paragraphs:
            bounds = []
            lineLeftBound = None
            wordOverlayText = ""
            for word in paragraph.words:
                for symbol in word.symbols:
                    wordOverlayText = wordOverlayText + symbol.text[0]
                    if len(wordOverlayText) == 1 or wordOverlayText[len(wordOverlayText) - 2] == "\n":
                        lineLeftBound = [symbol.bounding_box.vertices[0], symbol.bounding_box.vertices[3]]
                    if symbol.property.detected_break.type == breaks.SPACE:
                        wordOverlayText = wordOverlayText + " "
                    if symbol.property.detected_break.type == breaks.LINE_BREAK:
                        wordOverlayText = wordOverlayText + "\n"
                        lineBoundingBox = (
                                            lineLeftBound[0], 
                                            symbol.bounding_box.vertices[1], 
                                            symbol.bounding_box.vertices[2], 
                                            lineLeftBound[1]
                                        )
                        bounds.append(lineBoundingBox)
                    if symbol.property.detected_break.type == breaks.EOL_SURE_SPACE:
                        wordOverlayText = wordOverlayText + "\n"
                        lineBoundingBox = (
                                            lineLeftBound[0], 
                                            symbol.bounding_box.vertices[1], 
                                            symbol.bounding_box.vertices[2], 
                                            lineLeftBound[1]
                                        )
                        bounds.append(lineBoundingBox)
            widthOfAllDrawnBoxes = 0
            for bound in bounds:
                widthOfAllDrawnBoxes += (bound[1].x - bound[0].x)
            overlayText(bounds, image1, wordOverlayText, widthOfAllDrawnBoxes)
    
    buffered = BytesIO()
    image1.save(buffered, format = "png")
    encoded_image = str(base64.b64encode(buffered.getvalue()))[2:-1]
    text = response.text_annotations[0]
    
    return (text.description, encoded_image)

def translate_text(text):
    result = translate_client.translate(text)
    
    return (result['translatedText'], languages[result['detectedSourceLanguage']])