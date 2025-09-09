import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../types";

const NOTES_KEY = 'NOTES_V1';

export const getNotes = async (): Promise<Note[]> => {
    try {
        const rawData = await AsyncStorage.getItem(NOTES_KEY);
        return rawData ? (JSON.parse(rawData) as Note[]) : [];
    } catch (e) {
        console.warn('getNotes error', e);
        return []
    }
};

export const saveNotes = async (notes: Note[]) => {
    try {
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
        console.warn('saveNotes error', e);
    }
};

export const addNote = async (note: Note) => {
    const notes = await getNotes();
    notes.push(note);
    await saveNotes(notes);
};

export const deleteAllNotes = async () => {
    await saveNotes([]);
};