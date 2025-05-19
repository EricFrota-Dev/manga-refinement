import { baseUrl } from "../data/api";

export const extractManga = async (id: number, url: string) => {
  if (id && url && id !== 0) {
    alert("Extraindo dados... pode demorar um pouco.");
    await fetch(`${baseUrl}scraper/${url}/${id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => alert("sucesso, atualize a pagina!"))
      .catch((err) => alert(err));
  } else {
    return alert("valores nulos não são validos");
  }
};
