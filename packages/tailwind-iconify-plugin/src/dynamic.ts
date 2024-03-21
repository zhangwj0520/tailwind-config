import { getIconsCSSData } from '@iconify/utils/lib/css/icons';
import { matchIconName } from '@iconify/utils/lib/icon/name';
import { loadIconSet } from './loader';
import type { DynamicIconifyPluginOptions } from './options';

/**
 * Get dynamic CSS rules
 */
export function getDynamicCSSRules(
  icon: string,
  { scale = 1, ...options }: DynamicIconifyPluginOptions = {},
): Record<string, string> {
  const nameParts = icon.split(/--|\:/);
  if (nameParts.length !== 2) {
    throw new Error(`Invalid icon name: "${icon}"`);
  }

  const [prefix, name] = nameParts;
  if (!(prefix.match(matchIconName) && name.match(matchIconName))) {
    throw new Error(`Invalid icon name: "${icon}"`);
  }

  const iconSet = loadIconSet(prefix, options);
  if (!iconSet) {
    throw new Error(`Cannot load icon set for "${prefix}". Install "@iconify-json/${prefix}" as dev dependency?`);
  }

  const generated = getIconsCSSData(iconSet, [name], {
    iconSelector: '.icon',
  });
  if (generated.css.length !== 1) {
    throw new Error(`Cannot find "${icon}". Bad icon name?`);
  }

  if (scale) {
    generated.common.rules.height = `${scale}em`;
    generated.common.rules.width = `${scale}em`;
  } else {
    delete generated.common.rules.height;
    delete generated.common.rules.width;
  }

  return {
    // Common rules
    ...(options.overrideOnly || !generated.common?.rules ? {} : generated.common.rules),

    // Icon rules
    ...generated.css[0].rules,
  };
}
