# mi veiw in django

Este script utiliza `tkinter` y `pystray` para crear una aplicación que se oculta en la bandeja del sistema.

https://s3.amazonaws.com/botpress-binaries/botpress-v12_30_6-linux-x64.zip


https://github.com/botpress/v12/

```python

class EmpleadoUpdateView(LoginRequiredMixin,UpdateView):
    model = Empleado
    template_name = "app_crud/actualizarviews.html"  # Tu template personalizado
    fields = ['Nombre', 'Apellido', 'Email', 'Salario', 'completo']  # Incluye el campo 'completo'
    success_url = reverse_lazy('listaEmpleados')  # Redirigir después de actualizar
        
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    # Sobreescribimos el método para capturar y guardar datos manualmente
   
    def form_valid(self, form):
        # Imprime el contenido de request.POST para verificar que los datos se están enviando

            # Obtener los valores del request.POST
            nombre = self.request.POST.get('Nombre')
            apellido = self.request.POST.get('Apellido')
            email = self.request.POST.get('Email')
            salario = self.request.POST.get('Salario')
            completo = self.request.POST.get('completo')  # Checkbox, se envía 'on' cuando está marcado

            # Convertir salario a Decimal
            
            # salario_decimal = Decimal(salario)
            
            try:
                salario_decimal = Decimal(salario)
            except (ValueError, TypeError):
                salario_decimal = None
            
            # Convertir el campo 'completo' a booleano
            completo_bool = True if completo == 'on' else False

            # Actualizamos los valores en el objeto empleado
            empleado = form.save(commit=False)
            empleado.Nombre = nombre
            empleado.Apellido = apellido
            empleado.Email = email
            empleado.Salario = salario_decimal
            empleado.completo = completo_bool

            empleado.save()
            return super().form_valid(form)


    # Sobreescribimos el método get_context_data para pasar el objeto empleado al template
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['empleado'] = self.get_object()  # Pasa el objeto empleado al contexto
        return context
    


#///////////////////////////////////////////


import os
import datetime
import time
import re
from pathlib import Path
import math

inicio = time.time()

ruta = "C:\\Users\\emanuel\\Desktop\\PROYECTOS\\PYTHON_mejor_curso\\9. DÍA 9 - PROGRAMA UN BUSCADOR DE NÚMEROS DE SERIE\\Mi_Gran_Directorio"
hoy = datetime.date.today()
archivos_encontrados = []

# Función para buscar archivos de audio cuyo nombre coincida parcialmente con el patrón
def buscar_audio_por_nombre(patron):
    patron_regex = re.compile(patron, re.IGNORECASE)  # Ignorar mayúsculas/minúsculas
    for carpeta, subcarpeta, archivo in os.walk(ruta):
        for a in archivo:
            # Verificar si es un archivo de audio
            if a.lower().endswith(('.wav', '.mp3', '.flac')):
                # Buscar el patrón en el nombre del archivo
                if patron_regex.search(a):
                    archivos_encontrados.append(a.title())

def mostrar_resultados():
    print('-' * 50)
    print(f'Fecha de búsqueda: {hoy.day}/{hoy.month}/{hoy.year}')
    print('\n')
    print('ARCHIVO ENCONTRADO')
    print('------------------')
    for a in archivos_encontrados:
        print(a)
    print('\n')
    print(f'Cantidad de archivos encontrados: {len(archivos_encontrados)}')
    fin = time.time()
    duracion = fin - inicio
    print(f'Duración de la búsqueda: {math.ceil(duracion)} segundos')
    print('-' * 50)

# Ingresar el patrón a buscar
patron_busqueda = input("Ingrese parte del nombre del audio a buscar: ")

# Buscar archivos de audio por nombre
buscar_audio_por_nombre(patron_busqueda)

# Mostrar los resultados
mostrar_resultados()

#////////////////////////////////

<form method="POST" action="{% url 'nombre_de_la_vista' %}">
    {% csrf_token %}
    <input type="text" name="nombre" placeholder="Nombre">
    <input type="text" name="apellido" placeholder="Apellido">
    <button type="submit">Enviar</button>
</form>

#/////////////////////////
from django.shortcuts import render, redirect
from .models import TuModelo
from .forms import TuFormulario

def tu_vista(request):
    if request.method == "POST":
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        
        # Crear el formulario manualmente con los datos recibidos
        form = TuFormulario({
            'nombre': nombre,
            'apellido': apellido,
        })
        
        if form.is_valid():
            form.save()  # Guardar los datos si el formulario es válido
            return redirect('alguna_url')
        
    else:
        form = TuFormulario()

    return render(request, 'tu_template.html', {'form': form})

#/////////////////////
from django import forms
from .models import TuModelo

class TuFormulario(forms.ModelForm):
    class Meta:
        model = TuModelo
        fields = ['nombre', 'apellido']  # Campos del modelo





