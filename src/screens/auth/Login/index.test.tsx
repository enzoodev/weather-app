import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useToast } from 'react-native-toast-notifications';
import { ThemeProvider } from 'styled-components/native';
import { useAuth } from '@/features/auth';
import { theme } from '@/theme';
import { Login } from './index';

jest.mock('@/features/auth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-native-toast-notifications', () => ({
  useToast: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

describe('Login', () => {
  const mockLogin = jest.fn();
  const mockShowToast = jest.fn();
  const mockT = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoadingLogin: false,
    });

    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });

    mockT.mockImplementation(key => key);
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );

    expect(getByText('login.access_account')).toBeTruthy();
    expect(getByText('login.enter')).toBeTruthy();
  });

  it('should call login with correct data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );

    fireEvent.changeText(
      getByPlaceholderText('login.email'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('login.password'), 'password123');

    fireEvent.press(getByText('login.enter'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show toast message on login error', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );

    fireEvent.changeText(
      getByPlaceholderText('login.email'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('login.password'), 'password123');

    fireEvent.press(getByText('login.enter'));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('login.login_error', {
        type: 'danger',
        placement: 'top',
      });
    });
  });

  it('should display validation error messages', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );

    fireEvent.press(getByText('login.enter'));

    await waitFor(() => {
      expect(getByText('email is a required field')).toBeTruthy();
      expect(getByText('password is a required field')).toBeTruthy();
    });
  });
});
