
<p>

from sqlalchemy import create_engine, Table, MetaData, select <br>
 <br>
# Configuración de la conexión a la base de datos <br>
engine = create_engine('mysql+pymysql://usuario:contraseña@localhost/nombre_base_datos') <br>
metadata = MetaData(bind=engine) <br>
 <br>
# Tablas <br>
usuarios = Table('usuarios', metadata, autoload=True) <br>
mensajes_generales = Table('mensajes_generales', metadata, autoload=True) <br>
 <br>
def obtener_usuario_autenticado(usuario_windows): <br>
    # Consulta para ver si el usuario está autenticado <br>
    with engine.connect() as conn: <br>
        query = select([usuarios.c.mensaje_personalizado]).where(usuarios.c.nombre_usuario == usuario_windows) <br>
        resultado = conn.execute(query).fetchone() <br>
        return resultado[0] if resultado else None <br>
 <br>
def obtener_mensaje_general(): <br>
    # Consulta para obtener el mensaje general <br>
    with engine.connect() as conn: <br>
        query = select([mensajes_generales.c.mensaje_general]) <br>
        resultado = conn.execute(query).fetchone() <br>
        return resultado[0] if resultado else "Mensaje general no disponible" <br>
 <br>
# Obtener el nombre del usuario de Windows <br>
usuario_windows = "nombre_del_usuario"  # Aquí deberías obtener el usuario real del sistema <br>
 <br>
# Comprobación <br>
mensaje_personalizado = obtener_usuario_autenticado(usuario_windows) <br>
 <br>
if mensaje_personalizado: <br>
    print(f"Mensaje para {usuario_windows}: {mensaje_personalizado}") <br>
else: <br>
    mensaje_general = obtener_mensaje_general() <br>
    print(f"Mensaje general: {mensaje_general}") <br>
 <br>



</p>




