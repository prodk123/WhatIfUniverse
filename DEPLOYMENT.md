# Deployment Guide

This guide walks through deploying the "What If Universe" platform to a VPS.

## Infrastructure Architecture

1. **Host**: Ubuntu VPS (e.g., Hostinger, Hetzner, DigitalOcean)
2. **Reverse Proxy**: Cloudflare (DNS + CDN + SSL + Web Application Firewall)
3. **Local Proxy**: Nginx (Running inside Docker)
4. **App**: Next.js Standalone Build (Running inside Docker)

## Step 1: VPS Setup

1. Provision a VPS (1GB RAM is sufficient for starting out).
2. SSH into the server:
   ```bash
   ssh root@<your-vps-ip>
   ```
3. Install Docker and Docker Compose:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   apt install docker-compose-plugin
   ```

## Step 2: Cloudflare Setup

1. Add your domain (`whatifuniverse.com`) to Cloudflare.
2. Update your domain's nameservers at your registrar to point to Cloudflare.
3. In Cloudflare DNS settings:
   - Add an `A` record for `@` pointing to your `<your-vps-ip>` (Proxied / Orange Cloud).
   - Add a `CNAME` record for `www` pointing to `whatifuniverse.com` (Proxied / Orange Cloud).
4. In Cloudflare SSL/TLS settings:
   - Set SSL mode to **Full (Strict)**.

## Step 3: Application Setup

1. Clone the repository on your VPS:
   ```bash
   git clone https://github.com/yourusername/whatifuniverse.git /opt/whatifuniverse
   cd /opt/whatifuniverse
   ```
2. Create your `.env.local` file:
   ```bash
   cp .env.example .env.local
   nano .env.local
   # Fill in your AdSense and GA IDs
   ```
3. Start the application:
   ```bash
   docker-compose up -d --build
   ```

## Step 4: Automated Deployments (CI/CD)

This repository includes a GitHub Actions workflow that automatically deploys to your VPS on every push to the `main` branch.

To enable it, add the following Secrets to your GitHub repository (`Settings > Secrets and variables > Actions > New repository secret`):

- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: `root` (or your deployment user)
- `VPS_SSH_KEY`: The private SSH key used to access your VPS

## Security Note: CVE-2025-29927 Mitigation

This application is protected against the Next.js middleware bypass vulnerability (CVE-2025-29927) via two layers:
1. The included `nginx.conf` strips the `x-middleware-subrequest` header.
2. **Recommended**: In Cloudflare, create a WAF Transform Rule to remove the `x-middleware-subrequest` header from all incoming requests before they even reach your VPS.
