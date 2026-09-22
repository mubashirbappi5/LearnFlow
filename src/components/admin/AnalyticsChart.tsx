'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsChartProps {
  data: {
    name: string;
    users: number;
    enrollments: number;
  }[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div style={{ width: '100%', height: '400px', padding: '20px', background: 'rgba(30,30,40,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: '#f3f4f6' }}>Platform Growth (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
          <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
          <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" name="New Users" strokeWidth={3} />
          <Area type="monotone" dataKey="enrollments" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorEnrollments)" name="New Enrollments" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
