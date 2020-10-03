import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background, AnimationContainer } from './style';
import logoImg from './../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { email } = data;

            // Recuperação de senha

            // history.push('/dashboard');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
            });
        }

    }, [addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Logo GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>

                        <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />

                        <Button type="submit">Recuperar</Button>
                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
}


export default ForgotPassword;