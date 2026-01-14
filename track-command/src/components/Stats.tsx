import React, { useState } from 'react';
import { Card, Button } from './Shared';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Wind } from 'lucide-react';
import { analyzePerformance } from '../services/geminiService';

const MOCK_STATS_DATA = [
  { date: '03/01', time: 11.2, display: '11.2s' },
  { date: '03/15', time: 11.0, display: '11.0s' },
  { date: '03/22', time: 10.95, display: '10.95s' },
  { date: '04/05', time: 10.88, display: '10.88s' },
  { date: '04/12', time: 10.82, display: '10.82s' },
];

export const Stats: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await analyzePerformance('Jordan Miller', '100m Dash', MOCK_STATS_DATA.map(d => ({ date: d.date, displayValue: d.display })));
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Performance Lab</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-xl font-display font-bold text-white uppercase">Jordan Miller</h3>
               <p className="text-track-gold text-xs font-bold uppercase tracking-wider">100m Progression</p>
             </div>
             <div className="text-right">
               <p className="text-xs text-gray-400 uppercase font-bold">Season Best</p>
               <p className="text-3xl font-display font-bold text-white tracking-tighter">10.82s</p>
             </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#666" tick={{fill: '#999', fontSize: 10}} axisLine={false} tickLine={false} dy={10} />
                <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} stroke="#666" tick={{fill: '#999', fontSize: 10}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#022c22', borderColor: '#fbbf24', color: '#fff', borderRadius: '4px' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#fbbf24" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#022c22', strokeWidth: 2, stroke: '#fbbf24' }} 
                  activeDot={{ r: 6, fill: '#fbbf24' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="h-full flex flex-col border-track-gold/30">
             <div className="flex items-center gap-2 mb-4 text-track-gold">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-lg font-display font-bold uppercase">AI Analysis</h3>
            </div>
            
            <div className="flex-1 bg-black/30 p-4 rounded-lg mb-4 text-sm text-gray-300 leading-relaxed border border-white/5">
              {analysis ? (
                <p className="animate-fade-in">{analysis}</p>
              ) : (
                <p className="text-gray-500 italic text-xs">Run analysis to identify trends, fatigue patterns, and technical improvements.</p>
              )}
            </div>

            <Button onClick={handleAnalyze} isLoading={analyzing} className="w-full">
              Analyze Trend
            </Button>
          </Card>
        </div>
      </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full text-track-gold"><Award className="w-5 h-5" /></div>
                <div><p className="text-xs text-gray-400 font-bold uppercase">Rank</p><p className="text-xl font-bold text-white">#1 Region</p></div>
            </Card>
             <Card className="p-4 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full text-blue-400"><Wind className="w-5 h-5" /></div>
                <div><p className="text-xs text-gray-400 font-bold uppercase">Avg Wind</p><p className="text-xl font-bold text-white">+0.8</p></div>
            </Card>
       </div>
    </div>
  );
};