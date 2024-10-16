# mi veiw in django

Este script utiliza `tkinter` y `pystray` para crear una aplicación que se oculta en la bandeja del sistema.

```python
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QFont
import sys

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # Configurar la ventana con dimensiones pequeñas
        self.setWindowTitle("Textos Secuenciales")
        self.setGeometry(100, 100, 350, 50)  # Ajustar a las dimensiones deseadas

        # Lista de oraciones con diferentes longitudes
        self.texts = [
            "Primera oración corta.",
            "Esta es una segunda oración un poco más larga.",
            "Aquí va una tercera, que es más extensa.",
            "Cuarta oración.",
            "Texto cinco, relativamente corto.",
            "La sexta oración, longitud media.",
            "Séptima oración.",
            "Octava corta.",
            "Novena y última oración."
        ]
        self.current_text_index = 0

        # Crear el QLabel
        self.label = QLabel(self.texts[self.current_text_index], self)
        self.label.setFont(QFont("Arial", 10))  # Ajustar el tamaño de la fuente
        self.label.adjustSize()
        self.label.setGeometry(350, 10, self.label.width(), 30)  # Posición inicial fuera de la ventana a la derecha

        # Configurar el temporizador para mover el QLabel
        self.timer = QTimer()
        self.timer.timeout.connect(self.move_label)
        self.timer.start(30)  # Mueve el QLabel cada 30 ms

        self.show()

    def move_label(self):
        # Obtener la posición actual del QLabel
        x = self.label.x()
        y = self.label.y()

        # Mover el QLabel hacia la izquierda
        new_x = x - 3  # Reducir la velocidad para un espacio más pequeño

        # Cambiar al siguiente texto cuando el QLabel desaparezca
        if new_x + self.label.width() <= 0:
            new_x = 350  # Reiniciar la posición a la derecha de la ventana
            # Pasar al siguiente texto y ajustar el tamaño del QLabel
            self.current_text_index = (self.current_text_index + 1) % len(self.texts)
            self.label.setText(self.texts[self.current_text_index])
            self.label.adjustSize()  # Ajustar el ancho al nuevo texto

        # Actualizar la posición del QLabel
        self.label.move(new_x, y)

app = QApplication(sys.argv)
app.setAttribute(Qt.AA_EnableHighDpiScaling, True)
app.setAttribute(Qt.AA_UseHighDpiPixmaps, True)
window = MainWindow()
sys.exit(app.exec_())


#/////////////////////////////////////////////////////////////

from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QDesktopWidget
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QFont
import sys

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # Obtener la resolución de la pantalla
        screen = QDesktopWidget().screenGeometry()
        screen_width = screen.width()
        screen_height = screen.height()

        # Calcular el tamaño de la ventana en función de la resolución de la pantalla
        window_width = int(screen_width * 0.3)   # 30% del ancho de la pantalla
        window_height = int(screen_height * 0.07)  # 7% de la altura de la pantalla

        # Configurar la ventana
        self.setWindowTitle("Textos Secuenciales")
        self.setGeometry(
            int((screen_width - window_width) / 2),  # Centrar en la pantalla
            int(screen_height * 0.1),  # 10% desde la parte superior de la pantalla
            window_width, 
            window_height
        )

        # Lista de oraciones
        self.texts = [
            "Primera oración corta.",
            "Esta es una segunda oración un poco más larga.",
            "Aquí va una tercera, que es más extensa.",
            "Cuarta oración.",
            "Texto cinco, relativamente corto.",
            "La sexta oración, longitud media.",
            "Séptima oración.",
            "Octava corta.",
            "Novena y última oración."
        ]
        self.current_text_index = 0

        # Crear el QLabel y ajustar el tamaño de fuente
        self.label = QLabel(self.texts[self.current_text_index], self)
        font_size = int(window_height * 0.4)  # Tamaño de fuente basado en el alto de la ventana
        self.label.setFont(QFont("Arial", font_size))
        self.label.adjustSize()
        self.label.setGeometry(window_width, int(window_height / 4), self.label.width(), int(window_height / 2))

        # Configurar el temporizador para mover el QLabel
        self.timer = QTimer()
        self.timer.timeout.connect(self.move_label)
        self.timer.start(30)  # Mueve el QLabel cada 30 ms

        self.show()

    def move_label(self):
        # Obtener la posición actual del QLabel
        x = self.label.x()
        y = self.label.y()

        # Mover el QLabel hacia la izquierda
        new_x = x - 3

        # Cambiar al siguiente texto cuando el QLabel desaparezca
        if new_x + self.label.width() <= 0:
            new_x = self.width()  # Reiniciar a la derecha de la ventana
            # Pasar al siguiente texto y ajustar el tamaño del QLabel
            self.current_text_index = (self.current_text_index + 1) % len(self.texts)
            self.label.setText(self.texts[self.current_text_index])
            self.label.adjustSize()

        # Actualizar la posición del QLabel
        self.label.move(new_x, y)

app = QApplication(sys.argv)
app.setAttribute(Qt.AA_EnableHighDpiScaling, True)
app.setAttribute(Qt.AA_UseHighDpiPixmaps, True)
window = MainWindow()
sys.exit(app.exec_())












