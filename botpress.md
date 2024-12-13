``` rtf

1. event.replyToEvent()
Funcionalidad: Enviar una respuesta al usuario.
Contexto: Este evento se utiliza cuando quieres responder a un evento específico, como un mensaje de texto o una opción seleccionada en el flujo.
Ejemplo:
javascript
Copiar código
const responder = async () => {
  // Responder con un mensaje de texto simple
  await bp.events.replyToEvent(event, [{ type: 'text', text: 'Hola, ¿cómo estás?' }]);
};
responder();
2. event.waitForAnswer()
Funcionalidad: Esperar la respuesta del usuario.
Contexto: Este evento se usa cuando necesitas recibir una respuesta específica del usuario antes de continuar con el flujo. Este es un evento bloqueante.
Ejemplo:
javascript
Copiar código
const pedirNombre = async () => {
  // Pedir al usuario que ingrese su nombre
  const respuesta = await bp.dialogEngine.waitForAnswer(event, { type: 'text' });
  await bp.events.replyToEvent(event, [{ type: 'text', text: `Hola, ${respuesta.text}!` }]);
};
pedirNombre();
3. event.setVariable()
Funcionalidad: Establecer o actualizar una variable en el contexto de la conversación.
Contexto: Este evento se utiliza cuando deseas guardar información en el contexto de la conversación, como el nombre del usuario, opciones seleccionadas, etc.
Ejemplo:
javascript
Copiar código
const guardarNombre = async () => {
  // Establecer el nombre del usuario en una variable de sesión
  await bp.dialogEngine.setVariable(event, 'temp.nombre', 'Juan');
};
guardarNombre();
4. event.getVariable()
Funcionalidad: Obtener el valor de una variable almacenada.
Contexto: Se utiliza cuando necesitas recuperar una variable almacenada previamente para utilizarla en tu lógica.
Ejemplo:
javascript
Copiar código
const saludarUsuario = async () => {
  // Obtener el nombre guardado en la variable
  const nombre = await bp.dialogEngine.getVariable(event, 'temp.nombre');
  await bp.events.replyToEvent(event, [{ type: 'text', text: `Hola, ${nombre}! ¿En qué puedo ayudarte?` }]);
};
saludarUsuario();
5. bp.events.emit()
Funcionalidad: Emitir un evento a nivel global dentro de Botpress.
Contexto: Se usa para emitir un evento que puede ser escuchado por otros componentes del sistema, como en el caso de eventos personalizados o cuando se necesita notificar a otros sistemas.
Ejemplo:
javascript
Copiar código
const emitirEventoPersonalizado = async () => {
  // Emitir un evento personalizado para otros procesos o escuchadores
  await bp.events.emit('miEventoPersonalizado', { data: 'Información importante' });
};
emitirEventoPersonalizado();
6. event.state
Funcionalidad: Acceder al estado de la conversación.
Contexto: event.state te da acceso al estado de la conversación, que puedes modificar o leer. Esto es útil cuando quieres saber el progreso de un usuario en el flujo.
Ejemplo:
javascript
Copiar código
const mostrarEstado = async () => {
  // Mostrar el estado de la conversación
  const estado = event.state;
  await bp.events.replyToEvent(event, [{ type: 'text', text: `El estado de la conversación es: ${JSON.stringify(estado)}` }]);
};
mostrarEstado();
7. event.payload.text
Funcionalidad: Acceder al texto de la respuesta del usuario.
Contexto: Se usa para obtener el mensaje que el usuario ha enviado, por ejemplo, para realizar un análisis o una acción en función del texto recibido.
Ejemplo:
javascript
Copiar código
const procesarTextoUsuario = async () => {
  // Obtener el texto ingresado por el usuario
  const texto = event.payload.text;
  if (texto === 'Hola') {
    await bp.events.replyToEvent(event, [{ type: 'text', text: '¡Hola! ¿Cómo estás?' }]);
  } else {
    await bp.events.replyToEvent(event, [{ type: 'text', text: 'No entendí lo que dijiste.' }]);
  }
};
procesarTextoUsuario();
8. bp.dialogEngine.goto()
Funcionalidad: Cambiar el flujo a un nodo específico.
Contexto: Este evento es útil cuando quieres redirigir el flujo de la conversación a un nodo específico después de una acción, como una decisión del usuario.
Ejemplo:
javascript
Copiar código
const irANodo = async () => {
  // Cambiar al nodo 'next_node'
  await bp.dialogEngine.goto(event, 'next_node');
};
irANodo();
9. bp.dialogEngine.gotoNext()
Funcionalidad: Ir al siguiente nodo en el flujo.
Contexto: Similar al anterior, pero no necesitas especificar un nodo en particular. Este es útil cuando solo deseas continuar con el siguiente paso en el flujo.
Ejemplo:
javascript
Copiar código
const siguientePaso = async () => {
  // Ir al siguiente nodo del flujo
  await bp.dialogEngine.gotoNext(event);
};
siguientePaso();
10. bp.http.get()
Funcionalidad: Realizar una solicitud HTTP (GET).
Contexto: Se utiliza cuando necesitas obtener datos de una API externa o hacer consultas a un servicio externo.
Ejemplo:
javascript
Copiar código
const obtenerDatosExternos = async () => {
  // Realizar una solicitud GET a una API externa
  const respuesta = await bp.http.get('https://api.exapmle.com/data');
  const datos = respuesta.data;
  await bp.events.replyToEvent(event, [{ type: 'text', text: `Datos obtenidos: ${JSON.stringify(datos)}` }]);
};
obtenerDatosExternos();
11. bp.http.post()
Funcionalidad: Realizar una solicitud HTTP (POST).
Contexto: Se utiliza cuando necesitas enviar datos a un servicio o API externa.
Ejemplo:
javascript
Copiar código
const enviarDatosExternos = async () => {
  // Realizar una solicitud POST a una API externa
  const respuesta = await bp.http.post('https://api.example.com/submit', { data: 'información importante' });
  await bp.events.replyToEvent(event, [{ type: 'text', text: 'Datos enviados correctamente.' }]);
};
enviarDatosExternos();
12. event.trigger()
Funcionalidad: Disparar un evento interno en Botpress.
Contexto: Es útil cuando quieres ejecutar acciones o notificar otros componentes dentro de Botpress de que ha ocurrido un evento.
Ejemplo:
javascript
Copiar código
const dispararEventoInterno = async () => {
  // Disparar un evento personalizado interno
  await bp.events.trigger('eventoInterno', { data: 'información adicional' });
};
dispararEventoInterno();
13. bp.queues.send()
Funcionalidad: Enviar un mensaje a una cola para procesamiento posterior.
Contexto: Utilizado en flujos asincrónicos, cuando quieres enviar tareas a ser procesadas más tarde sin que afecten la conversación en tiempo real.
Ejemplo:
javascript
Copiar código
const enviarACola = async () => {
  // Enviar un mensaje a la cola para su procesamiento posterior
  await bp.queues.send('miCola', { tarea: 'procesar datos' });
};
enviarACola();
14. event.time
Funcionalidad: Obtener la hora del evento.
Contexto: Es útil para realizar operaciones basadas en el tiempo o cuando necesitas saber el tiempo en que ocurrió un evento.
Ejemplo:
javascript
Copiar código
const obtenerHora = async () => {
  // Obtener la hora del evento
  const hora = event.time;
  await bp.events.replyToEvent(event, [{ type: 'text', text: `El evento ocurrió a las: ${hora}` }]);
};
obtenerHora();
15. bp.logger.info()
Funcionalidad: Registrar información en los logs de Botpress.
Contexto: Útil para el desarrollo y la depuración, para que puedas ver los datos del flujo o cualquier otro tipo de información relevante.
Ejemplo:
javascript
Copiar código
const registrarInformacion = async () => {
  // Registrar un mensaje en los logs de Botpress
  bp.logger.info('Información de depuración: El flujo ha iniciado');
};
registrarInformacion();
Estos son algunos de los eventos más útiles en Botpress, con ejemplos de uso para que puedas integrarlos en tus flujos y acciones.
