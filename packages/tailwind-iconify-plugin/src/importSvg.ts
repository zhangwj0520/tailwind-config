import { cleanupSVG, importDirectorySync, parseColors, runSVGO } from '@iconify/tools';

const importSvg = (path: string) => {
  const customSet = importDirectorySync(path);

  customSet.forEachSync((name, type) => {
    if (type !== 'icon') {
      return;
    }

    const svg = customSet.toSVG(name);
    if (!svg) {
      customSet.remove(name);
      return;
    }

    try {
      cleanupSVG(svg);

      // This is a monotone icon, change color to `currentColor`, add it if missing
      // Skip this step if icons have palette
      parseColors(svg, {
        defaultColor: 'currentColor',
        // callback: (attr, colorStr, color) => {
        //   return !color || isEmptyColor(color) ? colorStr : 'currentColor'
        // },
      });

      // Optimise icon
      runSVGO(svg);
    } catch (err) {
      // Something went wrong when parsing icon: remove it
      console.error(`Error parsing ${name}:`, err);
      customSet.remove(name);
      return;
    }

    // Update icon in icon set from SVG object
    customSet.fromSVG(name, svg);
  });
  return customSet.export();
};
export default importSvg;
//
