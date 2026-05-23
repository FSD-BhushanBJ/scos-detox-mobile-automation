const BASE_URL = "https://scos-backend-9bxv.onrender.com";

export const apiLogin = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("API ERROR:", error);
    return { success: false, message: "Network error" };
  }
};