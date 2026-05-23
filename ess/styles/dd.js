import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  topIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },

  iconBox: {
    marginTop: 20,
    width: 52,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  center: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 50,
    height: 50,
    marginTop: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 12,
  },

  blue: { color: '#2563EB' },
  orange: { color: '#F97316' },
  purple: { color: '#7C3AED' },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
  },

  desc: {
    marginTop: 6,
    textAlign: 'center',
    color: '#363333ff',
    fontSize: 13,
  },

  bold: { fontWeight: '800' },

  inputWrapper: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },

  countryBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginRight: 8,
    height: 55,
  },

  countryText: {
    fontWeight: '600',
  },

  input: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  fullBtn: {
    backgroundColor: '#065F46',
    marginTop: 25,
    height: 55,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
    width: '100%',
  },

  halfBtn: {
    flex: 1,
    backgroundColor: '#065F46',
    height: 55,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  forgot: {
    alignSelf: 'flex-end',
    color: '#2563EB',
    marginTop: 10,
  },

  otpTitle: {
    marginTop: 20,
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },

  otpRow: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
    width: '100%',
  },

  otpBox: {
    width: 46,
    height: 52,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },

  resend: {
    marginTop: 14,
    alignSelf: 'flex-start',
    color: '#6B7280',
    fontSize: 13,
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },

  orText: {
    marginHorizontal: 10,
    fontWeight: '600',
    color: '#374151',
  },

  joinBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  joinText: {
    marginLeft: 10,
    fontSize: 15,
  },

  footer: {
    alignItems: 'center',
    marginTop: 40,
  },

  footerTitle: {
    fontWeight: '700',
  },

  footerSub: {
    color: '#6B7280',
    marginTop: 5,
  },

  setupBox: {
    margin: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    padding: 18,
  },

  setupGray: {
    color: '#6B7280',
  },

  setupBlue: {
    color: '#2563EB',
    marginTop: 6,
    fontWeight: '600',
  },

  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },

  link: {
    color: '#2563EB',
  },
});