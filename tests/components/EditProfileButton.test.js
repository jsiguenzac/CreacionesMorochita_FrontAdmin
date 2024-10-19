import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditProfileButton } from '../../src/views/components/profile/EditProfileButton';
import { UpdateUser } from '../../src/services/Profile/UpdateUser';
// import { set } from 'react-datepicker/dist/date_utils';
import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';


jest.mock('../../src/services/Profile/UpdateUser');

const testId = 'btn-save-profile';

describe('EditProfileButton Component', () => {
    const mockOnClose = jest.fn();
    const mockHandleDataUser = jest.fn();
    const userData = {
        id_user: 1,
        name: 'Juan',
        last_name: 'Pérez',
        dni: 12345678,
        email: 'juan@example.com',
        phone: 987654321
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly when open', () => {
        render(
            <ChakraProvider>
                <EditProfileButton isOpen={true} onClose={mockOnClose} userData={userData} handleDataUser={mockHandleDataUser} />
            </ChakraProvider>
        );

        expect(screen.getByText(/Editar Perfil/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Nombre\(s\)/i)).toHaveValue(userData.name);
        expect(screen.getByPlaceholderText(/Apellido\(s\)/i)).toHaveValue(userData.last_name);
        expect(screen.getByPlaceholderText(/Ingrese su DNI/i)).toHaveValue(userData.dni);
        expect(screen.getByPlaceholderText(/Ingrese su Celular/i)).toHaveValue(userData.phone);
        expect(screen.getByPlaceholderText(/Correo electrónico/i)).toHaveValue(userData.email);
    });

    test('shows error toast on failed UpdateUser', async () => {
        UpdateUser.mockResolvedValueOnce({ exito: false, msg: 'Ocurrió un error inesperado.' });

        render(
            <ChakraProvider>
                <EditProfileButton isOpen={true} onClose={mockOnClose} userData={userData} handleDataUser={mockHandleDataUser} />
            </ChakraProvider>
        );

        fireEvent.click(screen.queryByTestId(testId));

        expect(await screen.findByText(/Ocurrió un error inesperado./i)).toBeInTheDocument();
    });

    test('calls onClose when modal is closed', () => {
        render(
            <ChakraProvider>
                <EditProfileButton isOpen={false} onClose={true} userData={userData} handleDataUser={mockHandleDataUser} />
            </ChakraProvider>
        );

        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
});
