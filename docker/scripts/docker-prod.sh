#!/bin/bash

# Script de producción con Docker para CrystoDolar
# Uso: ./scripts/docker-prod.sh [comando]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_message() {
    echo -e "${BLUE}[CrystoDolar Docker PROD]${NC} $1"
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
    echo "Script de producción con Docker para CrystoDolar"
    echo ""
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  build     - Construir imagen de producción"
    echo "  start     - Iniciar servicios de producción"
    echo "  stop      - Detener servicios"
    echo "  restart   - Reiniciar servicios"
    echo "  logs      - Mostrar logs de los servicios"
    echo "  deploy    - Despliegue completo (build + start)"
    echo "  update    - Actualizar y reiniciar servicios"
    echo "  backup    - Crear backup de la aplicación"
    echo "  monitor   - Monitorear estado de los servicios"
    echo "  help      - Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 build"
    echo "  $0 deploy"
    echo "  $0 monitor"
}

# Función para construir imagen de producción
build_prod() {
    print_message "Construyendo imagen de producción..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    print_success "Imagen de producción construida exitosamente"
}

# Función para iniciar servicios de producción
start_prod() {
    print_message "Iniciando servicios de producción..."
    docker-compose -f docker-compose.prod.yml up -d
    print_success "Servicios de producción iniciados"
    print_message "Aplicación disponible en http://localhost:3000"
}

# Función para detener servicios
stop_prod() {
    print_message "Deteniendo servicios de producción..."
    docker-compose -f docker-compose.prod.yml down
    print_success "Servicios detenidos"
}

# Función para reiniciar servicios
restart_prod() {
    print_message "Reiniciando servicios de producción..."
    docker-compose -f docker-compose.prod.yml restart
    print_success "Servicios reiniciados"
}

# Función para mostrar logs
show_logs() {
    print_message "Mostrando logs de los servicios de producción..."
    docker-compose -f docker-compose.prod.yml logs -f
}

# Función para despliegue completo
deploy_prod() {
    print_message "Iniciando despliegue completo..."
    
    # Construir imagen
    build_prod
    
    # Detener servicios existentes
    stop_prod
    
    # Iniciar nuevos servicios
    start_prod
    
    # Verificar salud
    sleep 10
    check_health
    
    print_success "Despliegue completado exitosamente"
}

# Función para actualizar servicios
update_prod() {
    print_message "Actualizando servicios..."
    
    # Obtener última versión del código
    git pull origin main
    
    # Construir nueva imagen
    build_prod
    
    # Reiniciar servicios
    restart_prod
    
    print_success "Servicios actualizados"
}

# Función para verificar salud
check_health() {
    print_message "Verificando salud de los servicios..."
    
    # Verificar contenedor principal
    if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        print_success "Servicios funcionando correctamente"
    else
        print_error "Algunos servicios no están funcionando"
        docker-compose -f docker-compose.prod.yml ps
        exit 1
    fi
    
    # Verificar endpoint de salud
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        print_success "Health check exitoso"
    else
        print_warning "Health check falló - verificar logs"
    fi
}

# Función para monitorear
monitor_prod() {
    print_message "Monitoreando servicios de producción..."
    
    echo ""
    echo "=== Estado de los Contenedores ==="
    docker-compose -f docker-compose.prod.yml ps
    
    echo ""
    echo "=== Uso de Recursos ==="
    docker stats --no-stream
    
    echo ""
    echo "=== Logs Recientes ==="
    docker-compose -f docker-compose.prod.yml logs --tail=20
}

# Función para crear backup
backup_prod() {
    print_message "Creando backup de la aplicación..."
    
    BACKUP_DIR="./backups"
    BACKUP_NAME="crystodolar-backup-$(date +%Y%m%d-%H%M%S).tar"
    
    mkdir -p "$BACKUP_DIR"
    
    # Crear backup de volúmenes
    docker run --rm -v crystodolar-frontend_crystodolar-network:/data -v "$(pwd)/$BACKUP_DIR:/backup" alpine tar czf "/backup/$BACKUP_NAME" -C /data .
    
    print_success "Backup creado: $BACKUP_DIR/$BACKUP_NAME"
}

# Función para limpiar
clean_prod() {
    print_warning "¿Estás seguro de que quieres limpiar todo? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_message "Limpiando contenedores, imágenes y volúmenes..."
        docker-compose -f docker-compose.prod.yml down -v --rmi all
        docker system prune -f
        print_success "Limpieza completada"
    else
        print_message "Limpieza cancelada"
    fi
}

# Función principal
main() {
    case "${1:-help}" in
        "build")
            build_prod
            ;;
        "start")
            start_prod
            ;;
        "stop")
            stop_prod
            ;;
        "restart")
            restart_prod
            ;;
        "logs")
            show_logs
            ;;
        "deploy")
            deploy_prod
            ;;
        "update")
            update_prod
            ;;
        "backup")
            backup_prod
            ;;
        "monitor")
            monitor_prod
            ;;
        "health")
            check_health
            ;;
        "clean")
            clean_prod
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

# Verificar si curl está disponible para health checks
if ! command -v curl &> /dev/null; then
    print_warning "curl no está instalado. Los health checks no funcionarán correctamente."
fi

# Ejecutar función principal
main "$@"
