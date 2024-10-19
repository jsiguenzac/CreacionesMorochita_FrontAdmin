import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../../src/views/Dashboard/Profile';
import * as tokenService from 'services/Auth/tokenService';
import { DetailUser } from 'services/Profile/DetailUser';
import '@testing-library/jest-dom';

jest.mock('../../src/services/Auth/tokenService', () => ({
    getUser: jest.fn(() => ({
      id: 1,
      name: 'John',
      last_name: 'Doe',
      email: 'john.doe12@example.com'
    })),
    removeUser: jest.fn(),
    saveUser: jest.fn(),
    getToken: jest.fn(() => 'fake-token'),
    isLogged: jest.fn(() => true),
}));

jest.mock('../../src/services/Profile/DetailUser', () => ({
    DetailUser: jest.fn(),
  }));

jest.mock('react-apexcharts', () => {
    return () => <div data-testid="mock-apexchart" />;
});


describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "No se encontró el usuario" when user is not available', () => {
    tokenService.getUser.mockReturnValue(null);

    render(<Profile />);
    expect(screen.getByText(/No se encontró el usuario/i)).toBeInTheDocument();
  });

  test('fetches and displays user data is not called', async () => { 
    const dataUser = DetailUser.mockResolvedValue({
        data: { id_user: 1, name: 'John Doe', email: 'john.doe12@example.com' }
    });    

    const { container } = render(<Profile />);
  
    expect(dataUser).not.toHaveBeenCalled();  
    expect(container.textContent).toContain('No se encontró el usuario');
  });
});
