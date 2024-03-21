import { readFileSync } from 'fs';
import type { IconifyJSON } from '@iconify/types';
import importSvg from './importSvg';

/**
 * Callback for loading icon set
 */
type IconifyJSONLoaderCallback = () => IconifyJSON;

interface LocalSetConfig {
  path: string;
}

/**
 * Options for icon set loaders
 */
export interface IconifyPluginLoaderOptions {
  // Custom icon sets
  // Value can be loaded icon set or callback that loads icon set
  iconSets?: Record<string, IconifyJSON | string | IconifyJSONLoaderCallback | LocalSetConfig>;
}

/**
 * Locate icon set
 */
interface LocatedIconSet {
  main: string;
  info?: string;
}
export function locateIconSet(prefix: string): LocatedIconSet | undefined {
  try {
    const main = require.resolve(`@iconify-json/${prefix}/icons.json`);
    const info = require.resolve(`@iconify-json/${prefix}/info.json`);
    return {
      main,
      info,
    };
  } catch (error) {
    console.log(error);
  }
  try {
    const main = require.resolve(`@iconify/json/json/${prefix}.json`);
    return {
      main,
    };
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

/**
 * Cache for loaded icon sets
 *
 * Tailwind CSS can send multiple separate requests to plugin, this will
 * prevent same data from being loaded multiple times.
 *
 * Key is filename, not prefix!
 */
const cache = Object.create(null) as Record<string, IconifyJSON>;

/**
 * Load icon set
 */
export function loadIconSet(prefix: string, options: IconifyPluginLoaderOptions): IconifyJSON | undefined {
  let filename: LocatedIconSet | undefined;

  // Check for custom icon set
  // const customIconSet = options.iconSets?.[prefix];
  if (options.iconSets?.[prefix]) {
    const customIconSet = options.iconSets?.[prefix];
    switch (typeof customIconSet) {
      case 'function': {
        // Callback. Store result in options to avoid loading it again
        const result = customIconSet();
        options.iconSets[prefix] = result;
        return result;
      }
      case 'object': {
        if ((customIconSet as LocalSetConfig).path) {
          return importSvg((customIconSet as LocalSetConfig).path);
        }
        break;
      }

      case 'string': {
        // Filename to load it from
        filename = {
          main: customIconSet,
        };
        break;
      }

      default:
        return customIconSet;
    }
  } else {
    // Find icon set
    filename = locateIconSet(prefix);
  }

  if (!filename) {
    return undefined;
  }

  const main = typeof filename === 'string' ? filename : filename.main;

  // Check for cache
  if (cache[main]) {
    return cache[main];
  }

  // Attempt to load it
  try {
    const result = JSON.parse(readFileSync(main, 'utf8'));
    if (!result.info && typeof filename === 'object' && filename.info) {
      // Load info from a separate file
      result.info = JSON.parse(readFileSync(filename.info, 'utf8'));
    }
    cache[main] = result;
    return result;
  } catch (error) {
    console.log('error', error);
  }
  return undefined;
}
