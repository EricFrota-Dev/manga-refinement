import type { Manga, Page } from "../types/Manga";
import { baseUrl } from "./api";

export const STORAGE_KEY = "mangaPagesEditorData";

export class mangaData {
  static async getMangasToReview(): Promise<Manga[]> {
    const res = await fetch(`${baseUrl}mangas/review/all`);
    if (!res.ok) throw new Error("Erro ao buscar mangas para revisar");
    const data: Manga[] = await res.json();
    console.log(data);
    return data;
  }

  static async getMangaPages(id: string): Promise<Page[]> {
    const key = `${STORAGE_KEY}_${id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const localData: Page[] = JSON.parse(saved);
        return localData;
      } catch (e) {
        console.error("Erro ao carregar do localStorage", e);
      }
    }

    const res = await fetch(`${baseUrl}pages/manga/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar páginas do manga");

    const data: Page[] = await res.json();
    localStorage.setItem(key, JSON.stringify(data));
    console.log(data);
    return data;
  }

  static clear(id: string) {
    const key = `${STORAGE_KEY}_${id}`;
    localStorage.removeItem(key);
    console.log(`${key} removido do localStorege`);
  }

  static clearAll() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY)) {
        localStorage.removeItem(key);
      }
    });
    console.log(`removido todos ${STORAGE_KEY} do localStorege`);
  }
}
