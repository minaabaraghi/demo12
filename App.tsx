import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SampleInsta from "./screens/sampleInsta";
import Tabnavigator from "./navigator/tabNavigator";

export type RootStackParamList = {
  Login: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={SampleInsta}
          options={{ title: " insta" }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={Tabnavigator}
          options={{ title: " Tabnavigator" }}
        />
        {/* <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "داشبورد مالی" }}
        />
        <Stack.Screen
          name="BillPayment"
          component={BillPaymentScreen}
          options={{ title: "پرداخت قبض" }}
        />
        <Stack.Screen
          name="Installment"
          component={InstallmentScreen}
          options={{ title: " خرید اقساطی" }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
