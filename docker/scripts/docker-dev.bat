@echo off
REM Script de desarrollo con Docker para CrystoDolar (Windows)
REM Uso: docker-dev.bat [comando]

setlocal enabledelayedexpansion

REM Saltar a la lógica principal
goto :start_script

REM Función para mostrar mensajes
:print_message
echo [CrystoDolar Docker] %~1
goto :eof

REM Función para mostrar éxito
:print_success
echo ✅ %~1
goto :eof

REM Función para mostrar advertencia
:print_warning
echo ⚠️  %~1
goto :eof

REM Función para mostrar error
:print_error
echo ❌ %~1
goto :eof

REM Función para mostrar ayuda
:show_help
echo Script de desarrollo con Docker para CrystoDolar
echo.
echo Uso: %~nx0 [comando]
echo.
echo Comandos disponibles:
echo   build     - Construir imagen de desarrollo
echo   start     - Iniciar servicios de desarrollo
echo   stop      - Detener servicios
echo   restart   - Reiniciar servicios
echo   logs      - Mostrar logs de los servicios
echo   shell     - Abrir shell en el contenedor
echo   clean     - Limpiar contenedores e imágenes
echo   help      - Mostrar esta ayuda
echo.
echo Ejemplos:
echo   %~nx0 build
echo   %~nx0 start
echo   %~nx0 logs
goto :eof

REM Función para construir imagen
:build_dev
call :print_message "Construyendo imagen de desarrollo..."
docker-compose -f docker\docker-compose.dev.yml build
if %errorlevel% equ 0 (
    call :print_success "Imagen construida exitosamente"
) else (
    call :print_error "Error al construir imagen"
)
goto :eof

REM Función para iniciar servicios
:start_dev
call :print_message "Iniciando servicios de desarrollo..."
docker-compose -f docker\docker-compose.dev.yml up -d
if %errorlevel% equ 0 (
    call :print_success "Servicios iniciados en http://localhost:3000"
    call :print_message "Para ver logs: %~nx0 logs"
) else (
    call :print_error "Error al iniciar servicios"
)
goto :eof

REM Función para detener servicios
:stop_dev
call :print_message "Deteniendo servicios..."
docker-compose -f docker\docker-compose.dev.yml down
if %errorlevel% equ 0 (
    call :print_success "Servicios detenidos"
) else (
    call :print_error "Error al detener servicios"
)
goto :eof

REM Función para reiniciar servicios
:restart_dev
call :print_message "Reiniciando servicios..."
docker-compose -f docker\docker-compose.dev.yml restart
if %errorlevel% equ 0 (
    call :print_success "Servicios reiniciados"
) else (
    call :print_error "Error al reiniciar servicios"
)
goto :eof

REM Función para mostrar logs
:show_logs
call :print_message "Mostrando logs de los servicios..."
docker-compose -f docker\docker-compose.dev.yml logs -f
goto :eof

REM Función para abrir shell
:open_shell
call :print_message "Abriendo shell en el contenedor..."
docker-compose -f docker\docker-compose.dev.yml exec crystodolar-frontend /bin/sh
goto :eof

REM Función para limpiar
:clean_docker
call :print_warning "¿Estás seguro de que quieres limpiar todo? (y/N)"
set /p response=
if /i "!response!"=="y" (
    call :print_message "Limpiando contenedores, imágenes y volúmenes..."
    docker-compose -f docker\docker-compose.dev.yml down -v --rmi all
    docker system prune -f
    call :print_success "Limpieza completada"
) else (
    call :print_message "Limpieza cancelada"
)
goto :eof

REM Función para verificar estado
:check_status
call :print_message "Verificando estado de los servicios..."
docker-compose -f docker\docker-compose.dev.yml ps
goto :eof

REM Función principal
:main
if "%~1"=="" goto :show_help

if "%~1"=="build" goto :build_dev
if "%~1"=="start" goto :start_dev
if "%~1"=="stop" goto :stop_dev
if "%~1"=="restart" goto :restart_dev
if "%~1"=="logs" goto :show_logs
if "%~1"=="shell" goto :open_shell
if "%~1"=="clean" goto :clean_docker
if "%~1"=="status" goto :check_status
if "%~1"=="help" goto :show_help

REM Comando no reconocido
call :print_error "Comando no reconocido: %~1"
goto :show_help

REM Verificar si Docker está instalado y ejecutándose
:check_docker
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Docker no está instalado. Por favor instala Docker primero."
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit /b 1
)

REM Verificar que Docker Desktop esté ejecutándose
docker info >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Docker Desktop no está ejecutándose. Por favor inicia Docker Desktop y vuelve a intentar."
    exit /b 1
)
goto :eof

REM Lógica principal del script
:start_script
call :check_docker
if %errorlevel% neq 0 exit /b %errorlevel%
call :main %*
