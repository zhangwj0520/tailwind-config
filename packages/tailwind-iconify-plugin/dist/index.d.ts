import * as tailwindcss_types_config from 'tailwindcss/types/config';
import { IconCSSIconSetOptions } from '@iconify/utils/lib/css/types';
import { IconifyJSON } from '@iconify/types';

/**
 * Callback for loading icon set
 */
declare type IconifyJSONLoaderCallback = () => IconifyJSON;
interface LocalSetConfig {
    path: string;
}
/**
 * Options for icon set loaders
 */
interface IconifyPluginLoaderOptions {
    iconSets?: Record<string, IconifyJSON | string | IconifyJSONLoaderCallback | LocalSetConfig>;
}

/**
 * Common options
 */
interface CommonIconifyPluginOptions extends IconifyPluginLoaderOptions {
}
/**
 * Options for clean class names
 */
interface CleanIconifyPluginOptions extends CommonIconifyPluginOptions, IconCSSIconSetOptions {
}
/**
 * Options for dynamic class names
 */
interface DynamicIconifyPluginOptions extends CommonIconifyPluginOptions {
    prefix?: string;
    overrideOnly?: true;
    scale?: number;
}

/**
 * Generate styles for dynamic selector: class="icon-[mdi-light--home]"
 */
declare function addDynamicIconSelectors(options?: DynamicIconifyPluginOptions): {
    handler: tailwindcss_types_config.PluginCreator;
    config?: Partial<tailwindcss_types_config.Config> | undefined;
};
/**
 * Generate styles for preset list of icons
 */
declare function addCleanIconSelectors(icons: string[] | string, options?: CleanIconifyPluginOptions): {
    handler: tailwindcss_types_config.PluginCreator;
    config?: Partial<tailwindcss_types_config.Config> | undefined;
};

export { type CleanIconifyPluginOptions, type DynamicIconifyPluginOptions, addCleanIconSelectors, addDynamicIconSelectors };
