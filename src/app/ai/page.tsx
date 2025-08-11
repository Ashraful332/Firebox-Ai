'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await axios.post('/api/chat', { message });
    setReply(res.data.reply);
    setLoading(false);
  };

  return (
    
  );
}

//    <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">🤖 Gemini AI Chatbot</h1>
//       <textarea
//         className="border w-full p-2 mb-2 text-black"
//         rows={4}
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button
//         onClick={sendMessage}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Send
//       </button>
//       {loading && <p>Thinking...</p>}
//       {reply && (
//         <div className="mt-4 border-t pt-2">
//           <strong>Bot:</strong> {reply}
//         </div>
//       )}
//     </div>