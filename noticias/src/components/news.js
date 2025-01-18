import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(10); // Número de noticias por página

    const API_KEY = '77f2af28278243f8be03ffd263676ae9'; // Reemplaza con tu clave de NewsAPI
    const API_URL = 'https://newsapi.org/v2/everything';
    const query = 'technology'; // Cambia por la palabra clave que prefieras

    // Función para obtener noticias
    const fetchNews = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    q: query,
                    apiKey: API_KEY,
                },
            });
            setNews(response.data.articles);
            setFilteredNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Calcular el índice de las noticias a mostrar
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>News App</h1>

            <div>
                {currentNews.length > 0 ? (
                    currentNews.map((article, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                            <h2>{article.title}</h2>
                            <p><strong>Autor:</strong> {article.author || 'Desconocido'}</p>
                            <p><strong>Fecha:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
                        </div>
                    ))
                ) : (
                    <p>Cargando noticias...</p>
                )}
            </div>

            {/* Controles de paginación */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {[...Array(Math.ceil(filteredNews.length / newsPerPage)).keys()].map((page) => (
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
        </div>
    );
};

export default News;
