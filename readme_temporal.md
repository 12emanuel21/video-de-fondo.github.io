<h3>este archivo es temporal solo para usar como puente</h3>


buscador de coincidencias 

"""
import pandas as pd
from openpyxl import Workbook
from sqlalchemy import create_engine
from mysql import connector

def cargar_datos_excel(ruta_archivo):
    df = pd.read_excel(ruta_archivo)
    return df


def datos_manual():
    data = {
        'Columna1': ['Dato1', 'Dato2', 'Dato3'],
        'Columna2': ['Dato4', 'Dato5', 'Dato6']
    }
    df = pd.DataFrame(data)
    return df

def cargar_datos_bd(usuario, contraseña, host, base_datos):
    conexion = create_engine(f'mysql+mysqlconnector://{usuario}:{contraseña}@{host}/{base_datos}')
    consulta = "SELECT * FROM user"
    df = pd.read_sql(consulta, conexion)
    return df



def combinar_datos(*dfs):
    df_combinado = pd.concat(dfs, ignore_index=True)
    return df_combinado


def guardar_excel(df, ruta_salida):
    with pd.ExcelWriter(ruta_salida, engine='openpyxl') as writer:
        df.to_excel(writer, index=False)
        
        
def crear_informe(df, ruta_salida):
    with pd.ExcelWriter(ruta_salida, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Informe')
        
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


ruta_excel =  "C:\\Users\\emanuel\\Desktop\\programa de fabian\\Shop_Manillas.xlsx"
  
def main():
    # Cargar datos de diferentes fuentes
    df_excel = cargar_datos_excel(ruta_excel)
    df_manual = datos_manual()
    df_bd = cargar_datos_bd('root', '102030', 'localhost:3308', 'testuser')
    
    # Combinar datos
    df_combinado = combinar_datos(df_excel, df_manual, df_bd)
    
    # Crear y guardar el informe en un archivo Excel
    ruta_salida = "C:\\Users\\emanuel\\Desktop\\programa de fabian"
    crear_informe(df_combinado, ruta_salida)
    
    print(f'Informe guardado en {ruta_salida}')

if __name__ == "__main__":
    main()
     
        
"""




