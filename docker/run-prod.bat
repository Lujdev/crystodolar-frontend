@echo off
REM Script simplificado para ejecutar Docker de producción desde la raíz del proyecto
REM Uso: docker\run-prod.bat [comando]

echo [CrystoDolar Docker PROD] Iniciando servicios de producción...

REM Verificar que estamos en la raíz del proyecto
if not exist "package.json" (
    echo Error: Este script debe ejecutarse desde la raíz del proyecto
    echo Uso: docker\run-prod.bat [comando]
    exit /b 1
)

REM Comandos disponibles
if "%~1"=="build" (
    echo Construyendo imagen de producción...
    docker-compose -f docker/docker-compose.prod.yml build --no-cache
) else if "%~1"=="start" (
    echo Iniciando servicios de producción...
    docker-compose -f docker/docker-compose.prod.yml up -d
) else if "%~1"=="stop" (
    echo Deteniendo servicios...
    docker-compose -f docker/docker-compose.prod.yml down
) else if "%~1"=="logs" (
    echo Mostrando logs...
    docker-compose -f docker/docker-compose.prod.yml logs -f
) else if "%~1"=="restart" (
    echo Reiniciando servicios...
    docker-compose -f docker/docker-compose.prod.yml restart
) else if "%~1"=="status" (
    echo Estado de los servicios...
    docker-compose -f docker/docker-compose.prod.yml ps
) else if "%~1"=="deploy" (
    echo Despliegue completo...
    docker-compose -f docker/docker-compose.prod.yml down
    docker-compose -f docker/docker-compose.prod.yml build --no-cache
    docker-compose -f docker/docker-compose.prod.yml up -d
) else if "%~1"=="monitor" (
    echo Monitoreando servicios...
    echo === Estado de los Contenedores ===
    docker-compose -f docker/docker-compose.prod.yml ps
    echo.
    echo === Uso de Recursos ===
    docker stats --no-stream
) else (
    echo Comandos disponibles:
    echo   build     - Construir imagen
    echo   start     - Iniciar servicios
    echo   stop      - Detener servicios
    echo   logs      - Ver logs
    echo   restart   - Reiniciar servicios
    echo   status    - Ver estado
    echo   deploy    - Despliegue completo
    echo   monitor   - Monitorear recursos
    echo.
    echo Ejemplo: docker\run-prod.bat start
)
