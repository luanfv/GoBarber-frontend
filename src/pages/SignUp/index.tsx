import React from 'react';
import { Container, Content, Background } from './style';
import logoImg from './../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

const SignUp: React.FC = () => {
    function handleSubmit(data: object): void {
        console.log(data);
    }

    return (
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="Logo GoBarber" />

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />

                    <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />

                    <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="forgot">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </Content>
        </Container>
    );
}

export default SignUp;