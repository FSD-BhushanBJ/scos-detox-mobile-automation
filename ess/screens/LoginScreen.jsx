import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/loginStyles';
import STRINGS from '../constants/strings';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/authService';
import Loader from '../components/Loader';
import { setItem } from '../utils/storage';

// icons
import InfoIcon from '../assets/icons/warning.svg';
import MoonIcon from '../assets/icons/moon.svg';
import ScannerIcon from '../assets/icons/scanner.svg';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [password, setPassword] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (loading) return;

    if (!input || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loginUser(input, password);

      if (!res.success) {
        setError(res.message || 'Invalid credentials');
        return;
      }

      const user = res.user;
      setItem('token', res.token || `mock-token-${Date.now()}`);
      setItem('user', user);

      if (user.institutes.length === 0) {
        setError('Not associated with any institute');
        return;
      }

      if (user.institutes.length > 1) {
        navigation.navigate('Institute', {
          user,
          institutes: user.institutes,
        });
        return;
      }

      const institute = user.institutes[0];
      setItem('selectedInstitute', institute);

      if (institute.roles.length === 1) {
        setItem('selectedRole', institute.roles[0]);
        navigation.navigate('Dashboard', {
          user,
          institute,
          role: institute.roles[0],
        });
        return;
      }

      navigation.navigate('Role', {
        user,
        institute,
      });
    } catch (e) {
      setError('Unable to login. Please check internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  // TIMER
  useEffect(() => {
    let interval;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsTimerActive(false);
      setShowOTP(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // TYPE DETECTION
  const isNumber = /^[0-9]+$/.test(input);
  const isPhone = isNumber && input.length > 0;
  const isValidPhone = isNumber && input.length === 10;
  const isEmail = input.includes('@');
  const sendCodeButtonStyle = [
    styles.fullBtn,
    !isValidPhone && styles.disabledButton,
  ];
  const resendLinkStyle = [styles.link, timer > 0 && styles.disabledLink];
  const loginButtonStyle = [styles.fullBtn, loading && styles.loadingButton];

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      {/* TOP ICONS */}
      <View style={styles.topIcons}>
        <View style={styles.iconBox}>
          <InfoIcon width={18} height={18} />
        </View>
        <View style={styles.iconBox}>
          <MoonIcon width={18} height={18} />
        </View>
      </View>

      {/* CENTER */}
      <View style={styles.center}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <Text style={styles.title}>
          Mentrix<Text style={styles.blue}>OS</Text>
        </Text>

        <Text style={styles.subtitle}>
          {STRINGS.subtitleLine1}
          <Text style={styles.orange}>{STRINGS.mentor}</Text> + {STRINGS.matrix}{' '}
          + <Text style={styles.purple}>{STRINGS.metrics}</Text>
        </Text>

        <Text style={styles.desc}>
          combined into one <Text style={styles.bold}>Operating System</Text>{' '}
          for your institute
        </Text>

        {/* INPUT */}
        <View style={styles.inputWrapper}>
          {isPhone ? (
            <View style={styles.phoneRow}>
              <View style={styles.countryBox}>
                <Text style={styles.countryText}>🇮🇳 +91</Text>
              </View>

              <TextInput
                value={input}
                onChangeText={text => {
                  setInput(text);
                  setUsePassword(false);
                  setShowOTP(false);
                }}
                placeholder={STRINGS.phonePlaceholder}
                placeholderTextColor="#9CA3AF"
                style={styles.phoneInput}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
          ) : (
            <TextInput
              value={input}
              onChangeText={text => {
                setInput(text);
                setUsePassword(false);
                setShowOTP(false);
              }}
              placeholder={STRINGS.inputPlaceholder}
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          )}
        </View>

        {/* PHONE FLOW */}
        {isPhone && !showOTP && (
          <TouchableOpacity
            style={sendCodeButtonStyle}
            disabled={!isValidPhone}
            onPress={() => {
              setShowOTP(true);
              setTimer(30);
              setIsTimerActive(true);
            }}
          >
            <Text style={styles.btnText}>{STRINGS.sendCode}</Text>
          </TouchableOpacity>
        )}

        {/* OTP */}
        {showOTP && (
          <>
            <Text style={styles.otpTitle}>{STRINGS.enterOTP}</Text>

            <Text style={styles.timerText}>
              {`00:${timer < 10 ? `0${timer}` : timer}`}
            </Text>

            <View style={styles.otpRow}>
              {[...Array(6)].map((_, i) => (
                <TextInput
                  key={i}
                  style={styles.otpBox}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>

            <Text style={styles.resend}>
              {STRINGS.resend}{' '}
              <Text
                style={resendLinkStyle}
                onPress={() => {
                  if (timer === 0) {
                    setTimer(30);
                    setIsTimerActive(true);
                  }
                }}
              >
                {STRINGS.resendCode}
              </Text>
            </Text>

            <TouchableOpacity style={styles.fullBtn}>
              <Text style={styles.btnText}>{STRINGS.continue}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowOTP(false)}
              style={styles.backBtn}
            >
              <Text style={styles.backText}>{STRINGS.back}</Text>
            </TouchableOpacity>
          </>
        )}

        {/* EMAIL OPTIONS */}
        {isEmail && !usePassword && !showOTP && (
          <View style={styles.rowButtons}>
            <TouchableOpacity style={styles.halfBtn}>
              <Text style={styles.btnText}>{STRINGS.sendCode}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.halfBtn}
              onPress={() => setUsePassword(true)}
            >
              <Text style={styles.btnText}>{STRINGS.usePassword}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PASSWORD */}
        {isEmail && usePassword && !showOTP && (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={STRINGS.passwordPlaceholder}
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Text style={styles.forgot}>{STRINGS.forgotPassword}</Text>

            {!!error && <Text style={styles.forgot}>{error}</Text>}

            <TouchableOpacity
              style={loginButtonStyle}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.btnText}>{STRINGS.continue}</Text>
            </TouchableOpacity>
          </>
        )}

        {/* DEFAULT */}
        {!input && (
          <>
            <View style={styles.orRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.joinBox}>
              <ScannerIcon width={24} height={24} fill="#111827" />
              <Text style={styles.joinText}> {STRINGS.joinInstitute}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>{STRINGS.footerTitle}</Text>
        <Text style={styles.footerSub}>{STRINGS.footerSub}</Text>
      </View>

      {/* SETUP */}
      <View style={styles.setupBox}>
        <Text style={styles.setupGray}>{STRINGS.setupLine}</Text>
        <Text style={styles.setupBlue}>{STRINGS.setupBtn}</Text>
      </View>

      <Text style={styles.terms}>
        {STRINGS.terms}
        {'\n'}
        <Text style={styles.link}>{STRINGS.policy}</Text>
      </Text>
    </View>
  );
}
