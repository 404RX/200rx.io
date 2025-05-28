# Deployment Guide

This guide provides detailed instructions for deploying your Hugo portfolio site to GitHub Pages, along with troubleshooting tips and alternative deployment options.

## 🚀 GitHub Pages Deployment

### Prerequisites
- A GitHub account
- Git installed on your local machine
- Repository pushed to GitHub
- Basic familiarity with Git commands

### Step-by-Step Setup

1. **Prepare Your Repository**
   - Ensure your repository is public (or you have GitHub Pro for private repos)
   - Your repository should contain the Hugo site files and the Toha theme
   - The GitHub Actions workflow file (`.github/workflows/gh-pages.yml`) should be present

2. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - Note the URL where your site will be published (`https://username.github.io/repository-name`)

3. **Update Site Configuration**
   - Open `hugo.yaml`
   - Update the `baseURL` parameter:
     ```yaml
     baseURL: 'https://username.github.io/repository-name'
     ```
   - Replace `username` and `repository-name` with your actual GitHub username and repository name

4. **Initial Deployment**
   - Commit and push your changes to the main branch
   - Go to the "Actions" tab in your repository
   - Watch the workflow progress
   - Once complete, your site will be live at your GitHub Pages URL

### Understanding the Deployment Process

The included GitHub Actions workflow:
1. Checks out your repository with themes
2. Sets up Hugo (latest version, extended)
3. Configures GitHub Pages
4. Builds your site with the correct baseURL
5. Uploads and deploys to GitHub Pages

## 🔧 Known Issues and Workarounds

### Local Development Limitations

**Issue**: Local Hugo v0.92.2 has template compatibility issues with the Toha theme
- **Symptoms**: Template errors, missing styles, broken layouts
- **Workaround**: 
  1. Use GitHub Actions for testing changes (push to a development branch)
  2. Or upgrade to Hugo v0.100.0+ locally
  3. View deployment previews in pull requests

**Issue**: Missing Node.js dependencies
- **Symptoms**: Some theme features don't work locally
- **Workaround**:
  1. Install Node.js locally
  2. Run `npm install` in the theme directory
  3. Or rely on GitHub Actions for full functionality

### Common Problems and Solutions

1. **404 Page Not Found**
   - Verify baseURL in hugo.yaml matches your GitHub Pages URL
   - Ensure you're pushing to the main branch
   - Check if GitHub Pages is enabled in repository settings

2. **Missing Theme Components**
   - Verify theme submodule is properly initialized:
     ```bash
     git submodule update --init --recursive
     ```
   - Check if theme files are present in themes/toha/

3. **Failed GitHub Actions**
   - Check workflow run logs for specific errors
   - Ensure repository permissions are correct
   - Verify GitHub Pages is enabled

## 🌐 Alternative Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `hugo --minify`
   - Publish directory: `public`
   - Environment variable: `HUGO_VERSION` = `0.100.0`

### Vercel

1. Import your repository to Vercel
2. Framework Preset: Hugo
3. Build settings:
   - Build command: `hugo --minify`
   - Output directory: `public`

### AWS S3 + CloudFront

1. Create an S3 bucket for static hosting
2. Configure CloudFront distribution
3. Set up GitHub Actions for automated deployment:
   ```yaml
   - uses: aws-actions/configure-aws-credentials@v1
   - run: hugo --minify
   - run: aws s3 sync public/ s3://your-bucket-name/
   ```

### Firebase Hosting

1. Install Firebase CLI
2. Initialize Firebase project
3. Configure firebase.json:
   ```json
   {
     "hosting": {
       "public": "public",
       "ignore": []
     }
   }
   ```
4. Deploy: `firebase deploy`

## 📝 Maintenance

### Updating the Site

1. Make changes to your content or configuration
2. Test locally if possible
3. Commit and push to main branch
4. GitHub Actions will automatically deploy updates

### Monitoring Deployments

1. Check the "Actions" tab for deployment status
2. View deployment logs for any errors
3. Test the live site after each deployment
4. Monitor GitHub Pages settings for any issues

For additional help, refer to:
- [Hugo Documentation](https://gohugo.io/hosting-and-deployment/hosting-on-github/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Toha Theme Documentation](https://toha-guides.netlify.app/)