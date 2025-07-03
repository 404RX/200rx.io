const https = require('http');

const options = {
  hostname: 'localhost',
  port: 1313,
  path: '/posts/first-post/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n=== CHECKING POST CONTENT ===');
    
    // Check for content indicators
    const indicators = [
      { name: 'Welcome', pattern: /Welcome/gi },
      { name: 'Portfolio', pattern: /Portfolio/gi },
      { name: 'content-section', pattern: /content-section/gi },
      { name: 'navbar', pattern: /navbar/gi },
      { name: 'My Portfolio', pattern: /My Portfolio/gi },
      { name: 'Recent Posts', pattern: /Recent Posts/gi }
    ];
    
    indicators.forEach(indicator => {
      const matches = data.match(indicator.pattern);
      console.log(`${indicator.name}: ${matches ? '✅ ' + matches.length + ' found' : '❌ not found'}`);
    });
    
    // Look for the actual content
    if (data.includes('Welcome to My Portfolio') || data.includes('My Portfolio')) {
      console.log('\n✅ POST CONTENT IS DISPLAYING!');
    } else {
      console.log('\n❌ Post content not found');
    }
    
    // Check for the main content section
    const contentMatch = data.match(/<section class="content-section"[^>]*>(.*?)<\/section>/gs);
    if (contentMatch) {
      console.log('\n✅ Content section found');
      const content = contentMatch[0];
      if (content.length > 500) {
        console.log('✅ Content section has substantial content (' + content.length + ' chars)');
      }
    } else {
      console.log('\n❌ Content section not found');
    }
    
    console.log('\nPage length:', data.length);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
