<h3>este archivo es temporal solo para usar como puente</h3>


buscador de coincidencias 

"""
import os
import datetime
import time
import re
from pathlib import Path
import math

inicio = time.time()

ruta = "C:\\Users\\emanuel\\Desktop\\PROYECTOS\\PYTHON_mejor_curso\\9. DÍA 9 - PROGRAMA UN BUSCADOR DE NÚMEROS DE SERIE\\Mi_Gran_Directorio"
mi_patron = r"N\D{3}-\d{5}"
hoy = datetime.date.today()
hros_encontrados = [] 
archivos_encontrados = []

def buscar_numero(archivo,patron):
    
    este_archivo = open(archivo, 'r')
    texto = este_archivo.read()
    if re.search(patron, texto):
        return re.search(patron, texto)
    else:
        return ""
    
def crear_lista():   
    for carpeta,subcarpeta,archivo in os.walk(ruta):
        for a in archivo:
            resultado = buscar_numero(Path(carpeta,a),mi_patron)
            if resultado != '':
                hros_encontrados.append((resultado.group()))
                archivos_encontrados.append(a.title())
    
                
def mostrar_todo():
    indice = 0
    print('-'* 50)
    print(f'Fecha de busqueda: {hoy.day}/{hoy.month}/{hoy.year}')
    print('\n')
    print('ARCHIVO\t\t\tNRO. SERIE')
    print('--------\t\t\t----------')
    for a in archivos_encontrados:
        print(f'{a}\t{hros_encontrados[indice]}')
        indice += 1
    print('\n')
    print(f'Numeros encontrados: {len(hros_encontrados)}')
    fin = time.time()
    duracion = fin - inicio
    print(f'Duracion de la busqueda: {math.ceil(duracion)} segundos')
    print('-'* 50)
    
crear_lista()
mostrar_todo()
"""




