import React, { useState } from 'react';
import { EventGroup, Workout } from '../types';
import { Card, Button, Badge } from './Shared';
import { generateWorkoutPlan } from '../services/geminiService';
import { Sparkles, List, PenTool, Share2 } from 'lucide-react';

export const Workouts: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<EventGroup>(EventGroup.SPRINTS);
  const [phase, setPhase] = useState('Pre-Season');
  const [focus, setFocus] = useState('Endurance');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<string | null>(null);

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
    setManualForm({ ...manualForm, title: '', description: '' });
  };

  const handleShare = async (e: React.MouseEvent, workout: Workout) => {
    e.stopPropagation();
    const shareText = `TRACK COMMAND WORKOUT\n\n${workout.title}\n${workout.date} | ${workout.group}\n${workout.description}`;
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Workout copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Training Center</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-0 overflow-hidden bg-track-surface">
            <div className="flex border-b border-white/10">
               <button onClick={() => setMode('ai')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'ai' ? 'bg-white/5 text-track-gold border-b-2 border-track-gold' : 'text-gray-500 hover:bg-white/5'}`}>
                 <div className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> AI Coach</div>
               </button>
               <button onClick={() => setMode('manual')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'manual' ? 'bg-white/5 text-track-gold border-b-2 border-track-gold' : 'text-gray-500 hover:bg-white/5'}`}>
                 <div className="flex items-center justify-center gap-2"><PenTool className="w-4 h-4" /> Manual</div>
               </button>
            </div>

            <div className="p-6 space-y-4">
              {mode === 'ai' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Group & Phase</label>
                    <div className="grid grid-cols-2 gap-2">
                        <select className="bg-black/40 border border-white/10 text-white p-2 rounded text-sm outline-none focus:border-track-gold" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value as EventGroup)}>
                        {Object.values(EventGroup).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <select className="bg-black/40 border border-white/10 text-white p-2 rounded text-sm outline-none focus:border-track-gold" value={phase} onChange={(e) => setPhase(e.target.value)}>
                        {['Pre-Season', 'Early Season', 'Mid Season', 'Championship', 'Off Season'].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Workout Focus</label>
                    <input type="text" value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full bg-black/40 border border-white/10 text-white p-2 rounded text-sm focus:border-track-gold outline-none" placeholder="e.g. Block Starts" />
                  </div>
                  <Button onClick={handleGenerate} isLoading={isLoading} className="w-full mt-2">Generate Plan</Button>
                </>
              ) : (
                <>
                  <input type="text" value={manualForm.title} onChange={(e) => setManualForm({...manualForm, title: e.target.value})} className="w-full bg-black/40 border border-white/10 text-white p-2 rounded text-sm mb-2" placeholder="Title" />
                  <textarea rows={4} value={manualForm.description} onChange={(e) => setManualForm({...manualForm, description: e.target.value})} className="w-full bg-black/40 border border-white/10 text-white p-2 rounded text-sm" placeholder="Details..." />
                  <Button onClick={handleManualSave} className="w-full mt-2">Add Workout</Button>
                </>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {generatedWorkout && mode === 'ai' && (
            <Card className="border-track-gold/50 shadow-track-gold/10">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-display font-bold text-white uppercase flex items-center gap-2"><Sparkles className="w-5 h-5 text-track-gold" /> Suggested Workout</h3>
                 <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setGeneratedWorkout(null)}>Discard</Button>
                    <Button onClick={handleSaveAIWorkout}>Save</Button>
                 </div>
               </div>
               <div className="prose prose-invert max-w-none text-gray-300 text-sm whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-lg border border-white/5">{generatedWorkout}</div>
            </Card>
          )}

          <div className="space-y-3">
             <h3 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2"><List className="w-4 h-4" /> Upcoming Sessions</h3>
             {workouts.map(w => (
                 <Card key={w.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-track-green border border-white/10 rounded-lg">
                        <span className="text-[10px] text-gray-500 uppercase">{w.date.split('-')[1]}</span>
                        <span className="text-lg font-bold font-display text-white">{w.date.split('-')[2]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white uppercase group-hover:text-track-gold transition-colors">{w.title}</h4>
                        <p className="text-xs text-gray-400">{w.group} • {w.intensity}</p>
                      </div>
                    </div>
                    <button onClick={(e) => handleShare(e, w)} className="p-2 text-gray-500 hover:text-white"><Share2 className="w-4 h-4" /></button>
                 </Card>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};