const express = require('express');
const bodyParser = require('body-parser');
const { createWriteStream, mkdirSync, writeFileSync, existsSync, rmSync } = require('fs');
const archiver = require('archiver');
const path = require('path');
const os = require('os');

const app = express();
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate-zip', (req, res) => {
    const { structure } = req.body;
    const tempDir = path.join(os.tmpdir(), 'file_structure');
    const zipPath = path.join(os.tmpdir(), 'file_structure.zip');

    function parseStructure(structure, rootPath) {
        for (const name in structure) {
            const fullPath = path.join(rootPath, name);
            if (typeof structure[name] === 'string') {
                mkdirSync(path.dirname(fullPath), { recursive: true });
                writeFileSync(fullPath, structure[name]);
            } else {
                mkdirSync(fullPath, { recursive: true });
                parseStructure(structure[name], fullPath);
            }
        }
    }

    if (existsSync(tempDir)) {
        rmSync(tempDir, { recursive: true, force: true });
    }

    parseStructure(structure, tempDir);

    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        res.download(zipPath, 'file_structure.zip', err => {
            if (err) {
                res.status(500).send('Error generating zip file.');
            }
        });
    });

    archive.pipe(output);
    archive.directory(tempDir, false);
    archive.finalize();
});

app.post('/test', (req, res) => {
    const testInput = require('./test_input.json');

    const { structure } = testInput;
    const tempDir = path.join(os.tmpdir(), 'file_structure_test');
    const zipPath = path.join(os.tmpdir(), 'file_structure_test.zip');

    if (existsSync(tempDir)) {
        rmSync(tempDir, { recursive: true, force: true });
    }

    function parseStructure(structure, rootPath) {
        for (const name in structure) {
            const fullPath = path.join(rootPath, name);
            if (typeof structure[name] === 'string') {
                mkdirSync(path.dirname(fullPath), { recursive: true });
                writeFileSync(fullPath, structure[name]);
            } else {
                mkdirSync(fullPath, { recursive: true });
                parseStructure(structure[name], fullPath);
            }
        }
    }

    parseStructure(structure, tempDir);

    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        res.download(zipPath, 'file_structure_test.zip', err => {
            if (err) {
                res.status(500).send('Error generating zip file.');
            }
        });
    });

    archive.pipe(output);
    archive.directory(tempDir, false);
    archive.finalize();
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
