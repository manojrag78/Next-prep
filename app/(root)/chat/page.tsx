// === Chat.tsx (Main Chat Page) ===
"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';

import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import { getSessionToken, removeSessionToken } from '@/app/(auth)/config/sessionToken';

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

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [unreadMessages, setUnreadMessages] = useState<Record<string, number>>({});

  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACK_END_URL;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get<User[]>(`${url}/api/auth/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [url]);

  useEffect(() => {
    const token = getSessionToken("token");
    const user = JSON.parse(localStorage.getItem("user") || '{}') as User;

    if (!token || !user.id) {
      router.push("/");
      return;
    }

    setCurrentUser(user);

    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.emit("join", user.id);

    newSocket.on("userOnline", (userId: string) => {
      setOnlineUsers((prev) => new Set([...prev, userId]));
    });

    newSocket.on("userOffline", (userId: string) => {
      setOnlineUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(userId);
        return updated;
      });
    });

    newSocket.on("receiveMessage", (message: Message) => {
      const senderId = typeof message.senderId === 'string'
        ? message.senderId
        : message.senderId._id;

      const receiverId = typeof message.receiverId === 'string'
        ? message.receiverId
        : (message.receiverId as { _id: string })._id;

      const isCurrentChat = selectedUser &&
        (selectedUser._id === senderId || selectedUser._id === receiverId);

      if (isCurrentChat) {
        setMessages((prev) => [...prev, message]);
      } else {
        const userId = senderId === currentUser?.id ? receiverId : senderId;
        setUnreadMessages((prev) => ({
          ...prev,
          [userId]: (prev[userId] || 0) + 1,
        }));
      }
    });

    fetchUsers();

    return () => {
      newSocket.close();
    };
  }, [fetchUsers, router, selectedUser, url, currentUser?.id]);

  const fetchMessages = async (userId: string) => {
    try {
      const token = getSessionToken("token");
      const response = await axios.get<Message[]>(`${url}/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    fetchMessages(user._id);
    setUnreadMessages((prev) => {
      const updated = { ...prev };
      delete updated[user._id];
      return updated;
    });
  };

  const handleSendMessage = (text: string) => {
    if (socket && selectedUser && currentUser) {
      const messageData: Message = {
        receiverId: selectedUser._id,
        message: text,
        senderId: currentUser.id || '',
        timestamp: new Date().toISOString(),
      };

    //   setMessages((prev) => [...prev, messageData]);
      socket.emit('sendMessage', messageData);
    }
  };

  const handleLogout = () => {

    removeSessionToken("token");
    localStorage.removeItem("user");
    socket?.close();
    router.push("/");
  };

  return (
    <div className="h-[95vh] sm:h-screen flex bg-[#f9fafb] text-gray-800">
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{currentUser?.username}</h2>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <UserList
            users={users}
            onlineUsers={onlineUsers}
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect}
            currentUserId={currentUser?.id || ""}
            unreadMessages={unreadMessages}
          />
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative">
        {selectedUser ? (
          <ChatWindow
            selectedUser={selectedUser}
            messages={messages}
            onSendMessage={handleSendMessage}
            currentUserId={currentUser?.id || ""}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
            Select a user to start chatting
          </div>
        )}
      </main>
    </div>
  );
}
