'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '40000?',
      sender: 'user1',
      name: 'name',
      title: 'title'
    },
    {
      id: 2,
      text: 'deal',
      sender: 'user2',
      name: 'name',
      title: 'title'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, {
      id: messages.length + 1,
      text: message,
      sender: 'user1',
      name: 'Current User',
    }]);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1 p-4">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 pb-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="text-purple-600">O</div>
              </div>
              <span className="font-medium">name</span>
            </div>
            <span className="text-gray-700">title</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user2' ? 'flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="text-purple-600">O</div>
                </div>
              </div>
              <div className={`flex ${msg.sender === 'user2' ? 'justify-end' : ''} flex-1`}>
                <div className={`${msg.text === 'deal' ? 'bg-gray-600 text-white' : 'bg-gray-200'} p-3 rounded-lg inline-block`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 bg-white pt-4 border-t">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type your message..."
              className="w-full bg-gray-300 rounded-lg py-3 px-4 pr-12"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              ▶
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}