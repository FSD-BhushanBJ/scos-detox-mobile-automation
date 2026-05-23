import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/instituteStyles";
import HighlightText from "./HighlightText";

export default function InstituteCard({ item, onPress, search = "" }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.left}>
        <Image source={item.logo} style={styles.logo} />
        <View>
          <HighlightText text={item.name} highlight={search} style={styles.name} />
          <HighlightText
            text={`Pin ${item.location || "India"}`}
            highlight={search}
            style={styles.location}
          />
        </View>
      </View>

      <View style={styles.right}>
        <HighlightText text={item.type || ""} highlight={search} style={styles.type} />
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}
