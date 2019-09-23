export function parseSuffix(suffix: string | string[]): string[] {
  const result: string[] = [];
  let ret: string[] = [];

  if (typeof suffix === 'string') {
    ret = suffix.split(',');
  }

  if (Array.isArray(suffix)) {
    ret = suffix;
  }

  if (ret && ret[0]) {
    result[0] = ret[0];
  }
  if (ret && ret[1]) {
    result[1] = ret[1];
  }
  return result;
}

export function getQualitySuffix(highQuality: boolean, suffix: string[]) {
  const _suffix = parseSuffix(suffix);
  return highQuality ? _suffix[0] : _suffix[1];
}
