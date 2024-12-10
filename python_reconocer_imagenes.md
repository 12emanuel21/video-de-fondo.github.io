```python

import cv2
import pytesseract
import numpy as np
import dlib

# Configura pytesseract para usar el ejecutable de Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Lee la imagen
img = cv2.imread("example_image_with_text.jpg")

# Convierte la imagen a escala de grises
gray = cv2.cvtColor(src=img, code=cv2.COLOR_BGR2GRAY)
faces = detector(gray)

for face in faces:
    x1 = face.left()
    y1 = face.top()
    x2 = face.right()
    y2 = face.bottom()
    landmarks = predictor(image=gray, box=face)
    for n in range(0, 68):
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        cv2.circle(img=img, center=(x, y), radius=3, color=(0, 255, 0), thickness=-1)

# Reconocimiento de texto en la imagen usando Tesseract
text = pytesseract.image_to_string(img)

# Imprimir el texto extraído
print("Texto reconocido:")
print(text)

# Mostrar la imagen resultante
cv2.imshow(winname="Face", mat=img)
cv2.waitKey(delay=0)


#ejemplo de cordenandas

import cv2
import pytesseract

# Configura pytesseract para usar el ejecutable de Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Lee la imagen
img = cv2.imread("example_image_with_text.jpg")

# Define las coordenadas de la región de interés (ROI)
x, y, w, h = 100, 100, 300, 200  # Ejemplo de coordenadas (x, y, ancho, alto)

# Recorta la imagen a la región de interés
roi = img[y:y+h, x:x+w]

# Convierte la imagen a escala de grises
gray = cv2.cvtColor(src=roi, code=cv2.COLOR_BGR2GRAY)

# Reconocimiento de texto en la región de interés usando Tesseract
text = pytesseract.image_to_string(gray)

# Imprimir el texto extraído
print("Texto reconocido en la región de interés:")
print(text)




