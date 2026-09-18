# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# 构建
RUN npm run build

# 运行阶段 - nginx
FROM nginx:alpine

ARG BUILD_REVISION=unknown

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露当前线上构建对应的 git revision，供部署验收使用
RUN printf '%s\n' "$BUILD_REVISION" > /usr/share/nginx/html/version.txt

# 复制 nginx 配置
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
