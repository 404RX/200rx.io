#!/usr/bin/env python3
"""
AI-Powered Blog Post Generator for Hugo

This script generates blog posts with proper Hugo front-matter formatting.
Generated posts are placed in /content/blog/auto directory.
"""

import os
import sys
import argparse
from datetime import datetime
from pathlib import Path
import json
import re


class HugoBlogPostGenerator:
    """Generate Hugo-compatible blog posts with proper front-matter."""
    
    def __init__(self, content_dir="content/blog/auto"):
        self.content_dir = Path(content_dir)
        self.content_dir.mkdir(parents=True, exist_ok=True)
    
    def sanitize_filename(self, title):
        """Convert title to a safe filename."""
        # Convert to lowercase and replace spaces with hyphens
        filename = title.lower().strip()
        # Remove special characters
        filename = re.sub(r'[^a-z0-9\s-]', '', filename)
        # Replace spaces with hyphens
        filename = re.sub(r'\s+', '-', filename)
        # Remove multiple consecutive hyphens
        filename = re.sub(r'-+', '-', filename)
        # Remove leading/trailing hyphens
        filename = filename.strip('-')
        return filename
    
    def generate_front_matter(self, title, description="", tags=None, categories=None, 
                             author_name="Ray Miller", author_image="/images/author/avatar.png",
                             draft=False, hero_image=""):
        """
        Generate Hugo front-matter in YAML format.
        
        Args:
            title: Post title
            description: Post description
            tags: List of tags
            categories: List of categories
            author_name: Author name
            author_image: Path to author image
            draft: Whether post is a draft
            hero_image: Hero image path
            
        Returns:
            Formatted front-matter string
        """
        if tags is None:
            tags = []
        if categories is None:
            categories = []
        
        # Get current date in ISO format
        date_str = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
        
        # Build front-matter
        front_matter = ["---"]
        front_matter.append(f'title: "{title}"')
        front_matter.append(f'date: {date_str}')
        front_matter.append(f'draft: {str(draft).lower()}')
        
        # Add author information
        front_matter.append("author:")
        front_matter.append(f'  name: "{author_name}"')
        front_matter.append(f'  image: "{author_image}"')
        
        # Add description if provided
        if description:
            front_matter.append(f'description: "{description}"')
        
        # Add tags if provided
        if tags:
            tags_formatted = ', '.join([f'"{tag}"' for tag in tags])
            front_matter.append(f'tags: [{tags_formatted}]')
        
        # Add categories if provided
        if categories:
            categories_formatted = ', '.join([f'"{cat}"' for cat in categories])
            front_matter.append(f'categories: [{categories_formatted}]')
        
        # Add hero image if provided
        if hero_image:
            front_matter.append(f'hero: "{hero_image}"')
        
        # Enable table of contents
        front_matter.append("toc: true")
        
        front_matter.append("---")
        
        return "\n".join(front_matter)
    
    def create_post(self, title, content, description="", tags=None, categories=None,
                   author_name="Ray Miller", author_image="/images/author/avatar.png",
                   draft=False, hero_image=""):
        """
        Create a new blog post with front-matter and content.
        
        Args:
            title: Post title
            content: Post content (Markdown)
            description: Post description
            tags: List of tags
            categories: List of categories
            author_name: Author name
            author_image: Path to author image
            draft: Whether post is a draft
            hero_image: Hero image path
            
        Returns:
            Path to created post file
        """
        # Generate filename
        filename = self.sanitize_filename(title) + ".md"
        filepath = self.content_dir / filename
        
        # Check if file already exists
        if filepath.exists():
            print(f"Warning: File {filepath} already exists. Overwriting...", file=sys.stderr)
        
        # Generate front-matter
        front_matter = self.generate_front_matter(
            title=title,
            description=description,
            tags=tags,
            categories=categories,
            author_name=author_name,
            author_image=author_image,
            draft=draft,
            hero_image=hero_image
        )
        
        # Combine front-matter and content
        full_content = f"{front_matter}\n\n{content}\n"
        
        # Write to file
        filepath.write_text(full_content, encoding='utf-8')
        
        print(f"Created post: {filepath}")
        return filepath
    
    def create_post_from_json(self, json_file):
        """
        Create a blog post from a JSON configuration file.
        
        Expected JSON format:
        {
            "title": "Post Title",
            "content": "Post content in Markdown",
            "description": "Post description",
            "tags": ["tag1", "tag2"],
            "categories": ["Category1"],
            "author_name": "Ray Miller",
            "author_image": "/images/author/avatar.png",
            "draft": false,
            "hero_image": "/images/hero/post-hero.jpg"
        }
        
        Args:
            json_file: Path to JSON file
            
        Returns:
            Path to created post file
        """
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        return self.create_post(
            title=data.get('title', 'Untitled Post'),
            content=data.get('content', ''),
            description=data.get('description', ''),
            tags=data.get('tags', []),
            categories=data.get('categories', []),
            author_name=data.get('author_name', 'Ray Miller'),
            author_image=data.get('author_image', '/images/author/avatar.png'),
            draft=data.get('draft', False),
            hero_image=data.get('hero_image', '')
        )
    
    def batch_create_posts(self, json_files):
        """
        Create multiple posts from a list of JSON files.
        
        Args:
            json_files: List of paths to JSON files
            
        Returns:
            List of created post file paths
        """
        created_posts = []
        for json_file in json_files:
            try:
                filepath = self.create_post_from_json(json_file)
                created_posts.append(filepath)
            except Exception as e:
                print(f"Error creating post from {json_file}: {e}", file=sys.stderr)
        
        return created_posts


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(
        description='Generate AI-powered blog posts for Hugo',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Create a post from command line arguments
  python generate_posts.py --title "My Post" --content "Post content here" --tags "tag1" "tag2"
  
  # Create a post from a JSON file
  python generate_posts.py --from-json post_data.json
  
  # Create multiple posts from JSON files
  python generate_posts.py --batch post1.json post2.json post3.json
  
  # Create a draft post
  python generate_posts.py --title "Draft Post" --content "Content" --draft
        """
    )
    
    parser.add_argument('--title', type=str, help='Post title')
    parser.add_argument('--content', type=str, help='Post content (Markdown)')
    parser.add_argument('--description', type=str, default='', help='Post description')
    parser.add_argument('--tags', nargs='+', default=[], help='Post tags')
    parser.add_argument('--categories', nargs='+', default=[], help='Post categories')
    parser.add_argument('--author-name', type=str, default='Ray Miller', help='Author name')
    parser.add_argument('--author-image', type=str, default='/images/author/avatar.png', 
                       help='Author image path')
    parser.add_argument('--draft', action='store_true', help='Mark post as draft')
    parser.add_argument('--hero-image', type=str, default='', help='Hero image path')
    parser.add_argument('--content-dir', type=str, default='content/blog/auto',
                       help='Content directory (default: content/blog/auto)')
    parser.add_argument('--from-json', type=str, help='Create post from JSON file')
    parser.add_argument('--batch', nargs='+', help='Create multiple posts from JSON files')
    
    args = parser.parse_args()
    
    # Initialize generator
    generator = HugoBlogPostGenerator(content_dir=args.content_dir)
    
    # Handle different modes
    if args.batch:
        # Batch mode
        created_posts = generator.batch_create_posts(args.batch)
        print(f"\nCreated {len(created_posts)} posts:")
        for post in created_posts:
            print(f"  - {post}")
    elif args.from_json:
        # JSON file mode
        generator.create_post_from_json(args.from_json)
    elif args.title and args.content:
        # Command line arguments mode
        # Decode escaped newlines in content
        content = args.content.replace('\\n', '\n')
        generator.create_post(
            title=args.title,
            content=content,
            description=args.description,
            tags=args.tags,
            categories=args.categories,
            author_name=args.author_name,
            author_image=args.author_image,
            draft=args.draft,
            hero_image=args.hero_image
        )
    else:
        parser.print_help()
        print("\nError: Either --title and --content, --from-json, or --batch must be provided.",
              file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
