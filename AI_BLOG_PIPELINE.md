# AI-Generated Blog Post Pipeline

This document describes the automated blog post generation system for this Hugo-based portfolio website.

## Overview

The AI blog pipeline automates the creation of blog posts with proper Hugo front-matter formatting. Posts are generated via a Python script and can be triggered either manually or automatically through GitHub Actions.

## Architecture

```
┌─────────────────────┐
│  Input Sources      │
├─────────────────────┤
│ • JSON files        │
│ • CLI arguments     │
│ • Workflow dispatch │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  generate_posts.py  │
├─────────────────────┤
│ • Parse input       │
│ • Generate front-   │
│   matter            │
│ • Create Markdown   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Output             │
├─────────────────────┤
│ content/blog/auto/  │
│ *.md files          │
└─────────────────────┘
```

## Components

### 1. Python Script (`scripts/generate_posts.py`)

The core script that generates Hugo-compatible blog posts.

**Features:**
- ✅ Proper YAML front-matter generation
- ✅ Automatic filename sanitization
- ✅ Multiple input modes (CLI, JSON, batch)
- ✅ Tag and category support
- ✅ Author information handling
- ✅ Draft mode support
- ✅ Hero image support
- ✅ Table of contents enabled by default

**Usage Examples:**

```bash
# CLI mode
python3 scripts/generate_posts.py \
  --title "My Post" \
  --content "Post content here" \
  --tags "Python" "Hugo" \
  --categories "Web Development"

# JSON mode
python3 scripts/generate_posts.py \
  --from-json scripts/post_data/my-post.json

# Batch mode
python3 scripts/generate_posts.py \
  --batch scripts/post_data/*.json
```

### 2. GitHub Actions Workflow (`.github/workflows/generate-posts.yml`)

Automates post generation on specific events.

**Triggers:**
1. **Push to main/develop**: Processes JSON files in `scripts/post_data/`
2. **Workflow Dispatch**: Manual trigger with inline inputs

**Workflow Steps:**
1. Checkout repository
2. Setup Python 3.12
3. Install dependencies (if any)
4. Generate posts from JSON files or workflow inputs
5. Commit and push new posts (if changes exist)
6. Generate job summary

### 3. Directory Structure

```
200rx.io/
├── .github/
│   └── workflows/
│       └── generate-posts.yml       # GitHub Actions workflow
├── content/
│   └── blog/
│       └── auto/                    # Generated posts output
│           ├── README.md
│           └── *.md                 # Auto-generated posts
├── scripts/
│   ├── generate_posts.py            # Main script
│   ├── test_generate_posts.py       # Test suite
│   ├── requirements.txt             # Python dependencies
│   ├── README.md                    # Script documentation
│   └── post_data/                   # JSON input files
│       ├── README.md
│       └── example-post.json        # Example format
```

## Usage Guide

### Method 1: JSON File (Recommended for Complex Posts)

1. Create a JSON file in `scripts/post_data/`:

```json
{
  "title": "Your Post Title",
  "content": "# Introduction\n\nYour markdown content...",
  "description": "Brief description",
  "tags": ["tag1", "tag2"],
  "categories": ["Category"],
  "author_name": "Ray Miller",
  "author_image": "/images/author/avatar.png",
  "draft": false,
  "hero_image": "/images/hero/post-image.jpg"
}
```

2. Commit and push to main/develop branch
3. GitHub Actions will automatically generate the post
4. The post will be created in `content/blog/auto/`

### Method 2: Manual Workflow Dispatch

1. Go to Actions tab in GitHub
2. Select "Generate Blog Posts" workflow
3. Click "Run workflow"
4. Fill in the form fields
5. Click "Run workflow" button
6. The post will be automatically generated and committed

### Method 3: Local CLI

```bash
# Navigate to repository root
cd /path/to/200rx.io

# Generate post
python3 scripts/generate_posts.py \
  --title "My Awesome Post" \
  --content "# Introduction\n\nPost content..." \
  --tags "Python" "Automation" \
  --description "A great post"

# Commit the generated file
git add content/blog/auto/my-awesome-post.md
git commit -m "Add new blog post"
git push
```

## Generated Front-Matter Format

Posts are generated with the following YAML front-matter:

```yaml
---
title: "Post Title"
date: 2024-10-31T19:00:00Z
draft: false
author:
  name: "Ray Miller"
  image: "/images/author/avatar.png"
description: "Post description"
tags: ["tag1", "tag2"]
categories: ["Category"]
hero: "/images/hero/image.jpg"
toc: true
---
```

## Testing

Run the test suite to verify functionality:

```bash
python3 scripts/test_generate_posts.py
```

**Test Coverage:**
- ✅ Filename sanitization
- ✅ Front-matter generation
- ✅ Post creation (all modes)
- ✅ JSON processing
- ✅ Batch processing
- ✅ Special character handling

## Security

- ✅ No external dependencies (uses Python standard library)
- ✅ Input sanitization for filenames
- ✅ CodeQL security scanning passed (0 vulnerabilities)
- ✅ Safe YAML generation (no code execution risks)

## Workflow Outputs

The GitHub Actions workflow provides:
- **Summary**: Count of generated posts
- **Changes**: List of new/updated post files
- **Logs**: Detailed generation information

## Troubleshooting

### Posts Not Appearing on Site

1. Check if posts are marked as `draft: true`
2. Verify Hugo is building with `--buildDrafts` flag if needed
3. Ensure posts have valid front-matter

### JSON Processing Fails

1. Validate JSON syntax with a JSON validator
2. Check all required fields are present (title, content)
3. Review workflow logs for specific errors

### Permission Errors

1. Ensure script is executable: `chmod +x scripts/generate_posts.py`
2. Check GitHub Actions has write permissions
3. Verify repository settings allow workflow commits

## Future Enhancements

Potential improvements for the pipeline:

- [ ] Integration with AI APIs (OpenAI, Claude) for content generation
- [ ] Automatic image generation for hero images
- [ ] SEO optimization suggestions
- [ ] Scheduled post generation
- [ ] Multi-language post generation
- [ ] Content templates for different post types
- [ ] Automatic tag suggestion based on content

## Contributing

When adding new features to the pipeline:

1. Update the Python script with new functionality
2. Add corresponding tests to `test_generate_posts.py`
3. Update documentation (this file and `scripts/README.md`)
4. Run tests and security checks
5. Update GitHub Actions workflow if needed

## References

- **Hugo Documentation**: https://gohugo.io/documentation/
- **Hugo Front Matter**: https://gohugo.io/content-management/front-matter/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Python**: https://docs.python.org/3/

---

For detailed usage instructions, see:
- `scripts/README.md` - Detailed script documentation
- `scripts/post_data/README.md` - JSON file format
- `content/blog/auto/README.md` - Output directory info
