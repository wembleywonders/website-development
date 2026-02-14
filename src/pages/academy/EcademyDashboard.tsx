import React from 'react';
import { SafeComponent } from '../wrapper/SafeReact';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, Users, Award, Clock, Activity, BarChart3, Backpack } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const EcademyDashboard = () => {
  // Sample progress data
  const progressData = [
    { month: 'Jan', completions: 45, enrollments: 65 },
    { month: 'Feb', completions: 52, enrollments: 70 },
    { month: 'Mar', completions: 48, enrollments: 75 },
    { month: 'Apr', completions: 58, enrollments: 80 },
    { month: 'May', completions: 62, enrollments: 85 },
    { month: 'Jun', completions: 70, enrollments: 90 },
  ];

  // Sample course data
  const courses = [
    {
      title: 'Web Development Fundamentals',
      enrolled: 125,
      progress: 68,
      lastActivity: '2 hours ago',
    },
    {
      title: 'Digital Marketing Essentials',
      enrolled: 98,
      progress: 75,
      lastActivity: '4 hours ago',
    },
    {
      title: 'Game Design Principles',
      enrolled: 156,
      progress: 82,
      lastActivity: '1 hour ago',
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">E-cademy Dashboard</h1>
          <p className="text-gray-300">Track your learning progress and manage your courses</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg">
            <Book className="w-4 h-4" />
            New Course
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg">
            <Award className="w-4 h-4" />
            Certifications
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-purple-900 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-purple-300">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Active Courses</CardTitle>
            <Book className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">16</div>
            <p className="text-xs text-purple-300">3 new this month</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Completion Rate</CardTitle>
            <Award className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78%</div>
            <p className="text-xs text-purple-300">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white text-sm font-medium">Active Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">892</div>
            <p className="text-xs text-purple-300">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="bg-purple-900 border-purple-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            Student Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f1f1f',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line type="monotone" dataKey="completions" stroke="#8482c0" strokeWidth={2} name="Completions" />
                <Line type="monotone" dataKey="enrollments" stroke="#ffd033" strokeWidth={2} name="Enrollments" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Popular Courses */}
      <Card className="bg-purple-900 border-purple-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Backpack className="w-4 h-4 text-purple-400" />
            Popular Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-purple-700 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <h3 className="font-semibold text-white mb-1">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrolled} enrolled
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.lastActivity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-300">{course.progress}%</span>
                  <div className="w-24 h-2 bg-purple-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeComponent(EcademyDashboard);

export default EcademyDashboard;
