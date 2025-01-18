import React, { useState } from "react";
import "./Navbar.css"; // Importar los estilos

const LANGUAGES = [
  { code: "es", label: "Español", flag: "/static/flags/es.png" },
  { code: "en", label: "Inglés", flag: "/static/flags/en.png" },
  { code: "pt", label: "Portugués", flag: "/static/flags/pt.png" },
  { code: "fr", label: "Francés", flag: "/static/flags/fr.png" },
  { code: "it", label: "Italiano", flag: "/static/flags/it.png" },
  { code: "ja", label: "Japonés", flag: "/static/flags/ja.png" },
  { code: "de", label: "Alemán", flag: "/static/flags/de.png" },
  { code: "zh", label: "Chino", flag: "/static/flags/zh.png" },
];

const Navbar = ({ onSearch, onFilterLanguage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedLanguage);
  };

  const handleLanguageChange = (language) => {
    const newLanguage = selectedLanguage === language ? "" : language;
    setSelectedLanguage(newLanguage);
    setSearchTerm(""); // Limpia la búsqueda actual al cambiar el idioma
    onFilterLanguage(newLanguage);
  };

  return (
    <nav className="navbar">
      <h2>News App</h2>
      <div className="navbar">
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="navbar-search-form">
          <input
            type="text"
            placeholder="Buscar tema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-button">
            Buscar
          </button>
        </form>

        {/* Lista de idiomas */}
        <div className="navbar-languages">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`navbar-language-button ${
                selectedLanguage === lang.code ? "selected" : ""
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.label}
                className="navbar-language-img"
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
