export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { userInput } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Sei Angeus, un assistente personale diretto, futuristico e professionale.",
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ reply: data.choices[0].message.content.trim() });

  } catch (error) {
    return res.status(500).json({ error: "Errore interno", details: error.message });
  }
}

