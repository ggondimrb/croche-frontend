import React, { useEffect, useState } from "react";
import api from "../../services/api";

import {useCart} from '../../contexts/cart';

import { Container, ProductList, Item, PaginationMain, ImageLink } from "./styles";
import { IProduct } from "../../pages/Product";
import Button from "../Button";
import { useAuth } from "../../contexts/auth";

const Main: React.FC<{ categoria?:string }> = ({categoria}) => {
  const [products, setProducts] = useState([]);  
  const [totalElements, setTotalElements] = useState<number>(0);  
  const [actualPage, setActualPage] = useState<number>(1); 
  const [pageSize, setPageSize] = useState<number>(0);   

  const {add} = useCart();
  const {getToken} = useAuth();

  useEffect(() => {        

    async function loadProducts() {
      const response = await api.get("produtos",
      {
        params:{categoria,page:actualPage}
        //headers:{Authorization: `Bearer ${getToken()}`}
      });

      setProducts(response.data.content);
      setPageSize(response.data.pageable.pageSize);
      setTotalElements(response.data.totalElements);
    }

    loadProducts();
  }, [categoria,actualPage,getToken]);

  function handleChangePaginate(e:number) {
    setActualPage(e);
  }

  function handleAddProduct(product: IProduct) {
    add(product.id, 1, product.nome,product.preco,product.urlImagens[0],product.peso,product.cores[0]);
  }

  return (
    <Container>
      <ProductList>
        {products.map((product: IProduct) => {
          return (
            <Item key={product.id}>
              <li>              
                <ImageLink to={`/product/${product.id}`}>
                  <img src={product.urlImagens[0]} 
                  alt={product.urlImagens[0]}/>                            
                </ImageLink>
                <strong>{product.nome}</strong>
                <span>{product.precoFormatado}</span>
                <Button onClick={() => handleAddProduct(product)}>
                  Adicionar ao Carrinho
                  </Button>                                                 
              </li>
            </Item>
          );
        })}
      </ProductList>
      <PaginationMain total={totalElements}
                  defaultCurrent={0}
                  onChange={(e) => handleChangePaginate(e)} 
                  pageSize={pageSize} />
    </Container>
  );
};

export default Main;
