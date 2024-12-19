# Mi Proyecto React

https://github.com/platzi/curso-react-practico/tree/clase-11

Este es un ejemplo de cómo estructurar tu aplicación React.

```jsx

const axios = require('axios'); // Axios para manejar solicitudes HTTP
/**
 * Acción para obtener el menú según la hora actual
 * @title getMenuByTime
 * @category Menú del Restaurante
 * @param {string} userID - Identificador del usuario (opcional)
 */
const getMenuByTime = async (userID) => {
  // Obtener la hora actual usando un servicio externo
  try {
    // Llamada a una API de hora (por ejemplo, WorldTimeAPI)
    const response = await axios.get('http://worldtimeapi.org/api/timezone/America/Bogota');
    const horaActual = new Date(response.data.datetime).getHours(); // Extraer la hora actual
    let menu = ""; // Variable que almacenará el menú
    if (horaActual >= 6 && horaActual < 10) {
      menu = `
      🌅 *Menú de Desayuno*:
      1. Pescado con yuca - $5.00 USD
      2. Plátano cocido con pescado - $5.00 USD
      3. Huevo frito con patacón - $5.00 USD
      `;
    } else if (horaActual >= 12 && horaActual < 15) {
      menu = `
      🍽️ *Menú de Almuerzo*:
      1. Sancocho de pata de vaca con arroz - $5.00 USD
      2. Sopa de hueso con arroz - $5.00 USD
      `;
    } else if (horaActual >= 18 && horaActual < 21) {
      menu = `
      🌙 *Menú de Cena*:
      1. Arroz de coco con pescado - $5.00 USD
      2. Arroz blanco con pescado - $5.00 USD
      3. Arroz blanco con carne frita - $5.00 USD
      `;
    } else {
      menu = "⏰ Lo siento, no estamos sirviendo comida en este momento. Nuestros horarios son:\n*Desayuno*: 6 AM - 10 AM\n*Almuerzo*: 12 PM - 3 PM\n*Cena*: 6 PM - 9 PM.";
    }
    // Responder con el menú
    return menu;

  } catch (error) {
    console.error("Error al obtener la hora:", error);
    return "❌ Hubo un problema al verificar la hora. Inténtalo de nuevo más tarde.";
  }
};
return getMenuByTime();


