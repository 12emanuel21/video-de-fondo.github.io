# Ocultar de la Barra de Tareas

Este script utiliza `tkinter` y `pystray` para crear una aplicación que se oculta en la bandeja del sistema.

```python
class listaEmpleados(LoginRequiredMixin,ListView):
    model = Empleado
    context_object_name = 'object_empleados'
    
# """ esta funcion me permite que solo se muestre los datos que pertenecen a la usuario que este activado """
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_empleados'] = context['object_empleados'].filter(usuario=self.request.user)
        context['count'] = context['object_empleados'].filter(completo=False).count()
        
        valor_buscado = self.request.GET.get('area-buscar') or ''
        if valor_buscado:
            context['object_empleados'] = context['object_empleados'].filter(Nombre__icontains=valor_buscado)
        context['valor_buscado'] = valor_buscado
        return context 
    




