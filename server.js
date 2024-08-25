const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));


const HF_API_KEY = 'CRIAR UM TOKEN NA HUGGING FACE';


app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                },
            }
        );
        const generatedText = response.data[0].generated_text;
        res.send({ text: generatedText });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao gerar texto.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});