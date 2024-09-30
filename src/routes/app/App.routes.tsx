import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Locations } from '@/screens/app/Locations';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Locations" component={Locations} />
    </Navigator>
  );
};
