import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './style';
import logoImg from './../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from './../../utils/getValidationErrors';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            console.log(err);
        }
    }, []);

    return (
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="Logo GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
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