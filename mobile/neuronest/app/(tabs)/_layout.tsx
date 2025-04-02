import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
        }}
      />
    </Tabs>
  );
}
