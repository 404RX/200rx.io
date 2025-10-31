#!/usr/bin/env python3
"""
Tests for the generate_posts.py script
"""

import os
import sys
import tempfile
import shutil
from pathlib import Path
import json

# Add scripts directory to path
sys.path.insert(0, os.path.dirname(__file__))

from generate_posts import HugoBlogPostGenerator


def test_sanitize_filename():
    """Test filename sanitization."""
    generator = HugoBlogPostGenerator()
    
    # Test basic sanitization
    assert generator.sanitize_filename("Hello World") == "hello-world"
    assert generator.sanitize_filename("Test Post!") == "test-post"
    assert generator.sanitize_filename("Multi   Spaces") == "multi-spaces"
    assert generator.sanitize_filename("Special@#$%Characters") == "specialcharacters"
    assert generator.sanitize_filename("---Leading-Trailing---") == "leading-trailing"
    
    print("✓ Filename sanitization tests passed")


def test_front_matter_generation():
    """Test front-matter generation."""
    generator = HugoBlogPostGenerator()
    
    # Test basic front-matter
    front_matter = generator.generate_front_matter(
        title="Test Post",
        description="Test description",
        tags=["tag1", "tag2"],
        categories=["Category1"]
    )
    
    # Verify required fields
    assert 'title: "Test Post"' in front_matter
    assert 'draft: false' in front_matter
    assert 'author:' in front_matter
    assert 'name: "Ray Miller"' in front_matter
    assert 'description: "Test description"' in front_matter
    assert 'tags: ["tag1", "tag2"]' in front_matter
    assert 'categories: ["Category1"]' in front_matter
    assert 'toc: true' in front_matter
    assert front_matter.startswith('---')
    assert front_matter.endswith('---')
    
    print("✓ Front-matter generation tests passed")


def test_create_post():
    """Test post creation."""
    with tempfile.TemporaryDirectory() as tmpdir:
        generator = HugoBlogPostGenerator(content_dir=tmpdir)
        
        # Create a test post
        filepath = generator.create_post(
            title="Test Post",
            content="# Test\n\nThis is test content.",
            description="Test description",
            tags=["test"],
            categories=["Testing"]
        )
        
        # Verify file was created
        assert filepath.exists()
        assert filepath.name == "test-post.md"
        
        # Verify content
        content = filepath.read_text()
        assert "title: \"Test Post\"" in content
        assert "# Test" in content
        assert "This is test content." in content
        
        print("✓ Post creation tests passed")


def test_create_post_from_json():
    """Test post creation from JSON file."""
    with tempfile.TemporaryDirectory() as tmpdir:
        generator = HugoBlogPostGenerator(content_dir=tmpdir)
        
        # Create a test JSON file
        json_file = Path(tmpdir) / "test.json"
        json_data = {
            "title": "JSON Test Post",
            "content": "# JSON Test\n\nContent from JSON.",
            "description": "JSON test",
            "tags": ["json", "test"],
            "categories": ["Testing"],
            "draft": True
        }
        json_file.write_text(json.dumps(json_data))
        
        # Create post from JSON
        filepath = generator.create_post_from_json(json_file)
        
        # Verify
        assert filepath.exists()
        content = filepath.read_text()
        assert "title: \"JSON Test Post\"" in content
        assert "draft: true" in content
        assert "# JSON Test" in content
        
        print("✓ JSON post creation tests passed")


def test_batch_create_posts():
    """Test batch post creation."""
    with tempfile.TemporaryDirectory() as tmpdir:
        generator = HugoBlogPostGenerator(content_dir=tmpdir)
        
        # Create multiple JSON files
        json_files = []
        for i in range(3):
            json_file = Path(tmpdir) / f"test{i}.json"
            json_data = {
                "title": f"Batch Post {i}",
                "content": f"# Post {i}",
                "tags": ["batch"]
            }
            json_file.write_text(json.dumps(json_data))
            json_files.append(str(json_file))
        
        # Batch create
        created = generator.batch_create_posts(json_files)
        
        # Verify
        assert len(created) == 3
        for i, filepath in enumerate(created):
            assert filepath.exists()
            content = filepath.read_text()
            assert f"Batch Post {i}" in content
        
        print("✓ Batch creation tests passed")


def test_special_characters():
    """Test handling of special characters in content."""
    with tempfile.TemporaryDirectory() as tmpdir:
        generator = HugoBlogPostGenerator(content_dir=tmpdir)
        
        # Create post with special characters
        content = '# Test\n\nQuotes: "double" and \'single\'\nEmoji: 🎉\nCode: `print("hello")`'
        filepath = generator.create_post(
            title="Special Characters Test",
            content=content,
            tags=["test"]
        )
        
        # Verify
        assert filepath.exists()
        file_content = filepath.read_text()
        assert "🎉" in file_content
        assert 'print("hello")' in file_content
        
        print("✓ Special characters tests passed")


def run_all_tests():
    """Run all tests."""
    print("\nRunning tests for generate_posts.py...\n")
    
    try:
        test_sanitize_filename()
        test_front_matter_generation()
        test_create_post()
        test_create_post_from_json()
        test_batch_create_posts()
        test_special_characters()
        
        print("\n✅ All tests passed!\n")
        return 0
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}\n")
        return 1
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}\n")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    sys.exit(run_all_tests())
