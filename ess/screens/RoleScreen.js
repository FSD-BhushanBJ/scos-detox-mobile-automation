import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/roleStyles";
import { ROLE } from "../constants/strings";
import { setItem } from "../utils/storage";

const roleConfig = {
  Admin: ROLE.roles.admin,
  Teacher: ROLE.roles.teacher,
  Staff: { title: "Staff", desc: "Administrative support" },
  Principal: { title: "Principal", desc: "Institute oversight" },
  Parent: { title: "Parent", desc: "Child progress" },
  Student: ROLE.roles.student,
};

export default function RoleScreen({ route, navigation }) {
  const user = route?.params?.user;
  const institute = route?.params?.institute;

  // roles from selected institute
  const roles = institute?.roles || [];

  const handleRoleSelect = (role) => {
    setItem("selectedRole", role);
    navigation.navigate("Dashboard", {
      user,
      institute,
      role,
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.changeText}>{ROLE.changeInstitute}</Text>
        </TouchableOpacity>

        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>NR</Text>
        </View>
      </View>

      {/* INSTITUTE CARD */}
      <View style={styles.instituteCard}>
        <View style={styles.instLeft}>
          <Image
            source={require("../assets/InstituteLogo/Northpark.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.instName}>
              {institute?.name || "North Park Academy"}
            </Text>
            <Text style={styles.instLocation}>
              📍 {institute?.location || "Mumbai, Maharashtra"}
            </Text>
          </View>
        </View>

        <Text style={styles.settings}>⚙️</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{ROLE.chooseRole}</Text>
      <Text style={styles.subtitle}>
        {ROLE.subtitle.replace("North Park Academy", institute?.name || "your institute")}
      </Text>

      {/* ROLE LIST */}
      <View style={styles.roleList}>
        {roles.length === 0 ? (
          <Text style={styles.help}>No roles found for this institute.</Text>
        ) : (
          roles.map(role => {
            const config = roleConfig[role] || {
              title: role,
              desc: "Access the system",
            };

            return (
              <TouchableOpacity
                key={role}
                style={styles.roleCard}
                onPress={() => handleRoleSelect(role)}
              >
                <View style={styles.roleLeft}>
                  <Text style={styles.icon}>•</Text>
                  <View>
                    <Text style={styles.roleTitle}>{config.title}</Text>
                    <Text style={styles.roleDesc}>{config.desc}</Text>
                  </View>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* FOOTER */}
      <Text style={styles.help}>{ROLE.help}</Text>
    </View>
  );
}
