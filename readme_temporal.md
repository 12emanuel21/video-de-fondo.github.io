<h3>este archivo es temporal solo para usar como puente</h3>


buscador de coincidencias 

"""
import os  <br>
import datetime <br>
import time <br>
import re <br>
from pathlib import Path <br>
import math <br>

inicio = time.time() <br>

ruta = "C:\\Users\\emanuel\\Desktop\\PROYECTOS\\PYTHON_mejor_curso\\9. DÍA 9 - PROGRAMA UN BUSCADOR DE NÚMEROS DE SERIE\\Mi_Gran_Directorio" <br>
mi_patron = r"N\D{3}-\d{5}" <br>
hoy = datetime.date.today() <br>
hros_encontrados = []  <br>
archivos_encontrados = [] <br>

def buscar_numero(archivo,patron): <br>
    
    este_archivo = open(archivo, 'r')
    texto = este_archivo.read()
    if re.search(patron, texto):
        return re.search(patron, texto)
    else:
        return ""
    
def crear_lista():    <br>
    for carpeta,subcarpeta,archivo in os.walk(ruta): <br>
        for a in archivo: <br>
            resultado = buscar_numero(Path(carpeta,a),mi_patron) <br>
            if resultado != '': <br>
                hros_encontrados.append((resultado.group())) <br>
                archivos_encontrados.append(a.title()) <br>
    
                
def mostrar_todo(): <br>
    indice = 0 <br>
    print('-'* 50) <br>
    print(f'Fecha de busqueda: {hoy.day}/{hoy.month}/{hoy.year}') <br>
    print('\n') <br>
    print('ARCHIVO\t\t\tNRO. SERIE') <br>
    print('--------\t\t\t----------') <br>
    for a in archivos_encontrados:<br>
        print(f'{a}\t{hros_encontrados[indice]}') <br>
        indice += 1 <br>
    print('\n') <br>
    print(f'Numeros encontrados: {len(hros_encontrados)}') <br>
    fin = time.time() <br>
    duracion = fin - inicio <br>
    print(f'Duracion de la busqueda: {math.ceil(duracion)} segundos') <br>
    print('-'* 50) <br>
    
crear_lista() <br>
mostrar_todo() <br>
"""




