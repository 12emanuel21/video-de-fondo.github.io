1. Conceptos básicos
    ¿Qué es React?
    Crear un proyecto con Create React App o herramientas modernas como Vite.
    JSX (JavaScript XML): Sintaxis para escribir HTML dentro de JavaScript.
    Componentes:
    Funcionales
    Clases (menos común en aplicaciones modernas).
    Props: Paso de datos entre componentes.
    Estado (State): Manejo interno del estado de un componente.
2. Manejo de eventos
    Eventos básicos como onClick, onChange, etc.
    Bind de funciones (cuando trabajas con clases).
    Prevención de comportamiento predeterminado (event.preventDefault).
3. Hooks
    Básicos:
    useState: Manejo de estados.
    useEffect: Efectos secundarios como llamadas API o actualización del DOM.
    Intermedios:
    useContext: Compartir estados globales entre componentes.
    useReducer: Alternativa a useState para lógica más compleja.
    Avanzados:
    useRef: Acceso directo a elementos DOM.
    useCallback: Memorizar funciones para evitar renders innecesarios.
    useMemo: Optimizar cálculos intensivos.
    useLayoutEffect: Similar a useEffect, pero ejecutado antes del render.
    useImperativeHandle: Personalizar el comportamiento de refs.
4. Enrutamiento
    React Router:
    Configuración de rutas con react-router-dom.
    Rutas dinámicas.
    Navegación programática (usando useNavigate).
    Parámetros y query strings.
    Rutas protegidas (Private Routes).
5. Manejo de estado avanzado
    Context API: Estado global simple.
    Librerías externas:
    Redux (con o sin redux-toolkit).
    Zustand.
    Recoil.
6. Estilización
    CSS básico y módulos CSS (className, style inline).
    Preprocesadores: SCSS o LESS.
    Librerías de estilos:
    Styled-components.
    Emotion.
    Tailwind CSS.
    Material-UI (MUI).
7. Llamadas a APIs
    Fetch y Axios: Realizar peticiones HTTP.
    Manejo de estados asíncronos (loading, error, etc.).
    Librerías avanzadas:
    React Query (TanStack Query).
    SWR.
8. Renderizado avanzado
    Renderizado condicional.
    Renderizado de listas con keys únicas.
    Componentes de alto orden (HOC).
    Render Props.
    Code Splitting: Separar el código por rutas o componentes (React.lazy y Suspense).
9. Optimización de rendimiento
    Renderizado selectivo con React.memo.
    Evitar renders innecesarios con hooks como useMemo y useCallback.
    Virtualización de listas con react-window o react-virtualized.
10. Testing
    Unit testing con Jest y React Testing Library.
    End-to-end (E2E) testing con Cypress o Playwright.
11. Desarrollo avanzado
    Portales: Renderizar contenido fuera del árbol DOM principal.
    Error boundaries: Manejar errores en componentes.
    Suspense y Concurrent Mode (renderizado concurrente).
    SSR (Server-Side Rendering) con Next.js.
    SSG (Static Site Generation) con Next.js o Gatsby.
    ISR (Incremental Static Regeneration) con Next.js.
12. Integraciones y ecosistema
    Integración con bibliotecas:
    Formik o React Hook Form para manejo de formularios.
    Chart.js, Recharts o D3.js para gráficos.
    Web Sockets: Integrar tiempo real con librerías como Socket.IO.
    PWA (Progressive Web Apps) con React.
13. Contexto empresarial
    Buenas prácticas: Componentes pequeños, DRY, y Single Responsibility Principle (SRP).
    Monorepos con herramientas como NX o Turborepo.
    Documentación del código con Storybook.
    Despliegue con Vercel, Netlify o AWS Amplify.
14. Meta-programación y custom hooks
    Crear hooks personalizados.
    Modularización del código y patrones reutilizables.
