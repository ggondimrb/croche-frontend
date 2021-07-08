import React, { useState } from 'react';
import { Form, Input, Button, Spin, Modal, message } from 'antd';

import { Container, FormData } from './styles';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

function MyData() {
  const {user, getToken} = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formNewPassword] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
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

  const handleCancel = () => {
    formNewPassword.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log('mail',user.email);
    api.put(`/clientes/${user.id}`,
    {email: user.email, name:values.name, cellphone: values.cellphone},
    {headers:{Authorization: `Bearer ${getToken()}`}})
    .then(() => {
      message.success("Usuário atualizado com sucesso!");
    })
    .catch((e) => {
      message.error(e.response.data.message);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
                rules={[{ required: true, message: 'Informe o nome!' }]}
              >
                <Input />
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
                initialValue={user.cpf}
              >
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
                <Button type="primary" onClick={showModal}>
                  Alterar Senha
                </Button>                             
              </div>              
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Salvar Informações
                </Button>  
              </div>
            </div>   
          </div>
        <Modal 
          title="Alterar senha" 
          visible={isModalVisible} 
          onOk={handleOk} 
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
    </Container>
  );
};

export default MyData;
