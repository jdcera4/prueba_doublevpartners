# Prueba tecnica
 - Para ejecutar cada parte del proyecto hay que tener en cuenta navegar a cada carpeta para ejecutar su codigo
 - Backend - OnlineStoreApi

## Descripcion Backend

#### Nombre del proyecto: Online Store API

- Online Store API es una aplicación de backend diseñada para gestionar una tienda en línea. El proyecto proporciona una interfaz para interactuar con productos, categorías y listas de deseos de los usuarios. Ofrece funcionalidades básicas como la gestión de productos y categorías, así como la capacidad de agregar y eliminar productos de las listas de deseos de los usuarios. La API está diseñada para ser robusta, escalable y fácil de mantener.

### Caracteristicas

- Gestión de Productos: Crear, leer, actualizar y eliminar productos.
- Gestión de Categorías: Crear, leer, actualizar y eliminar categorías.
- Listas de Deseos: Agregar y eliminar productos de las listas de deseos de los usuarios.
- Swagger UI: Documentación y pruebas interactivas de la API.
- Registro de Logs: Uso de Serilog para el registro y seguimiento de eventos.

### Tecnologias usadas

- .NET 8: Plataforma de desarrollo para crear aplicaciones web, APIs y servicios backend.
- ASP.NET Core: Framework para construir APIs RESTful con soporte integrado para la inyección de dependencias, controladores y middleware.
- Entity Framework Core: ORM para la interacción con bases de datos SQL Server.
- SQL Server: Sistema de gestión de bases de datos utilizado para almacenar datos de la tienda.
- Serilog: Biblioteca de registro para la gestión de logs y seguimiento de eventos.
- Swagger: Herramienta para generar documentación interactiva de la API y facilitar la prueba de endpoints.
- C#: Lenguaje de programación utilizado para implementar la lógica de la aplicación.

### Patrones de diseño

1. Repository Pattern
El Repository Pattern se utiliza para abstraer la capa de acceso a datos. Esto permite a la aplicación interactuar con la base de datos a través de una interfaz, facilitando la gestión de datos y la separación de responsabilidades. En el proyecto:

- Interfaz IRepository<T>: Define operaciones CRUD genéricas que pueden aplicarse a cualquier entidad.

- Clase Repository<T>: Implementa IRepository<T> y maneja la lógica de acceso a datos utilizando Entity Framework Core.

2. Dependency Injection (DI)

La Inyección de Dependencias es utilizada para gestionar las dependencias de la aplicación y promover la inversión de control. Esto facilita la configuración y el mantenimiento del código:

- Registro de Servicios: En Program.cs, se registran los servicios y repositorios utilizando la inyección de dependencias para que puedan ser fácilmente inyectados en los controladores y otros servicios.

3. Middleware

Se utiliza un middleware personalizado para manejar excepciones y errores globalmente. Este middleware intercepta las excepciones no gestionadas y proporciona una respuesta consistente y adecuada:

- Middleware de Excepciones: Implementado en Program.cs para capturar y manejar errores en toda la aplicación.

4. Builder Pattern

El Builder Pattern se utiliza para configurar el entorno de la aplicación. Esto incluye la configuración de Serilog, la cadena de conexión a la base de datos y el registro de servicios en el contenedor de dependencias:

- Configuración del Entorno: En Program.cs, se configura el entorno de la aplicación utilizando WebApplication.CreateBuilder para construir y configurar el host y los servicios.

### Estructura del proyecto

- Data: Contiene el contexto de la base de datos (StoreDbContext).
- Models: Contiene las entidades y modelos de datos (Product, Category, WishlistItem).
- Repositories: Contiene las interfaces y las implementaciones de los repositorios (IRepository<T>, Repository<T>).
- Program.cs: Configura la aplicación y los servicios, maneja el middleware y define los endpoints de la API

## Ejecutar Backend

- navegar al directorio del proyecto backend

### Requisitos Previos

- .NET SDK: Asegúrate de tener el .NET SDK instalado en tu máquina.

- SQL Server: Necesitarás una instancia de SQL Server en funcionamiento. Puedes usar SQL Server Express o LocalDB para pruebas locales.

- Herramienta de Línea de Comandos: Asegúrate de tener dotnet en tu PATH para ejecutar comandos desde la terminal.

### Restaurar Paquetes
- Ejecuta el siguiente comando para restaurar las dependencias del proyecto: 
```sh
dotnet restore
```

### Crear y Aplicar Migraciones

* Crea las migraciones iniciales y actualiza la base de datos con el siguiente comando
```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Ejecutar el Proyecto
* Para ejecutar el proyecto, utiliza el siguiente comando
```sh
dotnet clean
dotnet build
dotnet run
```

# FronEnd

## Descripcion 

Nombre del Proyecto: Product Management Application

Descripción:
La aplicación Product Management es una plataforma que permite a los usuarios ver una lista de productos, marcarlos como favoritos y visualizarlos en una sección separada. La aplicación está diseñada para ofrecer una experiencia de usuario intuitiva y moderna, con una interfaz responsiva y fácil de usar.

## Tecnologias utilizadas
- FrontEnd
    - React: Biblioteca de JavaScript para construir interfaces de usuario.
    - Ionic: Framework para construir aplicaciones móviles y web con una experiencia nativa.
    - TypeScript: Superset de JavaScript que añade tipado estático.
    - CSS: Para la estilización de los componentes y la aplicación en general.
- Backend
    - API Service: Servicios para interactuar con la API, obtener productos, manejar favoritos, etc.
    - Fetch API / Axios: Para realizar solicitudes HTTP.
- Otros
    - SCSS / CSS Modules: Para manejar estilos de manera modular y organizada.
    - React Router: Para la navegación entre diferentes vistas de la aplicación.

## Patrones de Diseño Utilizados

- Componente de Carga (Loading Spinner):
Un componente dedicado para mostrar un spinner de carga mientras los datos se están recuperando. Mejora la experiencia de usuario al proporcionar una indicación visual de que los datos están en proceso de carga.

- Separación de Preocupaciones:
La aplicación está organizada en componentes funcionales, cada uno encargado de una responsabilidad específica (e.g., ProductList, FavoritesList). Esto permite un código más modular y fácil de mantener.

- Estado Local y Efectos (Hooks):
Se utiliza el hook useState para manejar el estado local de los productos y favoritos, y useEffect para realizar la carga de datos cuando el componente se monta.

- Condicionales en Renderizado:
Se manejan diferentes estados de la aplicación (cargando, mostrando productos, etc.) mediante renderizado condicional, mejorando la interacción y experiencia del usuario.

## Requisitos previos
1. Node.js y npm - v20.12.2
2. Git
3. Ionic - 7.2.0

## Como ejecutar el FrontEnd

1. Instalar Dependencias:
Navega al directorio del proyecto y ejecuta:
```sh
npm install
```

2. Ejecutar la Aplicación:
```sh
npm run dev
```
