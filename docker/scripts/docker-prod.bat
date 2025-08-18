@echo off
REM Script de producción con Docker para CrystoDolar (Windows)
REM Uso: docker-prod.bat [comando]

setlocal enabledelayedexpansion
goto :start_script

REM Colores para output (Windows 10+)
set "BLUE=[94m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "NC=[0m"

REM Función para mostrar mensajes
:print_message
echo %BLUE%[CrystoDolar Docker PROD]%NC% %~1
goto :eof

REM Función para mostrar éxito
:print_success
echo %GREEN%✅ %~1%NC%
goto :eof

REM Función para mostrar advertencia
:print_warning
echo %YELLOW%⚠️  %~1%NC%
goto :eof

REM Función para mostrar error
:print_error
echo %RED%❌ %~1%NC%
goto :eof

REM Función para mostrar ayuda
:show_help
echo Script de producción con Docker para CrystoDolar
echo.
echo Uso: %~nx0 [comando]
echo.
echo Comandos disponibles:
echo   build     - Construir imagen de producción
echo   start     - Iniciar servicios de producción
echo   stop      - Detener servicios
echo   restart   - Reiniciar servicios
echo   logs      - Mostrar logs de los servicios
echo   deploy    - Despliegue completo (build + start)
echo   update    - Actualizar y reiniciar servicios
echo   backup    - Crear backup de la aplicación
echo   monitor   - Monitorear estado de los servicios
echo   help      - Mostrar esta ayuda
echo.
echo Ejemplos:
echo   %~nx0 build
echo   %~nx0 deploy
echo   %~nx0 monitor
goto :eof

REM Función para construir imagen de producción
:build_prod
call :print_message "Construyendo imagen de producción..."
docker-compose -f docker\docker-compose.prod.yml build --no-cache
if %errorlevel% equ 0 (
    call :print_success "Imagen de producción construida exitosamente"
) else (
    call :print_error "Error al construir imagen de producción"
)
goto :eof

REM Función para iniciar servicios de producción
:start_prod
call :print_message "Iniciando servicios de producción..."
docker-compose -f docker\docker-compose.prod.yml up -d
if %errorlevel% equ 0 (
    call :print_success "Servicios de producción iniciados"
    call :print_message "Aplicación disponible en http://localhost:3000"
) else (
    call :print_error "Error al construir imagen de producción"
)
goto :eof

REM Función para detener servicios
:stop_prod
call :print_message "Deteniendo servicios de producción..."
docker-compose -f docker\docker-compose.prod.yml down
if %errorlevel% equ 0 (
    call :print_success "Servicios detenidos"
) else (
    call :print_error "Error al detener servicios"
)
goto :eof

REM Función para reiniciar servicios
:restart_prod
call :print_message "Reiniciando servicios de producción..."
docker-compose -f docker\docker-compose.prod.yml restart
if %errorlevel% equ 0 (
    call :print_success "Servicios reiniciados"
) else (
    call :print_error "Error al reiniciar servicios"
)
goto :eof

REM Función para mostrar logs
:show_logs
call :print_message "Mostrando logs de los servicios de producción..."
docker-compose -f docker\docker-compose.prod.yml logs -f
goto :eof

REM Función para despliegue completo
:deploy_prod
call :print_message "Iniciando despliegue completo..."
call :build_prod
call :stop_prod
call :start_prod
timeout /t 10 /nobreak >nul
call :check_health
call :print_success "Despliegue completado exitosamente"
goto :eof

REM Función para actualizar servicios
:update_prod
call :print_message "Actualizando servicios..."
call :print_message "Obteniendo última versión del código..."
git pull origin main
call :build_prod
call :restart_prod
call :print_success "Servicios actualizados"
goto :eof

REM Función para verificar salud
:check_health
call :print_message "Verificando salud de los servicios..."
docker-compose -f docker\docker-compose.prod.yml ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    call :print_success "Servicios funcionando correctamente"
) else (
    call :print_error "Algunos servicios no están funcionando"
    docker-compose -f docker\docker-compose.prod.yml ps
    exit /b 1
)

REM Verificar endpoint de salud
curl -f http://localhost:3000/health >nul 2>&1
if %errorlevel% equ 0 (
    call :print_success "Health check exitoso"
) else (
    call :print_warning "Health check falló - verificar logs"
)
goto :eof

REM Función para monitorear
:monitor_prod
call :print_message "Monitoreando servicios de producción..."
echo.
echo === Estado de los Contenedores ===
docker-compose -f docker\docker-compose.prod.yml ps
echo.
echo === Uso de Recursos ===
docker stats --no-stream
echo.
echo === Logs Recientes ===
docker-compose -f docker\docker-compose.prod.yml logs --tail=20
goto :eof

REM Función para crear backup
:backup_prod
call :print_message "Creando backup de la aplicación..."
if not exist "backups" mkdir backups
set "BACKUP_NAME=crystodolar-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%.tar"
set "BACKUP_NAME=%BACKUP_NAME: =0%"
docker run --rm -v crystodolar-frontend_crystodolar-network:/data -v "%cd%\backups:/backup" alpine tar czf "/backup/%BACKUP_NAME%" -C /data .
call :print_success "Backup creado: backups\%BACKUP_NAME%"
goto :eof

REM Función para limpiar
:clean_prod
call :print_warning "¿Estás seguro de que quieres limpiar todo? (y/N)"
set /p response=
if /i "!response!"=="y" (
    call :print_message "Limpiando contenedores, imágenes y volúmenes..."
    docker-compose -f docker\docker-compose.prod.yml down -v --rmi all
    docker system prune -f
    call :print_success "Limpieza completada"
) else (
    call :print_message "Limpieza cancelada"
)
goto :eof

REM Función principal
:main
if "%~1"=="" goto :show_help

if "%~1"=="build" goto :build_prod
if "%~1"=="start" goto :start_prod
if "%~1"=="stop" goto :stop_prod
if "%~1"=="restart" goto :restart_prod
if "%~1"=="logs" goto :show_logs
if "%~1"=="deploy" goto :deploy_prod
if "%~1"=="update" goto :update_prod
if "%~1"=="backup" goto :backup_prod
if "%~1"=="monitor" goto :monitor_prod
if "%~1"=="clean" goto :clean_prod
if "%~1"=="help" goto :show_help

REM Comando no reconocido
call :print_error "Comando no reconocido: %~1"
call :show_help
exit /b 1

REM Verificar si Docker está instalado
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
goto :eof

:start_script
call :check_docker
if %errorlevel% neq 0 exit /b %errorlevel%
call :main %*
