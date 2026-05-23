import React from 'react';
import { StyleSheet, Text } from 'react-native';

/**
 * HighlightText — wraps a run of text in a coloured highlight span.
 *
 * Props:
 *  - text      (string)  full sentence
 *  - highlight (string)  substring to highlight
 *  - color     (string)  highlight colour, default '#2563EB'
 *  - style     (object)  additional style for the outer Text
 */
export default function HighlightText({
  text = '',
  highlight = '',
  color = '#2563EB',
  style,
}) {
  const needle = String(highlight || '').trim();
  const highlightStyle = React.useMemo(
    () => [styles.highlight, { color }],
    [color],
  );

  if (!needle) {
    return <Text style={style}>{text}</Text>;
  }

  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = String(text || '').split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <Text style={style}>
      {parts.map((part, index) =>
        part.toLowerCase() === needle.toLowerCase() ? (
          <Text key={index} style={highlightStyle}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});
