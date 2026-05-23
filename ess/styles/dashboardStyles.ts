import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
  },

  menuBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  menu: {
    fontSize: 18,
  },

  logo: {
    fontSize: 18,
    fontWeight: "700",
  },

  blue: {
    color: "#2563EB",
  },

  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#fff",
    fontWeight: "700",
  },

  titleWrap: {
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
  },

  cardBlue: {
    backgroundColor: "#DDE7F7",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardGreen: {
    backgroundColor: "#D7F0E3",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardYellow: {
    backgroundColor: "#F4E7B5",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardPurple: {
    backgroundColor: "#E5DDF7",
    padding: 16,
    borderRadius: 16,
  },

  numberBlue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  numberGreen: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16A34A",
  },

  numberYellow: {
    fontSize: 22,
    fontWeight: "700",
    color: "#EA580C",
  },

  numberPurple: {
    fontSize: 22,
    fontWeight: "700",
    color: "#7C3AED",
  },

  cardTitle: {
    marginTop: 6,
    fontWeight: "600",
    color: "#111827",
  },

  cardDesc: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
});

export default styles;