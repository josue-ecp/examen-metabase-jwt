const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const METABASE_SECRET_KEY = "30c9734cb696671a3f1d1ba74236073dfd0f2f2eecaeaaff3c4553b668a5a497";
const METABASE_SITE_URL = 'http://localhost:3030';
const DASHBOARD_ID = 34; 

app.get('/api/metabase-token', (req, res) => {
    try {
        const payload = {
            resource: { dashboard: DASHBOARD_ID },
            params: {},
            exp: Math.round(Date.now() / 1000) + (10 * 60) 
        };

        const token = jwt.sign(payload, METABASE_SECRET_KEY);
        const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;

        res.json({ url: iframeUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el token JWT' });
    }
});

app.listen(5000, () => {
    console.log('Backend corriendo en http://localhost:5000');
});