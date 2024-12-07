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
    """Inserta los números encontrados en la base de datos por lotes."""
    if not numeros_encontrados:
        print("No hay números encontrados para insertar en el histórico.")
        return

    engine = create_engine(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Crear un DataFrame para insertar
    data = [{"numero": num, "fecha_encontrado": fecha} for num in numeros_encontrados]
    df_historico = pd.DataFrame(data)

    # Inserción por lotes usando chunksize
    try:
        df_historico.to_sql(HISTORICO_TABLE, engine, if_exists="append", index=False, chunksize=batch_size)
        print(f"Números encontrados insertados en el histórico en lotes de {batch_size}.")
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")




def generar_txt_desde_excel(excel_modificado, txt_output):
    """Genera un archivo TXT a partir del Excel modificado."""
    df = pd.read_excel(excel_modificado, sheet_name=None)
    with open(txt_output, "w", encoding="utf-8") as f:
        for sheet_name, sheet_df in df.items():
            f.write(f"--- Hoja: {sheet_name} ---\n")
            sheet_df.to_string(f, index=False)  # Escribe los datos como texto
            f.write("\n\n")
    print(f"Archivo TXT generado: {txt_output}")


def procesar_excel_y_guardar_historico(input_excel, output_matched, output_modified, txt_output, columnas=None):
    """Función principal: procesa el Excel, encuentra números y guarda histórico."""
    # 1. Obtener números de la base de datos
    numeros_bd = obtener_numeros_de_bd()
    numeros_bd = [str(numero) for numero in numeros_bd]  # Asegurar que sean strings

    # 2. Leer el archivo Excel
    df = pd.read_excel(input_excel, sheet_name=None)  # Lee todas las hojas del Excel
    numeros_encontrados = set()

    # Función interna para validar y modificar los números
    def procesar_numero(valor):
        if pd.isna(valor) or not isinstance(valor, (int, str)):
            return valor
        valor_str = str(valor)
        if len(valor_str) == 8:  # Remover primer carácter si tiene longitud 8
            valor_str = valor_str[1:]
        if valor_str in numeros_bd:
            numeros_encontrados.add(valor_str)
            return 0  # Reemplaza con 0 si hay coincidencia
        return valor

    # 3. Procesar cada hoja del Excel
    hojas_modificadas = {}
    for sheet_name, sheet_df in df.items():
        if columnas:  # Solo procesar columnas específicas
            for col in columnas:
                if col in sheet_df.columns:  # Validar si la columna existe
                    sheet_df[col] = sheet_df[col].apply(procesar_numero)
        else:  # Procesar todas las columnas
            sheet_df = sheet_df.applymap(procesar_numero)

        hojas_modificadas[sheet_name] = sheet_df

    # 4. Guardar los números encontrados en un Excel
    df_numeros_encontrados = pd.DataFrame(list(numeros_encontrados), columns=["Numeros Encontrados"])
    df_numeros_encontrados.to_excel(output_matched, index=False)

    # 5. Guardar el Excel modificado
    with pd.ExcelWriter(output_modified, engine='openpyxl') as writer:
        for sheet_name, mod_df in hojas_modificadas.items():
            mod_df.to_excel(writer, sheet_name=sheet_name, index=False)

    # 6. Insertar los números encontrados en el histórico
    insertar_historico_numeros(numeros_encontrados)

    # 7. Generar un archivo TXT del Excel modificado
    generar_txt_desde_excel(output_modified, txt_output)

    print("Proceso completado:")
    print(f"- Números encontrados guardados en: {output_matched}")
    print(f"- Archivo modificado guardado en: {output_modified}")
    print(f"- Archivo TXT generado en: {txt_output}")
    print("- Números insertados en el histórico de la base de datos.")


# Ejemplo de llamado a la función principal
if __name__ == "__main__":
    procesar_excel_y_guardar_historico(EXCEL_INPUT_PATH, EXCEL_OUTPUT_MATCHED, EXCEL_OUTPUT_MODIFIED, TXT_OUTPUT_MODIFIED, COLUMNAS_A_PROCESAR)
