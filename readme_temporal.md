
<p>
<h1> ocultar de la barra de tareas</h1>
import tkinter as tk
import pystray
from pystray import MenuItem, Icon
from PIL import Image, ImageDraw

def create_image(width, height):
    # Crea una imagen para el icono de la bandeja del sistema
    image = Image.new('RGB', (width, height), (255, 255, 255))
    dc = ImageDraw.Draw(image)
    dc.ellipse((0, 0, width, height), fill=(0, 0, 0))
    return image

def on_quit(icon, item):
    icon.stop()  # Detiene el icono de la bandeja
    root.quit()  # Cierra la aplicación Tkinter

def show_window(icon, item):
    root.deiconify()  # Muestra la ventana principal

# Crea la ventana principal
root = tk.Tk()
root.title("Mi Aplicación")
root.geometry("300x200")

# Configura la ventana para que no aparezca en la barra de tareas
root.overrideredirect(True)

# Crea el icono de la bandeja del sistema
icon = Icon("test_icon", create_image(64, 64), "Título de la bandeja", menu=pystray.Menu(
    MenuItem("Mostrar", show_window),
    MenuItem("Salir", on_quit)
))

# Inicia el icono de la bandeja en un hilo separado
def run_icon():
    icon.run()

import threading
threading.Thread(target=run_icon, daemon=True).start()

# Muestra la ventana principal
root.deiconify()

# Mantén la aplicación Tkinter en ejecución
root.mainloop()


</p>

<p>
<h1>programa con bordes</h1>

import tkinter as tk
from tkinter import Canvas
import ctypes
from PIL import Image, ImageTk, ImageDraw, ImageFont

# Configuración de la ventana principal
root = tk.Tk()
root.geometry("400x45+700+855")
root.overrideredirect(True)  # Remueve la barra superior de la ventana
root.config(bg='white')  # Fondo blanco como base

# Hace que el fondo de la ventana principal sea transparente
root.wm_attributes("-transparentcolor", "white")

# Configuración para la transparencia en Windows
if root.tk.call('tk', 'windowingsystem') == 'win32':
    hwnd = ctypes.windll.user32.GetParent(root.winfo_id())
    style = ctypes.windll.user32.GetWindowLongW(hwnd, -20)
    ctypes.windll.user32.SetWindowLongW(hwnd, -20, style | 0x00080000)
    ctypes.windll.user32.SetLayeredWindowAttributes(hwnd, 0x00ffffff, 255, 0x00000001)

# Tamaño de la ventana y el radio de los bordes
width, height = 400, 45
corner_radius = 20

# Crear un canvas para dibujar el borde redondeado
canvas = Canvas(root, width=width, height=height, bg='white', highlightthickness=0)
canvas.pack(fill="both", expand=True)

# Dibujar un rectángulo con bordes redondeados en el canvas
def create_rounded_rectangle(x1, y1, x2, y2, radius=25, **kwargs):
    points = [
        x1 + radius, y1,
        x1 + radius, y1,
        x2 - radius, y1,
        x2 - radius, y1,
        x2, y1,
        x2, y1 + radius,
        x2, y1 + radius,
        x2, y2 - radius,
        x2, y2 - radius,
        x2, y2,
        x2 - radius, y2,
        x2 - radius, y2,
        x1 + radius, y2,
        x1 + radius, y2,
        x1, y2,
        x1, y2 - radius,
        x1, y2 - radius,
        x1, y1 + radius,
        x1, y1 + radius,
        x1, y1
    ]
    return canvas.create_polygon(points, **kwargs, smooth=True)

# Color del borde y del fondo
create_rounded_rectangle(5, 5, width-5, height-5, radius=corner_radius, fill="#3498db", outline="#3498db")

# Para mover la ventana al hacer clic y arrastrar
def start_move(event):
    root.x = event.x
    root.y = event.y

def stop_move(event):
    root.x = None
    root.y = None

def on_motion(event):
    deltax = event.x - root.x
    deltay = event.y - root.y
    x = root.winfo_x() + deltax
    y = root.winfo_y() + deltay
    root.geometry(f"+{x}+{y}")

# Enlazar los eventos para mover la ventana
canvas.bind("<Button-1>", start_move)
canvas.bind("<ButtonRelease-1>", stop_move)
canvas.bind("<B1-Motion>", on_motion)

# Botón para cerrar la ventana


# Lista con el contenido a mostrar
content_list = ["Establece el margen vertical en pixeles o en un valor porcentual.", "Establece el valor de movimiento para cada intervalo en pixeles. Por defecto su valor es ", "Establece el intervalo entre cada desplazamiento, en milisegundos. El valor por defecto es 85. Nota: Cualquier valor inferior a 60", "Este evento se lanza cuando la marquesina comienza su desplazamiento."]
current_index = 0
offset = 300  # Offset inicial para centrar el texto en la ventana

# Crear un label de imagen para el texto suavizado
text_image_label = tk.Label(root, bg="#3498db")
text_image_label.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

# Cargar una fuente de texto usando PIL
font = ImageFont.truetype("arial.ttf", 24)  # Cambia "arial.ttf" a la fuente que prefieras

# Función para actualizar el texto en el label usando PIL
def update_text_image():
    global current_index, offset
    # Crear una imagen con fondo del mismo color del label
    image = Image.new('RGB', (300, 50), (52, 152, 219))  # color de fondo igual que el label
    draw = ImageDraw.Draw(image)
    
    # Calcular el tamaño del texto y centrarlo
    text = content_list[current_index]
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    text_x = offset
    text_y = (50 - text_height) // 2
    
    # Cambiar el color del texto a naranja
    draw.text((text_x, text_y), text, font=font, fill=(255, 165, 0))  # Texto en color naranja
    
    # Convertir a una imagen de tkinter
    photo_image = ImageTk.PhotoImage(image)
    text_image_label.config(image=photo_image)
    text_image_label.image = photo_image  # Mantener una referencia para evitar que la imagen sea recolectada por el GC
    
    # Actualizar el desplazamiento
    offset -= 5  # Mueve el texto hacia la izquierda

    # Reiniciar el desplazamiento si el texto sale de la ventana
    if offset < -text_width:
        current_index = (current_index + 1) % len(content_list)  # Avanza en la lista de manera cíclica
        offset = 300  # Reinicia el offset para el nuevo texto

    root.after(100, update_text_image)

def toggle_always_on_top():
    current_state = root.wm_attributes("-topmost")
    root.wm_attributes("-topmost", not current_state)  # Cambia el estado actual

# Botón para activar/desactivar la opción de mantener la ventana arriba


# Función para mantener la ventana siempre en la parte superior cada 5 segundos
def check_always_on_top():
    if not root.wm_attributes("-topmost"):
        root.wm_attributes("-topmost", True)
    root.after(5000, check_always_on_top)

# Llama a la función de verificación cada 5 segundos
check_always_on_top()
# Llama a la función nuevamente cada 100 ms

# Inicia la función de actualización del label
update_text_image()

# Iniciar el bucle principal
root.mainloop()


 
</p>


