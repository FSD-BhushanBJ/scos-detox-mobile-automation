/**
 * @file useAuthFlow.ts
 * @module hooks/useAuthFlow
 * @description UPDATED to handle your sir's backend response format
 */

import { useState } from 'react';
import { STRINGS } from '../constants/strings';
import { useAuth, Institute, Role } from './useAuth';
import { login } from '../services/auth/auth-service';
import { mapAuthError, isNetworkError } from '../utils/error-mapper';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AuthMode = 'input' | 'otp' | 'password';

export type InputType = 'empty' | 'phone' | 'email';

export type NextRoute =
  | 'Dashboard'
  | 'RoleSelect'
  | 'InstituteSelect'
  | null;

interface NextRouteParams {
  institute?: Institute;
  [key: string]: unknown;
}

export interface AuthFlowState {
  rawInput: string;
  password: string;
  otp: string[];
  mode: AuthMode;
  inputType: InputType;
  loading: boolean;
  error: string;
  isNetworkError: boolean;
  nextRoute: NextRoute;
  nextRouteParams: NextRouteParams | null;

  setPassword: (value: string) => void;
  setError: (value: string) => void;

  handleInputChange: (value: string) => void;
  handleSendCode: () => Promise<void>;
  handleUsePassword: () => void;
  handleVerifyOtp: () => Promise<void>;
  handlePasswordLogin: () => Promise<void>;
  handleResendCode: () => Promise<void>;
  handleOtpChange: (index: number, digit: string) => void;
  handleBack: () => void;
  clearNextRoute: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EMPTY_OTP: string[] = ['', '', '', '', '', ''];

// ---------------------------------------------------------------------------
// Input type detection
// ---------------------------------------------------------------------------

const detectInputType = (value: string): InputType => {
  if (!value || value.trim() === '') return 'empty';
  if (/[a-zA-Z@._\-+]/.test(value)) return 'email';
  if (/^\d+$/.test(value)) return 'phone';
  return 'empty';
};

const asString = (value: unknown): string | undefined => {
  if (value === null || value === undefined || value === '') return undefined;
  return String(value);
};

const toArray = (value: unknown): any[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const getInstituteId = (inst: any): string | undefined =>
  asString(
    inst?.institute_id ||
    inst?.institute?.institute_id ||
    inst?.institute?.id ||
    inst?.id,
  );

const getRoleSources = (inst: any): any[] => [
  ...toArray(inst?.roles),
  ...toArray(inst?.user_institute_roles),
  ...toArray(inst?.user_roles),
  ...toArray(inst?.roles_data),
  ...toArray(inst?.institute_roles),
  ...toArray(inst?.role),
  ...toArray(inst?.user_role),
  ...toArray(inst?.role_data),
  ...toArray(inst?.institute_role),
  ...(inst?.role_id || inst?.roleId || inst?.role_name ? [inst] : []),
].filter(Boolean);

const normalizeRole = (source: any): Role | null => {
  const role = source?.role || source?.user_role || source?.role_data || source;
  const roleId = asString(
    role?.role_id ||
    role?.id ||
    role?.user_role_id ||
    source?.role_id ||
    source?.roleId,
  );

  if (!roleId) return null;

  const roleName =
    role?.role_name ||
    role?.name ||
    role?.code ||
    source?.role_name ||
    source?.role_title ||
    'Student';

  return {
    ...role,
    role_id: roleId,
    role_name: roleName,
    name: role?.name || roleName,
    icon_name: role?.icon_name || source?.icon_name || source?.role_icon,
    role_icon: role?.role_icon || source?.role_icon || source?.icon_name,
    icon_color: role?.icon_color || source?.icon_color || source?.role_icon_color,
    role_icon_color:
      role?.role_icon_color || source?.role_icon_color || source?.icon_color,
    description:
      role?.description || source?.description || source?.role_description,
    role_description:
      role?.role_description || source?.role_description || source?.description,
  };
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export const useAuthFlow = (): AuthFlowState => {

  const {
    setUser,
    setInstitutes,
    setSelectedInstitute,
    setSelectedRole,
  } = useAuth();

  const [rawInput, setRawInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(EMPTY_OTP);
  const [mode, setMode] = useState<AuthMode>('input');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [networkError, setNetworkError] = useState<boolean>(false);

  const [nextRoute, setNextRoute] =
    useState<NextRoute>(null);

  const [nextRouteParams, setNextRouteParams] =
    useState<NextRouteParams | null>(null);

  const inputType: InputType =
    detectInputType(rawInput);

  // -------------------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------------------

  const clearNextRoute = (): void => {
    setNextRoute(null);
    setNextRouteParams(null);
  };

  // -------------------------------------------------------------------------
  // Input
  // -------------------------------------------------------------------------

  const handleInputChange = (value: string): void => {
    setRawInput(value);
    setError('');
    setNetworkError(false);

    if (!value || value.trim() === '') {
      setMode('input');
    }
  };

  // -------------------------------------------------------------------------
  // Password Login
  // UPDATED: Now handles flow: "institute_selection" correctly
  // -------------------------------------------------------------------------

  const handlePasswordLogin = async (): Promise<void> => {

    if (!password.trim()) {
      setError(STRINGS.ERR_EMPTY_PASSWORD);
      return;
    }

    setLoading(true);
    setError('');
    setNetworkError(false);

    try {

      const loginRes: any = await login(
        rawInput.trim(),
        password,
      );

      console.log(
        "RAW LOGIN DATA =>",
        JSON.stringify(
          loginRes,
          null,
          2


        ));
      console.log(
        'FULL LOGIN RESPONSE =>',
        JSON.stringify(
          loginRes,
          null,
          2
        ));
      console.log(
        "RAW INSTITUTES",
        JSON.stringify(
          loginRes.institutes,
          null,
          2
        )
      );

      await setUser(loginRes.user);

      const instituteMap = new Map();

      (loginRes.institutes || []).forEach(
        (inst: any) => {

          console.log(
            "SINGLE INSTITUTE =>",
            JSON.stringify(
              inst,
              null,
              2
            )
          );

          const instituteId = getInstituteId(inst);

          if (!instituteId) {
            console.warn(
              'Skipping institute without id:',
              JSON.stringify(inst),
            );
            return;
          }

          if (
            !instituteMap.has(
              instituteId
            )
          ) {

            instituteMap.set(
              instituteId,
              {
                tenant_id:
                  String(
                    inst.tenant_id ||
                    inst.institute?.tenant_id ||
                    instituteId
                  ),

                institute_id:
                  instituteId,

                name:
                  inst.name ||
                  inst.institute_name ||
                  inst.institute?.name ||
                  inst.institute?.institute_name ||
                  "Unknown Institute",

                city:
                  inst.city ||
                  inst.institute_city ||
                  inst.institute?.city ||
                  inst.institute?.institute_city ||
                  "",

                state:
                  inst.state ||
                  inst.institute_state ||
                  inst.institute?.state ||
                  inst.institute?.institute_state ||
                  "",

                type:
                  inst.type ||
                  inst.institute_type ||
                  inst.institute?.type ||
                  inst.institute?.institute_type ||
                  "School",

                subtype:
                  inst.subtype ||
                  "",

                roles: []
              }
            );

          }

          const institute =
            instituteMap.get(
              instituteId
            );

          const rolesArray = getRoleSources(inst);

          console.log(
            "ROLES ARRAY =>",
            JSON.stringify(
              rolesArray,
              null,
              2
            )
          );
          console.log(
            "FULL INST OBJECT =>",
            JSON.stringify(
              inst,
              null,
              2
            )
          );
          rolesArray.forEach((roleSource: any) => {
            const role = normalizeRole(roleSource);

            if (!role) return;

            const exists =
              institute.roles.some(
                (r: any) =>
                  r.role_id === role.role_id
              );

            if (!exists) {
              institute.roles.push(role);
            }
          });

        });

      const institutesData: Institute[] =
        Array.from(
          instituteMap.values()
        );
      console.log(
        "FINAL INSTITUTES =>",
        JSON.stringify(
          institutesData,
          null,
          2
        ));

      await setInstitutes(
        institutesData
      );
      console.log(
        'INSTITUTES DATA:',
        JSON.stringify(
          institutesData,
          null,
          2
        ));

      // ---------- navigation logic ----------

      if (institutesData.length === 0) {

        setError(
          "No institute assigned"
        );

        return;
      }

      if (institutesData.length === 1) {

        const institute =
          institutesData[0];

        await setSelectedInstitute(
          institute
        );

        if (
          institute.roles &&
          institute.roles.length === 1
        ) {

          await setSelectedRole(
            institute.roles[0]
          );

          setNextRoute(
            'Dashboard'
          );

        } else {

          setNextRoute(
            'RoleSelect'
          );

          setNextRouteParams({
            institute
          });

        }

      } else {

        setNextRoute(
          'InstituteSelect'
        );

      }

    }
    catch (err) {

      console.log(
        'LOGIN FLOW ERROR',
        err
      );

      setNetworkError(
        isNetworkError(err)
      );

      setError(
        mapAuthError(err)
        || STRINGS.ERR_GENERIC
      );

      setPassword('');

    }
    finally {

      setLoading(false);

    }

  };

  // -------------------------------------------------------------------------
  // OTP (not connected yet)
  // -------------------------------------------------------------------------

  const handleSendCode = async (): Promise<void> => {

    if (!rawInput.trim()) {
      setError(STRINGS.ERR_EMPTY_INPUT);
      return;
    }

    setLoading(true);
    setError('');

    try {

      setMode('otp');

    } catch (err) {

      setError(
        mapAuthError(err) || STRINGS.ERR_GENERIC,
      );

    } finally {

      setLoading(false);

    }
  };

  const handleVerifyOtp = async (): Promise<void> => {

    const code = otp.join('');

    if (code.length < EMPTY_OTP.length) {
      setError(STRINGS.ERR_INVALID_OTP);
      return;
    }

    setLoading(true);
    setError('');

    try {

      setError(
        'OTP verified! (mock — real API not connected yet)',
      );

    } catch (err) {

      setError(
        mapAuthError(err) || STRINGS.ERR_GENERIC,
      );

    } finally {

      setLoading(false);

    }
  };

  // -------------------------------------------------------------------------
  // Mode
  // -------------------------------------------------------------------------

  const handleUsePassword = (): void => {
    setError('');
    setMode('password');
  };

  const handleResendCode = async (): Promise<void> => {
    setOtp(EMPTY_OTP);
    setError('');
    await handleSendCode();
  };

  const handleBack = (): void => {
    setMode('input');
    setOtp(EMPTY_OTP);
    setPassword('');
    setError('');
    setNetworkError(false);
  };

  // -------------------------------------------------------------------------
  // OTP change
  // -------------------------------------------------------------------------

  const handleOtpChange = (
    index: number,
    digit: string,
  ): void => {

    const updated = [...otp];

    updated[index] = digit;

    setOtp(updated);
  };

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  return {
    rawInput,
    password,
    otp,
    mode,
    inputType,
    loading,
    error,
    isNetworkError: networkError,
    nextRoute,
    nextRouteParams,

    setPassword,
    setError,

    handleInputChange,
    handleSendCode,
    handleUsePassword,
    handleVerifyOtp,
    handlePasswordLogin,
    handleResendCode,
    handleOtpChange,
    handleBack,
    clearNextRoute,
  };
};
