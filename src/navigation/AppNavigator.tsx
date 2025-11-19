import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from "../screens/RegisterScreen";

import DashboardScreen from '../screens/DashboardScreen';
import GoalsScreen from '../screens/GoalsScreen';
import CreateGoalScreen from '../screens/CreateGoalScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const { user, loading } = useAuth();

  // Enquanto carrega dados do AsyncStorage
  if (loading) {
    return null; // Pode trocar por splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>

        {/* Se NÃO estiver logado -> telas públicas */}
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          /* Se logado -> telas privadas */
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
