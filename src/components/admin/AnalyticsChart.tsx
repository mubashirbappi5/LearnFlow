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
    <div style={{ width: '100%', height: '400px', padding: '20px', background: 'var(--color-bg-secondary)', borderRadius: '24px', border: '1px solid var(--color-glass)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: 'var(--color-text-primary)' }}>Platform Growth (Last 7 Days)</h3>
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
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-glass-strong)" vertical={false} />
          <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
          <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', borderColor: 'var(--color-glass-strong)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
            itemStyle={{ color: 'var(--color-text-primary)' }}
          />
          <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" name="New Users" strokeWidth={3} />
          <Area type="monotone" dataKey="enrollments" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorEnrollments)" name="New Enrollments" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
