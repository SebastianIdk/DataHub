# DataHub
## Autores
- Sebastián Márquez
- Josué Zambrano
- Ricardo Carrión

**DataHub** es una aplicación web desarrollada en **React** que permite a los usuarios consultar noticias internacionales y datos climáticos en tiempo real. Integra APIs de noticias y clima para proporcionar contenido interactivo y relevante en múltiples idiomas, con un diseño intuitivo y fácil de usar.


## Características Principales
- **Búsqueda de Noticias:**
  - Consulta noticias utilizando un término de búsqueda personalizado.
  - Filtra resultados por idioma (Español, Inglés, Portugués, Francés, Italiano, Japonés, Alemán y Chino).
  - Paginación para explorar múltiples resultados de manera organizada.
  - Muestra información adicional como autor, fecha de publicación e imagen destacada de la noticia.

- **Datos del Clima:**
  - Consulta información meteorológica en tiempo real.
  - Planificación en función de la ubicación o una ciudad específica.

- **Navegación Intuitiva:**
  - Uso de **React Router** para gestionar rutas entre secciones como "Noticias" y "Clima".
  - Menú desplegable con opciones claras para navegar por la aplicación.

- **Resiliencia ante Errores:**
  - Validaciones para manejar la falta de resultados en idiomas específicos.

## Herramientas y Librerías Utilizadas
- **React:** Framework para el desarrollo de la interfaz de usuario.
- **React Router:** Configuración de rutas entre las diferentes secciones de la aplicación.
- **Axios:** Cliente HTTP utilizado para realizar solicitudes a las APIs.
- **WebVitals:** Medición del rendimiento de la aplicación.
- **APIs Externas:**
  - **News API:** Fuente de datos de noticias globales.
  - **API Climatológica:** Fuente de datos meteorológicos.
  - **Libre Translate:** Permite traducir el contenido de las news para filtrar.

## Requisitos Previos
Antes de ejecutar este proyecto, asegúrarse de tener instalado lo siguiente:
- [**Node.js**](https://nodejs.org/): Entorno de ejecución para JavaScript, incluye npm (Node Package Manager).
- [**npm**](https://www.npmjs.com/): Administrador de paquetes incluido con Node.js.
- **React:** Framework para el desarrollo de la interfaz de usuario.
- **Navegador Moderno:** (Chrome, Edge, Firefox, etc.)

## Instrucciones de Ejecución
### 1. Clonar el Repositorio
```bash
git clone https://github.com/SebastianIdk/DataHub.git
```
### 2. Cambiar a la Carpeta del Proyecto
```bash
cd noticias
```
### 3. Instalar las Dependencias
Ejecutar el siguiente comando para instalar las dependencias declaradas en `package.json`:
```bash
npm install
```
### 4. Ejecutar la Aplicación
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`.

## Consideraciones
1. **API de Noticias:**
   - La API tiene un límite diario de **1000 solicitudes**. Si se supera este límite, se podría recibir errores de conexión.
   - Es preferible realizar búsquedas específicas en lugar de usar el valor predeterminado `breaking news`, ya que este término puede no generar resultados en ciertos idiomas.

2. **Configuración de Rutas:**
   - La navegación entre las secciones "Noticias" y "Clima" está configurada utilizando **React Router**.

3. **Errores Comunes:**
   - **Sin resultados:** Introducir un término de búsqueda específico ayuda a mejorar la precisión de las noticias devueltas.
   - **Fallo en la API:** Verificar que no se haya superado el límite de solicitudes.
