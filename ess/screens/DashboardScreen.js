import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DASHBOARD } from '../constants/strings';
import styles from '../styles/dashboardStyles';
import { clearAll } from '../utils/storage';

export default function DashboardScreen({ route, navigation }) {
  const user = route?.params?.user;
  const handleLogout = () => {
    clearAll();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBox}>
          <Text style={styles.menu}>≡</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>
          Mentrix<Text style={styles.blue}>OS</Text>
        </Text>

        <TouchableOpacity style={styles.profile} onPress={handleLogout}>
          <Text style={styles.profileText}>
            {user?.name ? user.name[0] : 'U'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* TITLE */}
      <View style={styles.titleWrap}>
        <Text style={styles.title}>
          {DASHBOARD.title} <Text style={styles.blue}>OS</Text>
        </Text>

        <Text style={styles.subtitle}>
          {user?.name || 'User'} {DASHBOARD.subtitle}
        </Text>
      </View>

      {/* CARDS */}
      <View style={styles.cardBlue}>
        <Text style={styles.numberBlue}>08</Text>
        <Text style={styles.cardTitle}>{DASHBOARD.active}</Text>
        <Text style={styles.cardDesc}>{DASHBOARD.activeDesc}</Text>
      </View>

      <View style={styles.cardGreen}>
        <Text style={styles.numberGreen}>05</Text>
        <Text style={styles.cardTitle}>{DASHBOARD.inactive}</Text>
        <Text style={styles.cardDesc}>{DASHBOARD.inactiveDesc}</Text>
      </View>

      <View style={styles.cardYellow}>
        <Text style={styles.numberYellow}>15+</Text>
        <Text style={styles.cardTitle}>{DASHBOARD.modules}</Text>
        <Text style={styles.cardDesc}>{DASHBOARD.modulesDesc}</Text>
      </View>

      <View style={styles.cardPurple}>
        <Text style={styles.numberPurple}>50+</Text>
        <Text style={styles.cardTitle}>{DASHBOARD.users}</Text>
        <Text style={styles.cardDesc}>{DASHBOARD.usersDesc}</Text>
      </View>
    </View>
  );
}
