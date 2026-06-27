import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNavigationComponent from './BottomNavigation';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BottomNavigation', () => {
  it('renders navigation tabs', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BottomNavigationComponent />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Navegar para Início')).toBeInTheDocument();
    expect(screen.getByLabelText('Navegar para Posts')).toBeInTheDocument();
  });

  it('navigates on tab change', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BottomNavigationComponent />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByLabelText('Navegar para Posts'));
    expect(mockNavigate).toHaveBeenCalledWith('/post/1');
  });


});