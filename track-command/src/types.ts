export enum EventGroup {
  SPRINTS = 'Sprints',
  DISTANCE = 'Distance',
  JUMPS = 'Jumps',
  THROWS = 'Throws',
  RELAYS = 'Relays'
}

export enum UserRole {
  HEAD_COACH = 'Head Coach',
  ASSISTANT_COACH = 'Assistant Coach',
  ATHLETE = 'Athlete'
}

export interface Athlete {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  events: string[]; // e.g., ["100m", "200m"]
  group: EventGroup;
  personalBest?: Record<string, string>; // e.g., { "100m": "10.4s" }
  status: 'Active' | 'Injured' | 'Resting';
  avatarUrl: string;
  email?: string;
  phone?: string;
}

export interface Workout {
  id: string;
  title: string;
  date: string;
  group: EventGroup;
  description: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Race Pace';
  aiGenerated: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO String
  type: 'Practice' | 'Meet' | 'Meeting';
  location?: string;
}

export interface PerformanceStat {
  date: string;
  eventName: string;
  value: number; // Time in seconds or distance in meters
  displayValue: string; // Formatted string e.g. "10.5s" or "45.2m"
  meetName?: string;
}