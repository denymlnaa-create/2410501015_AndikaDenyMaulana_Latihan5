// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductList from './src/screens/ProductList';
import CartScreen from './src/screens/CartScreen';

const Tab = createBottomTabNavigator();

// Badge count untuk tab cart
function CartTabIcon({ color }) {
  const count = useSelector(state =>
    state.cart.items.reduce((acc, i) => acc + i.quantity, 0)
  );
  return (
    <View>
      <Text style={{ fontSize: 20 }}>🛒</Text>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </View>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#EDEBE5',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#1A1916',
          tabBarInactiveTintColor: '#B0AA9E',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Produk"
          component={ProductList}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20 }}>🏪</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color }) => <CartTabIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    // Redux Provider membungkus seluruh app
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#C17F3E',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
});
