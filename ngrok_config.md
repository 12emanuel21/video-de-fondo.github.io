```python




esta es la de botpress en el puerto 8000
https://7e61-38-188-225-180.ngrok-free.app/webhook/
esta es la de telegram
https://api.telegram.org/bot7898629284:AAGl2jiZAT1dlejLRcrfxg_X-qFVSEP3g0c/setWebhook?url=https://5d77eaf81419.ngrok-free.app/webhook/
actual
https://api.telegram.org/bot7898629284:AAGl2jiZAT1dlejLRcrfxg_X-qFVSEP3g0c/setWebhook?url=https://9ff4b458e85b.ngrok-free.app/webhook/7898629284:AAGl2jiZAT1dlejLRcrfxg_X-qFVSEP3g0c/

iniciar ngrok
.\ngrok http 8000

ejecutar proyecto django con
 daphne -p 8000 bot_admin.asgi:application

activer redis

sudo service redis-server status
sudo service redis-server start



https://autobotsdev.dev/chat/webhook/whatsapp/token_prueba_123/
https://f67c-2a09-bac5-26d0-aa-00-11-1a5.ngrok-free.app/orquestador/webhook/token_prueba_123/

daphne -v 2 -b 127.0.0.1 -p 8000 chatbots_ccob.asgi:application


74asd65f5ds1354dfsfdsgf-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
12emanuel21
git clone https://github.com/12emanuel21/chat_bot_private_proyecto.git

https://developers.facebook.com/apps/713403147808279/whatsapp-business/wa-dev-console/?business_id=1093748045926569

#*********************************************
# conexion asesor


  const axios = require('axios')
  async function run() {
    // Capturamos el número dinámicamente.
    // Usamos event.target (el estándar) o event.payload.from como respaldo.
    const numeroCliente = event.target || event.payload.from

    try {
      const respuesta = await axios.post('https://0bde-38-210-185-34.ngrok-free.app/orquestador/api/transferir-chat/', {
        wa_id: numeroCliente,
        campana_id: 16,
        metadata: {
          "Cédula_Cliente": '1.045.890.123',
          "Segmento": 'Cartera Castigada',
          "Deuda_Total": '$1,500,000',
          "Días_Mora": '120'
        }
      })

      bp.logger.info('Transferencia Exitosa: ' + respuesta.status)
    } catch (error) {
      // Si Django rechaza la petición, esto nos dirá si fue un 404 o un 400
      bp.logger.error('Fallo en la transferencia. Código: ' + error.response.status)
    }
  }

  return run()










