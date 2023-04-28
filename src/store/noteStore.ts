import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { initialNotes } from "../data/initialNotes";
import { initialTags } from "../data/initialTags";

export type Note = {
  id: string;
} & NoteData;

export type Tag = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

interface NoteStore {
  notes: Note[];
  tags: Tag[];
  getNote: (noteId: string) => Note | undefined;
  addNote: (noteData: NoteData) => void;
  editNote: (noteId: string, noteData: NoteData) => void;
  deleteNote: (noteId: string) => void;
  getTag: (tagId: string) => Tag | undefined;
  addTag: (tagId: string, label: string) => void;
  editTag: (tagId: string, label: string) => void;
  deleteTag: (tagId: string) => void;
  getTagsForNote: (noteId: string) => Tag[];
}

const useNoteStore = create<NoteStore>((set, get) => ({
  notes: initialNotes,
  tags: initialTags,
  getNote: (noteId) => get().notes.find((note) => note.id === noteId),
  addNote: (noteData) =>
    set((store) => ({
      ...store,
      notes: [
        ...store.notes,
        {
          id: Date.now().toString(),
          title: noteData.title,
          markdown: noteData.markdown,
          tagIds: noteData.tagIds,
        },
      ],
    })),
  editNote: (noteId, noteData) =>
    set((store) => ({
      ...store,
      notes: store.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              title: noteData.title,
              markdown: noteData.markdown,
              tagIds: noteData.tagIds,
            }
          : note
      ),
    })),
  deleteNote: (noteId) =>
    set((store) => ({
      ...store,
      notes: store.notes.filter((note) => note.id !== noteId),
    })),

  getTag: (tagId) => get().tags.find((tag) => tag.id === tagId),
  addTag: (tagId, label) =>
    set((store) => ({ ...store, tags: [...store.tags, { id: tagId, label }] })),
  editTag: (tagId, label) =>
    set((store) => ({
      ...store,
      tags: store.tags.map((tag) =>
        tag.id === tagId ? { ...tag, label } : tag
      ),
    })),
  deleteTag: (tagId) => {
    set((store) => {
      // Remove the tag from the tag list
      const updatedTags = store.tags.filter((tag) => tag.id !== tagId);

      // Remove the tagId from the notes that contain it
      const updatedNotes = store.notes.map((note) => ({
        ...note,
        tagIds: note.tagIds.filter((id) => id !== tagId),
      }));

      return { ...store, tags: updatedTags, notes: updatedNotes };
    });
  },
  getTagsForNote: (noteId) => {
    const note = get().notes.find((n) => n.id === noteId);
    if (!note) return [];
    return note.tagIds
      .map((tagId) => get().tags.find((tag) => tag.id === tagId))
      .filter((tag) => tag !== undefined) as Tag[];
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Note Store", useNoteStore);

export default useNoteStore;
