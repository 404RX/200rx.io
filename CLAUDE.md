# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is the frontend component of a professional portfolio website built with Hugo static site generator and the Toha theme. The project integrates multiple components:

- **Hugo Static Site**: Main portfolio website using the Toha theme
- **React Chatbot**: Interactive chat component built with Vite + React + TypeScript
- **External APIs**: Integrates with CRM and AI backend services via proxy redirects
- **Multi-Environment Setup**: Separate configurations for development and production

### Key Architectural Decisions

- **Hugo + Toha Theme**: Professional portfolio theme with extensive customization
- **Hybrid Architecture**: Static site with embedded React components for dynamic features
- **Environment-Specific Configs**: Separate Hugo configs and Netlify configs for dev/prod
- **API Proxying**: Frontend proxies API calls to external microservices
- **Asset Pipeline**: Theme uses PostCSS + Bootstrap + custom SCSS for styling

## Development Commands

### Hugo Site Development
```bash
# Start Hugo development server
hugo server

# Start with specific config
hugo server --config config.development.yaml

# Build for production
hugo --gc --minify

# Build for development
hugo --config config.development.yaml --gc --minify
```

### React Chatbot Development
```bash
# Navigate to React component
cd src

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Theme Development
```bash
# Work with theme dependencies
cd themes/toha
npm install

# Lint theme assets
npm run lint
npm run lint:fix

# Process CSS with autoprefixer
npm run autoprefixer
```

### Full Build Process (Netlify)
```bash
# Complete build chain (as used in netlify.toml)
cd themes/toha && npm install && \
cd ../.. && npm install && \
cd src && rm -rf node_modules package-lock.json && npm install && npm run build && \
cd .. && hugo --config config.development.yaml --gc --minify
```

## Configuration System

### Environment Detection
- `config.yaml`: Production configuration
- `config.development.yaml`: Development configuration
- `netlify.toml`: Production Netlify settings
- `netlify.development.toml`: Development Netlify settings

### Key Configuration Areas
- **API Endpoints**: Different URLs for dev/prod environments (`crmApiUrl`, `aiApiUrl`)
- **Theme Colors**: Extensive color scheme customization in config
- **Content Structure**: YAML-driven sections in `data/en/sections/`
- **Navigation**: Custom menus via `customMenus` parameter

## File Structure Patterns

### Hugo Content Organization
- `content/`: Markdown content (posts, pages)
- `data/en/`: YAML configuration for dynamic sections
- `layouts/`: Custom HTML templates and overrides
- `static/`: Static assets served directly
- `assets/`: Processed assets (SCSS, etc.)

### Theme Integration
- `themes/toha/`: Git submodule containing the Toha theme
- Theme customizations via `layouts/` overrides
- Custom CSS in `assets/styles/` and `static/css/`

### React Component Structure
- `src/`: React chatbot application
- `src/components/`: React components
- `src/lib/`: API client and utilities
- `src/config/`: Environment configuration

## API Integration Patterns

### Proxy Configuration
The frontend uses Netlify redirects to proxy API calls:
- `/api/crm/*` → External CRM service
- `/api/ai/*` → External AI service

### Environment-Specific Endpoints
- Development: Uses Railway.app hosted services
- Production: Uses different endpoint URLs
- API keys and sensitive config via environment variables

## Asset Management

### CSS Architecture
- Theme SCSS files in `themes/toha/assets/`
- Custom overrides in `assets/styles/`
- Static CSS fixes in `static/css/`
- PostCSS processing with autoprefixer

### JavaScript Integration
- Theme JS from Toha theme
- Custom chatbot bundle built separately
- Hugo asset pipeline for processing

## Common Development Patterns

### Making Theme Customizations
1. Check existing overrides in `layouts/`
2. Copy theme file to same path in `layouts/`
3. Modify the copied file
4. Test with `hugo server`

### Adding New Content
1. Use Hugo archetypes: `hugo new content/posts/new-post.md`
2. Update YAML frontmatter
3. Add to appropriate data files if needed (sections, navigation)

### React Component Development
1. Work in `src/` directory
2. Use TypeScript for type safety
3. Build creates bundle copied to `static/js/`
4. Hugo includes the built assets

### Environment Switching
- Use `switch-environment.sh` script to toggle configs
- Verify correct config file is active before deployment
- Check API endpoints match intended environment

## Deployment Architecture

### Netlify Build Process
1. Install theme dependencies
2. Install root dependencies  
3. Build React components
4. Generate Hugo site
5. Deploy static files

### Content Security Policy
- Development: Permissive CSP for local development
- Production: Restrictive CSP with specific allowed sources
- API endpoints whitelisted for CORS

This project follows a hybrid static/dynamic architecture where Hugo generates the core site structure while React components provide interactive features, all deployed as a static site with API proxying.