import pyqrcode
import pandas as pd

def createQRCode():
    df = pd.read_csv("data.csv")
    for index, values in df.iterrows():
        brand = values["Brand"]
        name = values["Name"]
        category = values["Category"]
        barcode = values["Barcode"]
        data = "{{\"name\":\"{}\", \"barcode\":\"{}\", \"category\":\"{}\", \"brand\":\"{}\"}}".format(name, barcode,category,brand)
        print(data)
        image = pyqrcode.create(data)
        image.svg(f"{name}_{barcode}.svg", scale="5")
createQRCode()
