# ── Stage 1: Build the frontend ──────────────────────────────
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build
# Output will be at /app/frontend/dist

# ── Stage 2: Build the backend ───────────────────────────────
FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
# Copy Prisma schema BEFORE npm ci — postinstall runs prisma generate
COPY backend/prisma ./prisma
RUN npm ci
COPY backend/ ./
# Generate Prisma client and compile TypeScript
RUN npm run build
# Output will be at /app/backend/dist

# ── Stage 3: Production image ─────────────────────────────────
FROM node:20-alpine
WORKDIR /app

# Copy backend production deps only
COPY backend/package*.json ./
# Copy Prisma schema BEFORE npm ci — postinstall runs prisma generate
COPY backend/prisma ./prisma
RUN npm ci --omit=dev

# Copy compiled backend
COPY --from=backend-build /app/backend/dist ./dist

# Copy Prisma schema + generated client
COPY --from=backend-build /app/backend/prisma ./prisma
COPY --from=backend-build /app/backend/node_modules/.prisma ./node_modules/.prisma
COPY --from=backend-build /app/backend/node_modules/@prisma ./node_modules/@prisma

# Copy built frontend into a folder the backend can serve statically
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000
CMD ["npm", "run", "start"]