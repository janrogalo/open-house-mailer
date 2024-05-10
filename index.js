const express = require('express');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint to send email
app.post('/send-email', async (req, res) => {
    try {
        // Extract email details from the request body
        const { from, to, subject, html } = req.body;

        // Send email using Resend
        await resend.emails.send({
            from,
            to,
            subject,
            html
        });

        // Respond with success message
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        // Respond with error message
        res.status(500).json({ error: 'Error sending email.' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
