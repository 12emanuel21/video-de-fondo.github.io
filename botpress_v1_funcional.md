```python


views.py
import json
import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# --- CONFIGURACIÓN ---
BOTPRESS_URL = "http://localhost:3000/api/v1/bots/bot_prueba"  # Cambia 'bot_prueba' por el ID de tu bot en Botpress
TELEGRAM_API_TOKEN = "7898629284:AAGl2jiZAT1dlejLRcrfxg_X-qFVSEP3g0c"  # Reemplaza con tu token de Telegram


@csrf_exempt
def telegram_webhook(request):
    if request.method == 'POST':
        try:
            update = json.loads(request.body.decode('utf-8'))
            chat_id = update['message']['chat']['id']
            user_message = update['message']['text']

            print(f"📩 Mensaje recibido de Chat ID {chat_id}: {user_message}")
        except (KeyError, json.JSONDecodeError):
            return HttpResponse("❌ Error procesando el mensaje.", status=400)

        # Enviar mensaje a Botpress
        converse_url = f"{BOTPRESS_URL}/converse/{chat_id}"
        try:
            botpress_response = requests.post(converse_url, json={
                "type": "text",
                "text": user_message
            })
            botpress_response.raise_for_status()
            bot_responses = botpress_response.json().get('responses', [])
        except requests.exceptions.RequestException as e:
            print(f"🚫 Error al contactar Botpress: {e}")
            send_telegram_message(chat_id, "⚠️ El bot no está disponible en este momento.")
            return HttpResponse("Error interno.", status=500)

        # Enviar respuestas del bot a Telegram
        for response in bot_responses:
            if response.get('type') == 'text':
                message = response.get('text', '')
                if message:
                    send_telegram_message(chat_id, message)
                    print(f"✅ Respuesta enviada a Telegram: {message}")

    return HttpResponse("OK")


def send_telegram_message(chat_id, text):
    """Enviar un mensaje al usuario en Telegram."""
    url = f"https://api.telegram.org/bot{TELEGRAM_API_TOKEN}/sendMessage"
    payload = {
        'chat_id': chat_id,
        'text': text
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error al enviar mensaje a Telegram: {e}")



urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Esta será la URL que le daremos a Telegram
    path('webhook/', views.telegram_webhook, name='telegram_webhook'),
]


configuracion en setting
ALLOWED_HOSTS = ['7e61-38-188-225-180.ngrok-free.app', 'localhost', '127.0.0.1']
