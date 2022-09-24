import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Game } from "../screens/Game";
import { Home } from "../screens/Home/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />
      <Screen 
      name="games"
      component={Game}
      />
    </Navigator>
  )
}