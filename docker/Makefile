# Makefile para CrystoDolar con Docker
# Uso: make [target] (desde la carpeta docker/)

.PHONY: help build dev start stop restart logs shell clean prod-build prod-start prod-stop prod-restart prod-logs prod-deploy prod-monitor

# Variables
DOCKER_DEV_COMPOSE = docker-compose.dev.yml
DOCKER_PROD_COMPOSE = docker-compose.prod.yml
SERVICE_NAME = crystodolar-frontend

# Colores para output
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color

# Target por defecto
help: ## Mostrar esta ayuda
	@echo "$(BLUE)CrystoDolar Docker Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Desarrollo:$(NC)"
	@echo "  make build      - Construir imagen de desarrollo"
	@echo "  make dev        - Iniciar modo desarrollo"
	@echo "  make start      - Iniciar servicios de desarrollo"
	@echo "  make stop       - Detener servicios"
	@echo "  make restart    - Reiniciar servicios"
	@echo "  make logs       - Ver logs"
	@echo "  make shell      - Abrir shell en contenedor"
	@echo ""
	@echo "$(GREEN)Producción:$(NC)"
	@echo "  make prod-build   - Construir imagen de producción"
	@echo "  make prod-start   - Iniciar servicios de producción"
	@echo "  make prod-stop    - Detener servicios de producción"
	@echo "  make prod-restart - Reiniciar servicios de producción"
	@echo "  make prod-logs    - Ver logs de producción"
	@echo "  make prod-deploy  - Despliegue completo"
	@echo "  make prod-monitor - Monitorear servicios"
	@echo ""
	@echo "$(GREEN)Utilidades:$(NC)"
	@echo "  make clean      - Limpiar contenedores e imágenes"
	@echo "  make status     - Ver estado de servicios"
	@echo "  make health     - Verificar salud de servicios"
	@echo ""
	@echo "$(GREEN)Scripts:$(NC)"
	@echo "  make scripts    - Mostrar scripts disponibles"
	@echo "  make nginx      - Mostrar configuración Nginx"

# ========================================
# DESARROLLO
# ========================================

build: ## Construir imagen de desarrollo
	@echo "$(BLUE)🔨 Construyendo imagen de desarrollo...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) build
	@echo "$(GREEN)✅ Imagen construida exitosamente$(NC)"

dev: ## Iniciar modo desarrollo
	@echo "$(BLUE)🚀 Iniciando modo desarrollo...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) up
	@echo "$(GREEN)✅ Desarrollo iniciado$(NC)"

start: ## Iniciar servicios de desarrollo
	@echo "$(BLUE)🚀 Iniciando servicios de desarrollo...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) up -d
	@echo "$(GREEN)✅ Servicios iniciados en http://localhost:3000$(NC)"

stop: ## Detener servicios
	@echo "$(BLUE)🛑 Deteniendo servicios...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) down
	@echo "$(GREEN)✅ Servicios detenidos$(NC)"

restart: ## Reiniciar servicios
	@echo "$(BLUE)🔄 Reiniciando servicios...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) restart
	@echo "$(GREEN)✅ Servicios reiniciados$(NC)"

logs: ## Mostrar logs
	@echo "$(BLUE)📋 Mostrando logs...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) logs -f

shell: ## Abrir shell en contenedor
	@echo "$(BLUE)🐚 Abriendo shell...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) exec $(SERVICE_NAME) /bin/sh

# ========================================
# PRODUCCIÓN
# ========================================

prod-build: ## Construir imagen de producción
	@echo "$(BLUE)🔨 Construyendo imagen de producción...$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) build --no-cache
	@echo "$(GREEN)✅ Imagen de producción construida$(NC)"

prod-start: ## Iniciar servicios de producción
	@echo "$(BLUE)🚀 Iniciando servicios de producción...$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) up -d
	@echo "$(GREEN)✅ Servicios de producción iniciados$(NC)"

prod-stop: ## Detener servicios de producción
	@echo "$(BLUE)🛑 Deteniendo servicios de producción...$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) down
	@echo "$(GREEN)✅ Servicios de producción detenidos$(NC)"

prod-restart: ## Reiniciar servicios de producción
	@echo "$(BLUE)🔄 Reiniciando servicios de producción...$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) restart
	@echo "$(GREEN)✅ Servicios de producción reiniciados$(NC)"

prod-logs: ## Ver logs de producción
	@echo "$(BLUE)📋 Mostrando logs de producción...$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) logs -f

prod-deploy: ## Despliegue completo de producción
	@echo "$(BLUE)🚀 Iniciando despliegue completo...$(NC)"
	@$(MAKE) prod-build
	@$(MAKE) prod-stop
	@$(MAKE) prod-start
	@echo "$(GREEN)✅ Despliegue completado$(NC)"

prod-monitor: ## Monitorear servicios de producción
	@echo "$(BLUE)📊 Monitoreando servicios...$(NC)"
	@echo "=== Estado de los Contenedores ==="
	docker-compose -f $(DOCKER_PROD_COMPOSE) ps
	@echo ""
	@echo "=== Uso de Recursos ==="
	docker stats --no-stream

# ========================================
# UTILIDADES
# ========================================

status: ## Ver estado de servicios
	@echo "$(BLUE)📊 Estado de servicios:$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) ps
	@echo ""
	@echo "$(BLUE)📊 Estado de servicios de producción:$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) ps

health: ## Verificar salud de servicios
	@echo "$(BLUE)🏥 Verificando salud de servicios...$(NC)"
	@if curl -f http://localhost:3000/health > /dev/null 2>&1; then \
		echo "$(GREEN)✅ Health check exitoso$(NC)"; \
	else \
		echo "$(YELLOW)⚠️  Health check falló$(NC)"; \
	fi

clean: ## Limpiar contenedores e imágenes
	@echo "$(YELLOW)🧹 Limpiando Docker...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) down -v --rmi all
	docker-compose -f $(DOCKER_PROD_COMPOSE) down -v --rmi all
	docker system prune -f
	@echo "$(GREEN)✅ Limpieza completada$(NC)"

# ========================================
# INFORMACIÓN
# ========================================

scripts: ## Mostrar scripts disponibles
	@echo "$(BLUE)📜 Scripts disponibles:$(NC)"
	@echo ""
	@echo "$(GREEN)Desarrollo:$(NC)"
	@echo "  scripts/docker-dev.sh    - Script Unix para desarrollo"
	@echo "  scripts/docker-dev.bat   - Script Windows para desarrollo"
	@echo ""
	@echo "$(GREEN)Producción:$(NC)"
	@echo "  scripts/docker-prod.sh   - Script Unix para producción"
	@echo "  scripts/docker-prod.bat  - Script Windows para producción"
	@echo ""
	@echo "$(GREEN)Uso:$(NC)"
	@echo "  ./scripts/docker-dev.sh help"
	@echo "  scripts/docker-prod.bat help"

nginx: ## Mostrar configuración Nginx
	@echo "$(BLUE)🌐 Configuración Nginx:$(NC)"
	@echo ""
	@echo "Archivo: configs/nginx.conf"
	@echo "Puertos: 80 (HTTP) y 443 (HTTPS)"
	@echo ""
	@echo "Para usar Nginx:"
	@echo "  docker-compose -f docker-compose.prod.yml --profile nginx up -d"

# ========================================
# DESARROLLO RÁPIDO
# ========================================

quick-dev: ## Desarrollo rápido (build + start)
	@$(MAKE) build
	@$(MAKE) start
	@echo "$(GREEN)✅ Desarrollo rápido iniciado$(NC)"

quick-prod: ## Producción rápida (build + start)
	@$(MAKE) prod-build
	@$(MAKE) prod-start
	@echo "$(GREEN)✅ Producción rápida iniciada$(NC)"

# ========================================
# DEBUGGING
# ========================================

debug: ## Modo debug con logs
	@echo "$(BLUE)🐛 Modo debug activado...$(NC)"
	docker-compose -f $(DOCKER_DEV_COMPOSE) logs -f --tail=100

debug-prod: ## Modo debug de producción
	@echo "$(BLUE)🐛 Debug de producción...$(NC)"
	docker-compose -f $(DOCKER_PROD_COMPOSE) logs -f --tail=100

# ========================================
# MANTENIMIENTO
# ========================================

backup: ## Crear backup
	@echo "$(BLUE)💾 Creando backup...$(NC)"
	@mkdir -p backups
	@docker run --rm -v crystodolar-frontend_crystodolar-network:/data -v $(PWD)/backups:/backup alpine tar czf "/backup/crystodolar-backup-$(shell date +%Y%m%d-%H%M%S).tar" -C /data .
	@echo "$(GREEN)✅ Backup creado$(NC)"

update: ## Actualizar desde git y redeploy
	@echo "$(BLUE)🔄 Actualizando desde git...$(NC)"
	@cd .. && git pull origin main
	@$(MAKE) prod-deploy
	@echo "$(GREEN)✅ Actualización completada$(NC)"
