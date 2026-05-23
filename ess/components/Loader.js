import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * Loader — full-screen semi-transparent loading overlay.
 *
 * Props:
 *  - visible (bool)    show / hide the overlay
 *  - color   (string)  spinner colour, default '#065F46'
 */
export default function Loader({ visible = false, color = '#065F46' }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
