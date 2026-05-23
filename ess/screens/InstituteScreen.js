import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

import styles from '../styles/instituteStyles';
import { INSTITUTE } from '../constants/strings';
import InstituteCard from '../components/InstituteCard';
import { setItem } from '../utils/storage';

export default function InstituteScreen({ navigation, route }) {
  const [search, setSearch] = useState('');

  const user = route?.params?.user;
  const institutes = route?.params?.institutes || user?.institutes || [];

  const filtered = institutes.filter(item =>
    [item.name, item.location, item.type]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSelectInstitute = inst => {
    setItem('selectedInstitute', inst);

    if (!inst.roles || inst.roles.length === 0) {
      navigation.navigate('Dashboard', {
        user,
        institute: inst,
      });
      return;
    }

    // SINGLE ROLE → DASHBOARD
    if (inst.roles.length === 1) {
      setItem('selectedRole', inst.roles[0]);
      navigation.navigate('Dashboard', {
        user,
        institute: inst,
        role: inst.roles[0],
      });
      return;
    }

    // MULTIPLE ROLE → ROLE SCREEN
    navigation.navigate('Role', {
      user,
      institute: inst,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {INSTITUTE.greeting.replace(
          '{{name}}',
          user?.name?.split(' ')[0] || 'User',
        )}
      </Text>

      <Text style={styles.subtitle}>{INSTITUTE.subtitle}</Text>

      <TextInput
        placeholder={INSTITUTE.searchPlaceholder}
        placeholderTextColor="#9CA3AF"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <InstituteCard
            item={item}
            search={search}
            onPress={() => handleSelectInstitute(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.footer}>No institutes found for "{search}"</Text>
        }
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.footer}>{INSTITUTE.footer}</Text>
    </View>
  );
}
