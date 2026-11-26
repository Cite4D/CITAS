#!/usr/bin/env bash
# ==============================================================================
# CITAS 2027 Conference Portal - Debian Setup & Run Script
# De La Salle University - Center for ICT for Development (CITe4D)
# Target Deployment: cite4d.com/citas or standalone port 4173
# ==============================================================================

set -e

# ANSI Color Codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

PORT="${PORT:-4173}"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo -e "${GREEN}${BOLD}"
echo "=========================================================="
echo "   CITAS 2027 - Debian Deployment & Runner Script        "
echo "   De La Salle University | CITe4D Conference Portal      "
echo "=========================================================="
echo -e "${NC}"

# Function to check command existence
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 1. Check & Install Node.js
echo -e "${BLUE}[1/4] Checking Node.js environment...${NC}"
NODE_OK=false
if command_exists node; then
    NODE_MAJOR=$(node -v | cut -d'.' -f1 | tr -d 'v')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo -e "  ✓ Node.js $(node -v) detected (meets >= v18 requirement)."
        NODE_OK=true
    else
        echo -e "  ${YELLOW}! Node.js $(node -v) is older than recommended v18+. Upgrading...${NC}"
    fi
fi

if [ "$NODE_OK" = false ]; then
    echo -e "  Installing latest Node.js LTS via official NodeSource repository..."
    if command_exists sudo; then
        sudo apt-get update -y
        sudo apt-get install -y ca-certificates curl gnupg
        sudo mkdir -p /etc/apt/keyrings
        curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg --yes 2>/dev/null || true
        echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
        sudo apt-get update -y
        sudo apt-get install -y nodejs
    else
        apt-get update -y
        apt-get install -y ca-certificates curl gnupg
        mkdir -p /etc/apt/keyrings
        curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg --yes 2>/dev/null || true
        echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
        apt-get update -y
        apt-get install -y nodejs
    fi
    echo -e "  ✓ Installed Node.js $(node -v) and npm $(npm -v)"
fi

# 2. Install Dependencies
echo -e "\n${BLUE}[2/4] Installing project dependencies (npm install)...${NC}"
npm install --no-audit

# 3. Build Production Bundle
echo -e "\n${BLUE}[3/4] Building optimized production assets (npm run build)...${NC}"
npm run build

echo -e "\n${GREEN}✓ Build completed successfully. Static output ready in: $APP_DIR/dist${NC}"

# 4. Run / Serve
echo -e "\n${BLUE}[4/4] Starting CITAS 2027 server on Debian...${NC}"
echo -e "  Port:      ${BOLD}${PORT}${NC}"
echo -e "  Host:      ${BOLD}0.0.0.0${NC} (Accessible from local network & external)"
echo -e "  Base path: ${BOLD}./${NC} (Compatible with cite4d.com/citas or root)"
echo ""

# Check arguments
MODE="${1:-serve}"

case "$MODE" in
    dev)
        echo -e "${YELLOW}Starting in development mode with HMR...${NC}"
        npm run dev:host
        ;;
    systemd)
        echo -e "${GREEN}Setting up Debian systemd service...${NC}"
        bash "$APP_DIR/scripts/install-systemd.sh"
        ;;
    nginx)
        echo -e "${GREEN}Generating Nginx configuration...${NC}"
        cat "$APP_DIR/scripts/nginx-citas.conf"
        ;;
    *)
        echo -e "${GREEN}${BOLD}Server is starting! Access the site at:${NC}"
        echo -e "  -> Local:   http://localhost:${PORT}/"
        if command_exists hostname; then
            IP=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "your-server-ip")
            echo -e "  -> Network: http://${IP}:${PORT}/"
        fi
        echo ""
        echo -e "${YELLOW}Press Ctrl+C to stop the server.${NC}"
        npm run preview -- --host 0.0.0.0 --port "${PORT}"
        ;;
esac
