#!/usr/bin/env bash
# ==============================================================================
# Helper to install CITAS 2027 as a background systemd service on Debian
# ==============================================================================

set -e

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="citas.service"
TARGET_SERVICE="/etc/systemd/system/${SERVICE_NAME}"

echo "Installing CITAS 2027 Systemd Service on Debian..."

# Ensure npm and node paths
NODE_PATH=$(which node)
NPM_PATH=$(which npm)
CURRENT_USER=$(whoami)

# Generate tailored service file
cat <<EOF | sudo tee "${TARGET_SERVICE}" > /dev/null
[Unit]
Description=CITAS 2027 Conference Portal (DLSU CITe4D)
After=network.target

[Service]
Type=simple
User=${CURRENT_USER}
WorkingDirectory=${APP_DIR}
ExecStart=${NPM_PATH} run preview -- --host 0.0.0.0 --port 4173
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=4173

[Install]
WantedBy=multi-user.target
EOF

echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

echo "Enabling ${SERVICE_NAME} to start automatically on system boot..."
sudo systemctl enable "${SERVICE_NAME}"

echo "Starting ${SERVICE_NAME} now..."
sudo systemctl restart "${SERVICE_NAME}"

echo "Done! Service status:"
sudo systemctl status "${SERVICE_NAME}" --no-pager
