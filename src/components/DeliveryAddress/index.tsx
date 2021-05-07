import React, { useState } from 'react';

import apiCep from '../../services/apiCep';
import { InputFret } from '../../pages/Cart/styles';
import Input from '../../components/Input';
import { MdLocalShipping, MdPlace, MdCreditCard, MdReceipt } from "react-icons/md";
import { Container, Block } from './styles';

interface Adress {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: number;
  complemento: string;
}

function DeliveryAddress() {

  const [cep, setCep] = useState<string>('');
  const [adress, setAdress] = useState<Adress>({} as Adress);

  async function findAdress() {
    const response = await apiCep.get(`${cep}/json/`);    
    setAdress(response.data);
  }

  return (
    <Container>
      <Block>
        <header>
          <MdPlace size={36} color="#FFF" />
          <h1>End. de Entrega</h1>
        </header>                
        <div>
          <h4>CEP</h4>
          <InputFret id="fret"                                                      
                      mask="99999-999"                                                 
                      value={cep} 
                      onChange={(e) => setCep(e.target.value)}
                      onBlur={(e) => findAdress()} />
          <Input 
            name="adress"
            label="Endereço"
            value={adress.logradouro}
            disabled />
          <div>
            <Input 
              name="num"
              label="Número"
              value={adress.numero}/>
            <Input 
              name="complement"
              label="Complemento"
              value={adress.complemento}/>
          </div>   
          <Input 
            name="district"
            label="Bairro"
            value={adress.bairro}
            disabled />
          <div>
            <Input 
              name="city"
              label="Cidade"
              value={adress.localidade}
              disabled />
            <Input 
              name="uf"
              label="UF"
              value={adress.uf}
              disabled />                                                                                
          </div>                                                                                
        </div>                 
      </Block>
    </Container>
  );
};

export default DeliveryAddress;
