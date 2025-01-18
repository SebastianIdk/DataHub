import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
const News = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(10);
    const [query, setQuery] = useState('technology'); // Término de búsqueda inicial
    const [error, setError] = useState(false);

    const API_KEY = '77f2af28278243f8be03ffd263676ae9';
    const API_URL = 'https://newsapi.org/v2/everything';

    const fetchNews = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    q: query,
                    apiKey: API_KEY,
                },
            });
            if (response.data.articles.length === 0) {
                setError(true);
                setNews([]);
            } else {
                setError(false);
                setNews(response.data.articles);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            setError(true);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [query]);

    // Calcular las noticias actuales
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Barra de navegación */}
            <Navbar onSearch={(term) => setQuery(term)} />

            {/* Noticias o mensaje de error */}
            {error ? (
                <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
                    <h2>No se encontraron resultados para "{query}"</h2>
                </div>
            ) : (
                <div>
                    {currentNews.map((article, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                            <h2>{article.title}</h2>
                            <p><strong>Autor:</strong> {article.author || 'Desconocido'}</p>
                            <p><strong>Fecha:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginación */}
            {!error && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    {[...Array(Math.ceil(news.length / newsPerPage)).keys()].map((page) => (
                        <button
                            key={page + 1}
                            onClick={() => paginate(page + 1)}
                            style={{
                                margin: '5px',
                                padding: '10px',
                                backgroundColor: currentPage === page + 1 ? '#007BFF' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
