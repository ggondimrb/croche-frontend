import React, { useEffect, useState } from "react";
import { KeyboardEvent } from "react";

import { formatPrice } from "../../util/format";

import { ICart, useCart } from "../../contexts/cart";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, 
         Products,
         CalculateFret,
         InputFret,
         ButtonFret,
         CartView, 
         OrderSummary,
         EmptyCart,
         HomePageLink,
         ButtonContinue,
         Item,
         ItemContent,
         DescriptionProduct,
         OrderAndFret,
         ImageLink } from "./styles";
import api from "../../services/api";
import BottomBar from "../../components/BottomBar";
import DefaultLayout from "../DefaultLayout";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface ResponseFret {
  codigo: string;
  valor: string;
  prazoEntrega: string;
}

const Cart: React.FC = () => {  
  const history = useHistory();
  const {remove, updateAmount, cart, getTotalValue} = useCart();
  const [actualCart, setActualCart] = useState<ICart[]>([]);
  const [cep, setCep] = useState<string>('');
  const [fret, setFret] = useState<ResponseFret>();
  const [loadFret, setLoadFret] = useState(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [fretValue, setFretValue] = useState<number>();
  const {signed} = useAuth();

  useEffect(() => {        
    setActualCart(cart);    
    setTotalValue(getTotalValue());
  },[cart, getTotalValue]);

  function handleRemove(id:number) {
    remove(id);
    setActualCart(cart);
    setTotalValue(getTotalValue());
  }

  function handleIncrement(product:ICart) {
    updateAmount(product.id,product.qtd + 1);
    setActualCart(cart);    
    updateFret();   
    setTotalValue(getTotalValue()); 
  }

  function handleDecrement(product:ICart) {
    updateAmount(product.id,product.qtd - 1);
    setActualCart(cart);    
    updateFret();   
    setTotalValue(getTotalValue());
  }

  function handleCalculateFret() {

    setTotalValue(getTotalValue());

    const cepFinal = cep.replace("-","");

    if(!cepFinal || cepFinal.match("_")) {
      alert("Informe o CEP");
      return;
    }

    setLoadFret(true);
    updateFret(); 
    setLoadFret(false);  
  }

  function handleKeywordKeypress(e: KeyboardEvent) {
    if(e.key === 'Enter') {
      handleCalculateFret();
    }    
  }

  async function updateFret() {

    const cepFinal = cep.replace("-","");

      if(cepFinal && !cepFinal.match("_")) {

        let wheight = 0; 
        
        actualCart.forEach((product:ICart) => {
          wheight += (product.peso * product.qtd);
        });

        const response = await api.get(`cep/${cepFinal}/${wheight}`);
      
        if(response) {
          setFret(response.data);
          const valor = Number(response.data.valor.replace(",","."));
          setFretValue(valor);
          setTotalValue(getTotalValue() + valor);
        }

    }
  }

  async function handleContinue() {
    if(signed) {
      console.log('logado');
      history.push('/checkout');  
    } else {
      history.push('/login?redirect=/checkout');  
    }
    
  }

  return (
    <Container>
      <DefaultLayout />
      {actualCart.length > 0 &&
      <CartView>        
        <Products>          
          <h1>Meu carrinho</h1>
          {actualCart.map((product) => (              
          <Item key={product.id}>
            <ItemContent>     
              <ImageLink to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name}/> 
              </ImageLink>                                                 
              <DescriptionProduct>
                <div>
                  <strong>{product.name}</strong>
                  <button
                      type="button" onClick={() => handleRemove(product.id)}>
                      <MdDelete size={20} color="#007389" />
                  </button>                                  
                </div>
                <div>
                  <span>Código: </span>             
                  <small>{product.id}</small>    
                </div>                 
                <div>
                  <span>Cor: </span>             
                  <small>{product.color}</small>    
                </div> 
                <div>
                  <span>Valor Unitário: </span>             
                  <small>{product.priceFormatted}</small>    
                </div>                                   
              </DescriptionProduct>               
            </ItemContent>
            <footer>
              <div>
                <small>Quantidade: </small>
                <div>
                  <button type="button" onClick={() => handleDecrement(product)}>                                              
                    <MdRemoveCircleOutline size={27} color="#007389" />
                  </button>
                  <input type="number" readOnly value={product.qtd} />
                  <button type="button" onClick={() => handleIncrement(product)}>
                    <MdAddCircleOutline size={27} color="#007389" />
                  </button>            
                </div>
              </div>
              <strong>{product.subTotal}</strong>
            </footer>                    
          </Item>
          ))}            
        </Products>
        <OrderAndFret>
          <OrderSummary>
              <h1>Resumo da Compra</h1>
              <div>
                <strong>Subtotal</strong>
                <strong>{formatPrice(getTotalValue())}</strong>
              </div>
            {fretValue && (  
              <>
                <div>
                  <strong>Frete</strong>
                  <strong>{formatPrice(fretValue)}</strong>
                </div>                                 
                <div>
                  <h5>Prazo de entrega: aproximadamente {fret?.prazoEntrega} dias úteis</h5>
                </div>
              </>
              )}
              <hr />
              <div>              
                <strong>Valor total</strong>
                <strong>{formatPrice(totalValue)}</strong>
              </div>                                         
              <ButtonContinue 
                type="button"
                onClick={() => handleContinue()}
                >
                  Continuar
              </ButtonContinue>
          </OrderSummary>
          <CalculateFret>    
              <div>
                <h5>Simule frete e prazo de entrega</h5>
                <InputFret id="fret"                                                      
                            mask="99999-999"                                                 
                            value={cep} 
                            onKeyPress={(e) => {handleKeywordKeypress(e)}}
                            onChange={(e) => setCep(e.target.value)} />        
              </div>           
              <ButtonFret
                          onClick={() => handleCalculateFret()}
                          disabled={loadFret}>                          
                           {loadFret ? 'Carregando' : 'Calcular'}
              </ButtonFret>
            </CalculateFret>  
          </OrderAndFret>      
      </CartView>
      }
      {actualCart.length === 0 && 
        <footer>
          <EmptyCart>
            <h1>Seu carrinho está vazio</h1>
            <strong>Adicione produtos na página do produto</strong>
            <HomePageLink to="/">Voltar para a página inicial</HomePageLink>
          </EmptyCart>
        </footer>
      }
      <BottomBar />
    </Container>
  );
};

export default Cart;
