import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 16,
  },

  search: {
    height: 48,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  location: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  right: {
    alignItems: "flex-end",
  },

  type: {
    fontSize: 12,
    color: "#6B7280",
  },

  arrow: {
    fontSize: 18,
    color: "#9CA3AF",
    marginTop: 4,
  },

  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#6B7280",
    marginTop: 10,
  },
});