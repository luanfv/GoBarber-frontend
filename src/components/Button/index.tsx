import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './style';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = props => (
    <Container>
        <button type="button" { ...props }></button>
    </Container>
);

export default Button;