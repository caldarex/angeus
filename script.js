async function sendMessage() {
  const prompt = document.getElementById("prompt").value;
  const responseBox = document.getElementById("response");
  responseBox.innerText = "Angeus sta scrivendo...";

  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userInput: prompt })
    });

    const data = await response.json();

    if (data.reply) {
      responseBox.innerText = data.reply;
    } else {
      responseBox.innerText = "Errore: " + (data.error || "nessuna risposta");
    }
  } catch (err) {
    responseBox.innerText = "Errore di rete: " + err.message;
  }
}
