<h3>este archivo es temporal solo para usar como puente</h3>


buscador de coincidencias 

"""
import pandas as pd <br>
from openpyxl import Workbook <br>
from sqlalchemy import create_engine <br>
from mysql import connector <br>

def cargar_datos_excel(ruta_archivo): <br>
    df = pd.read_excel(ruta_archivo) <br>
    return df <br>


def datos_manual(): <br>
    data = { <br>
        'Columna1': ['Dato1', 'Dato2', 'Dato3'], <br>
        'Columna2': ['Dato4', 'Dato5', 'Dato6'] <br>
    } <br>
    df = pd.DataFrame(data) <br>
    return df <br>

def cargar_datos_bd(usuario, contraseña, host, base_datos): <br>
    conexion = create_engine(f'mysql+mysqlconnector://{usuario}:{contraseña}@{host}/{base_datos}') <br>
    consulta = "SELECT * FROM user" <br>
    df = pd.read_sql(consulta, conexion) <br>
    return df <br>



def combinar_datos(*dfs): <br>
    df_combinado = pd.concat(dfs, ignore_index=True) <br>
    return df_combinado <br>


def guardar_excel(df, ruta_salida): <br>
    with pd.ExcelWriter(ruta_salida, engine='openpyxl') as writer: <br>
        df.to_excel(writer, index=False) <br>
        
        
def crear_informe(df, ruta_salida): <br>
    with pd.ExcelWriter(ruta_salida, engine='openpyxl') as writer: <br>
        df.to_excel(writer, index=False, sheet_name='Informe') <br>
        
        workbook = writer.book
        worksheet = writer.sheets['Informe']
        
        # Añadir formateo si es necesario
        for col in worksheet.columns:
            max_length = 0
            column = col[0].column_letter # Get the column name
            for cell in col:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(cell.value)
                except:
                    pass
            adjusted_width = (max_length + 2)
            worksheet.column_dimensions[column].width = adjusted_width


ruta_excel =  "C:\\Users\\emanuel\\Desktop\\programa de fabian\\Shop_Manillas.xlsx" <br>
  
def main(): <br>
    # Cargar datos de diferentes fuentes <br>
    df_excel = cargar_datos_excel(ruta_excel) <br>
    df_manual = datos_manual() <br>
    df_bd = cargar_datos_bd('root', '102030', 'localhost:3308', 'testuser') <br>
    
    # Combinar datos
    df_combinado = combinar_datos(df_excel, df_manual, df_bd)
    
    # Crear y guardar el informe en un archivo Excel
    ruta_salida = "C:\\Users\\emanuel\\Desktop\\programa de fabian"
    crear_informe(df_combinado, ruta_salida)
    
    print(f'Informe guardado en {ruta_salida}')

if __name__ == "__main__": <br>
    main() <br>
     
        
"""




