'use client';

import { useState } from 'react';
import axios from 'axios';
import "./ai.css"

export default function Page() {
  let [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await axios.post('/api/chat', { message });
    setReply(res.data.reply);
    setLoading(false);
    setMessage(" ")
  };

  return (
    <div className='flex flex-col items-center main-div-ai h-screen'>
      <div className="p-4 w-[90vw] lg:w-[70vw] xl:w-[40vw] ">
      <div className="relative">
        <div className="relative flex flex-col border border-white/10 rounded-xl bg-[#ffffff15] backdrop-blur-[0.8px] ">
          <div className="overflow-y-auto">
            <textarea
              rows={3}
              style={{ overflow: "hidden", outline: "none" }}
              className="w-full px-4 py-3 resize-none bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50 align-top leading-normal min-h-[80px] text-white"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="h-14">
            <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Attach file */}
                <button
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                  aria-label="Attach file"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </button>

                {/* Attach web link */}
                <button
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                  aria-label="Attach web link"
                  type="button"
                >
                  <svg
                    className="w-4 h-4 text-blue-500"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="10" cy="12" cx="12"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </button>

                {/* Attach Figma link */}
                <button
                  className="p-2 text-white/50 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                  aria-label="Attach Figma link"
                  type="button"
                >
                  <svg
                    className="w-4 h-4 text-pink-500"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={16}
                    width={16}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
                    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
                    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
                    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
                    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
                  </svg>
                </button>
              </div>

              {/* Send message */}
              <button
                className="p-2 transition-colors text-blue-500 hover:text-blue-600"
                aria-label="Send message"
                type="button"
                onClick={sendMessage}
              >
                <svg
                  className="w-6 h-6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle r="10" cy="12" cx="12"></circle>
                  <path d="m16 12-4-4-4 4"></path>
                  <path d="M12 16V8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      {loading && <p>Thinking...</p>}
      {reply && (
        <div className="mt-4 border-t pt-2">
          <strong>Bot:</strong> {reply}
        </div>
      )}
    </div>
    </div>
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