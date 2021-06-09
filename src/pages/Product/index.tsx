import React,{useState,useEffect} from "react";
import api from "../../services/api";
import { useParams } from "react-router";
import { toast } from 'react-toastify';

import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";

import {
  Container,
  Path,
  LinkPath,
  ProductContainer,
  ProductDescription,
  ProductImages,
  ImagesList,
  ProductPrice,
} from "./styles";
import InputNumber from "../../components/InputNumber";
import ButtonColor from "../../components/ButtonColor";
import Button from "../../components/Button";
import BottomBar from "../../components/BottomBar";
import { useCart } from "../../contexts/cart";
import { useHistory } from "react-router-dom";

export interface IProduct {
  id: number;
  nome: string;
  descricao: string;
  ehTamanhoUnico: string;
  preco: number;
  precoFormatado: string;
  peso: number;
  categoria: {
    id: number;
    nome: string;
  }
  cores: string[],
  imagens: 
    {
      id: number;
      url: string;
    }[],
  urlImagens: string[]
}

export interface ProductItemProps {
  product: IProduct;
}

interface RouteParams {
	id: string
}

export interface Cep {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export interface Consulta {
  Codigo: number;
  Valor: string;
  ValorMaoPropria: string;
  ValorAvisoRecebimento: string;
  ValorValorDeclarado: string;
  Erro: {};
  MsgErro: {};
  ValorSemAdicionais: string;
}

const Product: React.FC = () => {
  const {add} = useCart();
  const history = useHistory();

  const params = useParams<RouteParams>();
  const [indexImageActive, setIndexImageActive] = useState(0);
  const [colorSelect, setColorSelect] = useState<string>();
  const [amount, setAmount] = useState<number>(1);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(`produtos/${params.id}`);         
      setProduct(response.data);    
    }

    loadProduct();
  }, [params.id]);

  function handleSelectColor(color:string){
    if(colorSelect !== color) {
      setColorSelect(color);
    }
  }

  function handleSelectProduct(){
    if(!colorSelect) {
      toast.warn("Selecione a cor do produto.")
    }
    if(!amount) {
      toast.warn("Informe a quantidade.")
    }

    if(colorSelect && amount) {
      if(product) {
        add(product.id,
            amount,
            product.nome,
            product.preco,
            product.urlImagens[0],
            product.peso,
            colorSelect
            );
        history.push('/cart');
      }      
    }
  }

  if(!product) {return <p>Carregando...</p>}

  return (
    <Container>
      <Header />
      <SubHeader />
      <Path>
        <h1>
          <LinkPath to="/">Home</LinkPath> /{" "}
          <LinkPath to={`/search/${product.categoria.nome}`}>{product.categoria.nome}</LinkPath> / {product.nome}    
        </h1>
      </Path>
      
      <ProductContainer>
        <ProductDescription>
          <strong>{product.nome}</strong>
          <span> 
           {product.descricao}
          </span>
          <span>Tamanho: {product.ehTamanhoUnico === 'S' ? 'Único' :'Informe o tamanho desejado'}</span>
        </ProductDescription>
        <ProductImages>
          <ImagesList>
            <ul>
              {product.imagens.map((image, index) => (
                <li key={image.id}>
                  <button type="button" key={image.id} 
                  className={indexImageActive === index ? 'active':''} 
                  onClick={() => setIndexImageActive(index)}>
                    <img src={image.url} alt={image.url} />
                  </button>
                </li>
              ))}                    
            </ul>
          </ImagesList>
          <img src={product.imagens[indexImageActive].url} alt={product.nome} />
        </ProductImages>
        <ProductPrice>
          <span>A partir de</span>
          <strong>{product.precoFormatado}</strong>
          <span>Selecione a cor desejada:</span>
          <ul>
            {product.cores.map((color:string) => (
            <li key={color}>                                                                                 
              <ButtonColor 
              colorSelected={color} 
              className={colorSelect === color ? 'active':''} 
              onClick={() => handleSelectColor(color)}
              />              
            </li>
            ))}
          </ul>            
          <InputNumber 
            name="qtd" 
            label="Quantidade"
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            max="10"
            />
          <Button 
          onClick={handleSelectProduct}
          >
            COMPRAR
          </Button>          
        </ProductPrice>
      </ProductContainer>
      <BottomBar />
    </Container>
  );
};

export default Product;
