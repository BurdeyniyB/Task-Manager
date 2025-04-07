import { Task } from '@/types/Task';  
import { create } from 'zustand';

interface Store {
  search: string;
  status: string;
  tasks: Task[];
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useStore = create<Store>((set) => ({
  search: '',
  status: 'all',
  tasks: [],
  setSearch: (search: string) => set({ search }), 
  setStatus: (status: string) => set({ status }),
  setTasks: (tasks: Task[]) => set({ tasks }),   
}));
