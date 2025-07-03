const https = require('http');

const options = {
  hostname: 'localhost',
  port: 1313,
  path: '/posts/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n=== DEBUGGING POSTS PAGE ===');
    
    // Check for various indicators
    const indicators = [
      { name: 'post-card', pattern: /post-card/gi },
      { name: 'card-title', pattern: /card-title/gi },
      { name: 'Welcome', pattern: /Welcome/gi },
      { name: 'Active Directory', pattern: /Active Directory/gi },
      { name: 'PowerShell', pattern: /PowerShell/gi },
      { name: 'Hugo', pattern: /Hugo/gi },
      { name: 'post-card-holder', pattern: /post-card-holder/gi },
      { name: 'container-fluid post-card-holder', pattern: /container-fluid post-card-holder/gi }
    ];
    
    indicators.forEach(indicator => {
      const matches = data.match(indicator.pattern);
      console.log(`${indicator.name}: ${matches ? matches.length + ' found' : 'not found'}`);
    });
    
    // Look for the main content section
    const contentMatch = data.match(/<section class="content-section"[^>]*id="content-section">(.*?)<\/section>/gs);
    if (contentMatch) {
      console.log('\n=== CONTENT SECTION FOUND ===');
      const content = contentMatch[0];
      console.log('Content section length:', content.length);
      
      // Look for pagination or post holder
      if (content.includes('post-card-holder')) {
        console.log('✅ Post card holder found in content');
        
        // Look for pagination
        if (content.includes('paginator')) {
          console.log('✅ Paginator found');
        } else {
          console.log('❌ Paginator not found');
        }
      } else {
        console.log('❌ Post card holder not found in content');
      }
    } else {
      console.log('❌ Content section not found');
    }
    
    // Check if the page has the sidebar
    if (data.includes('sidebar-section')) {
      console.log('✅ Sidebar section found');
    } else {
      console.log('❌ Sidebar section not found');
    }
    
    console.log('\n=== HTML STRUCTURE ===');
    console.log('Page length:', data.length);
    console.log('Body classes:', data.match(/body class="([^"]*)"/) ? data.match(/body class="([^"]*)"/)[1] : 'not found');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
