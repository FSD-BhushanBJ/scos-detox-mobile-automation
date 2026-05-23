import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },

  changeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  backArrow: {
    fontSize: 16,
    marginRight: 6,
  },

  changeText: {
    fontSize: 14,
    fontWeight: "500",
  },

  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    fontWeight: "600",
  },

  instituteCard: {
    marginTop: 20,
    backgroundColor: "#DBEAFE",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  instLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  instName: {
    fontWeight: "600",
    fontSize: 14,
  },

  instLocation: {
    fontSize: 12,
    color: "#6B7280",
  },

  settings: {
    fontSize: 18,
  },

  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    marginTop: 4,
  },

  roleList: {
    marginTop: 20,
    gap: 12,
  },

  roleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  roleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  icon: {
    fontSize: 20,
  },

  roleTitle: {
    fontWeight: "600",
    fontSize: 14,
  },

  roleDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  arrow: {
    fontSize: 18,
    color: "#9CA3AF",
  },

  help: {
    marginTop: 30,
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
  },
});