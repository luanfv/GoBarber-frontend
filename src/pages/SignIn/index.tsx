import React from 'react';
import { Container, Content, Background } from './style';
import logoImg from './../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Input from './../../components/Input';
import Button from './../../components/Button';

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Logo GoBarber" />

            <form>
                <h1>Faça seu logon</h1>

                <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />

                <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </form>

            <a href="forgot">
                <FiLogIn />
                Criar conta
            </a>
        </Content>

        <Background />
    </Container>
);


export default SignIn;