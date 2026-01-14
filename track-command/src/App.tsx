import React, { useState } from 'react';
import { Roster } from './components/Roster';
import { Workouts } from './components/Workouts';
import { Stats } from './components/Stats';
import { CalendarView } from './components/Calendar';
import { Users, Timer, Dumbbell, Calendar as CalIcon, Menu, X, ChevronRight } from 'lucide-react';

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
      className={`group flex items-center justify-between w-full px-4 py-3.5 mb-1 transition-all duration-200 rounded-lg ${
        currentView === view
          ? 'bg-track-gold text-track-green shadow-lg shadow-track-gold/20'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${currentView === view ? 'text-track-green' : 'group-hover:text-track-gold transition-colors'}`} />
        <span className="font-display uppercase tracking-wider font-bold text-sm">{label}</span>
      </div>
      {currentView === view && <ChevronRight className="w-4 h-4 opacity-50" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#022c22] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-track-gold selection:text-track-green overflow-hidden">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-72 bg-[#011c16] border-r border-white/5 h-screen relative z-20">
        <div className="p-8">
          <div className="flex items-center gap-2 text-track-gold mb-8">
             <Timer className="w-8 h-8" />
             <h1 className="text-2xl font-display font-black italic tracking-tighter text-white">TRACK<span className="text-track-gold">COMMAND</span></h1>
          </div>
          
          <nav className="space-y-1">
            <NavItem view="roster" icon={Users} label="Team Roster" />
            <NavItem view="stats" icon={Timer} label="Performance" />
            <NavItem view="workouts" icon={Dumbbell} label="Training" />
            <NavItem view="calendar" icon={CalIcon} label="Schedule" />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
           <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-track-gold rounded-full flex items-center justify-center text-track-green font-bold text-sm">CJ</div>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-bold uppercase text-white truncate">Coach Johnson</p>
                <p className="text-[10px] uppercase text-track-gold">Head Coach</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#011c16] sticky top-0 z-50 border-b border-white/5 shadow-xl">
        <div className="flex items-center gap-2">
             <Timer className="w-6 h-6 text-track-gold" />
             <h1 className="text-xl font-display font-black italic tracking-tighter text-white">TRACK<span className="text-track-gold">CMD</span></h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#022c22] z-40 pt-24 px-4 md:hidden animate-fade-in">
            <nav className="space-y-2">
              <NavItem view="roster" icon={Users} label="Team Roster" />
              <NavItem view="stats" icon={Timer} label="Performance" />
              <NavItem view="workouts" icon={Dumbbell} label="Training" />
              <NavItem view="calendar" icon={CalIcon} label="Schedule" />
            </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative h-screen">
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-track-gold/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        </div>

        <header className="hidden md:flex justify-between items-center px-10 pt-8 pb-4 relative z-10">
          <div>
            <h2 className="text-xs font-bold text-track-gold uppercase tracking-widest mb-1 opacity-70">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
          </div>
        </header>
        
        <div className="p-4 md:px-10 md:py-6 max-w-7xl mx-auto pb-24 md:pb-12 relative z-10">
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