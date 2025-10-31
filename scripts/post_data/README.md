# Post Data Directory

Place JSON files in this directory to automatically generate blog posts via GitHub Actions.

## Usage

1. Create a JSON file with your post data (see example below)
2. Commit and push the JSON file to the repository
3. GitHub Actions will automatically generate the blog post
4. The generated post will be committed to `content/blog/auto/`

## JSON File Format

```json
{
  "title": "Your Post Title",
  "content": "# Introduction\n\nYour post content in Markdown format...",
  "description": "A brief description of your post",
  "tags": ["tag1", "tag2", "tag3"],
  "categories": ["Category Name"],
  "author_name": "Ray Miller",
  "author_image": "/images/author/avatar.png",
  "draft": false,
  "hero_image": "/images/hero/your-hero-image.jpg"
}
```

## Example

See `example-post.json` for a complete example.

## Notes

- JSON files are processed on push to main/develop branches
- After processing, you may want to delete or archive the JSON files
- Use `draft: true` to create draft posts that won't be published
- All Markdown formatting is supported in the `content` field
- Use `\n` for line breaks in the content field
