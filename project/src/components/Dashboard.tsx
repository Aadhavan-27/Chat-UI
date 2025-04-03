import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MessageSquare, Bell, Users, BarChart2 } from 'lucide-react';

const pendingTasks = [
  { priority: 'High', count: 15 },
  { priority: 'Medium', count: 25 },
  { priority: 'Low', count: 10 },
];

const performanceData = [
  { month: 'Jan', completion: 85 },
  { month: 'Feb', completion: 88 },
  { month: 'Mar', completion: 92 },
  { month: 'Apr', completion: 90 },
];

const notificationData = [
  { type: 'Mentions', value: 25 },
  { type: 'Meetings', value: 15 },
  { type: 'Deadlines', value: 30 },
  { type: 'Updates', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 text-blue-600">
              <MessageSquare size={20} />
              <h3 className="font-semibold">Active Chats</h3>
            </div>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 text-green-600">
              <Bell size={20} />
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 text-purple-600">
              <Users size={20} />
              <h3 className="font-semibold">Team Members</h3>
            </div>
            <p className="text-2xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 text-orange-600">
              <BarChart2 size={20} />
              <h3 className="font-semibold">Projects</h3>
            </div>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pending Tasks by Priority</h2>
          <BarChart width={400} height={200} data={pendingTasks}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Performance Trend */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
          <LineChart width={400} height={200} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="completion" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Notifications Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Notifications Distribution</h2>
          <PieChart width={400} height={200}>
            <Pie
              data={notificationData}
              cx={200}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {notificationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}