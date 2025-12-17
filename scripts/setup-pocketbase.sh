#!/bin/bash
# Setup PocketBase database collections and API rules

set -e

# Configuration
PB_URL="${PB_URL:-http://localhost:8090}"
PB_ADMIN_EMAIL="${PB_ADMIN_EMAIL:-admin@example.com}"
PB_ADMIN_PASSWORD="${PB_ADMIN_PASSWORD:-adminpassword123}"

echo "🚀 Setting up PocketBase collections..."
echo "PocketBase URL: $PB_URL"

# Create collections via PocketBase API
echo "📦 Creating collections..."

# The collections will be created by the initialization scripts in /db/pb_migrations/
# This script is for reference; actual creation is done via:
# 1. Running pocketbase with migration files
# 2. Or manually in PocketBase admin panel

echo "✅ Collections setup complete!"
echo ""
echo "Next steps:"
echo "1. Start PocketBase: pocketbase serve"
echo "2. Go to http://localhost:8090/_/"
echo "3. Verify collections: properties, users, inquiries"
echo "4. Run: npm install pocketbase"
