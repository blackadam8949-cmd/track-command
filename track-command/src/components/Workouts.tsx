import React, { useState } from 'react';
import { EventGroup, Workout } from '../types';
import { Card, Button, Badge } from './Shared';
import { generateWorkoutPlan } from '../services/geminiService';
import { Sparkles, Calendar, Zap, List, PenTool, Share2 } from 'lucide-react';

export const Workouts: React.FC = () => {
  // AI State
  const [selectedGroup, setSelectedGroup] = useState<EventGroup>(EventGroup.SPRINTS);
  const [phase, setPhase] = useState('Pre-Season');
  const [focus, setFocus] = useState('Endurance');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<string | null>(null);

  // Manual State
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [manualForm, setManualForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    group: EventGroup.SPRINTS as EventGroup,
    description: '',
    intensity: 'Medium' as Workout['intensity']
  });

  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: '1', title: 'Speed Endurance I', date: '2023-10-25', group: EventGroup.SPRINTS, description: '3x150m @ 95%', intensity: 'High', aiGenerated: false },
    { id: '2', title: 'Long Run', date: '2023-10-26', group: EventGroup.DISTANCE, description: '45min steady state', intensity: 'Medium', aiGenerated: false },
  ]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedWorkout(null);
    const plan = await generateWorkoutPlan(selectedGroup, phase, focus);
    setGeneratedWorkout(plan);
    setIsLoading(false);
  };

  const handleSaveAIWorkout = () => {
    if (!generatedWorkout) return;
    const newWorkout: Workout = {
      id: Date.now().toString(),
      title: `${focus} Session`,
      date: new Date().toISOString().split('T')[0],
      group: selectedGroup,
      description: generatedWorkout.substring(0, 50) + '...',
      intensity: 'High',
      aiGenerated: true
    };
    setWorkouts([newWorkout, ...workouts]);
    setGeneratedWorkout(null);
  };

  const handleManualSave = () => {
    if (!manualForm.title || !manualForm.description) return;
    const newWorkout: Workout = {
      id: Date.now().toString(),
      title: manualForm.title,
      date: manualForm.date,
      group: manualForm.group,
      description: manualForm.description,
      intensity: manualForm.intensity,
      aiGenerated: false
    };
    setWorkouts([newWorkout, ...workouts]);
    setManualForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      group: EventGroup.SPRINTS,
      description: '',
      intensity: 'Medium'
    });
  };

  const handleShare = async (e: React.MouseEvent, workout: Workout) => {
    e.stopPropagation();
    
    const shareText = `TRACK COMMAND WORKOUT\n\n${workout.title.toUpperCase()}\n${workout.date} | ${workout.group}\nIntensity: ${workout.intensity}\n\nPLAN:\n${workout.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Workout: ${workout.title}`,
          text: shareText,
        });
      } catch (err) {
        console.log('Share cancelled by user');
      }
    } else {
      // Fallback for desktop browsers that don't support share API
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Workout details copied to clipboard! You can paste this into an email or message.');
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Training Center</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creator Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-track-gold/20 bg-gradient-to-br from-track-surface to-track-green p-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
               <button 
                 onClick={() => setMode('ai')}
                 className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'ai' ? 'bg-white/10 text-track-gold' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
               >
                 <div className="flex items-center justify-center gap-2">
                   <Sparkles className="w-4 h-4" /> AI Coach
                 </div>
               </button>
               <button 
                 onClick={() => setMode('manual')}
                 className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'manual' ? 'bg-white/10 text-track-gold' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
               >
                 <div className="flex items-center justify-center gap-2">
                   <PenTool className="w-4 h-4" /> Manual
                 </div>
               </button>
            </div>

            <div className="p-6 space-y-4">
              {mode === 'ai' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Target Group</label>
                    <select 
                      className="w-full bg-black/30 border border-white/10 text-white p-2 rounded-none focus:border-track-gold outline-none"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value as EventGroup)}
                    >
                      {Object.values(EventGroup).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Season Phase</label>
                    <select 
                      className="w-full bg-black/30 border border-white/10 text-white p-2 rounded-none focus:border-track-gold outline-none"
                      value={phase}
                      onChange={(e) => setPhase(e.target.value)}
                    >
                      <option>Pre-Season</option>
                      <option>Early Season</option>
                      <option>Mid Season</option>
                      <option>Championship</option>
                      <option>Off Season</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Focus</label>
                    <input 
                      type="text" 
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 text-white p-2 focus:border-track-gold outline-none placeholder-gray-600"
                      placeholder="e.g. Block Starts"
                    />
                  </div>

                  <Button onClick={handleGenerate} isLoading={isLoading} className="w-full mt-2">
                    Generate Plan
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Workout Title</label>
                    <input 
                      type="text" 
                      value={manualForm.title}
                      onChange={(e) => setManualForm({...manualForm, title: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 text-white p-2 focus:border-track-gold outline-none"
                      placeholder="e.g. Hill Repeats"
                    />
                  </div>
                  
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Date</label>
                        <input 
                          type="date" 
                          value={manualForm.date}
                          onChange={(e) => setManualForm({...manualForm, date: e.target.value})}
                          className="w-full bg-black/30 border border-white/10 text-white p-2 focus:border-track-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Group</label>
                        <select 
                          className="w-full bg-black/30 border border-white/10 text-white p-2 focus:border-track-gold outline-none"
                          value={manualForm.group}
                          onChange={(e) => setManualForm({...manualForm, group: e.target.value as EventGroup})}
                        >
                           {Object.values(EventGroup).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Intensity</label>
                      <select 
                        className="w-full bg-black/30 border border-white/10 text-white p-2 focus:border-track-gold outline-none"
                        value={manualForm.intensity}
                        onChange={(e) => setManualForm({...manualForm, intensity: e.target.value as Workout['intensity']})}
                      >
                         <option>Low</option>
                         <option>Medium</option>
                         <option>High</option>
                         <option>Race Pace</option>
                      </select>
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Description</label>
                      <textarea 
                        rows={4}
                        value={manualForm.description}
                        onChange={(e) => setManualForm({...manualForm, description: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 text-white p-2 focus:border-track-gold outline-none"
                        placeholder="Detailed workout plan..."
                      />
                   </div>

                   <Button onClick={handleManualSave} className="w-full mt-2">
                     Add Workout
                   </Button>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Results / List Panel */}
        <div className="lg:col-span-2 space-y-6">
          {generatedWorkout && mode === 'ai' && (
            <Card className="border-track-gold relative overflow-hidden animate-fade-in">
               <div className="absolute top-0 left-0 w-1 h-full bg-track-gold"></div>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-display font-bold text-white uppercase">Suggested Workout</h3>
                 <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setGeneratedWorkout(null)}>Discard</Button>
                    <Button onClick={handleSaveAIWorkout}>Save to Calendar</Button>
                 </div>
               </div>
               <div className="prose prose-invert max-w-none text-gray-300 text-sm whitespace-pre-wrap font-mono bg-black/20 p-4">
                 {generatedWorkout}
               </div>
            </Card>
          )}

          <div>
             <h3 className="text-lg font-display font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
               <List className="w-5 h-5" /> Upcoming Workouts
             </h3>
             <div className="space-y-3">
               {workouts.length === 0 ? (
                 <p className="text-gray-500 italic">No workouts scheduled.</p>
               ) : workouts.map(w => (
                 <Card key={w.id} className="py-4 px-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-black/30 border border-white/10">
                        <span className="text-[10px] text-gray-500 uppercase">{w.date.split('-')[1]}</span>
                        <span className="text-lg font-bold font-display text-white">{w.date.split('-')[2]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white uppercase">{w.title}</h4>
                          {w.aiGenerated && <Sparkles className="w-3 h-3 text-track-gold" />}
                        </div>
                        <p className="text-sm text-gray-400">{w.group} • {w.intensity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge color={w.intensity === 'High' || w.intensity === 'Race Pace' ? 'bg-red-500 text-white' : 'bg-track-gold'}>
                        {w.intensity}
                      </Badge>
                      <button 
                        onClick={(e) => handleShare(e, w)}
                        className="p-2 text-gray-500 hover:text-track-gold hover:bg-white/10 rounded-full transition-all"
                        title="Share via Text/Email"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                 </Card>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};