
'use client';

import {  useEffect, useRef } from 'react';
import MessageInput from './MessageInput';

interface User {
  _id: string;
  username: string;
  email?: string;
  lastSeen: string;
  id?: string;
}

interface Message {
  _id?: string;
  id?: string;
  senderId: string | { _id: string };
  receiverId?: string | { _id: string };
  message: string;
  createdAt?: string;
  timestamp?: string;
}

export default function ChatWindow({
  selectedUser,
  messages,
  onSendMessage,
  currentUserId,
}: {
  selectedUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  currentUserId: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {selectedUser.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{selectedUser.username}</h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const senderId =
            typeof message.senderId === 'string'
              ? message.senderId
              : message.senderId._id;
          const isCurrentUser = senderId === currentUserId;

          return (
            <div
              key={message._id || message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.createdAt || message.timestamp || '').toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}