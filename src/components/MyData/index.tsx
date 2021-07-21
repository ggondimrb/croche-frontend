import React, { useState } from 'react';
import { Form, Input, Button, Spin, Modal, message } from 'antd';
import MaskedInput from 'antd-mask-input';

import { Container, FormData, FormEditAdress } from './styles';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

function MyData() {
  const {user, getToken, refreshToken} = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEditAdressVisible, setIsModalEditAdressVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [formNewPassword] = Form.useForm();
  const [formEditAdress] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOkChangePassword = () => {
    setLoading(true);
    formNewPassword
    .validateFields()
    .then(values => {
      api.post('/auth/change_password', 
      {mail: user.email, password: values.password, newPassword: values.newPassword, confirmNewPassword: values.confirmNewPassword},
      {headers:{Authorization: `Bearer ${getToken()}`}})
      .then(() => {
        message.success("Senha atualizada com sucesso!");
        formNewPassword.resetFields();
        setIsModalVisible(false);
      }).catch(e => {
        message.error(e.response.data.message);
      })
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleOkEditAdress = () => {
    setLoading(true);
    formEditAdress
    .validateFields()
    .then(values => {
      api.put(`/enderecos/${user.id}`,
      {cep: values.cep, complement: values.complement, num: values.number},
      {headers:{Authorization: `Bearer ${getToken()}`}})
      .then(() => {
        message.success("Endereço atualizado com sucesso!");
        refreshToken();
        setIsModalEditAdressVisible(false);
      })
      .catch((e) => {
        message.error(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      })
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleCancel = () => {
    formNewPassword.resetFields();
    setIsModalVisible(false);
  };

  const handleCancelEditAdress = () => {
    formEditAdress.resetFields();
    setIsModalEditAdressVisible(false);
  }

  const onFinish = (values: any) => {
    setLoading(true);
    api.put(`/clientes/${user.id}`,
    {email: user.email, name:values.name, cellphone: values.cellphone},
    {headers:{Authorization: `Bearer ${getToken()}`}})
    .then(() => {
      message.success("Usuário atualizado com sucesso!");
      refreshToken();
    })
    .catch((e) => {
      message.error(e.response.data.message);
    })
    .finally(() => {
      setLoading(false);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const changeCep = (cep: string) => {
    if(cep.length === 8) {
      
    }
  }

  return (
    <Container>
      <FormData
        name="basic"
        labelCol={{ span: 30 }}
        wrapperCol={{ span: 30 }}
        layout="vertical"
        initialValues={{ remember: true }} 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
          <div style={{display: 'flex'}}>
            <div>
            <h3>Dados Pessoais</h3>
              <Form.Item
                label="Nome completo"
                name="name"
                initialValue={user.name}
                rules={[{ required: true, message: 'Informe o nome!' }]}>
                <Input 
                  maxLength={30}/>
              </Form.Item>
              <Form.Item
                label="E-mail atual"
                name="mail"
                initialValue={user.email}
                rules={[{ required: true, message: 'Informe o e-mail!' }]}>
                <Input disabled />
              </Form.Item>              
              <Form.Item
                label="CPF"
                name="cpf"
                initialValue={user.cpf}>
                <Input 
                  disabled={true}/>
              </Form.Item>
              <Form.Item
                label="Celular"
                name="cellphone"
                initialValue={user.cellphone}
                rules={[{ required: true, message: 'Informe o telefone!' }]}
              >
                <Input maxLength={11} />
              </Form.Item>   
              <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <Button 
                  type="primary" 
                  onClick={showModal}
                  disabled={loading}>
                  Alterar Senha
                </Button>                             
              </div>              
              <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <Button 
                  type="primary" 
                  onClick={() => {setIsModalEditAdressVisible(true)}}
                  disabled={loading}>
                  Alterar Endereço
                </Button>                             
              </div>                
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  {loading ? <Spin /> : 'Salvar Informações'}                  
                </Button> 
              </div>             
            </div>   
          </div>
        <Modal 
          title="Alterar senha" 
          visible={isModalVisible} 
          onOk={handleOkChangePassword} 
          okText="Alterar senha"
          onCancel={handleCancel}
          cancelText="Cancelar">
          <Form
            form={formNewPassword}>
            <Form.Item
              label="Senha Atual"
              name="password"
              rules={[{ required: true, message: 'Informe a senha atual.' }]}>
              <Input.Password/>
            </Form.Item>
            <Form.Item
              label="Nova senha"
              name="newPassword"
              rules={[{ required: true, min: 6, message: 'Informe uma senha com no minimo 6 dígitos.' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirmar nova senha"
              name="confirmNewPassword"
              rules={[{ required: true, min: 6, message: 'Informe uma senha com no minimo 6 dígitos.' }]}>
              <Input.Password />
            </Form.Item>      
            {loading && <Spin />}
          </Form>
        </Modal>    
      </FormData>      
      <Modal 
          title="Editar endereço" 
          visible={isModalEditAdressVisible} 
          onOk={handleOkEditAdress} 
          okText="Salvar Informações"
          onCancel={handleCancelEditAdress}
          cancelText="Cancelar">
          <FormEditAdress
            layout="vertical"
            form={formEditAdress}>
            <Form.Item
              label="CEP"
              name="cep"
              initialValue={user.cep}    
              hasFeedback={loadingCep}
              validateStatus="validating"
              rules={[{ required: true, type: 'number'}]}>
              <Input
                onChange={(e) => changeCep(e.target.value)}
                maxLength={8}/>
            </Form.Item>
            <Form.Item
              label="Endereço"
              initialValue={user.street}
              name="address">
              <Input
                disabled={true}/>
            </Form.Item>
            <div>
              <Form.Item
                label="Número"
                initialValue={user.num}
                name="number">
                <Input
                  style={{width: '200px'}}
                  type="number"/>
              </Form.Item>
              <Form.Item
                label="Complemento (opcional)"
                initialValue={user.complement}
                name="complement">
                <Input
                  style={{width: '200px'}}
                  maxLength={50}/>
              </Form.Item>
            </div>
            <Form.Item
              label="Bairro"
              initialValue={user.district}
              name="district">
              <Input
                disabled={true}/>
            </Form.Item>            
          </FormEditAdress>
        </Modal>          
    </Container>
  );
};

export default MyData;
