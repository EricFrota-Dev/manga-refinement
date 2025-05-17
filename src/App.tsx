import { useState } from "react";
import type { Manga, Page } from "./types/Block";
import BlockEditor from "./components/blockEditor";
import data from "./data/manga.json";

function App() {
  const [manga, setManga] = useState<Manga>(data);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);

      if (json.pages) {
        setManga(json);
        setCurrentPageIndex(0);
      } else if (json.manga) {
        setManga(json.manga);
        setCurrentPageIndex(0);
      } else {
        console.error("Formato de arquivo inválido");
      }
    };

    reader.readAsText(file);
  };

  const exportJSON = () => {
    const json = JSON.stringify(manga, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "refined_blocks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen pt-14  text-1">
      {/* Barra superior */}
      <div className=" text-1 bg-5 flex h-14 gap-4 items-center justify-center z-10000 fixed top-0 right-0 w-full">
        <input type="file" accept=".json" onChange={handleFileUpload} />
        <button
          onClick={exportJSON}
          className="bg-2 text-white px-4 py-1 rounded cursor-pointer hover:scale-102 transition-all">
          Exportar JSON
        </button>
      </div>

      {/* Corpo principal com editor e sidebar */}
      <div className="flex w-[80%]">
        {/* Editor principal */}
        <div className="flex-1 bg-1/5">
          <BlockEditor
            page={manga.pages[currentPageIndex]}
            setPage={(updatedPage: Page) =>
              setManga((prevManga) => ({
                ...prevManga,
                pages: prevManga.pages.map((p, i) =>
                  i === currentPageIndex ? updatedPage : p
                ),
              }))
            }
          />
        </div>

        {/* Sidebar de páginas */}
        <div className="overflow-y-auto w-[20%] min-w-40 h-100vh pt-14 fixed top-0 right-0">
          <div className="text-center p-2 border-b mb-6 font-extrabold">
            <h2>Titulo: {manga.title}</h2>
          </div>
          <ul>
            {manga.pages.map((_, index) => (
              <li
                key={index}
                onClick={() => setCurrentPageIndex(index)}
                className={`cursor-pointer p-2 text-center mx-4 mb-2 rounded-full hover:scale-102 transition-all ${
                  index === currentPageIndex
                    ? "bg-2 text-white font-extralight"
                    : "hover:bg-1/5"
                }`}>
                Página {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
