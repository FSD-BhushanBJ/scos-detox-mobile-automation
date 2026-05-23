/**
 * @file src/config/roleIcons.ts
 */

import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const RoleIcons = {
  admin: ({ color = '#1e6b4f', size = 28 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
        stroke={color}
        strokeWidth="1.8"
      />
      <Circle cx="12" cy="11" r="3" stroke={color} strokeWidth="1.8" />
      <Path
        d="M7 19.5C7.83 17.5 9.79 16 12 16s4.17 1.5 5 3.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  ),

  teacher: ({ color = '#2563eb', size = 28 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <Path
        d="M5 13.18V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  ),

  student: ({ color = '#f97316', size = 28 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        stroke={color}
        strokeWidth="1.8"
      />
      <Path
        d="M9 13l3 3 5-5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  principal: ({ color = '#7c3aed', size = 28 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
      <Path
        d="M8 14l-2 7h12l-2-7"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <Path d="M12 14l1.5 3-1.5 1-1.5-1 1.5-3z" fill={color} />
      <Path d="M10 21l2-2 2 2" stroke={color} strokeWidth="1.5" />
    </Svg>
  ),

  staff: ({ color = '#f97316', size = 28 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
        fill={color}
      />
    </Svg>
  ),

  parent: ({ color = '#f97316', size = 28 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
        fill={color}
      />
    </Svg>
  ),
};

const roleMap: Record<string, keyof typeof RoleIcons> = {
  admin: 'admin',
  administrator: 'admin',
  teacher: 'teacher',
  principal: 'principal',
  student: 'student',
  staff: 'staff',
  parent: 'parent',
};

const colorMap: Record<string, string> = {
  admin: '#1e6b4f',
  administrator: '#1e6b4f',
  teacher: '#2563eb',
  principal: '#7c3aed',
  student: '#f97316',
  staff: '#f97316',
  parent: '#f97316',
};

export const getRoleIcon = (roleName?: string) => {
  if (!roleName) return null;
  const key = roleName.toLowerCase().trim();
  const mapped = roleMap[key];
  return mapped ? RoleIcons[mapped] : null;
};

export const getRoleColor = (roleName?: string): string => {
  if (!roleName) return '#666666';
  const key = roleName.toLowerCase().trim();
  return colorMap[key] || '#666666';
};

export default { RoleIcons, getRoleIcon, getRoleColor };