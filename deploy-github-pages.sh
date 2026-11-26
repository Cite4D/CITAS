#!/usr/bin/env bash
# ==============================================================================
# 1-Click GitHub Pages Deployer for CITAS 2027
# ==============================================================================

set -e

echo "Building and deploying CITAS 2027 to GitHub Pages..."
npm run deploy

echo ""
echo "✓ Successfully deployed to GitHub Pages (gh-pages branch)!"
echo "Check your GitHub repository Settings -> Pages to view your live URL."
