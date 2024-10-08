import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Locations } from '@/screens/app/Locations';
import { CreateLocation } from '@/screens/app/CreateLocation';
import { LocationDetails } from '@/screens/app/LocationDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export const LocationsStackRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Locations"
    >
      <Screen name="Locations" component={Locations} />
      <Screen name="CreateLocation" component={CreateLocation} />
      <Screen name="LocationDetails" component={LocationDetails} />
    </Navigator>
  );
};
