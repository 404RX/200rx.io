# Customization Guide

This guide explains how to modify and personalize your Hugo portfolio site with the Toha theme. Follow these instructions to update content, add new sections, and customize the appearance.

## 📁 Project Structure Overview

```
├── content/
│   └── posts/                 # Blog posts
├── data/
│   └── en/                    # English language content
│       ├── author.yaml        # Author information
│       └── sections/          # Section configurations
├── static/
│   └── images/               # Images and assets
├── themes/
│   └── toha/                 # Theme files
└── hugo.yaml                 # Site configuration
```

## 🔧 Basic Configuration

### Site Settings (hugo.yaml)

1. **Update Site Information**
   ```yaml
   baseURL: 'https://username.github.io/repository-name'
   languageCode: 'en-us'
   title: 'Your Portfolio Title'
   theme: 'toha'
   ```

2. **Configure Language**
   ```yaml
   defaultContentLanguage: en
   languages:
     en:
       languageName: English
       weight: 1
   ```

### Author Information (data/en/author.yaml)

```yaml
name: "Your Name"
nickname: "Nickname"
image: "images/author/avatar.png"
title: "Your Title"
email: "your.email@example.com"
```

## 📝 Content Sections

### About Section (data/en/sections/about.yaml)

1. **Update Personal Information**
   ```yaml
   name: Your Full Name
   designation: Your Role
   about:
     Your professional summary here...
   ```

2. **Social Links**
   ```yaml
   socialLinks:
     - name: Github
       icon: "fab fa-github"
       url: "https://github.com/yourusername"
   ```

### Skills Section (data/en/sections/skills.yaml)

1. **Add Technical Skills**
   ```yaml
   skills:
     - name: Programming
       icon: "fas fa-laptop-code"
       summary: "Preferred programming languages and technologies"
       items:
         - name: Go
           level: 90
   ```

2. **Add Soft Skills**
   ```yaml
   softSkills:
     - name: Leadership
       percentage: 85
     - name: Team Work
       percentage: 90
   ```

### Experience Section (data/en/sections/experiences.yaml)

```yaml
experiences:
  - designation: Senior Software Engineer
    company:
      name: Company Name
      url: "https://example.com"
    start: "2020-01-01"
    responsibilities:
      - "Key responsibility 1"
      - "Key responsibility 2"
```

### Education Section (data/en/sections/education.yaml)

```yaml
degrees:
  - name: "Master of Science"
    institution:
      name: "University Name"
      url: "https://university.edu"
    start: "2018-01-01"
    end: "2020-12-31"
    grade: "3.8/4.0"
```

### Projects Section (data/en/sections/projects.yaml)

```yaml
projects:
  - name: Project Name
    logo: /images/projects/logo.png
    role: Developer
    timeline: "Jan 2020 - Present"
    repo: https://github.com/username/project
    summary: Project description...
    tags: ["web", "react", "typescript"]
```

## 📚 Blog Posts

### Creating New Posts

1. Create a new markdown file in `content/posts/`:
   ```markdown
   ---
   title: "Your Post Title"
   date: 2024-01-01
   description: "Brief description"
   tags: ["tag1", "tag2"]
   categories: ["category"]
   ---

   Your content here...
   ```

2. **Add Images**
   - Place images in `static/images/posts/`
   - Reference in posts: `![Alt text](/images/posts/image.jpg)`

## 🎨 Theme Customization

### Custom CSS (assets/css/custom.css)

```css
/* Override theme styles */
.hero {
    background-color: #your-color;
}
```

### Custom JavaScript (assets/js/custom.js)

```javascript
// Add custom functionality
document.addEventListener('DOMContentLoaded', function() {
    // Your code here
});
```

## 🖼️ Images and Assets

### Profile Picture
1. Replace `static/images/author/avatar.png`
2. Recommended size: 300x300px
3. Use PNG format for best quality

### Project Logos
1. Place in `static/images/projects/`
2. Recommended size: 200x200px
3. Use consistent aspect ratios

### Section Backgrounds
1. Place in `static/images/sections/`
2. Recommended size: 1920x1080px
3. Optimize for web performance

## ⚙️ Advanced Customization

### Custom Shortcodes

Create in `layouts/shortcodes/`:
```html
<!-- layouts/shortcodes/custombox.html -->
<div class="custom-box">
  {{ .Inner }}
</div>
```

Usage in posts:
```markdown
{{< custombox >}}
Content here
{{< /custombox >}}
```

### Custom Layouts

1. Create in `layouts/partials/`
2. Override theme layouts by matching file paths
3. Use Hugo templating syntax

## 🔍 SEO Optimization

### Meta Tags

Update in `hugo.yaml`:
```yaml
params:
  description: "Your site description"
  keywords: "portfolio,developer,personal"
```

### Social Media Cards

1. Add Open Graph images in `static/images/`
2. Configure in `hugo.yaml`:
   ```yaml
   params:
     ogImage: "images/og-image.png"
   ```

## 🚀 Performance Tips

1. **Image Optimization**
   - Compress images before uploading
   - Use appropriate image formats (WebP for modern browsers)
   - Specify image dimensions

2. **Content Organization**
   - Use meaningful file names
   - Maintain consistent folder structure
   - Follow Hugo's content organization best practices

3. **Code Quality**
   - Validate YAML files
   - Test changes locally
   - Use Hugo's built-in asset pipeline

## 📋 Maintenance

1. **Regular Updates**
   - Keep content fresh and relevant
   - Update project showcases
   - Review and update skills periodically

2. **Theme Updates**
   ```bash
   git submodule update --remote themes/toha
   ```

3. **Backup**
   - Regularly commit changes
   - Maintain backup of content
   - Document custom modifications

For additional customization options, refer to:
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Toha Theme Documentation](https://toha-guides.netlify.app/)