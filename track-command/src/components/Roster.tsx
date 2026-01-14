import React, { useState } from 'react';
import { Athlete, EventGroup } from '../types';
import { Card, Button, Badge } from './Shared';
import { Plus, User, Filter, ChevronRight, Mail, MessageSquare, Phone } from 'lucide-react';

// Mock Data
const INITIAL_ROSTER: Athlete[] = [
  { id: '1', firstName: 'Jordan', lastName: 'Miller', grade: 12, events: ['100m', '200m'], group: EventGroup.SPRINTS, status: 'Active', avatarUrl: 'https://picsum.photos/200/200?random=1', email: 'jordan.m@example.com', phone: '555-0101' },
  { id: '2', firstName: 'Sarah', lastName: 'Jenkins', grade: 11, events: ['1600m', '3200m'], group: EventGroup.DISTANCE, status: 'Active', avatarUrl: 'https://picsum.photos/200/200?random=2', email: 'sarah.j@example.com', phone: '555-0102' },
  { id: '3', firstName: 'Marcus', lastName: 'Tate', grade: 10, events: ['Shot Put', 'Discus'], group: EventGroup.THROWS, status: 'Injured', avatarUrl: 'https://picsum.photos/200/200?random=3', email: 'marcus.t@example.com', phone: '555-0103' },
  { id: '4', firstName: 'Elena', lastName: 'Rodriguez', grade: 9, events: ['Long Jump', '4x100m'], group: EventGroup.JUMPS, status: 'Active', avatarUrl: 'https://picsum.photos/200/200?random=4', email: 'elena.r@example.com', phone: '555-0104' },
  { id: '5', firstName: 'Tyrell', lastName: 'Owens', grade: 12, events: ['400m', '800m'], group: EventGroup.SPRINTS, status: 'Active', avatarUrl: 'https://picsum.photos/200/200?random=5', email: 'tyrell.o@example.com', phone: '555-0105' },
];

export const Roster: React.FC = () => {
  const [roster, setRoster] = useState<Athlete[]>(INITIAL_ROSTER);
  const [filter, setFilter] = useState<EventGroup | 'All'>('All');

  const filteredRoster = filter === 'All' 
    ? roster 
    : roster.filter(a => a.group === filter);

  const handleContact = (type: 'email' | 'sms', value?: string) => {
    if (!value) return;
    if (type === 'email') window.location.href = `mailto:${value}`;
    if (type === 'sms') window.location.href = `sms:${value}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Team Roster</h2>
          <p className="text-gray-400">Manage athlete profiles and groups</p>
        </div>
        <Button onClick={() => alert('Feature: Add Athlete Modal')}>
          <Plus className="w-5 h-5 mr-1" /> Add Athlete
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['All', ...Object.values(EventGroup)].map((group) => (
          <button
            key={group}
            onClick={() => setFilter(group as EventGroup | 'All')}
            className={`whitespace-nowrap px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors border ${
              filter === group 
                ? 'bg-white text-track-green border-white' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-track-gold hover:text-track-gold'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoster.map((athlete) => (
          <Card key={athlete.id} className="group hover:border-track-gold transition-colors duration-300 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="relative">
                 <img 
                  src={athlete.avatarUrl} 
                  alt={athlete.lastName} 
                  className="w-16 h-16 object-cover bg-gray-800 grayscale group-hover:grayscale-0 transition-all duration-300" 
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-track-surface ${athlete.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white uppercase truncate">{athlete.firstName} <span className="text-track-gold">{athlete.lastName}</span></h3>
                    <p className="text-xs text-gray-400 font-mono mb-1">GRADE {athlete.grade} • {athlete.group}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {athlete.events.map(e => (
                    <span key={e} className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-white/10 text-gray-300">
                      {e}
                    </span>
                  ))}
                </div>

                {/* Contact Actions */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                   <button 
                    onClick={() => handleContact('sms', athlete.phone)}
                    disabled={!athlete.phone}
                    className="p-1.5 text-gray-400 hover:text-track-gold hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Send Text Message"
                   >
                     <MessageSquare className="w-4 h-4" />
                   </button>
                   <button 
                    onClick={() => handleContact('email', athlete.email)}
                    disabled={!athlete.email}
                    className="p-1.5 text-gray-400 hover:text-track-gold hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Send Email"
                   >
                     <Mail className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};