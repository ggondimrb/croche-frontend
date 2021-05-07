import React, { useEffect } from 'react';
import BottomBar from '../../components/BottomBar';
import DefaultLayout from '../DefaultLayout';
import { MdLocalShipping, MdCreditCard, MdReceipt } from "react-icons/md";

import { Container, 
         Wrapper,
         ListItem, 
         Item,
         Block,
         ItemResume,
         PayMethod         
        } from './styles';
        
import { useCart } from '../../contexts/cart';

const Checkout: React.FC = () => {  
  const { cart } = useCart();

  useEffect(() => {
    
  }, []);
  
  return (
    <Container>
      <DefaultLayout />
      <Wrapper>      
          <ListItem>
            <Item>
              <Block>
                <header>
                  <MdLocalShipping size={36} color="#FFF" />
                  <h1>Forma de Envio</h1>
                </header>      
                <div>
                <h3>Correios - PAC</h3>
                <h3>10 a 15 dias úteis</h3>
                <h3>R$ 35,90</h3>
                </div>            
              </Block>
            </Item>
            <Item>
              <Block>
                <header>
                  <MdCreditCard size={36} color="#FFF" />
                  <h1>Pagamento</h1>
                </header>
                <PayMethod>
                  <li>
                    <div>
                      <input type="radio" name="payMethod"/>
                      <h3>Cartão de Crédito</h3>                    
                    </div>                    
                  </li>
                  <li>
                    <div>
                      <input type="radio"name="payMethod" />
                      <h3>Boleto - 10% de desconto</h3>                    
                    </div>                     
                  </li>
                  <li>
                    <div>
                      <input type="radio" name="payMethod"/>
                      <h3>PIX - 10% de desconto</h3>                    
                    </div>                    
                  </li>
                </PayMethod>
              </Block>
            </Item>
          </ListItem>          
          <Item>
            <Block>
              <header>
                <MdReceipt size={36} color="#FFF" />
                <h1>Resumo</h1>
              </header>
              <ul>
              {cart.map((product) => (
                <ItemResume key={product.id}>
                  <div>
                    <img src={product.image} alt={product.name}/> 
                    <aside>
                      <h3>{product.name}</h3>
                      <h3>{product.priceFormatted} x {product.qtd}</h3>
                    </aside>
                  </div>                  
                </ItemResume>  
              ))}
              </ul>
            </Block>            
          </Item>  
      </Wrapper>   
      <BottomBar />       
    </Container>
  );
};

export default Checkout;
