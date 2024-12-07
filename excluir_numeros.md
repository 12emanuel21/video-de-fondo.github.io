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


from PyQt5.QtWidgets import QFileDialog, QMessageBox
import openpyxl


# Función para validar los números y generar archivos Excel y TXT
def procesar_excel_y_guardar(archivo_excel, lista_numeros_db, columnas_validar):
    try:
        # Leer el archivo Excel, asegurando que las fechas se conviertan correctamente
        columnas_fecha = ['FechaColumna1', 'FechaColumna2', 'FechaColumna3']  # Nombres de las columnas con fechas
        df = pd.read_excel(archivo_excel, parse_dates=columnas_fecha)
        
        # Formatear las fechas en formato corto (DD/MM/YYYY)
        for col in columnas_fecha:
            if col in df.columns:
                df[col] = df[col].dt.strftime('%d/%m/%Y')
        
        # Crear una copia del DataFrame para los datos modificados
        df_modificado = df.copy()

        # Verificar los números encontrados y crear el archivo con los datos encontrados
        encontrados = []  # Lista para almacenar los números encontrados
        for index, row in df.iterrows():
            for col in columnas_validar:
                if str(row[col]) in lista_numeros_db:
                    encontrados.append(str(row[col]))  # Guardamos los números encontrados
                    # Convertir el número encontrado a 0
                    df_modificado.at[index, col] = 0

        # Generar los archivos Excel y TXT
        # Guardar el archivo con los números encontrados
        archivo_encontrados = archivo_excel.replace('.xlsx', '_encontrados.xlsx')
        df_encontrados = pd.DataFrame(encontrados, columns=['Números Encontrados'])
        df_encontrados.to_excel(archivo_encontrados, index=False)

        # Guardar el archivo modificado con los números reemplazados por 0
        archivo_modificado = archivo_excel.replace('.xlsx', '_modificado.xlsx')
        df_modificado.to_excel(archivo_modificado, index=False)

        # Generar archivo TXT con los números encontrados
        archivo_txt = archivo_excel.replace('.xlsx', '_modificado.txt')
        with open(archivo_txt, 'w') as f:
            for numero in encontrados:
                f.write(numero + '\n')

        # Mostrar mensaje de éxito
        QMessageBox.information(None, "Proceso completado", "Archivos generados correctamente.")

        # Insertar los números encontrados en la base de datos (si es necesario)
        if encontrados:
            insertar_en_base_datos(encontrados)

    except Exception as e:
        QMessageBox.critical(None, "Error", f"Ha ocurrido un error: {str(e)}")


# Función para insertar los números encontrados en la base de datos (PostgreSQL)
from datetime import datetime
import pandas as pd
from sqlalchemy import create_engine

def insertar_en_base_datos(numeros_encontrados, batch_size=100):
    """
    Inserta los números encontrados en una tabla de PostgreSQL en lotes.
    """
    if not numeros_encontrados:
        return

    # Conectar a la base de datos PostgreSQL
    engine = create_engine('postgresql://usuario:contraseña@localhost:5432/mi_base_de_datos')

    # Obtener la fecha actual en formato YYYY-MM-DD HH:MM:SS
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Crear el DataFrame con los números encontrados y la fecha
    data = [{"numero": num, "fecha_encontrado": fecha} for num in numeros_encontrados]
    df_historico = pd.DataFrame(data)

    try:
        # Insertar los datos en la base de datos en lotes
        df_historico.to_sql('historico_numeros', engine, if_exists="append", index=False, 
                            chunksize=batch_size, method="multi")
        print("Números insertados correctamente en la base de datos.")
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
        insertar_en_base_datos(encontrados, batch_size=200)

        # Mostrar mensaje de éxito o error
        QMessageBox.information(self, "Proceso Finalizado", f"{mensaje}\nArchivos guardados en: {self.carpeta_destino}")

    except Exception as e:
        QMessageBox.critical(self, "Error", f"Ocurrió un error: {str(e)}")


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ventana = ExcelValidatorApp()
    ventana.show()
    sys.exit(app.exec_())
