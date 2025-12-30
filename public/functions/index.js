/**
 * Sando's Advisory: Elite Cloud Function
 * Handles private vetting and secure email transmission.
 */

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Set up your private email transport
// Note: You must generate a Google App Password for this to work.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mindmappingnz@gmail.com',
        pass: 'YOUR_APP_SPECIFIC_PASSWORD' 
    }
});

exports.eliteEnquiry = functions.https.onRequest(async (req, res) => {
    // Enable CORS so your website can talk to this function
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // 1. DUAL-LAYER VETTING (Math + Branding)
    const { name, email, message, math_answer, hero_answer } = req.body;
    
    // Check Math (15) AND Hero (batman) - Case Insensitive
    const isMathCorrect = (math_answer === "15");
    const isHeroCorrect = (hero_answer && hero_answer.toLowerCase().trim() === "batman");

    if (!isMathCorrect || !isHeroCorrect) {
        console.warn(`Vetting failed for: ${email}`);
        return res.status(400).send("Verification Failed. Enquiry discarded due to incorrect vetting answers.");
    }

    // 2. CONSTRUCT THE DISCREET BRIEF
    const mailOptions = {
        from: 'Sando Advisory <mindmappingnz@gmail.com>',
        to: 'mindmappingnz@gmail.com',
        subject: `NEW DISCREET BRIEF: ${name}`,
        text: `
SANDO'S ADVISORY: INCOMING ENQUIRY

NAME: ${name}
EMAIL: ${email}

BRIEFING DETAILS:
---------------------------------
${message}
---------------------------------
VETTING STATUS: PASSED
        `
    };

    // 3. EXECUTE TRANSMISSION
    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send("Enquiry Received. The vetting process has been initiated.");
    } catch (error) {
        console.error("Transmission Error:", error);
        return res.status(500).send("System Error. Please attempt contact via alternate secure channels.");
    }
});