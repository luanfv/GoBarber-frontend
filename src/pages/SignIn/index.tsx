import React from 'react';
import { Container, Content, Background } from './style';
import logoImg from './../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Logo GoBarber" />

            <form>
                <h1>Faça seu logon</h1>

                <input type="email" placeholder="E-mail" />

                <input type="password" placeholder="Senha" />

                <button type="submit">Entrar</button>

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