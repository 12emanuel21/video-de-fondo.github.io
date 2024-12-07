```python

import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QFileDialog, QLabel, QMessageBox
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from datetime import datetime

# Configuración de conexión a PostgreSQL
DB_USER = "tu_usuario"
DB_PASSWORD = "tu_password"
DB_HOST = "localhost"
DB_NAME = "nombre_base_datos"
HISTORICO_TABLE = "historico_numeros"

def procesar_excel_y_validar(archivo_excel, columnas_a_validar, numeros_bd, archivo_salida_encontrados, 
                             archivo_modificado, archivo_txt, batch_size=100):
    """
    Procesa un archivo Excel pesado, valida números en columnas específicas y genera resultados optimizados.
    """
    try:
        # Leer solo las columnas necesarias del archivo Excel
        df_excel = pd.read_excel(archivo_excel, usecols=columnas_a_validar, engine="openpyxl")

        # Optimizar búsqueda usando un set (más rápido que listas)
        numeros_bd_set = set(numeros_bd)
        numeros_encontrados = set()

        # Función para validar cada celda
        def validar_celda(celda):
            if pd.isnull(celda):
                return celda  # Dejar nulos intactos
            valor = str(celda)
            if len(valor) == 8:  # Remover primer carácter si longitud es 8
                valor = valor[1:]
            if valor in numeros_bd_set:
                numeros_encontrados.add(valor)
                return 0  # Convertir a 0 si se encuentra el número
            return celda

        # Aplicar la validación a todas las columnas seleccionadas
        for columna in columnas_a_validar:
            df_excel[columna] = df_excel[columna].apply(validar_celda)

        # Guardar los números encontrados en un archivo Excel
        df_encontrados = pd.DataFrame(list(numeros_encontrados), columns=["Numero_Encontrado"])
        df_encontrados.to_excel(archivo_salida_encontrados, index=False)

        # Guardar el archivo Excel modificado
        df_excel.to_excel(archivo_modificado, index=False)

        # Generar archivo TXT con los números encontrados
        with open(archivo_txt, "w") as f:
            for numero in numeros_encontrados:
                f.write(f"{numero}\n")

        # Insertar los números encontrados en la base de datos
        insertar_historico_numeros(numeros_encontrados, batch_size=batch_size)
        return "Proceso completado con éxito."

    except Exception as e:
        return f"Error: {e}"

def insertar_historico_numeros(numeros_encontrados, batch_size=100):
    """
    Inserta los números encontrados en una tabla de PostgreSQL en lotes.
    """
    if not numeros_encontrados:
        return

    engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    data = [{"numero": num, "fecha_encontrado": fecha} for num in numeros_encontrados]
    df_historico = pd.DataFrame(data)

    try:
        df_historico.to_sql(HISTORICO_TABLE, engine, if_exists="append", index=False, chunksize=batch_size, method="multi")
    except Exception as e:
        print(f"Error al insertar en PostgreSQL: {e}")

# ---------------------- INTERFAZ GRÁFICA PYQT5 ----------------------

class ExcelValidatorApp(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('Validador de Números en Excel')
        self.setGeometry(300, 200, 400, 200)

        layout = QVBoxLayout()

        # Botón para seleccionar archivo
        self.btnSeleccionar = QPushButton('Seleccionar Archivo Excel', self)
        self.btnSeleccionar.clicked.connect(self.seleccionar_archivo)
        layout.addWidget(self.btnSeleccionar)

        # Etiqueta para mostrar mensajes
        self.lblMensaje = QLabel('Por favor, selecciona un archivo Excel.', self)
        layout.addWidget(self.lblMensaje)

        # Botón para procesar el archivo
        self.btnProcesar = QPushButton('Procesar Archivo', self)
        self.btnProcesar.clicked.connect(self.procesar_archivo)
        layout.addWidget(self.btnProcesar)

        self.setLayout(layout)

    def seleccionar_archivo(self):
    options = QFileDialog.Options()
    filePath, _ = QFileDialog.getOpenFileName(self, "Seleccionar Archivo Excel", "", "Excel Files (*.xlsx)", options=options)
    if filePath:
        self.archivo_excel = filePath
        self.carpeta_destino = os.path.dirname(filePath)  # Obtener la ruta de la carpeta del archivo
        self.lblMensaje.setText(f"Archivo seleccionado: {filePath}")
    else:
        self.lblMensaje.setText("No se seleccionó ningún archivo.")

def procesar_archivo(self):
    try:
        columnas_a_validar = ["columna1", "columna2"]  # Ajusta las columnas según tu necesidad
        numeros_bd = ["1234567", "7654321", "2345678"]  # Simula números desde la base de datos

        # Archivos de salida generados en la misma carpeta que el archivo original
        archivo_encontrados = os.path.join(self.carpeta_destino, "numeros_encontrados.xlsx")
        archivo_modificado = os.path.join(self.carpeta_destino, "archivo_modificado.xlsx")
        archivo_txt = os.path.join(self.carpeta_destino, "numeros_encontrados.txt")

        # Procesar el archivo Excel
        mensaje = procesar_excel_y_validar(self.archivo_excel, columnas_a_validar, numeros_bd,
                                           archivo_encontrados, archivo_modificado, archivo_txt)

        # Mostrar mensaje de éxito o error
        QMessageBox.information(self, "Proceso Finalizado", f"{mensaje}\nArchivos guardados en: {self.carpeta_destino}")

    except Exception as e:
        QMessageBox.critical(self, "Error", f"Ocurrió un error: {str(e)}")


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ventana = ExcelValidatorApp()
    ventana.show()
    sys.exit(app.exec_())
