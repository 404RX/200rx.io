#!/bin/bash

# Environment Switching Script for Frontend
echo "🔄 Frontend Environment Switcher"

# Function to switch to development
switch_to_dev() {
    echo "🔧 Switching to Development environment..."
    
    # Copy development configs
    cp netlify.development.toml netlify.toml
    cp config.development.yaml config.yaml
    
    echo "✅ Switched to Development environment"
    echo "📍 Configuration:"
    echo "   - Base URL: https://dev-200rx.netlify.app"
    echo "   - CRM API: https://200rxio-crm-development.up.railway.app"
    echo "   - AI API: https://portfolio-ai-development.up.railway.app"
    echo "   - CSP: Permissive for development testing"
}

# Function to switch to production
switch_to_prod() {
    echo "🚀 Switching to Production environment..."
    
    # Copy production configs
    cp netlify.production.toml netlify.toml
    cp config.yaml config.production.yaml 2>/dev/null || echo "No production config found, using default"
    
    echo "✅ Switched to Production environment"
    echo "📍 Configuration:"
    echo "   - Base URL: https://200rx.com"
    echo "   - CRM API: https://200rxio-crm-production.up.railway.app"
    echo "   - AI API: https://portfolio-ai-backend-1zyj.onrender.com"
    echo "   - CSP: Strict security for production"
}

# Function to show current environment
show_current() {
    echo "🔍 Current Environment Status:"
    
    if [ -f "netlify.toml" ]; then
        if grep -q "development" netlify.toml; then
            echo "   Current: DEVELOPMENT"
        elif grep -q "production" netlify.toml; then
            echo "   Current: PRODUCTION"
        else
            echo "   Current: UNKNOWN (manual configuration)"
        fi
    else
        echo "   Current: NO CONFIGURATION FOUND"
    fi
    
    echo ""
    echo "📋 Available configurations:"
    echo "   - netlify.development.toml"
    echo "   - netlify.production.toml"
    echo "   - config.development.yaml"
}

# Main menu
echo ""
echo "🎯 Select environment:"
echo "1) Development"
echo "2) Production"
echo "3) Show current status"
echo "4) Exit"

read -p "Choose option (1-4): " choice

case $choice in
    1)
        switch_to_dev
        ;;
    2)
        switch_to_prod
        ;;
    3)
        show_current
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🚀 Next steps:"
echo "   1. Commit the configuration changes"
echo "   2. Push to trigger deployment"
echo "   3. Test the environment"