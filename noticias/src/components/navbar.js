import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Manejar el envío del formulario
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            alert('Por favor, ingresa un término de búsqueda.');
            return;
        }
        onSearch(searchTerm);
    };

    return (
        <nav style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <h2>News App</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                <input
                    type="text"
                    placeholder="Buscar tema..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Buscar
                </button>
            </form>
        </nav>
    );
};

export default Navbar;
