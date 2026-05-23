/**
 * @file src/config/instituteLogo.ts
 */

const instituteLogoMap: Record<string, any> = {
  'north park academy': require('../assets/InstituteLogo/Northpark.png'),
  'earlytech college':  require('../assets/InstituteLogo/EarlyColl.png'),
  'renaissance academy': require('../assets/InstituteLogo/Renaissance.png'),
  'pune university':    require('../assets/InstituteLogo/PuneUniv.png'),
  'mount carmel school': require('../assets/InstituteLogo/MoutCarmel.png'),
  'samhita academy':    require('../assets/InstituteLogo/Samhita.png'),
};

const instituteIdMap: Record<string, any> = {
  '1': require('../assets/InstituteLogo/Northpark.png'),
  '2': require('../assets/InstituteLogo/EarlyColl.png'),
  '3': require('../assets/InstituteLogo/Renaissance.png'),
  '4': require('../assets/InstituteLogo/PuneUniv.png'),
  '5': require('../assets/InstituteLogo/MoutCarmel.png'),
  '6': require('../assets/InstituteLogo/Samhita.png'),
};

export const getInstituteLogoByName = (name?: string): any | null => {
  if (!name) return null;

  const key = name.toLowerCase().trim();

  // 1. Exact match
  if (instituteLogoMap[key]) return instituteLogoMap[key];

  // 2. Partial match — handles extra words, typos, etc.
  const partialKey = Object.keys(instituteLogoMap).find(
    k => key.includes(k) || k.includes(key),
  );

  if (partialKey) return instituteLogoMap[partialKey];

  console.warn(`[instituteLogo] No logo found for: "${name}"`);
  return null;
};

export const getInstituteLogoById = (
  instituteId?: string | number,
): any | null => {
  if (!instituteId) return null;
  return instituteIdMap[String(instituteId)] || null;
};

export default { getInstituteLogoByName, getInstituteLogoById };