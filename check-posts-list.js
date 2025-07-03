const http = require('http');

const options = {
  hostname: 'localhost',
  port: 1313,
  path: '/posts/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`✅ Posts list page (${res.statusCode})`);
    console.log(`📏 Content length: ${data.length} characters`);
    
    // Check for key elements
    const checks = [
      { name: 'Sidebar section', found: data.includes('sidebar-section') },
      { name: 'Content section', found: data.includes('content-section') },
      { name: 'Post card holder', found: data.includes('post-card-holder') },
      { name: 'Post cards', found: (data.match(/post-card/g) || []).length },
      { name: 'Grid layout', found: data.includes('main-content') },
      { name: 'CSS Grid fix', found: data.includes('grid-template-columns') }
    ];
    
    checks.forEach(check => {
      if (typeof check.found === 'boolean') {
        console.log(`${check.found ? '✅' : '❌'} ${check.name}`);
      } else {
        console.log(`📊 ${check.name}: ${check.found} found`);
      }
    });
    
    // Check layout structure
    if (data.includes('main-content') && data.includes('sidebar-section') && data.includes('content-section')) {
      console.log('\n🎯 EXPECTED LAYOUT STRUCTURE FOUND');
      console.log('The posts list page has the correct HTML structure for sidebar + content layout');
    } else {
      console.log('\n❌ Layout structure issues detected');
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
