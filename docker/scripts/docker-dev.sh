#!/bin/bash

# Script de desarrollo con Docker para CrystoDolar
# Uso: ./scripts/docker-dev.sh [comando]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_message() {
    echo -e "${BLUE}[CrystoDolar Docker]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Función para mostrar ayuda
show_help() {
    echo "Script de desarrollo con Docker para CrystoDolar"
    echo ""
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  build     - Construir imagen de desarrollo"
    echo "  start     - Iniciar servicios de desarrollo"
    echo "  stop      - Detener servicios"
    echo "  restart   - Reiniciar servicios"
    echo "  logs      - Mostrar logs de los servicios"
    echo "  shell     - Abrir shell en el contenedor"
    echo "  clean     - Limpiar contenedores e imágenes"
    echo "  help      - Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 build"
    echo "  $0 start"
    echo "  $0 logs"
}

# Función para construir imagen
build_dev() {
    print_message "Construyendo imagen de desarrollo..."
    docker-compose -f docker-compose.yml build
    print_success "Imagen construida exitosamente"
}

# Función para iniciar servicios
start_dev() {
    print_message "Iniciando servicios de desarrollo..."
    docker-compose -f docker-compose.yml up -d
    print_success "Servicios iniciados en http://localhost:3000"
    print_message "Para ver logs: $0 logs"
}

# Función para detener servicios
stop_dev() {
    print_message "Deteniendo servicios..."
    docker-compose -f docker-compose.yml down
    print_success "Servicios detenidos"
}

# Función para reiniciar servicios
restart_dev() {
    print_message "Reiniciando servicios..."
    docker-compose -f docker-compose.yml restart
    print_success "Servicios reiniciados"
}

# Función para mostrar logs
show_logs() {
    print_message "Mostrando logs de los servicios..."
    docker-compose -f docker-compose.yml logs -f
}

# Función para abrir shell
open_shell() {
    print_message "Abriendo shell en el contenedor..."
    docker-compose -f docker-compose.yml exec crystodolar-frontend /bin/sh
}

# Función para limpiar
clean_docker() {
    print_warning "¿Estás seguro de que quieres limpiar todo? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_message "Limpiando contenedores, imágenes y volúmenes..."
        docker-compose -f docker-compose.yml down -v --rmi all
        docker system prune -f
        print_success "Limpieza completada"
    else
        print_message "Limpieza cancelada"
    fi
}

# Función para verificar estado
check_status() {
    print_message "Verificando estado de los servicios..."
    docker-compose -f docker-compose.yml ps
}

# Función principal
main() {
    case "${1:-help}" in
        "build")
            build_dev
            ;;
        "start")
            start_dev
            ;;
        "stop")
            stop_dev
            ;;
        "restart")
            restart_dev
            ;;
        "logs")
            show_logs
            ;;
        "shell")
            open_shell
            ;;
        "clean")
            clean_docker
            ;;
        "status")
            check_status
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Ejecutar función principal
main "$@"
