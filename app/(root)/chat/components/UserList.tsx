// === UserList.tsx (Updated) ===
'use client';

import React from 'react';

interface User {
  _id: string;
  username: string;
  email?: string;
  lastSeen: string;
  id?: string;
}

interface UserListProps {
  users: User[];
  onlineUsers: Set<string>;
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  currentUserId: string;
  unreadMessages: Record<string, number>; // <-- New prop
}

export default function UserList({
  users,
  onlineUsers,
  selectedUser,
  onUserSelect,
  currentUserId,
  unreadMessages,
}: UserListProps) {
  const filteredUsers = users.filter((user) => user._id !== currentUserId);

  return (
    <div className="overflow-y-auto h-full">
      {filteredUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => onUserSelect(user)}
          className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
            selectedUser?._id === user._id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              {onlineUsers.has(user._id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
              {unreadMessages[user._id] && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages[user._id]}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{user.username}</h3>
                {onlineUsers.has(user._id) ? (
                  <span className="text-xs text-green-600">Online</span>
                ) : (
                  <span className="text-xs text-gray-500">
                    {new Date(user.lastSeen).toLocaleTimeString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}