import { useState } from 'react';

export default function Chat() {

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getAIResponse(prompt);
    setResponse(result || 'Error getting response');
  };
  
  async function getAIResponse(prompt) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
        />
        <button type="submit">Generate</button>
      </form>
      {response && <p>AI Response: {response}</p>}
    </div>
  );
}
