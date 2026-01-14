import React from 'react';
import { CalendarEvent } from '../types';
import { Card, Badge } from './Shared';
import { MapPin, Clock } from 'lucide-react';

const EVENTS: CalendarEvent[] = [
  { id: '1', title: 'Regional Qualifiers', date: '2023-10-28T09:00:00', type: 'Meet', location: 'City Stadium' },
  { id: '2', title: 'Team Practice', date: '2023-10-26T15:30:00', type: 'Practice', location: 'Home Track' },
  { id: '3', title: 'Coaches Meeting', date: '2023-10-27T18:00:00', type: 'Meeting', location: 'Room 204' },
  { id: '4', title: 'Recovery Session', date: '2023-10-29T10:00:00', type: 'Practice', location: 'Gym' },
];

export const CalendarView: React.FC = () => {
  const sortedEvents = EVENTS.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Meet': return 'bg-track-gold text-track-green';
      case 'Meeting': return 'bg-blue-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Schedule</h2>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
             {sortedEvents.map(event => {
               const dateObj = new Date(event.date);
               return (
                 <Card key={event.id} className="group hover:bg-white/5 transition-all cursor-pointer flex gap-4 items-center">
                    <div className="flex flex-col items-center justify-center min-w-[60px] h-[60px] bg-track-green border border-white/10 group-hover:border-track-gold transition-colors">
                       <span className="text-xs font-bold uppercase text-gray-400">{dateObj.toLocaleDateString('en-US', { month: 'short' })}</span>
                       <span className="text-xl font-display font-bold text-white">{dateObj.getDate()}</span>
                    </div>
                    
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-white uppercase group-hover:text-track-gold transition-colors">{event.title}</h3>
                          <Badge color={getBadgeColor(event.type)}>{event.type}</Badge>
                       </div>
                       <div className="flex items-center gap-4 mt-1 text-sm text-gray-400 font-mono">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>}
                       </div>
                    </div>
                 </Card>
               );
             })}
          </div>

          <Card className="hidden lg:block h-fit bg-gradient-to-br from-track-surface to-track-green border-none p-8 text-center">
             <div className="text-track-gold mb-4 opacity-50">
               <Clock className="w-12 h-12 mx-auto" />
             </div>
             <h3 className="text-2xl font-display font-bold text-white uppercase mb-2">Next Big Meet</h3>
             <p className="text-4xl font-black text-track-gold font-display uppercase tracking-widest mb-6">Regional Qualifiers</p>
             <div className="grid grid-cols-4 gap-2 text-center max-w-sm mx-auto">
               {['02', '14', '32', '10'].map((num, i) => (
                 <div key={i} className="bg-black/40 p-2">
                    <span className="block text-xl font-mono font-bold text-white">{num}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{['Days', 'Hrs', 'Min', 'Sec'][i]}</span>
                 </div>
               ))}
             </div>
          </Card>
       </div>
    </div>
  );
};
