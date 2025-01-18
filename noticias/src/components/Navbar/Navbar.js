import React, { useState } from "react";
import { Link } from "react-router-dom"; // Para manejar las rutas
import "./Navbar.css";

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

const Navbar = ({ showSearch = true, showLanguages = true, onFilterLanguage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching:", searchTerm); // Placeholder para la búsqueda
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLanguageChange = (langCode) => {
    const newLanguage = selectedLanguage === langCode ? "" : langCode;
    setSelectedLanguage(newLanguage);
    onFilterLanguage(newLanguage); // Llama a la función pasada como prop
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>DataHub</h2>
        <button className="navbar-menu-button" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-menu">
          <Link to="/" className="navbar-menu-item">
            Noticias
          </Link>
          <Link to="/weather" className="navbar-menu-item">
            Clima
          </Link>
        </div>
      )}

      <div className="navbar-right">
        {showSearch && (
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
        )}

        {showLanguages && (
          <div className="navbar-languages">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`navbar-language-button ${
                  selectedLanguage === lang.code ? "selected" : ""
                }`}
                onClick={() => handleLanguageChange(lang.code)} // Cambia el idioma aquí
              >
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="navbar-language-img"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
