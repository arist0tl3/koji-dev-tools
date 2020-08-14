import sys
from PIL import Image, ImageChops

path = sys.argv[1]

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)

im = Image.open(path + "/example.jpg")
im = trim(im)
im.save(path + "/output.png")
