import React, { useState, useEffect } from 'react';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    height: '60vh',
    overflowY: 'scroll',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  userMessage: {
    backgroundColor: '#d1ffd1',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
};

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI("AIzaSyCpw0TtpfQQdBtu2Y2ylRGASZRNz5ly_aw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const OCHandler = (e) => {
    setPrompt(e.target.value);
  };
  const Sbhandler = async (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      setChatHistory((prevHistory) => [...prevHistory, { sender: 'user', text: prompt }]);
      const result = await model.generateContent(prompt);
      const generatedText = result.response.text();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'ai', text: generatedText },
      ]);

      setPrompt("");
    }
  };

  return (
    <div style={styles.container}>
      <h1>THE DK AI Chatbot</h1>
      <div style={styles.chatBox}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.sender === 'user' ? styles.userMessage : styles.aiMessage),
            }}
          >
            <strong>{message.sender === 'user' ? 'You: ' : 'AI: '}</strong>
            {message.text}
          </div>
        ))}
      </div>
      <form style={styles.form} onSubmit={Sbhandler}>
        <input
          style={styles.input}
          type="text"
          name="prompt"
          placeholder="Type your message here..."
          value={prompt}
          onChange={OCHandler}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default App;
