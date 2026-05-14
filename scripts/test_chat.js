const http = require('http');

const data = JSON.stringify({
    message: 'How do I run the backend?'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        try {
            const parsed = JSON.parse(responseBody);
            console.log('Response Message:', parsed.response);
        } catch (e) {
            console.log('Raw Response:', responseBody);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
