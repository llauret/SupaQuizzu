import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
});

export async function chatGPTQuizzQuery() {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "developer", content: "You are a helpful assistant."},
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
        store: true,
    });

    console.log(completion.choices[0].message);
}

export async function jinaAI(file) {
    try {
        const base64Data = file.split(',')[1];

        const data = {
            instruction: 'Créez un quiz de 10 questions à partir de ce document sous ce format : ' +
                '"quiz": "Réseaux",\n  "questions": [\n    {\n      "enonce": "Quel est le rôle fondamental d\'une **adresse IP** dans un réseau informatique ?",\n      "reponses": [\n        {\n          "reponse": "Identifier le fabricant d\'une carte réseau.",\n          "est_correcte": false\n        },\n        {\n          "reponse": "Fournir un identifiant unique pour les périphériques sur un réseau.",\n          "est_correcte": true\n        },\n        {\n          "reponse": "Déterminer le chemin le plus court pour acheminer des données.",\n          "est_correcte": false\n        },\n        {\n          "reponse": "Contrôler l\'accès au support de transmission physique.",\n          "est_correcte": false\n        }\n      ]\n    }\n  ]\n}',
            pdf: base64Data
        };

        const response = await fetch('https://r.jina.ai/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Engine': 'browser',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_JINA_KEY}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Details:', errorData);
            throw new Error(`API error: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error calling Jina AI:', error);
        throw error;
    }
}