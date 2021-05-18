import React, { useEffect } from 'react';
import BottomBar from '../../components/BottomBar';
import { MdLocalShipping, MdCreditCard, MdReceipt } from "react-icons/md";

import { Container, 
         Wrapper,
         ListItem, 
         Item,
         Block,
         ItemResume,
         PayMethod,
         Resume,
         DeliveryAddress
        } from './styles';
        
import { useCart } from '../../contexts/cart';
import Header from '../../components/Header';
import { useAuth } from '../../contexts/auth';

const Checkout: React.FC = () => {  
  const { cart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    
  }, []);
  
  return (
    <Container>
      <Header />
      <Wrapper>  
        <Item>
          <Resume>
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
          </Resume>            
        </Item>
        <ListItem>
          <Item>
            <DeliveryAddress>
              <header>
                  <MdLocalShipping size={36} color="#FFF" />
                  <h1>Endereço de Entrega</h1>
              </header>
              <h2>Minha Casa</h2>
              <h3>{user.street}, {user.num} - {user.complement}</h3>
              <div>
                <small>Bairro: {user.district}</small>
                <small>Cidade: {user.city}</small>
                <small>CEP: {user.cep}</small>
              </div>
            </DeliveryAddress>
          </Item>
        </ListItem>              
        {/* <ListItem>
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
        </ListItem>           */}
      </Wrapper>   
      <BottomBar />       
    </Container>
  );
};

export default Checkout;
