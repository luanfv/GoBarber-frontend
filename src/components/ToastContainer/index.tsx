import React from 'react';
import { Container, Toast } from './style';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from './../../hooks/toast';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToasTContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const { removeToast } = useToast();

    return (
        <Container>
            {
                messages.map(message => {
                    return (
                        <Toast key={message.id} type={message.type} hasDescription={!!message.description}>
                            <FiAlertCircle size={20} />
            
                            <div>
                                <strong>{message.title}</strong>
                                {message.description && <p>{message.description}</p>}
                            </div>
            
                            <button type="button" onClick={() => removeToast(message.id)}>
                                <FiXCircle size={18} />
                            </button>
                        </Toast>
                    )
                })
            }
        </Container>
    );
}

export default ToasTContainer