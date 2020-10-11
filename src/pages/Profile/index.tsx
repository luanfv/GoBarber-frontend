import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Content, AvatarInput } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileData {
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();

    const { addToast } = useToast();
    const { user } = useAuth();

    const handleSubmit = useCallback(async (data: ProfileData) => {
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

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber!',
            });
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
            });
        }
    }, [addToast, history]);

    return (
        <Container>
            <header>
                <div>
                    <Link to="/">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>
            <Content>
                <Form 
                    ref={formRef} 
                    onSubmit={handleSubmit}
                    initialData={{
                        name: user.name,
                        email: user.email,
                    }}
                >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        <button type="button">
                            <FiCamera />
                        </button>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />

                    <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />

                    <Input icon={FiLock} name="password" containerStyle={{ marginTop: 24 }} type="old_password" placeholder="Senha atual" />

                    <Input icon={FiLock} name="password" type="password" placeholder="Nova senha" />

                    <Input icon={FiLock} name="password" type="password_confirmation" placeholder="Confirmar senha" />

                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
}

export default Profile;