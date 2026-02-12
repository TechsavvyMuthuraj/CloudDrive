const express = require('express');
const { google } = require('googleapis');
const { oauth2Client } = require('./authController');
const router = express.Router();

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Middleware to check if user is authenticated (has tokens)
// In a real app, you'd validate the session/token here.
// For this clone, we'll assume the frontend sends the token in headers or we use the global oauth2Client (simplified).
// BETTER APPROACH: Frontend sends 'Authorization: Bearer <access_token>'
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    oauth2Client.setCredentials({ access_token: token });
    req.drive = google.drive({ version: 'v3', auth: oauth2Client });
    next();
};

router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
    try {
        const fileMetadata = {
            name: req.file.originalname,
        };
        const media = {
            mimeType: req.file.mimetype,
            body: fs.createReadStream(req.file.path),
        };
        const response = await req.drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name, webViewLink, iconLink, thumbnailLink',
        });

        // Clean up uploaded file from server
        fs.unlinkSync(req.file.path);

        res.json(response.data);
    } catch (error) {
        console.error('Error uploading file', error);
        res.status(500).send('Error uploading file');
    }
});

router.get('/list', authenticate, async (req, res) => {
    try {
        const response = await req.drive.files.list({
            pageSize: 20,
            fields: 'nextPageToken, files(id, name, mimeType, webViewLink, iconLink, thumbnailLink)',
            q: "trashed=false" // Don't show trash
        });
        res.json(response.data.files);
    } catch (error) {
        console.error('Error listing files', error);
        res.status(500).send('Error listing files');
    }
});

router.get('/download/:id', authenticate, async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await req.drive.files.get({
            fileId: fileId,
            fields: 'name, mimeType'
        });

        res.header('Content-Disposition', `attachment; filename="${file.data.name}"`);
        res.header('Content-Type', file.data.mimeType);

        const result = await req.drive.files.get({
            fileId: fileId,
            alt: 'media'
        }, { responseType: 'stream' });

        result.data.pipe(res);
    } catch (error) {
        console.error('Error downloading file', error);
        res.status(500).send('Error downloading file');
    }
});

router.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        await req.drive.files.delete({
            fileId: req.params.id
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting file', error);
        res.status(500).send('Error deleting file');
    }
});

module.exports = router;
