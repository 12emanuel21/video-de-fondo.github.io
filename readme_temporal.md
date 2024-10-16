# mi veiw in django

Este script utiliza `tkinter` y `pystray` para crear una aplicación que se oculta en la bandeja del sistema.

```python
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel
from PyQt5.QtCore import QTimer, Qt
import sys

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # Configurar la ventana
        self.setWindowTitle("Textos Secuenciales")
        self.setGeometry(100, 100, 800, 400)

        # Lista de oraciones con diferentes longitudes
        self.texts = [
            "Primera oración corta.",
            "Esta es una segunda oración un poco más larga que la primera.",
            "Aquí va una tercera, que puede ser mucho más extensa y tiene mucho más contenido que las anteriores.",
            "Cuarta oración.",
            "Texto número cinco, relativamente corto.",
            "La sexta oración es otra con longitud media para demostrar la flexibilidad.",
            "Séptima, más larga que la sexta y que se mueve igual que las otras.",
            "Octava: casi terminamos, esta es corta.",
            "Novena y última oración, para completar la lista de ejemplo."
        ]
        self.current_text_index = 0

        # Crear el QLabel
        self.label = QLabel(self.texts[self.current_text_index], self)
        self.label.adjustSize()  # Ajustar el tamaño al texto actual
        self.label.setGeometry(800, 180, self.label.width(), 40)  # Posición inicial fuera de la ventana a la derecha

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
        new_x = x - 5

        # Cambiar al siguiente texto cuando el QLabel desaparezca
        if new_x + self.label.width() <= 0:
            new_x = 800  # Reiniciar la posición a la derecha de la ventana
            # Pasar al siguiente texto y ajustar el tamaño del QLabel
            self.current_text_index = (self.current_text_index + 1) % len(self.texts)
            self.label.setText(self.texts[self.current_text_index])
            self.label.adjustSize()  # Ajustar el ancho al nuevo texto

        # Actualizar la posición del QLabel
        self.label.move(new_x, y)

app = QApplication(sys.argv)
window = MainWindow()
sys.exit(app.exec_())




