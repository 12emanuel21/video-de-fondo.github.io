
"""

import pandas as pd


datos_Lista = [
    {'Nombre': 'Jetta Variant', 'Motor': 'Motor 4.0 Turbo', 'Año': 2003, 'Kilometraje': 44410.0, 'Cero_km': False, 'Valor': 88078.64},
    {'Nombre': 'Passat', 'Motor': 'Motor Diesel', 'Año': 1991, 'Kilometraje': 5712.0, 'Cero_km': False, 'Valor': 106161.94},
    {'Nombre': 'Crossfox', 'Motor': 'Motor Diesel V8', 'Año': 1990, 'Kilometraje': 37123.0, 'Cero_km': False, 'Valor': 72832.16}
]

dataset = pd.DataFrame(datos_Lista)

print(dataset)

print("")

datos_diccionario = {
    'Nombre': ['Jetta Variant', 'Passat', 'Crossfox'],
    'Motor': ['Motor 4.0 Turbo', 'Motor Diesel', 'Motor Diesel V8'],
    'Año': [2003, 1991, 1990],
    'Kilometraje': [44410.0, 5712.0, 37123.0],
    'Cero_km': [False, False, False],
    'Valor': [88078.64, 106161.94, 72832.16]
}

dataset2 = pd.DataFrame(datos_diccionario)
print(dataset)

ruta = 'C:\\Users\\emanuel\\Desktop\\PROYECTOS\\one-oracle-+-alura latam\\python\clase 2\\Pandas\\data\\db.csv'

# dataset3 = pd.read_csv('../Pandas/data/db.csv', sep=";",index_col=0)
dataset3 = pd.read_csv(ruta, sep=";",index_col=0)
print(dataset3.head(10))
print(dataset3.loc[:,["Motor","Valor"]]) 



"""




