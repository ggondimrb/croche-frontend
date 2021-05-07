import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import { Container } from './styles';

interface Category {
  id: number;
  nome: string;
}

const MenuBar: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get("categorias");
      setCategories(response.data);
    }

    loadCategories();
  }, []);

  return (
    <Container>
      <ul>
      {categories.map((category: Category) => {
          return (
            <li key={category.id}>
              <Link to={`/search/${category.nome}`}>{category.nome}</Link>
            </li>
          );
        })}        
      </ul>
    </Container>
  );
};

export default MenuBar;
