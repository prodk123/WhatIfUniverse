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

## AWS EC2 Specific Deployment Guide

If you are using AWS EC2 (e.g. with free credits), follow these exact steps to prepare your server before hooking it up to Cloudflare and GitHub Actions:

### 1. Launching the EC2 Instance
1. Log in to the **AWS Management Console** and navigate to **EC2**.
2. Click **Launch Instance**.
3. **Name:** Give your instance a name (e.g., `what-if-universe-prod`).
4. **Application and OS Images (AMI):** Select **Ubuntu** (Ubuntu Server 24.04 LTS or similar).
5. **Instance Type:** Select **t2.micro** or **t3.micro** (these are often eligible for the Free Tier).
6. **Key Pair (login):** 
   - Click **Create new key pair**.
   - Name it (e.g., `aws-whatif-key`).
   - Keep the format as RSA and `.pem`.
   - Click **Create key pair**. *The file will immediately download to your computer. Keep it safe!*
7. **Network Settings:**
   - Ensure "Auto-assign public IP" is **Enable**.
   - Check the boxes for:
     - **Allow SSH traffic from** (Anywhere `0.0.0.0/0`)
     - **Allow HTTPS traffic from the internet**
     - **Allow HTTP traffic from the internet**
8. Click **Launch Instance**.

### 2. Setting up an Elastic IP (Critical)
By default, your EC2 instance will get a new IP address every time it restarts. This will break your Cloudflare DNS! You need a permanent IP.
1. In the left sidebar of the EC2 dashboard, scroll down to **Network & Security** and click **Elastic IPs**.
2. Click **Allocate Elastic IP address** and hit Allocate.
3. Select your newly created Elastic IP, click the **Actions** dropdown, and choose **Associate Elastic IP address**.
4. Choose the Instance you just created, and click **Associate**.
5. *Copy this new Elastic IP address! This is the permanent IP you will use for Cloudflare and GitHub.*

### 3. Server Initialization
You need to install Docker on your new AWS server so it can run the platform.
1. SSH into your server using the `.pem` key you downloaded:
   ```bash
   ssh -i /path/to/your/aws-whatif-key.pem ubuntu@<your-elastic-ip>
   ```
   *(Note: The username for AWS Ubuntu is always `ubuntu`, not `root`)*

2. Once logged in, run the Docker installation commands:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo apt install docker-compose-plugin -y
   ```

3. Give your user permission to run Docker without `sudo`:
   ```bash
   sudo usermod -aG docker ubuntu
   ```
   *You must type `exit` to disconnect from the server, then SSH back in for this permission to take effect.*

### 4. Hooking up the Pipeline
Now that the server is ready, hook it up to the systems we set up:
1. **Cloudflare:** Go to your Cloudflare DNS settings and point the `A` record to your **Elastic IP**.
2. **GitHub Secrets:** Go to your GitHub Repository > Settings > Secrets and variables > Actions. Add the following:
   - `VPS_HOST`: Your **Elastic IP**
   - `VPS_USERNAME`: `ubuntu`
   - `VPS_SSH_KEY`: Open your downloaded `.pem` file in a text editor (like Notepad), copy ALL the text (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`), and paste it here.

Push your code to the `main` branch, and the GitHub Action will automatically deploy your site to AWS!

## Security Note: CVE-2025-29927 Mitigation

This application is protected against the Next.js middleware bypass vulnerability (CVE-2025-29927) via two layers:
1. The included `nginx.conf` strips the `x-middleware-subrequest` header.
2. **Recommended**: In Cloudflare, create a WAF Transform Rule to remove the `x-middleware-subrequest` header from all incoming requests before they even reach your VPS.
