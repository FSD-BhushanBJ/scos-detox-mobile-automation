const STRINGS = {
  appName: "MentrixOS",

  subtitleLine1: "MentrixOS = ",
  mentor: "Mentor",
  matrix: "Matrix",
  metrics: "Metrics",

  description:
    "combined into one Operating System for your institute",

  inputPlaceholder: "Phone or Email",
  phonePlaceholder: "Enter phone number",
  passwordPlaceholder: "Password",

  sendCode: "Send Code",
  usePassword: "Use Password",
  continue: "Continue",

  enterOTP: "Enter 6-digit code",
  resend: "Didn’t get Code?",
  resendCode: "Resend Code",

  forgotPassword: "Forgot Password",

  joinInstitute: "Join Institute",

  footerTitle: "Easy-to-Use, End-to-End",
  footerSub: "Smart AI SaaS for Your Institute",

  setupLine: "Don’t have an institute yet?",
  setupBtn: "Setup Institute →",

  terms: "By continuing, you agree to our",
  policy: "Terms & Privacy Policy",

  back: "← Back",
};

export const INSTITUTE = {
  greeting: "Hi, {{name}}! 👋",
  subtitle: "Select your institute to access your personalized dashboard",
  searchPlaceholder: "Search institute",
  footer:
    "Can't find your institute? Contact your institute administrator or email us at support@mentrixos.com",
};

export const DASHBOARD = {
  title: "Welcome to MentrixOS",
  subtitle: "Panel !",

  active: "Active Institutes",
  inactive: "Inactive Institutes",
  modules: "Total Modules",
  users: "Total Users",

  activeDesc:
    "Institutes actively operating and using the platform for daily management",
  inactiveDesc:
    "Institutes currently inactive and not participating in system operations",
  modulesDesc:
    "Complete set of features enabling academic and administrative workflows",
  usersDesc:
    "All registered users across institutes using the platform services",
};

export const ROLE = {
  changeInstitute: "Change Institute",
  chooseRole: "Choose Your Role",
  subtitle: "Select how you’d like to access North Park Academy",

  roles: {
    admin: {
      title: "Administrator",
      desc: "Full system access",
    },
    teacher: {
      title: "Teacher",
      desc: "Class & grading",
    },
    student: {
      title: "Student",
      desc: "Access the system",
    },
  },

  help:
    "Can’t find your role? Contact your institute administrator or email us at support@mentrixos.com",
};
export default STRINGS;