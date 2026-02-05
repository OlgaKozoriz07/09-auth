import { nextServer } from "./api";
import type { User } from "@/types/user";
import type { Note, NoteForm } from "@/types/note";

export type RegisterRequest = {
  email: string;
  password: string;
};

interface NotesHTTPResponse{
    notes: Note[];
    totalPages: number;
}

async function fetchNotes(
  page: number = 1,
  search?: string,
  tag?: string,
): Promise<NotesHTTPResponse> {
  const { data } = await nextServer.get<NotesHTTPResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });
  return data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

async function createNote(newNote: NoteForm): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
}

async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

async function register(payload: RegisterRequest) {
  const { data } = await nextServer.post<User>("/auth/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

async function login(payload: RegisterRequest) {
  const { data } = await nextServer.post<User>("/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

async function checkSession() {
  const { data } = await nextServer.get<{ success: boolean }>("/auth/session");

  return data.success;
}

async function fetchCurrentUser() {
  const { data } = await nextServer.get<User>("/auth/me");

  return data;
}

async function logout() {
  await nextServer.post("/auth/logout");
}
async function updateMe(username: string): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", { username });
  return data;
}

export {
  fetchNoteById,
  deleteNote,
  createNote,
  fetchNotes,
  register,
  login,
  checkSession,
  fetchCurrentUser,
  logout,
  updateMe,
};