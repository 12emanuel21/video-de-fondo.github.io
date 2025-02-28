```python


import pyttsx3
import speech_recognition as sr
import pywhatkit
import yfinance as yf 
import pyjokes
import webbrowser
import datetime
import wikipedia


# identificar voz en el pc
def vez_del_pc():
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')

    for voice in voices:
        print(f'ID: {voice.id}')
        print(f'Name: {voice.name}')
        print(f'Languages: {voice.languages}')
        print(f'Gender: {voice.gender}')
        print(f'Age: {voice.age}\n')
# opciones de voz
#voz Microsoft Sabina Desktop - Spanish (Mexico)
id1 = 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_ES-MX_SABINA_11.0'
#voz Microsoft Zira Desktop - English (United States)
id2 = 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0'


#escuchar mi microfono y devolver el auidio como texto
def transformar_audio_texto():
    #almacenar el reconocedor en un variable
    r = sr.Recognizer()
    
    #configurar el microfono
    with sr.Microphone() as origin:
        #tiempo de espera
        r.pause_threshold = 0.8
        
        #informar que comenso la grabacion
        print('ya puedes hablar')
        
        #guardar lo que escuche como audio
        audio = r.listen(origin)
        
        try:
            #buscar en google lo que escucho
            pedido = r.recognize_google(audio, language="es")
            
            # prueba de que pudo transformar el audio a texto
            print("Dijiste: "+ pedido)
            
            #devolver a pedido
            return pedido
        except sr.UnknownValueError:
            #prueba de que no comprendio el audio
            print("ups no entendi")
            
            #devolver el error
            return "sigo esperando"
        # error inesperado
        except sr.RequestError:
            #prueba de que no comprendio el audio
            print("ups no hay servivio")
            
            #devolver el error
            return "sigo esperando"
        except:
            #prueba de que no comprendio el audio
            print("ups algo ha salido mal")
            
            #devolver el error
            return "sigo esperando"


# funcion para que el asistente pueda ser escuchada
def hablar(mensaje):
    #encender el motor de pyttsx3
    engine = pyttsx3.init()
    engine.setProperty('voice',id1)
    #pronunciar mensaje
    engine.say(mensaje)
    engine.runAndWait()


def pedir_dia():
    # crear variable con datos de hoy 
    dia = datetime.date.today()
    print(dia)
    dia_semana = dia.weekday()
    print(dia_semana)
    # diccionario con nombre de dia
    calendario = {0:'Lunes',
                  1:'Martes',
                  2:'Miercoles',
                  3:'Jueves',
                  4:'Viernes',
                  5:'Sabados',
                  6:'Domingo'}
    # decidir el dia e la semana
    hablar(f'hoy es {calendario[dia_semana]}')

# informar que hora es
def pedir_hora():
    #crear una variable con datos de la hora
    hora = datetime.datetime.now()
    hora = f'En este m omento son las {hora.hour} horas con {hora.minute} minutos y {hora.second} segundos'
    print(hora)
    # decir la hora
    hablar(hora)

# funcion salud inicial
def salud_inicial():
    # crear valiable con datos de hora
    hora = datetime.datetime.now()
    
    if hora.hour < 6 or hora.hour > 20:
        momento = 'Buenas noches'
    elif 6 <= hora.hour < 13:
        momento = 'Buen dia'
    else:
        momento = 'Buenas tardes'
    hablar(f'{momento}, Soy sabina, tu asistente personal. por favor, dime en que te puedo ayudar')


# funcion central del asistete 
def pedir_cosas():
    #activar saludo inicial
    salud_inicial()
    
    comenzar = True
    while comenzar:
        # activar el micrfono y guardar el pedido en un string
        pedido = transformar_audio_texto().lower()
        
        if 'abrir youtube' in pedido:
            hablar('con gusto, estoy abriendo youtube')
            webbrowser.open('https://www.youtube.com')
            continue
        elif 'abrir navegador' in pedido:
            hablar('claro, estoy en eso')
            webbrowser.open('https://www.google.com')
            continue
        elif 'qué día es hoy' in pedido:
            pedir_dia()
            continue
        elif 'qué hora es' in pedido:
            pedir_hora()
            continue
        elif 'busca en wikipedia' in pedido:
            hablar('Buscando eso en wikipedia')
            pedido = pedido.replace('busca en wikipedia','')
            wikipedia.set_lang('es')
            try:
                resultado = wikipedia.summary(pedido, sentences=1)
                hablar('wikipedia dice lo siguiente')
                hablar(resultado)
            except wikipedia.exceptions.WikipediaException as e:
                hablar(f'Error buscando en Wikipedia')
            continue
        elif 'busca en internet' in pedido:
            hablar('ya mismo estoy en eso')
            pedido = pedido.replace('busca en internet','')
            pywhatkit.search(pedido)
            hablar('esto es lo que he esncontrado')
            continue
        elif 'reproduce' in pedido:
            hablar('ok, ya voy a reproducirlo')
            pedido = pedido.replace("reproduce","")
            pywhatkit.playonyt(pedido)
            continue
        elif 'broma' in pedido:
            hablar(pyjokes.get_joke('es'))
            continue
        elif 'precio de las acciones' in pedido:
            accion = pedido.split('de')[-1].strip
            cartera = {'apple':'APPL',
                       'amazon':'AMZN',
                       'google':'GOOGL'}
            try:
                accion_buscada = cartera[accion]
                accion_buscada = yf.ticker(accion_buscada)
                precio_actual = accion_buscada.info['regularMarketPrice']
                hablar(f'la encontre, el precio de {accion} es {precio_actual}')
                continue
            except:
                hablar('perdon pero no la he encontrado')
            
        elif 'adiós' in pedido:
            hablar('Me voy a descansar, cualquier cosa me avisas')
            break
            
            
pedir_cosas()
