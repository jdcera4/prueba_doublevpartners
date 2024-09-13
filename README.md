# Prueba tecnica
 - Para ejecutar cada parte del proyecto hay que tener en cuenta navegar a cada carpeta para ejecutar su codigo
 - Backend - OnlineStoreApi


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