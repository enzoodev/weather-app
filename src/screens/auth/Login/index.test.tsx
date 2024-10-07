import { t } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useToast } from 'react-native-toast-notifications';
import { ThemeProvider } from 'styled-components/native';
import { useAuth } from '@/features/auth';
import { theme } from '@/theme';
import i18n from '@/lib/language/i18n';
import { Login } from './index';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

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

const renderComponent = () => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    </I18nextProvider>,
  );
};

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
    const { getByText } = renderComponent();

    expect(getByText(t('login.access_account'))).toBeTruthy();
    expect(getByText(t('login.enter'))).toBeTruthy();
  });

  it('should call login with correct data', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.changeText(
      getByPlaceholderText(t('login.email')),
      'test@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText(t('login.password')),
      'password123',
    );

    fireEvent.press(getByText(t('login.enter')));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show toast message on login error', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));

    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.changeText(
      getByPlaceholderText(t('login.email')),
      'test@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText(t('login.password')),
      'password123',
    );

    fireEvent.press(getByText(t('login.enter')));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(t('login.login_error'), {
        type: 'danger',
        placement: 'top',
      });
    });
  });

  it('should display validation error messages', async () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText(t('login.enter')));

    await waitFor(() => {
      expect(getByText(t('validation.email_required'))).toBeTruthy();
      expect(getByText(t('validation.password_required'))).toBeTruthy();
    });
  });
});
