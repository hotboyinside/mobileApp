import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import PlanetIcon from "@/assets/icons/planet-icon.svg";
import PlanetGradientIcon from "@/assets/icons/planet-icon-gradient.svg";
import CongressIcon from "@/assets/icons/congress-icon.svg";
import CongressGradientIcon from "@/assets/icons/congress-icon-gradient.svg";
import DashboardIcon from "@/assets/icons/dashboard-icon.svg";
import DashboardGradientIcon from "@/assets/icons/dashboard-icon-gradient.svg";
import FireIcon from "@/assets/icons/fire-icon.svg";
import FireGradientIcon from "@/assets/icons/fire-icon-gradient.svg";
import MagnifierIcon from "@/assets/icons/magnifier-icon.svg";
import MagnifierGradientIcon from "@/assets/icons/magnifier-icon-gradient.svg";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTokens } from "@/constants/tokens";

export default function TabLayout() {
  const iconInactiveColor = useThemeColor({}, appTokens.foreground.quinary);
  const labelActiveColor = useThemeColor({}, appTokens.text.brandSecondary);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarInactiveTintColor: iconInactiveColor,
        tabBarActiveTintColor: labelActiveColor,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "All News",
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
          title: "Search",
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <MagnifierGradientIcon width={28} height={28} />
            ) : (
              <MagnifierIcon width={28} height={28} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name='congress'
        options={{
          title: "Congress",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <CongressGradientIcon width={28} height={28} />
            ) : (
              <CongressIcon width={28} height={28} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name='newsAlerts'
        options={{
          title: "News Alerts",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FireGradientIcon width={28} height={28} />
            ) : (
              <FireIcon width={28} height={28} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: "More",
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
