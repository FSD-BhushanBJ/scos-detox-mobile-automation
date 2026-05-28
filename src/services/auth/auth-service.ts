import {
  clearTokens,
  loginApi,
  setAccessToken,
} from '../api-service';

const asArray = (value: unknown): any[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const getInstituteRows = (res: any): any[] => [
  ...asArray(res?.institutes),
  ...asArray(res?.data?.institutes),
  ...asArray(res?.user?.institutes),
  ...asArray(res?.user_institute_roles),
  ...asArray(res?.data?.user_institute_roles),
  ...asArray(res?.user?.user_institute_roles),
  ...asArray(res?.institute_roles),
  ...asArray(res?.data?.institute_roles),
];

export async function login(
  emailOrPhone: string,
  password: string,
) {
  const res: any = await loginApi(
    emailOrPhone.trim(),
    password,
  );

  console.log(
    "LOGIN RAW =>",
    JSON.stringify(
      res,
      null,
      2
    )
  );

  if (!res?.token) {
    throw new Error(
      res?.message || "Login failed"
    );
  }

  await clearTokens();

  await setAccessToken(res.token);

  const institutesData = getInstituteRows(res);

  console.log(
    "INSTITUTES FROM API =>",
    JSON.stringify(
      institutesData,
      null,
      2
    )
  );

  return {
    token: res.token,

    user: res.user,

    institutes: institutesData
  };
}

export async function finalizeContext(_payload?: {
  tenant_id: string;
  institute_id: string;
  role_id: string;
}) {
  return true;
}
// /**
//  * @file auth-service.ts
//  * @module services/auth/auth-service
//  * @description Updated to match your sir's backend response format
//  */

// import {
//   clearTokens,
//   getMyInstitutesRoles,
//   loginApi,
//   selectContext,
//   setAccessToken,
//   setPreContextToken,
// } from '../api-service';

// interface SelectContextPayload {
//   tenant_id: string;
//   institute_id: string;
//   role_id: string;
// }

// /**
//  * Exchanges pre_context_token for access_token and persists it.
//  */
// export async function finalizeContext(
//   payload: SelectContextPayload,
// ): Promise<string> {
//   const res = (await selectContext(payload)) as { access_token: string };

//   await clearTokens();
//   await setAccessToken(res.access_token);

//   return res.access_token;
// }

// /**
//  * Email + password login.
//  * ✅ UPDATED: Now handles your sir's backend response format correctly
//  */
// /**
//  * Email + password login.
//  * ✅ NOW RETURNS: institutes and flow data
//  */
// export async function login(
//   emailOrPhone: string,
//   password: string,
// ): Promise<{
//   user: unknown;
//   preContextToken: string;
//   institutes?: any[];
//   flow?: string;
// }> {

//   const loginRes = (await loginApi(
//     emailOrPhone.trim(),
//     password,
//   )) as {
//     success?: boolean;
//     message?: string;
//     token?: string;
//     user?: {
//       id: number;
//       name: string;
//       email: string;
//       [key: string]: unknown;
//     };
//     institutes?: any[];
//     flow?: string;
//     [key: string]: unknown;
//   };

//   console.log('[auth-service] login raw response:', JSON.stringify(loginRes));
//   console.log('FULL LOGIN RESPONSE =>', loginRes);

//   // Check for token in response
//   if (!loginRes?.token) {
//     console.warn('[auth-service] token missing. Response keys:', Object.keys(loginRes ?? {}));
//     throw new Error(
//       typeof loginRes?.message === 'string'
//         ? loginRes.message
//         : 'Invalid credentials',
//     );
//   }

//   // Check for user data
//   if (!loginRes?.user) {
//     throw new Error('User data missing from response');
//   }

//   // Clear old tokens
//   await clearTokens();

//   // Save final access token directly
//   await setAccessToken(loginRes.token);

//   // Optional: keep compatibility with old flow
//   await setPreContextToken(loginRes.token);

//   // ✅ FIXED: Now returning institutes and flow!
//   return {
//     user: loginRes.user,
//     preContextToken: loginRes.token,
//     institutes: loginRes.institutes,  // ← ADD THIS
//     flow: loginRes.flow,              // ← ADD THIS
//   };
// }

// /**
//  * Fetch institutes + roles for logged-in user.
//  */
// export async function fetchInstitutes(): Promise<unknown[]> {

//   console.log(
//     '[auth-service] fetchInstitutes skipped for custom backend',
//   );

//   return [];
// }

// /**
//  * Higher-level context selection
//  * (pre_context_token -> access_token).
//  */
// export async function selectUserContext(
//   payload: SelectContextPayload,
// ): Promise<string> {

//   return finalizeContext(payload);
// }
