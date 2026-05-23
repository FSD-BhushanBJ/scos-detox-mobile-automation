import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },

  topIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },

  blue: { color: '#2563EB' },

  subtitle: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    color: '#111827',
  },

  orange: { color: '#F97316' },
  purple: { color: '#7C3AED' },

  desc: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#6B7280',
  },

  bold: {
    fontWeight: '600',
    color: '#111827',
  },

  /* INPUT */
  inputWrapper: {
    width: '100%',
    marginTop: 24,
  },
  input: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },

  countryBox: {
    height: 56,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
  },

  countryText: {
    fontSize: 16,
  },

  phoneInput: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },

  passwordInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F3F4F6',
    color: '#111827',
    marginTop: 16,
  },

  forgot: {
    color: '#2563EB',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 12,
  },

  /* BUTTONS */
  rowButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    width: '100%',
  },

  halfBtn: {
    flex: 1,
    height: 56,
    backgroundColor: '#0F5C4D',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#0F5C4D',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  disabledButton: {
    opacity: 0.5,
  },

  loadingButton: {
    opacity: 0.6,
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  /* OTP */
  otpTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    color: '#1F2937',
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },

  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'center',
    fontSize: 18,
  },

  resend: {
    marginTop: 20,
    fontSize: 14,
    color: '#6B7280',
  },

  timerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },

  backBtn: {
    alignSelf: 'center',
    marginTop: 20,
  },

  backText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },

  /* OR */
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
    width: '100%',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  orText: {
    marginHorizontal: 10,
    color: '#374151',
    fontWeight: '600',
  },

  /* JOIN */
  joinBox: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    gap: 8,
  },

  joinText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },

  /* FOOTER */
  footer: {
    alignItems: 'center',
    marginTop: 36,
  },

  footerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  footerSub: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },

  setupBox: {
    marginTop: 28,
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 16,
  },
  setupGray: {
    color: '#6B7280',
    fontSize: 14,
  },

  setupBlue: {
    marginTop: 4,
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 15,
  },

  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 14,
    marginBottom: 10,
  },

  link: {
    color: '#2563EB',
  },

  disabledLink: {
    opacity: 0.5,
  },
});
