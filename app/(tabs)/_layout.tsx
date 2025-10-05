import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import PlanetIcon from '@/assets/icons/planet-icon.svg';
import PlanetGradientIcon from '@/assets/icons/planet-icon-gradient.svg';
import CongressIcon from '@/assets/icons/congress-icon.svg';
import CongressGradientIcon from '@/assets/icons/congress-icon-gradient.svg';
import DashboardIcon from '@/assets/icons/dashboard-icon.svg';
import DashboardGradientIcon from '@/assets/icons/dashboard-icon-gradient.svg';
import FireIcon from '@/assets/icons/fire-icon.svg';
import FireGradientIcon from '@/assets/icons/fire-icon-gradient.svg';
import MagnifierIcon from '@/assets/icons/magnifier-icon.svg';
import LockIcon from '@/assets/icons/lock-closed-icon.svg';
import MagnifierGradientIcon from '@/assets/icons/magnifier-icon-gradient.svg';
import { HapticTab } from '@/components/HapticTab';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';

export default function TabLayout() {
	const borderColor = useThemeColor(appTokens.border.tertiary);
	const iconInactiveColor = useThemeColor(appTokens.foreground.quinary);
	const labelActiveColor = useThemeColor(appTokens.text.brandSecondary);
	const backgroundColor = useThemeColor(appTokens.background.primary);

	const lockIconColor = useThemeColor(appTokens.foreground.secondary);
	const lockBorderColor = useThemeColor(appTokens.border.secondary);
	const lockBgColor = useThemeColor(appTokens.background.primary);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarInactiveTintColor: iconInactiveColor,
				tabBarActiveTintColor: labelActiveColor,
				tabBarStyle: {
					borderTopWidth: 1,
					borderTopColor: borderColor,
					backgroundColor: backgroundColor,
					paddingBottom: 4,
					...Platform.select({
						ios: {
							shadowColor: 'rgba(13, 18, 28, 0.05)',
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 1,
							shadowRadius: 24,
						},
						android: {
							elevation: 12,
							shadowColor: 'rgba(13, 18, 28, 0.05)',
						},
					}),
				},
				tabBarLabelStyle: {
					marginTop: 2,
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'All News',
					tabBarIcon: ({ focused, color }) => {
						return focused ? (
							<PlanetGradientIcon width={28} height={28} />
						) : (
							<PlanetIcon width={28} height={28} color={color} />
						);
					},
				}}
			/>
			<Tabs.Screen
				name='search'
				options={{
					title: 'Search',
					tabBarIcon: ({ focused, color }) => {
						return focused ? (
							<View style={styles.disabledIconContainer}>
								<View
									style={[
										styles.lockIcon,
										{
											borderColor: lockBorderColor,
											backgroundColor: lockBgColor,
										},
									]}
								>
									<LockIcon width={12} height={12} fill={lockIconColor} />
								</View>
								<MagnifierGradientIcon width={28} height={28} />
							</View>
						) : (
							<View style={styles.disabledIconContainer}>
								<View
									style={[
										styles.lockIcon,
										{
											borderColor: lockBorderColor,
											backgroundColor: lockBgColor,
										},
									]}
								>
									<LockIcon width={12} height={12} fill={lockIconColor} />
								</View>
								<MagnifierIcon
									width={28}
									height={28}
									color={color}
									style={{ opacity: 0.5 }}
								/>
							</View>
						);
					},
					//TODO: delete when the component is ready (and the wrapper of the inactive icon above)
					tabBarLabelStyle: {
						marginTop: 2,
						opacity: 0.5,
					},
				}}
			/>
			<Tabs.Screen
				name='congress'
				options={{
					title: 'Congress',
					tabBarIcon: ({ color, focused }) => {
						return focused ? (
							<View style={styles.disabledIconContainer}>
								<View
									style={[
										styles.lockIcon,
										{
											borderColor: lockBorderColor,
											backgroundColor: lockBgColor,
										},
									]}
								>
									<LockIcon width={12} height={12} fill={lockIconColor} />
								</View>
								<CongressGradientIcon width={28} height={28} />
							</View>
						) : (
							<View style={styles.disabledIconContainer}>
								<View
									style={[
										styles.lockIcon,
										{
											borderColor: lockBorderColor,
											backgroundColor: lockBgColor,
										},
									]}
								>
									<LockIcon width={12} height={12} fill={lockIconColor} />
								</View>
								<CongressIcon
									width={28}
									height={28}
									color={color}
									style={{ opacity: 0.5 }}
								/>
							</View>
						);
					},
					//TODO: delete when the component is ready (and the wrapper of the inactive icon above)
					tabBarLabelStyle: {
						marginTop: 2,
						opacity: 0.5,
					},
				}}
			/>
			<Tabs.Screen
				name='newsAlerts'
				options={{
					title: 'News Alerts',
					tabBarIcon: ({ color, focused }) => {
						return focused ? (
							<View style={styles.disabledIconContainer}>
								<View
									style={[
										styles.lockIcon,
										{
											borderColor: lockBorderColor,
											backgroundColor: lockBgColor,
										},
									]}
								>
									<LockIcon width={12} height={12} fill={lockIconColor} />
								</View>
								<FireGradientIcon width={28} height={28} />
							</View>
						) : (
							<View style={styles.disabledIconContainer}>
								<View
									style={[
										styles.lockIcon,
										{
											borderColor: lockBorderColor,
											backgroundColor: lockBgColor,
										},
									]}
								>
									<LockIcon width={12} height={12} fill={lockIconColor} />
								</View>
								<FireIcon
									width={28}
									height={28}
									color={color}
									style={{ opacity: 0.5 }}
								/>
							</View>
						);
					},
					//TODO: delete when the component is ready (and the wrapper of the inactive icon above)
					tabBarLabelStyle: {
						marginTop: 2,
						opacity: 0.5,
					},
				}}
			/>
			<Tabs.Screen
				name='more'
				options={{
					title: 'More',
					tabBarIcon: ({ color, focused }) => {
						return focused ? (
							<DashboardGradientIcon width={28} height={28} />
						) : (
							<DashboardIcon width={28} height={28} color={color} />
						);
					},
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	disabledIconContainer: {
		position: 'relative',
	},

	lockIcon: {
		zIndex: 1,
		position: 'absolute',
		right: -6,
		top: -3,
		borderRadius: 100,
		borderWidth: 1,
		padding: 2,
	},
});
