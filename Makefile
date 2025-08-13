# Makefile principal para CrystoDolar
# Redirige todos los comandos a la carpeta docker/

.PHONY: help

# Target por defecto
help: ## Mostrar ayuda de Docker
	@echo "🐳 CrystoDolar - Comandos Docker"
	@echo ""
	@echo "Todos los comandos Docker están en la carpeta docker/"
	@echo ""
	@echo "Para usar Docker:"
	@echo "  cd docker"
	@echo "  make help"
	@echo ""
	@echo "O usar directamente:"
	@echo "  make -f docker/Makefile help"
	@echo ""
	@echo "Para desarrollo local (sin Docker):"
	@echo "  pnpm dev"
	@echo "  pnpm build"
	@echo "  pnpm start"
	@echo ""
	@echo "Para Vercel:"
	@echo "  vercel"
	@echo "  vercel --prod"

# Redirigir todos los comandos Docker a la carpeta docker
%:
	@make -f docker/Makefile $@
