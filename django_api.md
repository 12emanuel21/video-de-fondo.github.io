python```

urls.py
from django.urls import path, include
from rest_framework import routers
from api import views

router=routers.DefaultRouter()
router.register(r'programador',views.programadorViewSet)

urlpatterns=[
    path('',include(router.urls))
]

admis.py
from django.contrib import admin
from .models import programador
# Register your models here.

admin.site.register(programador)


models.py
class programador(models.Model):
    fullname = models.CharField('fullname',max_length=100)
    nickname = models.CharField('nickname',max_length=50)
    age = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)



serializer.py
from rest_framework import serializers
from .models import programador

class programadorSerializers(serializers.ModelSerializer):
    class Meta:
        model=programador
        # fields=('fullname','nickname')
        fields='__all__'


views.py
from rest_framework import viewsets
from .serializer import programadorSerializers
from .models import programador

# Create your views here.

class programadorViewSet(viewsets.ModelViewSet):
    queryset=programador.objects.all()
    serializer_class=programadorSerializers


por ultimo validar que este la app instalada 
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api'
]

y las url
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/',include('api.urls')),
]


