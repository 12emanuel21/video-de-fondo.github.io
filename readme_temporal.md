
<p>

def cargar_archivo(request):
    if request.method == 'POST':
        archivo_xlsx = request.FILES.get('archivo_xlsx')
        if archivo_xlsx and archivo_xlsx.name.endswith('.xlsx'):
            try:
                df = pd.read_excel(archivo_xlsx, header=0)
                empleados = []
                for _, row in df.iterrows():
                    empleado = Empleado(
                        Nombre=row['Nombre'],
                        Apellido=row['Apellido'],
                        Edad=row['Edad'],
                        Email=row['Email'],
                        Generos=row['Sexo'],
                        Salario=row['Salario']
                    )
                    empleados.append(empleado)
                Empleado.objects.bulk_create(empleados, ignore_conflicts=True)
                return JsonResponse({'status_server': 'success', 'message': 'Los datos se importaron correctamente.'})
            except Exception as e:
                logging.error("Error al cargar el archivo: %s", str(e))
                return JsonResponse({'status_server': 'error', 'message': f'Error al cargar el archivo: {str(e)}'})
        else:
            return JsonResponse({'status_server': 'error', 'message': 'El archivo debe ser un archivo de Excel válido.'})
    return render(request, 'listaEmpleados.html')



</p>




