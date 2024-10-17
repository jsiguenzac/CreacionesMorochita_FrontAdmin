import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomModal } from '../../src/components/Modal/ModalMessage';

describe('CustomModal Component', () => {
    test('renders the modal when open and displays the correct content', () => {
        const handleClose = jest.fn();
        const headerText = "Modal Header";
        const messageText = "This is the modal message.";

        render(
            <CustomModal 
                header={headerText}
                message={messageText}
                isOpen={true}
                onClose={handleClose}
            />
        );

        // Validar elementos del modal sean renderizados
        expect(screen.getByText(headerText)).toBeInTheDocument();
        expect(screen.getByText(messageText)).toBeInTheDocument();

        // Validar que el botón de aceptar esté renderizado
        const acceptButton = screen.getByText('Aceptar');
        expect(acceptButton).toBeInTheDocument();

        // Click en el botón de aceptar
        fireEvent.click(acceptButton);

        // Validar que la función de cerrar se haya llamado
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('does not render the modal when closed', () => {
        const handleClose = jest.fn();

        render(
            <CustomModal 
                header="Modal Header"
                message="This is the modal message."
                isOpen={false}
                onClose={handleClose}
            />
        );

        // Validar que los elementos del modal no estén renderizados
        expect(screen.queryByText("Modal Header")).not.toBeInTheDocument();
        expect(screen.queryByText("This is the modal message.")).not.toBeInTheDocument();
    });
});