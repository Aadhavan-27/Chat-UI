export interface Message {
  id: string;
  content: string;
  sender: User;
  recipients: User[];
  timestamp: Date;
  isUrgent: boolean;
  mentions: string[];
  type: 'private' | 'group';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  room: Room;
  attendees: User[];
  organizer: User;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  isAvailable: boolean;
}

export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  type: 'Bug' | 'Feature' | 'Document';
  assignee: User;
  dueDate: Date;
}

export interface Notification {
  id: string;
  type: 'Mention' | 'Meeting' | 'Deadline' | 'Update';
  content: string;
  timestamp: Date;
  isRead: boolean;
  relatedId?: string;
}