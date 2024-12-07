```python

import pandas as pd
from datetime import datetime
from sqlalchemy import create_engine
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QFileDialog, QVBoxLayout, QLabel

# Datos de configuración
DB_USER = 'usuario'
DB_PASSWORD = 'contraseña'
DB_HOST = 'localhost'
DB_NAME = 'mi_base_de_datos'
TABLE_NAME = 'tabla_numeros'
HISTORICO_TABLE = 'historico_numeros'

# Función para obtener los números de la base de datos
def obtener_numeros_de_bd():
    """Extrae números de la base de datos."""
    engine = create_engine(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
    query = f"SELECT numero FROM {TABLE_NAME}"  # Cambia 'numero' por tu columna específica
    df = pd.read_sql(query, engine)
    return df['numero'].tolist()

# Función para procesar el archivo Excel y validar los números
def procesar_excel_y_guardar(archivo_excel, columnas_a_validar, numeros_en_bd):
    """Procesa el archivo Excel, valida los números y genera los nuevos archivos."""
    # Cargar el archivo Excel
    df = pd.read_excel(archivo_excel)

    # Identificar números encontrados
    encontrados = []
    
    # Recorremos las columnas a validar
    for columna in columnas_a_validar:
        if columna in df.columns:
            for i, valor in enumerate(df[columna]):
                if str(valor).startswith('='):
                    continue  # Ignoramos fórmulas
                valor_str = str(valor).strip()
                if len(valor_str) == 8:
                    valor_str = valor_str[1:]  # Remover primer caracter si tiene 8 caracteres
                if valor_str in numeros_en_bd:
                    encontrados.append(valor_str)
                    df.at[i, columna] = 0  # Reemplazar con 0 en el archivo original

    # Guardar el archivo modificado y el archivo con los encontrados
    archivo_modificado = archivo_excel.replace('.xlsx', '_modificado.xlsx')
    archivo_encontrados = archivo_excel.replace('.xlsx', '_encontrados.xlsx')

    # Guardar los archivos
    df.to_excel(archivo_modificado, index=False)
    df_encontrados = pd.DataFrame({'numero': encontrados})
    df_encontrados.to_excel(archivo_encontrados, index=False)

    # Generar archivo de texto con los encontrados
    archivo_txt = archivo_excel.replace('.xlsx', '_encontrados.txt')
    with open(archivo_txt, 'w') as f:
        for numero in encontrados:
            f.write(f"{numero}\n")

    return encontrados, archivo_modificado, archivo_encontrados, archivo_txt

# Función para insertar los números encontrados en la base de datos en lotes
def insertar_en_base_datos(numeros_encontrados, batch_size=100):
    """Inserta los números encontrados en la base de datos en lotes."""
    if not numeros_encontrados:
        return

    # Conectar a la base de datos PostgreSQL
    engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")

    # Obtener la fecha actual en formato YYYY-MM-DD HH:MM:SS
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Crear el DataFrame con los números encontrados y la fecha
    data = [{"numero": num, "fecha_encontrado": fecha} for num in numeros_encontrados]
    df_historico = pd.DataFrame(data)

    try:
        # Insertar los datos en la base de datos en lotes
        df_historico.to_sql(HISTORICO_TABLE, engine, if_exists="append", index=False, 
                            chunksize=batch_size, method="multi")
        print("Números insertados correctamente en la base de datos.")
    except Exception as e:
        print(f"Error al insertar en PostgreSQL: {e}")

# Función para cargar el archivo Excel y procesarlo
def cargar_y_procesar():
    """Abre el archivo Excel, lo procesa y guarda los resultados."""
    archivo_excel, _ = QFileDialog.getOpenFileName(None, "Abrir archivo Excel", "", "Archivos Excel (*.xlsx)")
    if archivo_excel:
        # Obtener números de la base de datos
        numeros_en_bd = obtener_numeros_de_bd()

        # Definir las columnas a validar (puedes adaptarlo según tu caso)
        columnas_a_validar = ['Columna1', 'Columna2', 'Columna3']

        # Procesar el archivo Excel y obtener los resultados
        encontrados, archivo_modificado, archivo_encontrados, archivo_txt = procesar_excel_y_guardar(
            archivo_excel, columnas_a_validar, numeros_en_bd
        )

        # Insertar los números encontrados en la base de datos
        insertar_en_base_datos(encontrados)

        # Mostrar los archivos generados
        print(f"Archivo modificado: {archivo_modificado}")
        print(f"Archivo encontrados: {archivo_encontrados}")
        print(f"Archivo encontrados TXT: {archivo_txt}")

# Función principal para la interfaz gráfica en PyQt5
def main():
    """Interfaz gráfica en PyQt5."""
    app = QApplication([])
    window = QWidget()
    window.setWindowTitle("Procesador de Archivos Excel")

    layout = QVBoxLayout()

    label = QLabel("Selecciona un archivo Excel para procesar")
    layout.addWidget(label)

    btn = QPushButton("Abrir y Procesar")
    btn.clicked.connect(cargar_y_procesar)
    layout.addWidget(btn)

    window.setLayout(layout)
    window.show()

    app.exec_()

if __name__ == '__main__':
    main()
