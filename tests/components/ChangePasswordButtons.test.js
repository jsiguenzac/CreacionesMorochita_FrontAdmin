import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChangePasswordButtom } from '../../src/views/components/profile/ChangePasswordButton';
import { UpdatePass } from '../../src/services/Profile/UpdatePass';
import { useToast } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'; 
import '@testing-library/jest-dom';

const testId = 'btn-change-pass';

jest.mock('../../src/services/Profile/UpdatePass', () => ({
    UpdatePass: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useToast: jest.fn(),
}));

describe('ChangePasswordButtom Component', () => {
    const mockOnClose = jest.fn();
    const mockToast = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useToast.mockImplementation(() => mockToast);
    });

    test('renders correctly and shows the modal', () => {
        render(
            <ChakraProvider>
                <ChangePasswordButtom isOpen={true} onClose={mockOnClose} />
            </ChakraProvider>
        );

        expect(screen.getByText('Cambiar Contraseña')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Ingresa tu contraseña actual/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Ingresa la nueva contraseña/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Confirmar la nueva contraseña/i)).toBeInTheDocument();
    });

    test('shows error toast when fields are empty', async () => {
        render(
            <ChakraProvider>
                <ChangePasswordButtom isOpen={true} onClose={mockOnClose} />
            </ChakraProvider>
        );
        
        fireEvent.click(screen.queryByTestId(testId));
        
        /// expect(screen.queryByTestId(testId)).toBeInTheDocument();
        
        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Error",
                description: "Todos los campos son obligatorios",
                status: "error",
            }));
        });
    });

    test('shows error toast when new passwords do not match', async () => {
        render(
            <ChakraProvider>
                <ChangePasswordButtom isOpen={true} onClose={mockOnClose} />
            </ChakraProvider>
        );
        
        fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña actual/i), {
            target: { value: 'currentPassword123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingresa la nueva contraseña/i), {
            target: { value: 'newPassword123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirmar la nueva contraseña/i), {
            target: { value: 'differentPassword123' },
        });

        fireEvent.click(screen.queryByTestId(testId));

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Error",
                description: "Las contraseñas no coinciden",
                status: "error",
            }));
        });
    });

    test('successfully changes password', async () => {
        UpdatePass.mockResolvedValueOnce({ exito: true, msg: 'Contraseña cambiada exitosamente' });
        
        render(
            <ChakraProvider>
                <ChangePasswordButtom isOpen={true} onClose={mockOnClose} />
            </ChakraProvider>
        );
        
        fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña actual/i), {
            target: { value: 'currentPassword123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingresa la nueva contraseña/i), {
            target: { value: 'newPassword123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirmar la nueva contraseña/i), {
            target: { value: 'newPassword123' },
        });

        fireEvent.click(screen.queryByTestId(testId));

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Éxito",
                description: "Contraseña cambiada exitosamente",
                status: "success",
            }));
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    test('handles incorrect current password', async () => {
        UpdatePass.mockResolvedValueOnce({ exito: false, msg: 'CLAVE_ACTUAL_INCORRECTA' });
        
        render(
            <ChakraProvider>
                <ChangePasswordButtom isOpen={true} onClose={mockOnClose} />
            </ChakraProvider>
        );
        
        fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña actual/i), {
            target: { value: 'wrongCurrentPassword' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingresa la nueva contraseña/i), {
            target: { value: 'newPassword123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirmar la nueva contraseña/i), {
            target: { value: 'newPassword123' },
        });

        fireEvent.click(screen.queryByTestId(testId));

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Error",
                description: "La contraseña actual es incorrecta",
                status: "error",
            }));
        });
    });
});
