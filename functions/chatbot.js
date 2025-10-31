// Netlify Function to proxy chatbot requests securely
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { question } = JSON.parse(event.body);
    
    if (!question || question.trim().length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Question is required' })
      };
    }

    // Make request to your backend using the securely stored API key
    const response = await fetch('https://two00rx-io-chatbot.onrender.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.CHATBOT_API_KEY  // Secure server-side access
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Backend request failed' })
      };
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
