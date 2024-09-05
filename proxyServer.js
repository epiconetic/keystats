const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON request body
app.use(bodyParser.json());

// Proxy route yang menerima parameter ticker
app.post('/api/keystats', async (req, res) => {
    const { ticker } = req.body; // Ambil parameter ticker dari request body

    if (!ticker) {
        return res.status(400).json({ error: 'Ticker is required' });
    }

    try {
        // URL API dengan ticker yang diterima dari request body
        const url = `https://exodus.stockbit.com/keystats/ratio/v1/${ticker}?year_limit=10`;

        // Permintaan ke API dengan header yang sesuai
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3MDc0NjI3LTg4MWItNDQzZC04OTcyLTdmMmMzOTNlMzYyOSIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZSI6ImRlZHlpc2thbmRhcjQ1OSIsImVtYSI6InNjcmFwaW5nLm15QGdtYWlsLmNvbSIsImZ1bCI6ImRlZHkgaXNrYW5kYXIiLCJzZXMiOiJ1YW9kenV6TGZTM3Q5Qmx3IiwiZHZjIjoiIiwidWlkIjoyNzk2MTYwfSwiZXhwIjoxNzI1NTk4MDI1LCJpYXQiOjE3MjU1MTE2MjUsImlzcyI6IlNUT0NLQklUIiwianRpIjoiOWViMzI0ZmUtOTNjNi00YjgxLWJkMzQtN2ViODYxMDIwOGI0IiwibmJmIjoxNzI1NTExNjI1LCJ2ZXIiOiJ2MSJ9.uwluKa2vvngfmKzvvPawOmH4bWlBXOZNFOjpfItXd5Kc8b8oAErKOLotWNG6D0Pwv2XVvSlZkejprACP2PYMqbnU2yKoumlc_Rnh59ayG0YO0nYZd77Nt5OEfwSaJArzkoR2FUcm-DLZHoek3jiMZ8mcaU5GFf6xqAKMos0VcJzo76Pjl_Cdvce1gUWxdT4FVvhvJjl-qCZjSnCp9EQTPlOn5bWmp6DMoM2JoFcqDhoTwETKEewaI6Md77U_QuhN6YcicTZ6KMxlcD88UpPfME6QQGHF9ceBDSNHV6lgU_-ObV3HiJgFME__RYc8mmt6UxzAf26yP9lLjfrzcxdVXQ',
                'cache-control': 'no-cache',
                'dnt': '1',
                'origin': 'https://stockbit.com',
                'pragma': 'no-cache',
                'priority': 'u=1, i',
                'referer': 'https://stockbit.com/',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
            }
        });

        // Kirimkan kembali response dari API ke klien
        res.json(response.data);
    } catch (error) {
        // Tangani kesalahan saat permintaan ke API gagal
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Stockbit API' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://0.0.0.0:${PORT}`);
});
