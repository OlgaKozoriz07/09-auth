import { create } from "zustand";
import { NoteForm } from "@/types/note";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: NoteForm;
  setDraft: (note: NoteForm) => void;
  clearDraft: () => void;
};

const initialDraft: NoteForm = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);