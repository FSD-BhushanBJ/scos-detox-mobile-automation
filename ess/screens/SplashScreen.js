import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getItem } from '../utils/storage';

export default function SplashScreen({ navigation }) {
  // ISSUE-09 FIX: added `navigation` to the dependency array
  useEffect(() => {
    const checkSession = () => {
      // BUG-01 FIX: getItem (MMKV) is synchronous — no async/await needed.
      // The try/catch now correctly catches any synchronous throws from MMKV.
      try {
        const token = getItem('token');
        const user = getItem('user');
        const institute = getItem('selectedInstitute');
        const role = getItem('selectedRole');

        if (!token || !user) {
          navigation.replace('Login');
        } else if (!institute) {
          navigation.replace('Institute', {
            user,
            institutes: user.institutes || [],
          });
        } else if (!role) {
          navigation.replace('Role', { user, institute });
        } else {
          navigation.replace('Dashboard', { user, institute, role });
        }
      } catch (e) {
        navigation.replace('Login');
      }
    };

    const timer = setTimeout(checkSession, 2000);
    // Clean up the timer if the component unmounts before it fires
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* APP NAME */}
      <Text style={styles.appName}>
        Mentrix<Text style={styles.blue}>OS</Text>
      </Text>
    </View>
  );
}

// STYLE-14 FIX: moved inline styles to StyleSheet for better performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
