import React, { useState } from 'react';
import { Search, Send, AlertCircle, Calendar, Users, Plus, Clock, MessageSquare } from 'lucide-react';
import type { Message, User, Meeting, Room } from '../types';

const currentUser: User = {
  id: '1',
  name: 'Ram Prajeeth',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'Developer',
  status: 'online'
};

const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Tejaswini',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Project Manager',
    status: 'online'
  },
  {
    id: '3',
    name: 'Sibi Rassal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Senior Developer',
    status: 'busy'
  }
];

const rooms: Room[] = [
  { id: '1', name: 'Main Conference', capacity: 20, equipment: ['Projector', 'Whiteboard'], isAvailable: true },
  { id: '2', name: 'Brainstorm Room', capacity: 8, equipment: ['Whiteboard'], isAvailable: true },
  { id: '3', name: 'Meeting Pod', capacity: 4, equipment: ['Screen'], isAvailable: true },
];

const messages: Message[] = [
  {
    id: '1',
    content: "Hey team, how's the new feature coming along?",
    sender: users[1],
    recipients: users,
    timestamp: new Date('2024-03-10T10:00:00'),
    isUrgent: false,
    mentions: [],
    type: 'group'
  },
  {
    id: '2',
    content: '@John, can you review the latest PR?',
    sender: users[2],
    recipients: [currentUser],
    timestamp: new Date('2024-03-10T10:05:00'),
    isUrgent: true,
    mentions: ['John'],
    type: 'private'
  }
];

const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Sprint Planning',
    description: 'Weekly sprint planning meeting',
    startTime: new Date('2024-03-11T10:00:00'),
    endTime: new Date('2024-03-11T11:00:00'),
    room: rooms[0],
    attendees: users,
    organizer: users[1]
  }
];

export default function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<'Team Chat' | 'Private' | 'Meetings'>('Team Chat');
  const [showNewMeeting, setShowNewMeeting] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Add message handling logic here
    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-sand-light">
      {/* Sidebar */}
      <div className="w-64 bg-navy text-white">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-navy-light text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        {/* Chat List */}
        <div className="space-y-2 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Chats</h2>
            <button className="p-1 hover:bg-navy-light rounded">
              <Plus size={20} />
            </button>
          </div>
          {['Team Chat', 'Private', 'Meetings'].map((chat) => (
            <div
              key={chat}
              onClick={() => setSelectedChat(chat as any)}
              className={`px-4 py-3 rounded-lg cursor-pointer ${
                selectedChat === chat ? 'bg-navy-light' : 'hover:bg-navy-light'
              }`}
            >
              <div className="flex items-center">
                {chat === 'Team Chat' && <Users size={20} className="mr-2" />}
                {chat === 'Private' && <MessageSquare size={20} className="mr-2" />}
                {chat === 'Meetings' && <Calendar size={20} className="mr-2" />}
                <p className="font-medium">{chat}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Online Users */}
        <div className="p-4 border-t border-navy-light">
          <h2 className="font-semibold mb-4">Online</h2>
          <div className="space-y-3">
            {users.map(user => (
              <div key={user.id} className="flex items-center space-x-2">
                <div className="relative">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-navy
                    ${user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                </div>
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="bg-navy text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{selectedChat}</h2>
          {selectedChat === 'Meetings' && (
            <button
              onClick={() => setShowNewMeeting(true)}
              className="flex items-center px-3 py-1 bg-navy-light rounded-lg hover:bg-opacity-80"
            >
              <Plus size={20} className="mr-1" />
              New Meeting
            </button>
          )}
        </div>

        {/* Messages or Meetings */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat !== 'Meetings' ? (
            // Messages
            messages
              .filter(m => 
                (selectedChat === 'Team Chat' && m.type === 'group') ||
                (selectedChat === 'Private' && m.type === 'private')
              )
              .map((message) => (
                <div key={message.id} className={`flex ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex space-x-2">
                    <img src={message.sender.avatar} alt={message.sender.name} className="w-8 h-8 rounded-full" />
                    <div className="max-w-xs">
                      <div className={`p-3 rounded-lg shadow ${
                        message.sender.id === currentUser.id ? 'bg-navy text-white' : 'bg-sand'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{message.sender.name}</span>
                          {message.isUrgent && (
                            <AlertCircle size={16} className="text-red-500" />
                          )}
                        </div>
                        <p className="mt-1">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            // Meetings
            <div className="space-y-4">
              {meetings.map(meeting => (
                <div key={meeting.id} className="bg-sand p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{meeting.title}</h3>
                      <p className="text-gray-600">{meeting.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-1" />
                        {new Date(meeting.startTime).toLocaleTimeString()} - {new Date(meeting.endTime).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">{meeting.room.name}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    {meeting.attendees.map(user => (
                      <img key={user.id} src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        {selectedChat !== 'Meetings' && (
          <div className="bg-white p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-light"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}