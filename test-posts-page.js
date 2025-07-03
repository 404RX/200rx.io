const https = require('http');

const options = {
  hostname: 'localhost',
  port: 1313,
  path: '/posts/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log(`headers:`, res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Look for specific content that indicates posts are present
    if (data.includes('post-card')) {
      console.log('✅ Posts are displaying correctly - found post-card elements');
    } else if (data.includes('Active Directory Cleanup') || data.includes('Getting Started with Hugo') || data.includes('Welcome')) {
      console.log('✅ Posts content found in page');
    } else {
      console.log('❌ Posts content not found');
    }
    
    // Check for the content section
    const contentMatch = data.match(/<section class="content-section"[^>]*>(.*?)<\/section>/s);
    if (contentMatch) {
      console.log('Content section found');
      const contentSection = contentMatch[1];
      if (contentSection.includes('post-card-holder') && contentSection.length > 1000) {
        console.log('✅ Posts section appears to have content');
      } else {
        console.log('❌ Posts section appears empty');
        console.log('Content section length:', contentSection.length);
      }
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
