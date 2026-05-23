const BASE_URL = "https://scos-backend-9bxv.onrender.com";

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Sending:", { email, password });

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.log("ERROR:", error);
    return { success: false, message: "Network error" };
  }
};