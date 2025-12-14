FROM nginx:alpine

# Copiar configuración
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar certificados SSL (para desarrollo)
COPY certs/ /etc/nginx/certs/

# Crear directorios de logs
RUN mkdir -p /var/log/nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]