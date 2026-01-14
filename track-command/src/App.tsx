import React, { useState } from 'react';
import { Roster } from './components/Roster';
import { Workouts } from './components/Workouts';
import { Stats } from './components/Stats';
import { CalendarView } from './components/Calendar';
import { Users, Timer, Dumbbell, Calendar as CalIcon, Settings, Menu, X } from 'lucide-react';

type View = 'roster' | 'stats' | 'workouts' | 'calendar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('roster');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 w-full text-left transition-all duration-200 border-l-4 ${
        currentView === view
          ? 'border-track-gold bg-white/5 text-white'
          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentView === view ? 'text-track-gold' : ''}`} />
      <span className="font-display uppercase tracking-wider font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-track-green text-slate-100 flex flex-col md:flex-row font-sans selection:bg-track-gold selection:text-track-green">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#011c16] border-r border-white/5 h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-track-gold">
             <Timer className="w-8 h-8" />
             <h1 className="text-2xl font-display font-black italic tracking-tighter text-white">TRACK<span className="text-track-gold">COMMAND</span></h1>
          </div>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">Elite Performance Suite</p>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavItem view="roster" icon={Users} label="Team Roster" />
          <NavItem view="stats" icon={Timer} label="Performance" />
          <NavItem view="workouts" icon={Dumbbell} label="Training" />
          <NavItem view="calendar" icon={CalIcon} label="Schedule" />
        </nav>

        <div className="p-6 border-t border-white/5">
           <button className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
              <div className="w-8 h-8 bg-track-gold rounded-full flex items-center justify-center text-track-green font-bold text-xs">HC</div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase text-white">Coach Johnson</p>
                <p className="text-[10px] uppercase">Head Coach</p>
              </div>
           </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#011c16] sticky top-0 z-30 border-b border-white/5 shadow-lg">
        <div className="flex items-center gap-2">
             <Timer className="w-6 h-6 text-track-gold" />
             <h1 className="text-xl font-display font-black italic tracking-tighter text-white">TRACK<span className="text-track-gold">CMD</span></h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-track-green z-20 pt-20 px-4 md:hidden">
            <nav className="space-y-2">
              <NavItem view="roster" icon={Users} label="Team Roster" />
              <NavItem view="stats" icon={Timer} label="Performance" />
              <NavItem view="workouts" icon={Dumbbell} label="Training" />
              <NavItem view="calendar" icon={CalIcon} label="Schedule" />
            </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="hidden md:flex justify-between items-center p-8 pb-0">
          <div>
            <h2 className="text-xs font-bold text-track-gold uppercase tracking-widest mb-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
          </div>
        </header>
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
          {currentView === 'roster' && <Roster />}
          {currentView === 'workouts' && <Workouts />}
          {currentView === 'stats' && <Stats />}
          {currentView === 'calendar' && <CalendarView />}
        </div>
      </main>

    </div>
  );
};

export default App;
