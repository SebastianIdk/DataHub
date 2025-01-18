import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./News.css";

const LANGUAGES_MAP = {
  en: "Inglés",
  es: "Español",
  pt: "Portugués",
  fr: "Francés",
  it: "Italiano",
  ja: "Japonés",
  de: "Alemán",
  zh: "Chino",
};

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const [query, setQuery] = useState("breaking news");
  const [language, setLanguage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_KEY = "d998c6e5a35741b486fd74f92f780e15";
  const API_URL = "https://newsapi.org/v2/everything";

  // Memoizar la función fetchNews con useCallback
  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        apiKey: API_KEY,
        q: query,
        language: language || undefined,
      };

      const response = await axios.get(API_URL, { params });

      const filteredArticles = response.data.articles.filter(
        (article) =>
          !article.title?.toLowerCase().includes("removed") &&
          !article.description?.toLowerCase().includes("removed")
      );

      if (filteredArticles.length === 0) {
        setError(true);
        setNews([]);
      } else {
        setError(false);
        setNews(filteredArticles);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query, language]); // Dependencias del useCallback

  // Ejecutar fetchNews cuando cambian query o language
  useEffect(() => {
    fetchNews();
    setCurrentPage(1);
  }, [fetchNews]);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => {
    if (pageNumber <= Math.ceil(news.length / newsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <Navbar
  onSearch={(term, lang) => {
    setQuery(term || "breaking news");
    setLanguage(lang);
  }}
  onFilterLanguage={(lang) => {
    setLanguage(lang); // Actualiza el idioma en el estado
  }}
/>


      <div className="news-language-message">
        {language
          ? `Mostrando noticias en ${LANGUAGES_MAP[language]}`
          : "Mostrando noticias en todos los idiomas"}
      </div>

      {!loading && !error && news.length > 0 && (
        <div className="news-pagination">
          {[...Array(Math.ceil(news.length / newsPerPage)).keys()].map(
            (page) => (
              <button
                key={page + 1}
                onClick={() => paginate(page + 1)}
                className={`news-pagination-button ${
                  currentPage === page + 1 ? "active" : ""
                }`}
              >
                {page + 1}
              </button>
            )
          )}
        </div>
      )}

      {loading && (
        <div className="news-loading-message">
          <h2>Cargando resultados...</h2>
        </div>
      )}

      {!loading && error && (
        <div className="news-error-message">
          <h2>
            No se encontraron resultados para "{query}"{" "}
            {language ? `en ${LANGUAGES_MAP[language]}` : ""}
          </h2>
        </div>
      )}

      {!loading && !error && (
        <div>
          {currentNews.map((article, index) => (
            <div key={index} className="news-container">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2>{article.title}</h2>
                <p>
                  <strong>Autor:</strong> {article.author || "Desconocido"}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Leer más
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
