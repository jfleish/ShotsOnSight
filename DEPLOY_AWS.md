# Deploy ShotsOnSight to AWS (Simplest Path)

Uses **EC2** (single instance) to host both the Express backend and the built React frontend.

## Prerequisites
- AWS account with EC2 access
- Your MongoDB Atlas connection string
- SSH key pair created in AWS console

## 1. Launch EC2 Instance

1. Go to **EC2 → Launch Instance**
2. **AMI:** Amazon Linux 2023
3. **Type:** t3.small (or t2.micro for free tier)
4. **Security Group:** Allow inbound **TCP 80, 443, 22**
5. **Key pair:** Select/create one for SSH
6. Launch and note the **Public IP**

## 2. SSH & Install Dependencies

```bash
ssh -i your-key.pem ec2-user@<PUBLIC_IP>

# Install Node 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs git

# Install PM2 (process manager)
sudo npm install -g pm2
```

## 3. Clone & Build

```bash
git clone https://github.com/jfleish/ShotsOnSight.git
cd ShotsOnSight

# Build frontend
npm install
npm run build

# Build backend
cd server
npm install
npx tsc
```

## 4. Configure Environment

```bash
cat > server/.env << 'EOF'
MONGODB_URI=mongodb+srv://aaf9407:aaf9407@cluster1.zazizac.mongodb.net/shotsonsight?retryWrites=true&w=majority&appName=Cluster1
PORT=3001
NODE_ENV=production
EOF
```

## 5. Update Server to Serve Frontend

Add static file serving to `server/index.ts` (already proxied in dev, need to serve in prod). Create a small production wrapper:

```bash
cat > server/dist/serve.js << 'EOF'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import the compiled server
import './index.js';

// The server is already started in index.js
// Just need to add static serving before it starts
EOF
```

**Or simpler** — use `nginx` as a reverse proxy:

```bash
sudo yum install -y nginx

sudo tee /etc/nginx/conf.d/shotsonsight.conf << 'EOF'
server {
    listen 80;
    server_name _;

    root /home/ec2-user/ShotsOnSight/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

sudo nginx -t && sudo systemctl start nginx && sudo systemctl enable nginx
```

## 6. Seed Database & Start Server

```bash
cd ~/ShotsOnSight/server
node dist/seed.js
pm2 start dist/index.js --name shots-backend
pm2 save
pm2 startup  # follow the printed command
```

## 7. Access

Open `http://<PUBLIC_IP>` in your browser. Done.

## Quick Troubleshooting

- **DNS not resolving MongoDB:** Add `dns.setServers(['8.8.8.8'])` in `db.ts` (already done)
- **502 errors:** Check `pm2 logs shots-backend`
- **Frontend 404:** Ensure `npm run build` output is in `dist/`
