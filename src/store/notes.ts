import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../types";

interface NotesSate {
    notes: Note[];
    addNote: (note: Note) => void;
    deleteAll: () => void;
}

export const useNotesStore = create<NotesSate>()(
    persist(
        (set) => ({
            notes: [],
            addNote: note => set((state) => ({ notes: [note, ...state.notes] })),
            deleteAll: () => set({ notes: [] }),
        }),
        {
            name: 'note-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)