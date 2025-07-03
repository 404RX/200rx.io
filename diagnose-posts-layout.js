const http = require('http');
const fs = require('fs');

const options = {
  hostname: 'localhost',
  port: 1313,
  path: '/posts/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Save the full HTML to a file for inspection
    fs.writeFileSync('posts-page-output.html', data);
    console.log('✅ Full HTML saved to posts-page-output.html');
    
    console.log('\n=== LAYOUT ANALYSIS ===');
    
    // Check for CSS issues
    const cssIssues = [
      { name: 'Writing mode vertical', pattern: /writing-mode:\s*vertical/gi },
      { name: 'Text orientation', pattern: /text-orientation/gi },
      { name: 'Transform rotate', pattern: /transform:\s*rotate/gi },
      { name: 'Display flex issues', pattern: /display:\s*flex/gi },
      { name: 'Column layout', pattern: /column-/gi }
    ];
    
    cssIssues.forEach(issue => {
      const matches = data.match(issue.pattern);
      if (matches) {
        console.log(`❌ ${issue.name}: ${matches.length} found - might be causing vertical text`);
        console.log(`   First match: ${matches[0]}`);
      } else {
        console.log(`✅ ${issue.name}: not found`);
      }
    });
    
    // Check if our content is there
    console.log('\n=== CONTENT CHECK ===');
    const contentIndicators = [
      'Posts page is now working',
      'Active Directory',
      'PowerShell',
      'Welcome',
      'Read More'
    ];
    
    contentIndicators.forEach(indicator => {
      if (data.includes(indicator)) {
        console.log(`✅ Found: "${indicator}"`);
      } else {
        console.log(`❌ Missing: "${indicator}"`);
      }
    });
    
    // Check for Bootstrap classes
    console.log('\n=== CSS FRAMEWORK CHECK ===');
    const frameworks = [
      { name: 'Bootstrap card', pattern: /class="[^"]*card[^"]*"/gi },
      { name: 'Bootstrap row', pattern: /class="[^"]*row[^"]*"/gi },
      { name: 'Bootstrap col', pattern: /class="[^"]*col[^"]*"/gi },
      { name: 'Flexbox', pattern: /display:\s*flex/gi }
    ];
    
    frameworks.forEach(framework => {
      const matches = data.match(framework.pattern);
      console.log(`${framework.name}: ${matches ? matches.length + ' found' : 'not found'}`);
    });
    
    // Look for specific problematic CSS
    console.log('\n=== PROBLEMATIC CSS SEARCH ===');
    if (data.includes('writing-mode')) {
      console.log('❌ Found writing-mode CSS - this could cause vertical text');
    }
    if (data.includes('flex-direction: column')) {
      console.log('❌ Found flex-direction: column - might be forcing vertical layout');
    }
    if (data.includes('text-orientation')) {
      console.log('❌ Found text-orientation CSS - this could cause rotated text');
    }
    
    console.log('\n=== RECOMMENDATION ===');
    console.log('Check the posts-page-output.html file to see the exact HTML structure');
    console.log('Look for any CSS that might be causing the vertical text display');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
  console.log('Make sure Hugo is running on port 55436');
});

req.end();
