import React, { useState } from 'react';
import { Card, Button } from './Shared';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';
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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Performance Lab</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="text-xl font-display font-bold text-white uppercase">Jordan Miller</h3>
               <p className="text-track-gold text-sm font-bold uppercase">100m Progression</p>
             </div>
             <div className="text-right">
               <p className="text-xs text-gray-400 uppercase">Season Best</p>
               <p className="text-2xl font-display font-bold text-white">10.82s</p>
             </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" tick={{fill: '#999', fontSize: 12}} />
                <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} stroke="#666" tick={{fill: '#999', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f392b', borderColor: '#fbbf24', color: '#fff' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#fbbf24" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#fbbf24', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="h-full flex flex-col">
             <div className="flex items-center gap-2 mb-4 text-track-gold">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-lg font-display font-bold uppercase">Coach's Insight</h3>
            </div>
            
            <div className="flex-1 bg-black/20 p-4 rounded mb-4 text-sm text-gray-300 leading-relaxed border border-white/5">
              {analysis ? (
                <p className="animate-fade-in">{analysis}</p>
              ) : (
                <p className="text-gray-500 italic">Select a dataset and ask the AI for performance analysis to identify trends and plateaus.</p>
              )}
            </div>

            <Button onClick={handleAnalyze} isLoading={analyzing} className="w-full">
              Analyze Trend
            </Button>
          </Card>
        </div>
      </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg Reaction', val: '0.145s' },
            { label: 'Wind Avg', val: '+0.8' },
            { label: 'Meets', val: '5' },
            { label: 'Rank', val: '#1' }
          ].map((stat, i) => (
             <Card key={i} className="p-4 text-center border-t-4 border-t-track-gold">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-display font-bold text-white mt-1">{stat.val}</p>
             </Card>
          ))}
       </div>
    </div>
  );
};
