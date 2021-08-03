import React, { useEffect, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import { MdLocalShipping, MdReceipt } from "react-icons/md";

import { Container, 
         Wrapper,
         ListItem, 
         Item,
         Block,
         ItemResume,
         Resume,
         DeliveryAddress
        } from './styles';
        
import { ICart, useCart } from '../../contexts/cart';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import Button from '../../components/Button';
import DefaultLayout from '../DefaultLayout';

interface ResponseFret {
  valor: string;
  prazoEntrega: string;
}

const Checkout: React.FC = () => {  
  const { cart, getTotalValue } = useCart();
  const { user } = useAuth();
  const [totalValue, setTotalValue] = useState<number>(0);
  const [fretValue, setFretValue] = useState<number>(0);
  const [fret, setFret] = useState<ResponseFret>();

  useEffect(() => {
    if(Object.keys(user).length === 0) return;
    updateFret();

    async function updateFret() {

      const { cep } = user;

      if(cep && !cep.match("_")) {        
        let wheight = 0; 
        
        cart.forEach((product:ICart) => {
          wheight += (product.peso * product.qtd);
        });
        
        const response = await api.get(`cep/${cep}/${wheight}`);
      
        if(response) {
          setFret(response.data);
          const valor = Number(response.data.valor.replace(",","."));
          setFretValue(valor);
          setTotalValue(getTotalValue() + valor);        
        }
  
      }
    }

  }, [user, cart, getTotalValue]);
  
  return (
    <Container>
      <DefaultLayout showJustLogo={true} />
      <p>Confirmação de Compra</p>
      <Wrapper>  
      <ListItem>
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
                    <h3>{product.name} - {product.color}</h3>
                    <h3>{product.priceFormatted} x {product.qtd}</h3>
                    <h3>Total: {product.subTotal}</h3>
                  </aside>
                </div>                  
              </ItemResume>  
            ))}
            </ul>
          </Resume>            
        </Item>
        <Item>
          <Block>
          <header>
            <h1>Pagar com Boleto Bancário</h1>
          </header>            
          <h2>{formatPrice(totalValue)}</h2>
          <h3>Você poderá visualizar ou imprimir após a finalização do pedido. 
            A data de vencimento é de 2 dias corridos após a conclusão do pedido. 
            Após esta data, ele perderá a validade.
          </h3>
          <Button>Concluir Pedido com Boleto Bancário</Button>
          </Block>
        </Item>
        <Item>
          <Block>
          <header>
            <h1>Pagar com PIX</h1>
          </header>            
          <h2>{formatPrice(totalValue)}</h2>
          <h3>Você poderá visualizar ou imprimir o código após a finalização do pedido. 
            A data de vencimento é de 2 dias corridos após a conclusão do pedido. 
            Após esta data, ele perderá a validade.
          </h3>
          <Button>Concluir Pedido com PIX</Button>
          </Block>
        </Item>        
        </ListItem>
        <ListItem>
          <Item>
            <DeliveryAddress>
              <header>
                  <MdLocalShipping size={36} color="#FFF" />
                  <h1>Endereço de Entrega</h1>
              </header>
              <h2>{user.street}, {user.num} - {user.complement}</h2>
              <div>
                <h3><strong>Bairro:</strong> {user.district}</h3>
                <h3><strong>Cidade:</strong> {user.city}</h3>
                <h3><strong>CEP:</strong> {user.cep}</h3>
                <h3><strong>Frete:</strong>{formatPrice(fretValue)}</h3>
                <h3><strong>Prazo de entrega:</strong> Aproximadamente {fret?.prazoEntrega} dias úteis</h3>
                <h3><strong>Forma de Envio: </strong> Correios - PAC</h3>
              </div>
            </DeliveryAddress>
          </Item>
          <Item>
            <Block>
              <h3><strong>Total:</strong> {formatPrice(totalValue)} </h3>
            </Block>
          </Item>
        </ListItem>              
      </Wrapper>   
      <BottomBar />       
    </Container>
  );
};

export default Checkout;
