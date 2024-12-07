# mi veiw in django

Este script utiliza `tkinter` y `pystray` para crear una aplicación que se oculta en la bandeja del sistema.

https://s3.amazonaws.com/botpress-binaries/botpress-v12_30_6-linux-x64.zip


https://github.com/botpress/v12/

```python

import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime

# Configuración de la base de datos
DB_USER = "root"
DB_PASSWORD = "password"
DB_HOST = "localhost"
DB_NAME = "mi_base_de_datos"
TABLE_NAME = "mi_tabla"
HISTORICO_TABLE = "historico_numeros"

# Configuración de archivos
EXCEL_INPUT_PATH = "archivo_origen.xlsx"
EXCEL_OUTPUT_MATCHED = "numeros_encontrados.xlsx"
EXCEL_OUTPUT_MODIFIED = "archivo_modificado.xlsx"
TXT_OUTPUT_MODIFIED = "archivo_modificado.txt"  # Archivo TXT adicional

# Columnas a procesar (opcional)
COLUMNAS_A_PROCESAR = ["columna1", "columna2"]  # Reemplaza con tus columnas


def obtener_numeros_de_bd():
    """Extrae números de la base de datos."""
    engine = create_engine(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
    query = f"SELECT numero FROM {TABLE_NAME}"  # Cambia 'numero' por tu columna específica
    df = pd.read_sql(query, engine)
    return df['numero'].tolist()


def insertar_historico_numeros(numeros_encontrados, batch_size=100):
    """Inserta los números encontrados en la base de datos PostgreSQL por lotes."""
    if not numeros_encontrados:
        print("No hay números encontrados para insertar en el histórico.")
        return

    # Configuración de la conexión a PostgreSQL
    engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Crear un DataFrame con los datos a insertar
    data = [{"numero": num, "fecha_encontrado": fecha} for num in numeros_encontrados]
    df_historico = pd.DataFrame(data)

    # Inserción en lotes usando chunksize
    try:
        df_historico.to_sql(HISTORICO_TABLE, engine, if_exists="append", index=False, chunksize=batch_size, method="multi")
        print(f"Números encontrados insertados en lotes de {batch_size} en PostgreSQL.")
    except Exception as e:
        print(f"Error al insertar en PostgreSQL: {e}")





def generar_txt_desde_excel(excel_modificado, txt_output):
    """Genera un archivo TXT a partir del Excel modificado."""
    df = pd.read_excel(excel_modificado, sheet_name=None)
    with open(txt_output, "w", encoding="utf-8") as f:
        for sheet_name, sheet_df in df.items():
            f.write(f"--- Hoja: {sheet_name} ---\n")
            sheet_df.to_string(f, index=False)  # Escribe los datos como texto
            f.write("\n\n")
    print(f"Archivo TXT generado: {txt_output}")


def procesar_excel_y_validar(archivo_excel, columnas_a_validar, numeros_bd, archivo_salida_encontrados, 
                             archivo_modificado, archivo_txt, batch_size=100):
    """
    Procesa un archivo Excel pesado, valida números en columnas específicas y genera resultados optimizados.
    """
    try:
        # Leer solo las columnas necesarias del archivo Excel
        df_excel = pd.read_excel(archivo_excel, usecols=columnas_a_validar, engine="openpyxl")

        # Optimizar búsqueda usando un set (más rápido que listas para buscar)
        numeros_bd_set = set(numeros_bd)
        numeros_encontrados = set()

        # Función para procesar cada celda
        def validar_celda(celda):
            if pd.isnull(celda):
                return celda  # Dejar nulos intactos
            valor = str(celda)
            if len(valor) == 8:  # Remover primer carácter si longitud es 8
                valor = valor[1:]
            if valor in numeros_bd_set:
                numeros_encontrados.add(valor)
                return 0  # Convertir a 0 si encontrado
            return celda

        # Aplicar la función a todas las columnas seleccionadas
        for columna in columnas_a_validar:
            df_excel[columna] = df_excel[columna].apply(validar_celda)

        # Guardar números encontrados en un archivo Excel
        df_encontrados = pd.DataFrame(list(numeros_encontrados), columns=["Numero_Encontrado"])
        df_encontrados.to_excel(archivo_salida_encontrados, index=False)
        print(f"Números encontrados guardados en {archivo_salida_encontrados}.")

        # Guardar archivo modificado
        df_excel.to_excel(archivo_modificado, index=False)
        print(f"Archivo modificado guardado en {archivo_modificado}.")

        # Generar archivo TXT
        with open(archivo_txt, "w") as f:
            for numero in numeros_encontrados:
                f.write(f"{numero}\n")
        print(f"Archivo TXT guardado en {archivo_txt}.")

        # Insertar en la base de datos por lotes
        insertar_historico_numeros(numeros_encontrados, batch_size=batch_size)

    except Exception as e:
        print(f"Error al procesar el archivo Excel: {e}")

def insertar_historico_numeros(numeros_encontrados, batch_size=100):
    """Inserta los números encontrados en PostgreSQL por lotes."""
    if not numeros_encontrados:
        print("No hay números encontrados para insertar en la base de datos.")
        return

    engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Preparar datos para insertar
    data = [{"numero": num, "fecha_encontrado": fecha} for num in numeros_encontrados]
    df_historico = pd.DataFrame(data)

    try:
        # Inserción por lotes en PostgreSQL
        df_historico.to_sql(HISTORICO_TABLE, engine, if_exists="append", index=False, chunksize=batch_size, method="multi")
        print(f"Números insertados en la base de datos en lotes de {batch_size}.")
    except Exception as e:
        print(f"Error al insertar en PostgreSQL: {e}")


# Ejemplo de llamado a la función principal
if __name__ == "__main__":
    procesar_excel_y_guardar_historico(EXCEL_INPUT_PATH, EXCEL_OUTPUT_MATCHED, EXCEL_OUTPUT_MODIFIED, TXT_OUTPUT_MODIFIED, COLUMNAS_A_PROCESAR)
