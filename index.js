export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST supportato" });
  }

  let userInput = "";

  try {
    const body = await req.json(); // ⬅️ parsing automatico (Vercel 2024)
    userInput = body.prompt;

    if (!userInput) {
      return res.status(400).json({ error: "Input mancante" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Sei Angeus, un assistente personale diretto e futuristico." },
          { role: "user", content: userInput }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error.message || "Errore API" });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    return res.status(500).json({ error: "Errore interno", details: error.message });
  }
}
