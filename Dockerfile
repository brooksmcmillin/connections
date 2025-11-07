# Multi-stage build for toddler-connections game
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including live-server)
RUN npm ci --only=production

# Copy application files
COPY . .

# Production stage - use nginx to serve static files
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --from=builder /app/*.html /usr/share/nginx/html/
COPY --from=builder /app/*.css /usr/share/nginx/html/
COPY --from=builder /app/*.js /usr/share/nginx/html/

# Expose port 8085
EXPOSE 8085

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8085/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
