import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, extendTheme, StylesProvider } from "@chakra-ui/react";
import TablesTableRow from '../../src/components/Tables/TablesTableRow';

const theme = extendTheme({
    styles: {
        global: {
        body: {
            bg: '#1a202c',
            color: 'white',
        },
        },
    },
});

const renderWithChakra = (ui, options) =>
  render(
    <ChakraProvider theme={theme}>
      <StylesProvider
            value={{
            mediaQueries: {
                sm: '@media (min-width: 30em)',
                md: '@media (min-width: 48em)',
                lg: '@media (min-width: 62em)',
                xl: '@media (min-width: 80em)',
            },
            }}
            stylesheets={[{ cssText: '.my-class { color: hotpink; }' }]}
        >
        <table>
          <tbody>
            {ui}
          </tbody>
        </table>
      </StylesProvider>
    </ChakraProvider>,
    options
  );

describe('TablesTableRow Component', () => {
    const defaultMockProps = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        dni: '12345678',
        domain: 'user',
        status: true,
        date: '2024-10-16',
        lastItem: false,
        onEdit: jest.fn(),
    };

    test('renders the table row with correct data', () => {
        // Renderizar el componente con ChakraProvider
        renderWithChakra(<TablesTableRow {...defaultMockProps} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('12345678')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
        expect(screen.getByText('Activo')).toBeInTheDocument();
        expect(screen.getByText('2024-10-16')).toBeInTheDocument();
    });

    test('calls onEdit when edit button is clicked', () => {
        renderWithChakra(<TablesTableRow {...defaultMockProps} />);
        
        // Buscar el botón de editar y hacer clic
        const editButton = screen.getByText('EDITAR');
        fireEvent.click(editButton);

        // Validar que la función onEdit fue llamada
        expect(defaultMockProps.onEdit).toHaveBeenCalledTimes(1);
    });

    test('displays "Inactivo" status when status is false', () => {
        // Cambiar el estado a falso
        const propsWithInactiveStatus = { ...defaultMockProps, status: false };
        renderWithChakra(<TablesTableRow {...propsWithInactiveStatus} />);
        expect(screen.getByText('Inactivo')).toBeInTheDocument();
    });

    test('renders last item correctly', () => {
        // Cambiar el lastItem a verdadero
        const propsWithLastItem = { ...defaultMockProps, lastItem: true };
        renderWithChakra(<TablesTableRow {...propsWithLastItem} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});
