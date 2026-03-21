7W552RQ5PQ
PHFNQ5Q5BY
VZR8HAR6BB
BAT4R6D5WJ
57T822X9RT
RRNXFEJD3M
V4URM9G6G5
WXZ8WFJEJP
YRQRQ2ZBMG
7ZRTVTMRMH

esta es la api de acceso y confiuracion de ngrok
ngrok config add-authtoken 2xTb9JwUtk5nXiqqPIwFQQHV2Lm_DEaFZ2YWSKUJbf35oEQM

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
