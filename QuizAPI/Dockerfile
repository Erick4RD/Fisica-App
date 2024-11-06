# Usa la imagen del SDK de .NET para la construcción
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copia los archivos de proyecto y restaura las dependencias
COPY . . 
RUN dotnet restore

# Publica el proyecto en modo Release
RUN dotnet publish -c Release -o out

# Usa una imagen más ligera para la ejecución de la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Crea la carpeta /app/Images en el contenedor de runtime
RUN mkdir -p /app/Images

# Copia los archivos publicados desde la imagen build a runtime
COPY --from=build /app/out .

# Expone el puerto que la app escuchará (importante)
EXPOSE 5000

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "QuizAPI.dll"]
