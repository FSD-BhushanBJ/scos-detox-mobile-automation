export const getNextScreen = (user: any) => {
  const institutes = user.institutes;

  if (!institutes || institutes.length === 0) {
    return "NO_INSTITUTE";
  }

  if (institutes.length === 1) {
    const roles = institutes[0].roles;

    if (roles.length === 1) {
      return "DASHBOARD";
    } else {
      return "ROLE_SELECTION";
    }
  }

  return "INSTITUTE_SELECTION";
};