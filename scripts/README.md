# Blog Post Generation Scripts

This directory contains automation scripts for generating blog posts for the Hugo-based portfolio site.

## generate_posts.py

Python script that generates Hugo-compatible blog posts with proper front-matter formatting.

### Features

- ✅ Proper Hugo YAML front-matter generation
- ✅ Automatic filename sanitization from title
- ✅ Support for tags and categories
- ✅ Author information
- ✅ Table of contents enabled by default
- ✅ Draft mode support
- ✅ Multiple input modes (CLI, JSON file, batch processing)

### Usage

#### 1. Command Line Mode

Create a post directly from command line arguments:

```bash
python3 scripts/generate_posts.py \
  --title "My Awesome Post" \
  --content "# Introduction\n\nThis is my post content..." \
  --description "A brief description of the post" \
  --tags "Python" "Hugo" "Automation" \
  --categories "Web Development"
```

#### 2. JSON File Mode

Create a post from a JSON configuration file:

```bash
python3 scripts/generate_posts.py --from-json post_data.json
```

Example JSON structure:

```json
{
  "title": "Understanding Kubernetes",
  "content": "# Introduction\n\nKubernetes is a container orchestration platform...",
  "description": "A comprehensive guide to Kubernetes",
  "tags": ["Kubernetes", "DevOps", "Containers"],
  "categories": ["Infrastructure"],
  "author_name": "Ray Miller",
  "author_image": "/images/author/avatar.png",
  "draft": false,
  "hero_image": "/images/hero/kubernetes.jpg"
}
```

#### 3. Batch Mode

Create multiple posts from several JSON files:

```bash
python3 scripts/generate_posts.py --batch post1.json post2.json post3.json
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--title` | Post title | Required (CLI mode) |
| `--content` | Post content in Markdown | Required (CLI mode) |
| `--description` | Post description | Empty string |
| `--tags` | Space-separated list of tags | Empty list |
| `--categories` | Space-separated list of categories | Empty list |
| `--author-name` | Author name | "Ray Miller" |
| `--author-image` | Path to author image | "/images/author/avatar.png" |
| `--draft` | Mark post as draft | false |
| `--hero-image` | Hero image path | Empty string |
| `--content-dir` | Output directory | "content/blog/auto" |
| `--from-json` | Path to JSON input file | None |
| `--batch` | Multiple JSON files for batch processing | None |

### Generated Front-Matter Example

```yaml
---
title: "My Awesome Post"
date: 2024-10-31T19:00:00Z
draft: false
author:
  name: "Ray Miller"
  image: "/images/author/avatar.png"
description: "A brief description of the post"
tags: ["Python", "Hugo", "Automation"]
categories: ["Web Development"]
hero: "/images/hero/post-image.jpg"
toc: true
---
```

### Output

Generated posts are placed in `/content/blog/auto/` directory with sanitized filenames:
- Title: "My Awesome Post" → Filename: `my-awesome-post.md`
- Title: "Getting Started with K8s!" → Filename: `getting-started-with-k8s.md`

## GitHub Actions Integration

This script is integrated with GitHub Actions to automatically generate posts on commit. See `.github/workflows/generate-posts.yml` for the workflow configuration.

## Requirements

The script uses only Python standard library modules (no external dependencies required for basic functionality).

For future AI-powered content generation, you may want to install additional packages listed in `requirements.txt`.

## Testing

Test the script locally before committing:

```bash
# Create a test post
python3 scripts/generate_posts.py \
  --title "Test Post" \
  --content "This is a test." \
  --tags "test" \
  --draft

# Verify the output
cat content/blog/auto/test-post.md
```

## Troubleshooting

### Permission Issues

If you get a permission denied error, make sure the script is executable:

```bash
chmod +x scripts/generate_posts.py
```

### Directory Not Found

The script automatically creates the output directory if it doesn't exist. If you encounter issues, manually create it:

```bash
mkdir -p content/blog/auto
```

### Special Characters in Titles

The script automatically sanitizes titles to create safe filenames. Special characters are removed, and spaces are converted to hyphens.
