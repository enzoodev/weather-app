import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/screens/auth/Login';

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};
