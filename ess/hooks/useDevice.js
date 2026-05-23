import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export const getDeviceInfo = () => {
  const { width, height } = Dimensions.get('window');
  const shortest = Math.min(width, height);
  const isTablet = shortest >= 768;

  return {
    width,
    height,
    isTablet,
    isPhone: !isTablet,
    isIPad: Platform.OS === 'ios' && isTablet,
    isLandscape: width > height,
    contentMaxWidth: isTablet ? 1040 : 520,
    columns: isTablet ? 2 : 1,
  };
};

export const useDevice = () => {
  const [device, setDevice] = useState(getDeviceInfo());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setDevice(getDeviceInfo());
    });

    return () => subscription?.remove();
  }, []);

  return device;
};
