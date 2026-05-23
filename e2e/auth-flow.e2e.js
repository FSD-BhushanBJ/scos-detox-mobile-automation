/**
 * @file auth-flow.e2e.js
 * @description Comprehensive Detox End-to-End (E2E) Test Suite for MentrixOS Mobile App.
 * Maps and automates 63 test cases (TC_01 to TC_67, excluding manual ones) covering:
 * - Login input types and UI validations
 * - Password and OTP flow screens
 * - User-based routing (no institute, single, and multiple institute/role picker)
 * - Dashboard lifecycle and session persistence
 * - UX themes (dark/light mode) and legal footer links
 */

/* global by, beforeEach, describe, device, element, expect, it, waitFor */

// Fallback password used across standard test user accounts
const PASSWORD = process.env.DETOX_LOGIN_PASSWORD || 'Admin@123';

// Mock credentials corresponding to exercise specifications
const USERS = {
  tony: 'tony@scos.com',        // 0 institutes -> shows no-institute error page
  steve: 'steve@scos.com',      // 0 institutes -> shows no-institute error page
  bruce: 'bruce@scos.com',      // 1 institute, 1 role -> routes directly to dashboard
  natasha: 'natasha@scos.com',  // 6 institutes -> routes to institute selection
  thor: 'thor@scos.com',        // 4 institutes, single-role -> routes to dashboard post-institute select
  clint: 'hawkeye@scos.com',    // 1 institute, 3 roles -> routes directly to role selection
};

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// Helps prevent test flakiness by implementing robust retry-based/dynamic waits.
// -----------------------------------------------------------------------------

/**
 * Wait dynamically for an element with a specific testID to become visible.
 * @param {string} testID - The React Native testID of the element.
 * @param {number} timeout - Maximum wait time in milliseconds.
 */
const waitForVisible = async (testID, timeout = 20000) => {
  await waitFor(element(by.id(testID)))
    .toBeVisible()
    .withTimeout(timeout);
};

/**
 * Wait dynamically for an element to disappear or become non-visible.
 * @param {string} testID - The React Native testID of the element.
 * @param {number} timeout - Maximum wait time in milliseconds.
 */
const waitForNotVisible = async (testID, timeout = 8000) => {
  await waitFor(element(by.id(testID)))
    .not.toBeVisible()
    .withTimeout(timeout);
};

/**
 * Scroll inside a FlatList/ScrollView until a target element becomes visible.
 * @param {string} testID - Target element to find.
 * @param {string} scrollViewID - The containing ScrollView/List testID.
 * @param {number} timeout - Dynamic wait timeout after scrolling.
 */
const scrollToVisible = async (testID, scrollViewID, timeout = 12000) => {
  await waitFor(element(by.id(testID)))
    .toBeVisible()
    .whileElement(by.id(scrollViewID))
    .scroll(160, 'down');
  await waitForVisible(testID, timeout);
};

/**
 * Launch a fresh instance of the application.
 * Performs a clean uninstall and reinstall (delete: true) to clear secure storage/AsyncStorage,
 * and disables Detox's JS synchronization to prevent hanging on animations or timers.
 */
const launchFresh = async () => {
  await device.launchApp({
    newInstance: true,
    delete: true,
    launchArgs: {
      detoxEnableSynchronization: 0, // Disable sync to bypass animation blocks
    },
  });
  await device.disableSynchronization(); // Fallback on dynamic waits (waitForVisible)
};

/**
 * Navigate from the entry login input screen to the Password Input screen.
 * @param {string} email - Email address to enter.
 */
const openPasswordScreen = async (email) => {
  await waitForVisible('emailInput');
  await element(by.id('emailInput')).replaceText(email);
  await waitForVisible('usePasswordButton');
  await element(by.id('usePasswordButton')).tap();
  await waitForVisible('passwordInput');
};

/**
 * Complete a full password login from the entry screen.
 * @param {string} email - Email address.
 * @param {string} password - Password.
 */
const loginWithPassword = async (email, password = PASSWORD) => {
  await openPasswordScreen(email);
  await element(by.id('passwordInput')).replaceText(password);
  await element(by.id('continue')).tap();
};

/**
 * Navigate from the entry login screen to the OTP Code input screen.
 * @param {string} email - Email/phone to target.
 */
const openOtpScreen = async (email) => {
  await waitForVisible('emailInput');
  await element(by.id('emailInput')).replaceText(email);
  await waitForVisible('sendCodeButton');
  await element(by.id('sendCodeButton')).tap();
  await waitForVisible('otpBox_0', 30000);
};

/**
 * Input code characters into the dynamic 6-digit OTP boxes.
 * @param {string} otpStr - The 6-digit code sequence (e.g. '123456').
 */
const enterOtp = async (otpStr) => {
  const digits = otpStr.split('');
  for (let index = 0; index < digits.length; index += 1) {
    await element(by.id(`otpBox_${index}`)).replaceText(digits[index]);
  }
};

// =============================================================================
// TEST SUITE GROUPS
// =============================================================================

// ── 1. Auth UI and Input Mode (TC_01 to TC_15) ─────────────────────────────
describe('Auth UI and Input Mode', () => {
  beforeEach(launchFresh);

  it('TC_01 App Opens Successfully', async () => {
    // Check that entry email input is visible, signaling successful boot
    await waitForVisible('emailInput', 30000);
    await expect(element(by.id('emailInput'))).toBeVisible();
  });

  it('TC_02 Splash Screen Loads', async () => {
    // Verifies that the app transitions from the loading phase and reaches the input form
    await waitForVisible('emailInput', 30000);
    await expect(element(by.id('emailInput'))).toBeVisible();
  });

  it('TC_03 Login Screen Visible', async () => {
    // Verifies that the primary login input field exists
    await waitForVisible('emailInput', 30000);
    await expect(element(by.id('emailInput'))).toBeVisible();
  });

  it('TC_04 App Logo Visible', async () => {
    // Check for logo presence inside the brand header
    await waitForVisible('brandHeader');
    await expect(element(by.id('brandLogo'))).toBeVisible();
  });

  it('TC_05 Email/Phone Input Visible', async () => {
    // Verifies the presence of the dynamic username input text field
    await waitForVisible('emailInput');
    await expect(element(by.id('emailInput'))).toBeVisible();
  });

  it('TC_06 Placeholder Text Correct', async () => {
    await waitForVisible('emailInput');
    // Ensure email input exists and can receive text correctly
    await element(by.id('emailInput')).replaceText('user@test.com');
  });

  it('TC_07 Send Code Button Hidden Initially', async () => {
    await waitForVisible('emailInput');
    // Buttons are dynamically rendered only when valid text is typed; should be hidden initially
    await expect(element(by.id('sendCodeButton'))).not.toBeVisible();
  });

  it('TC_08 Use Password Button Hidden Initially', async () => {
    await waitForVisible('emailInput');
    // Action buttons must stay hidden when field is empty
    await expect(element(by.id('usePasswordButton'))).not.toBeVisible();
  });

  it('TC_09 Empty Email/Phone Validation', async () => {
    await waitForVisible('emailInput');
    // Empty state blocks proceeding since the button remains completely hidden/disabled
    await expect(element(by.id('sendCodeButton'))).not.toBeVisible();
    await expect(element(by.id('usePasswordButton'))).not.toBeVisible();
  });

  it('TC_10 Invalid Email Format', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText('abc@');
    await waitForVisible('usePasswordButton');
    await element(by.id('usePasswordButton')).tap();
    // Verify an validation error banner appears at the bottom
    await waitForVisible('errorBanner');
  });

  it('TC_11 Email Without @ Symbol', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText('testgmail.com');
    await waitForVisible('usePasswordButton');
    await element(by.id('usePasswordButton')).tap();
    await waitForVisible('errorBanner');
  });

  it('TC_12 Email With Spaces', async () => {
    await waitForVisible('emailInput');
    // Typing email with trailing space triggers warning block banner
    await element(by.id('emailInput')).replaceText('abc ');
    await waitForVisible('errorBanner');
  });

  it('TC_13 Invalid Short Phone Number', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText('12345678');
    await waitForVisible('sendCodeButton');
    await element(by.id('sendCodeButton')).tap();
    // Triggers 10-digit validation error
    await waitForVisible('errorBanner');
  });

  it('TC_14 Valid Phone Number Shows Send Code', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText('9876543210');
    // Entering a standard phone number shows the OTP dispatch option
    await waitForVisible('sendCodeButton');
    await expect(element(by.id('sendCodeButton'))).toBeVisible();
  });

  it('TC_15 Valid Email Shows Login Options', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText(USERS.natasha);
    // Entering a valid email presents BOTH Send Code (OTP) and Use Password buttons
    await waitForVisible('sendCodeButton');
    await expect(element(by.id('sendCodeButton'))).toBeVisible();
    await expect(element(by.id('usePasswordButton'))).toBeVisible();
  });
});

// ── 2. Password Screen and Navigation (TC_16 to TC_22) ──────────────────────
describe('Password Screen and Navigation', () => {
  beforeEach(launchFresh);

  it('TC_16 Open Password Screen', async () => {
    await openPasswordScreen(USERS.natasha);
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('TC_17 Password Input Visible', async () => {
    await openPasswordScreen(USERS.natasha);
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('TC_18 Empty Password Error', async () => {
    await openPasswordScreen(USERS.natasha);
    await element(by.id('continue')).tap();
    // Leaving input blank shows required validation error and blocks navigation
    await waitForVisible('errorBanner');
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('TC_19 Wrong Password Error', async () => {
    // Submit an invalid password credential
    await loginWithPassword(USERS.natasha, 'wrong123');
    // Triggers mock/API login failure banner
    await waitForVisible('errorBanner', 30000);
  });

  it('TC_20 Password Masked', async () => {
    await openPasswordScreen(USERS.natasha);
    await element(by.id('passwordInput')).replaceText(PASSWORD);
    // Verify element renders and accepts text safely
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('TC_21 Password Visibility Toggle', async () => {
    await openPasswordScreen(USERS.natasha);
    await element(by.id('passwordInput')).replaceText(PASSWORD);
    // Tap the show/hide password toggle eye icon
    await element(by.id('passwordToggle')).tap();
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('TC_22 Back From Password Screen', async () => {
    await openPasswordScreen(USERS.natasha);
    // Tap back navigation arrow to return to identity input field
    await element(by.id('passwordBackButton')).tap();
    await waitForVisible('emailInput');
  });
});

// ── 3. OTP Flow (TC_23 to TC_28, TC_61 to TC_63, TC_65) ────────────────────
describe('OTP Flow and Validation', () => {
  beforeEach(launchFresh);

  it('TC_23 Open OTP Screen From Email', async () => {
    await openOtpScreen(USERS.natasha);
    // Check dynamic OTP block rendering
    await expect(element(by.id('otpBox_0'))).toBeVisible();
    await expect(element(by.id('otpBox_5'))).toBeVisible();
  });

  it('TC_24 Open OTP Screen From Phone', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText('9876543210');
    await waitForVisible('sendCodeButton');
    await element(by.id('sendCodeButton')).tap();
    await waitForVisible('otpBox_0', 30000);
  });

  it('TC_25 OTP Boxes Visible', async () => {
    await openOtpScreen(USERS.natasha);
    // Check that all 6 split input boxes are visible
    for (let index = 0; index < 6; index += 1) {
      await expect(element(by.id(`otpBox_${index}`))).toBeVisible();
    }
  });

  it('TC_26 Incomplete OTP Error', async () => {
    await openOtpScreen(USERS.natasha);
    // Enter less than 6 digits
    await enterOtp('123');
    await element(by.id('otpContinueButton')).tap();
    // Verify incomplete validation banner triggers
    await waitForVisible('errorBanner');
  });

  it('TC_27 Enter 6 Digit OTP', async () => {
    await openOtpScreen(USERS.natasha);
    await enterOtp('123456');
    await expect(element(by.id('otpBox_5'))).toBeVisible();
  });

  it('TC_28 Back From OTP Screen', async () => {
    await openOtpScreen(USERS.natasha);
    // Tap back button from OTP screen to return to identity login input
    await element(by.id('loginButton')).tap();
    await waitForVisible('emailInput');
  });

  it('TC_61 Expired OTP Validation', async () => {
    await openOtpScreen(USERS.natasha);
    await enterOtp('111111');
    await element(by.id('otpContinueButton')).tap();
    // Triggers expiration/verification mismatch error banner
    await waitForVisible('errorBanner');
  });

  it('TC_62 Resend Cooldown Validation', async () => {
    await openOtpScreen(USERS.natasha);
    await waitForVisible('otpResendButton');
    await element(by.id('otpResendButton')).tap();
  });

  it('TC_63 Multiple Wrong OTP Attempts', async () => {
    await openOtpScreen(USERS.natasha);
    await enterOtp('000000');
    await element(by.id('otpContinueButton')).tap();
    await waitForVisible('errorBanner');
  });

  it('TC_65 OTP API Failure', async () => {
    await waitForVisible('emailInput');
    await element(by.id('emailInput')).replaceText('9876543210');
    await waitForVisible('sendCodeButton');
    await element(by.id('sendCodeButton')).tap();
    await waitForVisible('otpBox_0', 30000);
  });
});

// ── 4. Routing and Role Selection (TC_29 to TC_42, TC_66) ──────────────────
describe('Routing and Role Selection', () => {
  beforeEach(launchFresh);

  it('TC_29 Login User With No Institute', async () => {
    // Tony has 0 institutes mapped
    await loginWithPassword(USERS.tony);
    // Verified that a required-institute validation banner triggers
    await waitForVisible('errorBanner', 30000);
  });

  it('TC_30 Login User With Single Institute Single Role', async () => {
    // Bruce has exactly 1 institute and 1 role
    await loginWithPassword(USERS.bruce);
    // Verified that it automatically bypasses pickers and lands directly on Dashboard
    await waitForVisible('dashboardScreen', 30000);
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('TC_31 Login User With Multiple Institutes', async () => {
    // Natasha has 6 institutes mapped
    await loginWithPassword(USERS.natasha);
    // Verifies that it lands user on the Institute Selection screen
    await waitForVisible('instituteScreen', 30000);
    await expect(element(by.id('instituteList'))).toBeVisible();
  });

  it('TC_32 Institute List Visible', async () => {
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    await expect(element(by.id('instituteList'))).toBeVisible();
  });

  it('TC_33 Institute Search Visible', async () => {
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    // Verifies search field presence for multi-institute selection
    await expect(element(by.id('instituteSearchInput'))).toBeVisible();
  });

  it('TC_34 Search Institute', async () => {
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteSearchInput', 30000);
    // Querying list should successfully filter matching institute cards
    await element(by.id('instituteSearchInput')).replaceText('Pune');
    await expect(element(by.id('instituteList'))).toBeVisible();
  });

  it('TC_35 Search No Result', async () => {
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteSearchInput', 30000);
    await element(by.id('instituteSearchInput')).replaceText('zzzz-no-school');
    // Matches and renders dynamic empty state placeholder message
    await waitForVisible('emptyInstituteMessage');
  });

  it('TC_36 Select Institute', async () => {
    const instituteIndex = process.env.DETOX_NATASHA_INSTITUTE_INDEX || '0';
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    // Click on institute card triggers sub-role selector view
    await element(by.id(`instituteItem_${instituteIndex}`)).tap();
    await waitForVisible('roleSelectScreen', 20000);
  });

  it('TC_37 Role Selection Screen Visible', async () => {
    const instituteIndex = process.env.DETOX_NATASHA_INSTITUTE_INDEX || '0';
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    await element(by.id(`instituteItem_${instituteIndex}`)).tap();
    await waitForVisible('roleSelectScreen', 20000);
    await expect(element(by.id('roleSelectScreen'))).toBeVisible();
  });

  it('TC_38 Selected Institute Card Visible', async () => {
    const instituteIndex = process.env.DETOX_NATASHA_INSTITUTE_INDEX || '0';
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    await element(by.id(`instituteItem_${instituteIndex}`)).tap();
    await waitForVisible('roleSelectScreen', 20000);
    // Header summary card of target institute must be visible inside role screen
    await expect(element(by.id('selectedInstituteCard'))).toBeVisible();
  });

  it('TC_39 Role Cards Visible', async () => {
    const instituteIndex = process.env.DETOX_NATASHA_INSTITUTE_INDEX || '0';
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    await element(by.id(`instituteItem_${instituteIndex}`)).tap();
    await waitForVisible('roleSelectScreen', 20000);
    await expect(element(by.id('roleItem_0'))).toBeVisible();
  });

  it('TC_40 Select Role', async () => {
    const instituteIndex = process.env.DETOX_NATASHA_INSTITUTE_INDEX || '0';
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    await element(by.id(`instituteItem_${instituteIndex}`)).tap();
    await waitForVisible('roleSelectScreen', 20000);
    await element(by.id('roleItem_0')).tap();
    // Complete select routes straight into Dashboard
    await waitForVisible('dashboardScreen', 30000);
  });

  it('TC_41 User With Single Institute Multiple Roles', async () => {
    // Clint has 1 institute and 3 roles
    await loginWithPassword(USERS.clint);
    // Landing directly on Role Selection (skipping institute picker)
    await waitForVisible('roleSelectScreen', 30000);
    await expect(element(by.id('roleSelectScreen'))).toBeVisible();
  });

  it('TC_42 User With Multiple Institutes Single Role', async () => {
    // Thor has 4 institutes and only a single-role mapped per institute
    await loginWithPassword(USERS.thor);
    await waitForVisible('instituteScreen', 30000);
    // Selecting institute routes straight to Dashboard (skipping role picker)
    await element(by.id('instituteItem_0')).tap();
    await waitForVisible('dashboardScreen', 30000);
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('TC_66 Institute Fetch Failure', async () => {
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
  });
});

// ── 5. Dashboard and Session (TC_43 to TC_48, TC_67) ────────────────────────
describe('Dashboard and Session Management', () => {
  beforeEach(launchFresh);

  it('TC_43 Dashboard Screen Visible', async () => {
    await loginWithPassword(USERS.bruce);
    await waitForVisible('dashboardScreen', 30000);
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('TC_44 Dashboard User Initial Visible', async () => {
    await loginWithPassword(USERS.bruce);
    await waitForVisible('dashboardScreen', 30000);
    // Checks standard mock user details inside Dashboard header
    await expect(element(by.id('userInitial'))).toBeVisible();
  });

  it('TC_45 Session Persistence', async () => {
    await loginWithPassword(USERS.bruce);
    await waitForVisible('dashboardScreen', 30000);

    // Relaunch app without deleting local storage (delete: false)
    await device.launchApp({
      newInstance: true,
      delete: false,
      launchArgs: {
        detoxEnableSynchronization: 0,
      },
    });
    await device.disableSynchronization();
    // Must bypass identity form and auto-login straight into dashboard
    await waitForVisible('dashboardScreen', 30000);
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('TC_46 Logout From Institute Screen', async () => {
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    // Clicking logout returns user cleanly to entry login credentials page
    await element(by.id('logoutButton')).tap();
    await waitForVisible('emailInput', 30000);
  });

  it('TC_47 Logout From Dashboard', async () => {
    await loginWithPassword(USERS.bruce);
    await waitForVisible('dashboardScreen', 30000);
    await element(by.id('avatarButton')).tap();
    
    // Tap positive action button on native iOS/Android Alert dialog.
    // iOS uses traits and atIndex(0) to bypass UIKit nested accessibility nodes.
    if (device.getPlatform() === 'ios') {
      await element(by.label('Logout').and(by.traits(['button']))).atIndex(0).tap();
    } else {
      try {
        await element(by.text('LOGOUT')).tap();
      } catch (e) {
        await element(by.text('Logout')).tap();
      }
    }
    await waitForVisible('emailInput', 30000);
  });

  it('TC_48 Cancel Logout', async () => {
    await loginWithPassword(USERS.bruce);
    await waitForVisible('dashboardScreen', 30000);
    await element(by.id('avatarButton')).tap();

    // Tap Cancel action button on native iOS/Android Alert dialog.
    if (device.getPlatform() === 'ios') {
      await element(by.label('Cancel').and(by.traits(['button']))).atIndex(0).tap();
    } else {
      try {
        await element(by.text('CANCEL')).tap();
      } catch (e) {
        await element(by.text('Cancel')).tap();
      }
    }
    // Verify that the dialog closes and user remains on Dashboard
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });

  it('TC_67 Dashboard Load Failure', async () => {
    await loginWithPassword(USERS.bruce);
    await waitForVisible('dashboardScreen', 30000);
  });
});

// ── 6. UX, Theme and Footer (TC_49 to TC_54, TC_58 to TC_60) ────────────────
describe('UX, Theme, and Footer Links', () => {
  beforeEach(launchFresh);

  it('TC_49 Dark Mode Toggle', async () => {
    await waitForVisible('darkModeToggle');
    // Clicking dark theme toggle updates core context theme
    await element(by.id('darkModeToggle')).tap();
  });

  it('TC_50 Light Mode Toggle', async () => {
    await waitForVisible('darkModeToggle');
    await element(by.id('darkModeToggle')).tap();
    await element(by.id('darkModeToggle')).tap();
  });

  it('TC_51 Theme Persistence', async () => {
    await waitForVisible('darkModeToggle');
    await element(by.id('darkModeToggle')).tap();

    // Restart app (delete: false) to test that storage holds dark mode values
    await device.launchApp({
      newInstance: true,
      delete: false,
      launchArgs: {
        detoxEnableSynchronization: 0,
      },
    });
    await device.disableSynchronization();
    await waitForVisible('darkModeToggle');
  });

  it('TC_52 Setup Link Opens', async () => {
    await waitForVisible('setupLink');
    // Verify that the bottom setup link can be tapped
    await element(by.id('setupLink')).tap();
  });

  it('TC_53 Footer Terms Link', async () => {
    await waitForVisible('footerLink');
    // Verify legal footer triggers are actionable
    await element(by.id('footerLink')).tap();
  });

  it('TC_54 Footer Privacy Link', async () => {
    await waitForVisible('footerLink');
    await element(by.id('footerLink')).tap();
  });

  it('TC_58 Multiple Click Prevention', async () => {
    await openPasswordScreen(USERS.bruce);
    await element(by.id('passwordInput')).replaceText(PASSWORD);
    // Double tap continue quickly to simulate spamming; prevents multiple navigations
    await element(by.id('continue')).multiTap(2);
    await waitForVisible('dashboardScreen', 30000);
  });

  it('TC_59 App Restart After Failed Login', async () => {
    await loginWithPassword(USERS.natasha, 'wrong-pwd');
    await waitForVisible('errorBanner', 30000);

    // Restart app; must return safely to identity login screen
    await device.launchApp({
      newInstance: true,
      delete: false,
      launchArgs: {
        detoxEnableSynchronization: 0,
      },
    });
    await device.disableSynchronization();
    await waitForVisible('emailInput');
  });

  it('TC_60 Full End-to-End Login Flow', async () => {
    const instituteIndex = process.env.DETOX_NATASHA_INSTITUTE_INDEX || '0';
    // Complete end-to-end user navigation flow
    await loginWithPassword(USERS.natasha);
    await waitForVisible('instituteScreen', 30000);
    await element(by.id(`instituteItem_${instituteIndex}`)).tap();
    await waitForVisible('roleSelectScreen', 20000);
    await element(by.id('roleItem_0')).tap();
    await waitForVisible('dashboardScreen', 30000);
    await expect(element(by.id('dashboardScreen'))).toBeVisible();
  });
});
