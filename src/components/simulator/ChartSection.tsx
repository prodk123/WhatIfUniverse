import React from 'react';
import { ChartDataPoint } from '@/types/engine';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartSectionProps {
  data: ChartDataPoint[];
  type: 'area' | 'bar' | 'line';
  config: {
    xAxis: string;
    lines: { key: string; label: string; color: string }[];
  };
}

export function ChartSection({ data, type, config }: ChartSectionProps) {
  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 10000000) return `${(tickItem / 10000000).toFixed(1)}Cr`;
    if (tickItem >= 100000) return `${(tickItem / 100000).toFixed(1)}L`;
    if (tickItem >= 1000) return `${(tickItem / 1000).toFixed(0)}k`;
    return tickItem.toString();
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey={config.xAxis} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              tickFormatter={formatYAxis}
              width={60}
            />
            <Tooltip 
              formatter={(value: number) => new Intl.NumberFormat('en-IN').format(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            {config.lines.map((line, index) => (
              <Area 
                key={line.key}
                type="monotone" 
                dataKey={line.key} 
                name={line.label} 
                stroke={line.color} 
                fill={line.color} 
                fillOpacity={index === 0 ? 0.3 : 0.6}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={config.xAxis} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={formatYAxis} width={60} />
            <Tooltip 
              formatter={(value: number) => new Intl.NumberFormat('en-IN').format(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
            />
            {config.lines.map((line) => (
              <Bar key={line.key} dataKey={line.key} name={line.label} fill={line.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
        
      case 'line':
      default:
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={config.xAxis} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={formatYAxis} width={60} />
            <Tooltip 
              formatter={(value: number) => new Intl.NumberFormat('en-IN').format(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
            />
            {config.lines.map((line) => (
              <Line key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={line.color} strokeWidth={3} dot={false} />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Projection Chart</h2>
      <div className="h-[350px] w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 pt-6 shadow-sm transition-colors duration-300">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
