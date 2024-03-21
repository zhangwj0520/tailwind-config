import type { IconCSSIconSetOptions } from '@iconify/utils/lib/css/types';
import type { IconifyPluginLoaderOptions } from './loader';

/**
 * Common options
 */
export interface CommonIconifyPluginOptions extends IconifyPluginLoaderOptions {
  //
}

/**
 * Options for clean class names
 */
export interface CleanIconifyPluginOptions extends CommonIconifyPluginOptions, IconCSSIconSetOptions {
  //
}

/**
 * Options for dynamic class names
 */
export interface DynamicIconifyPluginOptions extends CommonIconifyPluginOptions {
  // Class prefix
  prefix?: string;

  // Include icon-specific selectors only
  overrideOnly?: true;

  // Sets the default height/width value (ex. scale: 2 = 2em)
  scale?: number;
}
