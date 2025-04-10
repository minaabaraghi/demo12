// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screens/DashboardScreen';
import BillPaymentScreen from './screens/BillPaymentScreen';
import InstallmentScreen from './screens/InstallmentScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  BillPayment: undefined;
  Installment: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'داشبورد مالی' }} />
        <Stack.Screen name="BillPayment" component={BillPaymentScreen} options={{ title: 'پرداخت قبض' }} />
        <Stack.Screen name="Installment" component={InstallmentScreen} options={{ title: ' خرید اقساطی' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;