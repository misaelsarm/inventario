import pyqrcode
import pandas as pd


def createQRCode():
    df = pd.read_csv("data.csv", engine='python')
    for index, values in df.iterrows():
        nombre = values["Nombre"]
        descripcion = values["Descripcion"]
        marca = values["Marca"]
        precio = values["Precio"]
        data = "{{\"nombre\":\"{}\", \"descripcion\":\"{}\", \"marca\":\"{}\", \"precio\":\"{}\"}}".format(
            nombre, descripcion, marca, precio)
        print(data)
        image = pyqrcode.create(data)
        image.svg(f"{nombre}_{marca}_{precio}.svg", scale="5")


createQRCode()
