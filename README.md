# Hugo Portfolio Site with Toha Theme

A complete, functional portfolio website built with Hugo static site generator and the Toha theme. This site showcases a professional developer portfolio with sample content demonstrating all theme features.

## 🚀 Features

- **Responsive Design**: Mobile-first, responsive layout
- **Modern UI**: Clean, professional design with dark/light theme support
- **Blog System**: Full-featured blog with markdown support
- **Portfolio Showcase**: Project gallery with filtering capabilities
- **Skills Section**: Visual representation of technical skills
- **Experience Timeline**: Professional experience with detailed descriptions
- **Education Section**: Academic background and certifications
- **Contact Integration**: Multiple contact methods and social links
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Performance Optimized**: Fast loading with optimized assets

## 📁 Project Structure

```
├── content/
│   └── posts/                    # Blog posts
│       ├── getting-started-with-hugo.md
│       ├── modern-web-development-trends.md
│       └── building-scalable-apis.md
├── data/
│   └── en/
│       ├── author.yaml           # Author information
│       └── sections/
│           ├── about.yaml        # About section configuration
│           ├── skills.yaml       # Skills and technologies
│           ├── experiences.yaml  # Work experience
│           ├── education.yaml    # Education and certifications
│           └── projects.yaml     # Portfolio projects
├── static/
│   └── images/                   # Static images and assets
│       └── README.md            # Image requirements guide
├── themes/
│   └── toha/                    # Toha theme files
├── hugo.yaml                    # Main Hugo configuration
└── .github/
    └── workflows/
        └── gh-pages.yml         # GitHub Pages deployment
```

## 🎨 Sample Content Overview

### Blog Posts (3 articles)
1. **Getting Started with Hugo** - Beginner's guide to Hugo static site generator
2. **Modern Web Development Trends in 2024** - Latest trends in web development
3. **Building Scalable APIs** - Best practices for API development

### Portfolio Projects (8 projects)
- E-Commerce Platform (React, Node.js, PostgreSQL)
- Task Management API (Node.js, Express, MongoDB)
- Weather Dashboard (Vue.js, Chart.js)
- Machine Learning Model Deployment (Python, FastAPI, Docker)
- Blog CMS (Next.js, Markdown)
- Real-time Chat Application (React, Socket.io, Redis)
- University Course Management System (Java, Spring, MySQL)
- Personal Portfolio Website (Hugo, SCSS)

### Skills Section (16 technologies)
- **Frontend**: JavaScript, React, Vue.js, TypeScript, Next.js
- **Backend**: Node.js, Python
- **Databases**: PostgreSQL, MongoDB, Redis
- **DevOps**: Docker, Kubernetes, AWS
- **Tools**: Git, Linux, GraphQL

### Professional Experience (5 positions)
- Senior Full Stack Developer at TechCorp Solutions (2023-Present)
- Full Stack Developer at TechCorp Solutions (2021-2022)
- Frontend Developer at StartupXYZ (2020-2021)
- Junior Web Developer at Digital Agency Pro (2020)
- Research Assistant at University Research Lab (2019)
- Freelance Web Developer (2019-2020)

### Education & Certifications
- **Master of Science in Computer Science** - Stanford University (2018-2020)
- **Bachelor of Science in Computer Science** - UC Berkeley (2014-2018)
- **Professional Certifications**: AWS, Google Cloud, Kubernetes, MongoDB, Docker
- **Online Learning**: Coursera, Udemy, Educative.io courses

## 🛠️ Setup Instructions

### Prerequisites
- Hugo Extended (v0.100.0 or later)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hugo-portfolio-site
   ```

2. **Install Hugo** (if not already installed)
   ```bash
   # macOS
   brew install hugo
   
   # Windows
   choco install hugo-extended
   
   # Linux
   sudo apt install hugo
   ```

3. **Start the development server**
   ```bash
   hugo server -D
   ```

4. **View the site**
   Open your browser and navigate to `http://localhost:1313`

### Building for Production

```bash
# Generate static files
hugo --minify

# Files will be generated in the 'public' directory
```

## 🎯 Customization Guide

### Personal Information
1. **Update author details** in `data/en/author.yaml`
2. **Modify about section** in `data/en/sections/about.yaml`
3. **Replace placeholder images** in `static/images/` (see `static/images/README.md` for requirements)

### Content Customization
1. **Add your blog posts** to `content/posts/`
2. **Update projects** in `data/en/sections/projects.yaml`
3. **Modify skills** in `data/en/sections/skills.yaml`
4. **Update experience** in `data/en/sections/experiences.yaml`
5. **Edit education** in `data/en/sections/education.yaml`

### Site Configuration
1. **Update site settings** in `hugo.yaml`
2. **Modify social links** and contact information
3. **Configure SEO settings** and meta descriptions

### Images
- Replace all placeholder images with your actual images
- Follow the size recommendations in `static/images/README.md`
- Optimize images for web performance

## 🚀 Deployment

This site is configured for automated deployment to GitHub Pages. For detailed setup instructions and troubleshooting, see:

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete GitHub Pages deployment guide
- [CUSTOMIZATION.md](CUSTOMIZATION.md) - Guide for modifying site content

### Quick Deployment Steps

1. **Fork/Clone the Repository**
   ```bash
   git clone <repository-url>
   cd hugo-portfolio-site
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The included workflow will handle the rest

3. **Update Site URL**
   - In `hugo.yaml`, update the `baseURL` to match your GitHub Pages URL:
     ```yaml
     baseURL: 'https://username.github.io/repository-name'
     ```

4. **Push Changes**
   ```bash
   git add .
   git commit -m "Update site configuration"
   git push origin main
   ```

Your site will be automatically built and deployed to `https://username.github.io/repository-name`

### Known Limitations

- Local development with Hugo v0.92.2 may have template compatibility issues
- Some theme features require Node.js dependencies not available locally
- GitHub Actions uses the latest Hugo version which resolves these issues
- See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed workarounds

### Alternative Deployment Options

You can also deploy to other static hosting services:
- Netlify (with continuous deployment)
- Vercel (with auto-builds)
- AWS S3 + CloudFront
- Firebase Hosting

See [DEPLOYMENT.md](DEPLOYMENT.md) for configuration guides for each platform.

## 📝 Content Guidelines

### Blog Posts
- Use proper front matter with title, date, description, tags, and categories
- Include meaningful tags for better organization
- Add a table of contents for longer posts
- Use code syntax highlighting for technical content

### Projects
- Include live demo URLs when available
- Add GitHub repository links
- Use descriptive summaries
- Tag projects appropriately for filtering

### Images
- Use high-quality, optimized images
- Follow consistent naming conventions
- Include alt text for accessibility
- Consider using WebP format for better compression

## 🔧 Theme Features

The Toha theme includes many advanced features:
- **Multi-language support**
- **Dark/Light theme toggle**
- **Search functionality**
- **Comment system integration**
- **Analytics support**
- **Social sharing buttons**
- **Print-friendly pages**
- **Accessibility features**

## 📚 Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Toha Theme Documentation](https://toha-guides.netlify.app/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Front Matter Reference](https://gohugo.io/content-management/front-matter/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugo](https://gohugo.io/) - The world's fastest framework for building websites
- [Toha Theme](https://github.com/hugo-toha/toha) - Beautiful portfolio theme for Hugo
- [Font Awesome](https://fontawesome.com/) - Icons used throughout the site
- [Unsplash](https://unsplash.com/) - Sample images (replace with your own)

---

**Note**: This is a sample portfolio site with placeholder content. Replace all personal information, images, and project details with your own before deploying to production.