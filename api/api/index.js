async function getGPTReply(userInput) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: userInput })
  });

  const data = await response.json();
  return data.reply;
}
