import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import PlanetIcon from '@/assets/icons/planet-icon.svg';
import CongressIcon from '@/assets/icons/congress-icon.svg';
import DashboardIcon from '@/assets/icons/dashboard-icon.svg';
import FireIcon from '@/assets/icons/fire-icon.svg';
import MagnifierIcon from '@/assets/icons/magnifier-icon.svg';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'All News',
					tabBarIcon: ({ color }) => (
						<PlanetIcon width={28} height={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='search'
				options={{
					title: 'Search',
					tabBarIcon: ({ color }) => (
						<MagnifierIcon width={28} height={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='congress'
				options={{
					title: 'Congress',
					tabBarIcon: ({ color }) => (
						<CongressIcon width={28} height={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='newsAlerts'
				options={{
					title: 'News Alerts',
					tabBarIcon: ({ color }) => (
						<FireIcon width={28} height={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: 'More',
					tabBarIcon: ({ color }) => (
						<DashboardIcon width={28} height={28} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
