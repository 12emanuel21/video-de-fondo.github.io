
<p>

def cargar_archivo(request):  <br>
    if request.method == 'POST': <br>
        archivo_xlsx = request.FILES.get('archivo_xlsx') <br>
        if archivo_xlsx and archivo_xlsx.name.endswith('.xlsx'): <br>
            try: <br>
                df = pd.read_excel(archivo_xlsx, header=0) <br>
                empleados = [] <br>
                for _, row in df.iterrows(): <br>
                    empleado = Empleado( <br>
                        Nombre=row['Nombre'], <br>
                        Apellido=row['Apellido'], <br>
                        Edad=row['Edad'], <br>
                        Email=row['Email'], <br>
                        Generos=row['Sexo'], <br>
                        Salario=row['Salario'] <br>
                    ) <br>
                    empleados.append(empleado) <br>
                Empleado.objects.bulk_create(empleados, ignore_conflicts=True) <br>
                return JsonResponse({'status_server': 'success', 'message': 'Los datos se importaron correctamente.'}) <br>
            except Exception as e: <br>
                logging.error("Error al cargar el archivo: %s", str(e)) <br>
                return JsonResponse({'status_server': 'error', 'message': f'Error al cargar el archivo: {str(e)}'}) <br>
        else: <br>
            return JsonResponse({'status_server': 'error', 'message': 'El archivo debe ser un archivo de Excel válido.'}) <br>
    return render(request, 'listaEmpleados.html') <br>



</p>




