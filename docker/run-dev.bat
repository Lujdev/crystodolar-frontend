@echo off
REM Script simplificado para ejecutar Docker desde la raíz del proyecto
REM Uso: cd .. && docker\run-dev.bat [comando]

echo [CrystoDolar Docker] Iniciando servicios de desarrollo...

REM Verificar que estamos en la raíz del proyecto
if not exist "package.json" (
    echo Error: Este script debe ejecutarse desde la raíz del proyecto
    echo Uso: cd .. && docker\run-dev.bat [comando]
    exit /b 1
)

REM Comandos disponibles
if "%~1"=="build" (
    echo Construyendo imagen de desarrollo...
    docker-compose -f docker/docker-compose.dev.yml build
) else if "%~1"=="start" (
    echo Iniciando servicios de desarrollo...
    docker-compose -f docker/docker-compose.dev.yml up -d
) else if "%~1"=="stop" (
    echo Deteniendo servicios...
    docker-compose -f docker/docker-compose.dev.yml down
) else if "%~1"=="logs" (
    echo Mostrando logs...
    docker-compose -f docker/docker-compose.dev.yml logs -f
) else if "%~1"=="restart" (
    echo Reiniciando servicios...
    docker-compose -f docker/docker-compose.dev.yml restart
) else if "%~1"=="status" (
    echo Estado de los servicios...
    docker-compose -f docker/docker-compose.dev.yml ps
) else (
    echo Comandos disponibles:
    echo   build    - Construir imagen
    echo   start    - Iniciar servicios
    echo   stop     - Detener servicios
    echo   logs     - Ver logs
    echo   restart  - Reiniciar servicios
    echo   status   - Ver estado
    echo.
    echo Ejemplo: docker\run-dev.bat start
)
