import React, { useCallback, useRef, ChangeEvent } from 'react';
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
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();

    const { addToast } = useToast();
    const { user, updateUser } = useAuth();

    const handleSubmit = useCallback(async (data: ProfileData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                old_password: Yup.string(),
                password: Yup.string()
                .when('old_password', {
                    is: value => value.length,
                    then: Yup.string().min(6),
                    otherwise: Yup.string(),
                }),
                password_confirmation: Yup.string()
                .when('old_password', {
                    is: value => value.length,
                    then: Yup.string().min(6),
                    otherwise: Yup.string(),
                })
                .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const updateProfile = !!data.old_password ? data : { email: data.email, name: data.name };
            
            const response = await api.put('/profile', updateProfile);

            updateUser(response.data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Perfil atualizado',
                description: 'Suas informações do perfil foram atualizadas com sucesso!',
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }

            console.log(err);

            addToast({
                type: 'error',
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao atualizar o perfil, tente novamente.',
            });
        }
    }, [addToast, history, updateUser]);

    const handleAvatarChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const data = new FormData();

            data.append('avatar', event.target.files[0]);

            api.patch('/users/avatar', data)
            .then(response => {
                updateUser(response.data);

                addToast({
                    type: 'success',
                    title: 'Avatar atualizado'
                }) 
            });
        }
    }, [addToast, updateUser]);

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
                        <label htmlFor="avatar">
                            <FiCamera />
                            <input type="file" id="avatar" onChange={handleAvatarChange} />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />

                    <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />

                    <Input icon={FiLock} name="old_password" containerStyle={{ marginTop: 24 }} type="password" placeholder="Senha atual" />

                    <Input icon={FiLock} name="password" type="password" placeholder="Nova senha" />

                    <Input icon={FiLock} name="password_confirmation" type="password" placeholder="Confirmar senha" />

                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
}

export default Profile;