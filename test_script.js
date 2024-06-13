const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function runTest() {
    const response = await fetch('http://localhost:3000/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const dest = path.join(__dirname, 'file_structure_test.zip');
        const fileStream = fs.createWriteStream(dest);
        await new Promise((resolve, reject) => {
            response.body.pipe(fileStream);
            response.body.on('error', reject);
            fileStream.on('finish', resolve);
        });

        console.log('Test zip file downloaded successfully.');
    } else {
        console.log('Failed to generate test zip file.');
    }
}

runTest().catch(err => console.error(err));
