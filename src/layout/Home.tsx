import { useEffect, useState, type FormEvent } from "react";
import { mangaData } from "../data/mangaData";
import type { Manga } from "../types/Manga";
import { useNavigate } from "react-router-dom";
import { extractManga } from "../service/extractManga";

const Home = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [inputValue, setInputValue] = useState(0);
  const [selectedOption, setSelectedOption] = useState("nhentai");
  const navigate = useNavigate();

  const extractMagnga = async (e: FormEvent) => {
    e.preventDefault();
    extractManga(inputValue, selectedOption);
    setInputValue(0);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    mangaData
      .getMangasToReview()
      .then(setMangas)
      .catch((err) => console.error("Erro ao carregar mangas", err));
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => extractMagnga(e)}
        className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-xl">Extrair dados de manga:</h1>
        <select
          name="siteUrl"
          value={selectedOption}
          onChange={handleChangeSelect}
          id="sourse_site">
          <option className="bg-5" value="nhentai">
            nhentai.net
          </option>
          <option className="bg-5" value="#">
            e-hentai.org
          </option>
          <option className="bg-5" value="#">
            hitomi.la
          </option>
        </select>
        <input
          onChange={(e) => setInputValue(Number(e.target.value))}
          id="manga_id"
          type="number"
          placeholder="Digite o id do manga"
          className="border-[1px] border-2 p-3 rounded-full"
        />
        <button
          className="bg-2 rounded-full p-3 cursor-pointer hover:scale-102 transition-all min-w-30"
          type="submit">
          Extrair
        </button>
      </form>
      <div className="flex flex-col p-10 gap-4 border-[1px] border-1/8 m-20 bg-1/5">
        <h2 className="text-center text-xl">Mangas a revisar:</h2>
        <ul className="">
          {mangas.map((manga) => (
            <li
              key={manga.id}
              className="p-2 hover:bg-2 cursor-pointer text-center"
              onClick={() =>
                navigate(`/review/${manga.id}`, { state: { manga } })
              }>
              {manga.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
