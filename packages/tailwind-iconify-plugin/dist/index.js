"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// @zhangwj0520/tailwind-iconify-plugin v0.0.1 Copyright (c) 2024 zhangweijie and contributors
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/index.ts
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/icon/defaults.mjs
var defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/icon/transformations.mjs
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/icon/merge.mjs
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/icon-set/tree.mjs
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/icon-set/get-icon.mjs
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) {
    return internalGetIconData(data, name, []);
  }
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/svg/html.mjs
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/svg/size.mjs
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/svg/url.mjs
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/css/common.mjs
function getCommonCSSRules(options) {
  const result = {
    display: "inline-block",
    width: "1em",
    height: "1em"
  };
  const varName = options.varName;
  if (options.pseudoSelector) {
    result["content"] = "''";
  }
  switch (options.mode) {
    case "background":
      if (varName) {
        result["background-image"] = "var(--" + varName + ")";
      }
      result["background-repeat"] = "no-repeat";
      result["background-size"] = "100% 100%";
      break;
    case "mask":
      result["background-color"] = "currentColor";
      if (varName) {
        result["mask-image"] = result["-webkit-mask-image"] = "var(--" + varName + ")";
      }
      result["mask-repeat"] = result["-webkit-mask-repeat"] = "no-repeat";
      result["mask-size"] = result["-webkit-mask-size"] = "100% 100%";
      break;
  }
  return result;
}
function generateItemCSSRules(icon, options) {
  const result = {};
  const varName = options.varName;
  if (!options.forceSquare && icon.width !== icon.height) {
    result["width"] = calculateSize("1em", icon.width / icon.height);
  }
  const svg = iconToHTML(
    icon.body.replace(/currentColor/g, options.color || "black"),
    {
      viewBox: `${icon.left} ${icon.top} ${icon.width} ${icon.height}`,
      width: icon.width.toString(),
      height: icon.height.toString()
    }
  );
  const url = svgToURL(svg);
  if (varName) {
    result["--" + varName] = url;
  } else {
    switch (options.mode) {
      case "background":
        result["background-image"] = url;
        break;
      case "mask":
        result["mask-image"] = result["-webkit-mask-image"] = url;
        break;
    }
  }
  return result;
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/css/icons.mjs
var commonSelector = ".icon--{prefix}";
var iconSelector = ".icon--{prefix}--{name}";
var defaultSelectors = {
  commonSelector,
  iconSelector,
  overrideSelector: commonSelector + iconSelector
};
function getIconsCSSData(iconSet, names, options = {}) {
  const css = [];
  const errors = [];
  const palette = options.color ? true : _optionalChain([iconSet, 'access', _ => _.info, 'optionalAccess', _2 => _2.palette]);
  let mode = options.mode || typeof palette === "boolean" && (palette ? "background" : "mask");
  if (!mode) {
    for (let i = 0; i < names.length; i++) {
      const icon = getIconData(iconSet, names[i]);
      if (icon) {
        mode = icon.body.includes("currentColor") ? "mask" : "background";
        break;
      }
    }
    if (!mode) {
      mode = "mask";
      errors.push(
        "/* cannot detect icon mode: not set in options and icon set is missing info, rendering as " + mode + " */"
      );
    }
  }
  let varName = options.varName;
  if (varName === void 0 && mode === "mask") {
    varName = "svg";
  }
  const newOptions = {
    ...options,
    // Override mode and varName
    mode,
    varName
  };
  const { commonSelector: commonSelector2, iconSelector: iconSelector2, overrideSelector } = newOptions.iconSelector ? newOptions : defaultSelectors;
  const iconSelectorWithPrefix = iconSelector2.replace(
    /{prefix}/g,
    iconSet.prefix
  );
  const commonRules = {
    ...options.rules,
    ...getCommonCSSRules(newOptions)
  };
  const hasCommonRules = commonSelector2 && commonSelector2 !== iconSelector2;
  const commonSelectors = /* @__PURE__ */ new Set();
  if (hasCommonRules) {
    css.push({
      selector: commonSelector2.replace(/{prefix}/g, iconSet.prefix),
      rules: commonRules
    });
  }
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const iconData = getIconData(iconSet, name);
    if (!iconData) {
      errors.push("/* Could not find icon: " + name + " */");
      continue;
    }
    const rules = generateItemCSSRules(
      {
        ...defaultIconProps,
        ...iconData
      },
      newOptions
    );
    let requiresOverride = false;
    if (hasCommonRules && overrideSelector) {
      for (const key in rules) {
        if (key in commonRules) {
          requiresOverride = true;
        }
      }
    }
    const selector = (requiresOverride && overrideSelector ? overrideSelector.replace(/{prefix}/g, iconSet.prefix) : iconSelectorWithPrefix).replace(/{name}/g, name);
    css.push({
      selector,
      rules
    });
    if (!hasCommonRules) {
      commonSelectors.add(selector);
    }
  }
  const result = {
    css,
    errors
  };
  if (!hasCommonRules && commonSelectors.size) {
    const selector = Array.from(commonSelectors).join(
      newOptions.format === "compressed" ? "," : ", "
    );
    result.common = {
      selector,
      rules: commonRules
    };
  }
  return result;
}

// src/loader.ts
var _fs = require('fs');
function locateIconSet(prefix) {
  try {
    const main = __require.resolve(`@iconify-json/${prefix}/icons.json`);
    const info = __require.resolve(`@iconify-json/${prefix}/info.json`);
    return {
      main,
      info
    };
  } catch (e) {
  }
  try {
    const main = __require.resolve(`@iconify/json/json/${prefix}.json`);
    return {
      main
    };
  } catch (e2) {
  }
}
var cache = /* @__PURE__ */ Object.create(null);
function loadIconSet(prefix, options) {
  let filename;
  const customIconSet = _optionalChain([options, 'access', _3 => _3.iconSets, 'optionalAccess', _4 => _4[prefix]]);
  if (customIconSet) {
    switch (typeof customIconSet) {
      case "function": {
        const result = customIconSet();
        options.iconSets[prefix] = result;
        return result;
      }
      case "string": {
        filename = {
          main: customIconSet
        };
        break;
      }
      default:
        return customIconSet;
    }
  } else {
    filename = locateIconSet(prefix);
  }
  if (!filename) {
    return;
  }
  const main = typeof filename === "string" ? filename : filename.main;
  if (cache[main]) {
    return cache[main];
  }
  try {
    const result = JSON.parse(_fs.readFileSync.call(void 0, main, "utf8"));
    if (!result.info && typeof filename === "object" && filename.info) {
      result.info = JSON.parse(_fs.readFileSync.call(void 0, filename.info, "utf8"));
    }
    cache[main] = result;
    return result;
  } catch (e3) {
  }
}

// ../../node_modules/.pnpm/@iconify+utils@2.1.22/node_modules/@iconify/utils/lib/icon/name.mjs
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// src/names.ts
function getIconNames(icons) {
  const prefixes = /* @__PURE__ */ Object.create(null);
  const add = (prefix, name) => {
    if (typeof prefix === "string" && prefix.match(matchIconName) && typeof name === "string" && name.match(matchIconName)) {
      (prefixes[prefix] || (prefixes[prefix] = /* @__PURE__ */ new Set())).add(name);
    }
  };
  let iconNames;
  if (typeof icons === "string") {
    iconNames = icons.split(/[\s,.]/);
  } else if (icons instanceof Array) {
    iconNames = [];
    icons.forEach((item) => {
      item.split(/[\s,.]/).forEach((name) => iconNames.push(name));
    });
  } else {
    return;
  }
  if (_optionalChain([iconNames, 'optionalAccess', _5 => _5.length])) {
    iconNames.forEach((icon) => {
      if (!icon.trim()) {
        return;
      }
      const nameParts = icon.split(":");
      if (nameParts.length === 2) {
        add(nameParts[0], nameParts[1]);
        return;
      }
      const classParts = icon.split("--");
      if (classParts[0].match(/^\.?icon$/)) {
        if (classParts.length === 3) {
          add(classParts[1], classParts[2]);
          return;
        }
        if (classParts.length === 2) {
          return;
        }
      }
      throw new Error(`Cannot resolve icon: "${icon}"`);
    });
  } else {
    return;
  }
  return prefixes;
}

// src/clean.ts
function getCSSRulesForIcons(icons, options = {}) {
  const rules = /* @__PURE__ */ Object.create(null);
  const prefixes = getIconNames(icons);
  for (const prefix in prefixes) {
    const iconSet = loadIconSet(prefix, options);
    if (!iconSet) {
      throw new Error(`Cannot load icon set for "${prefix}". Install "@iconify-json/${prefix}" as dev dependency?`);
    }
    const generated = getIconsCSSData(iconSet, Array.from(prefixes[prefix]), options);
    const result = generated.common ? [generated.common, ...generated.css] : generated.css;
    result.forEach((item) => {
      const selector = item.selector instanceof Array ? item.selector.join(", ") : item.selector;
      rules[selector] = item.rules;
    });
  }
  return rules;
}

// src/dynamic.ts
function getDynamicCSSRules(icon, { scale = 1, ...options } = {}) {
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
    iconSelector: ".icon"
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
    ...options.overrideOnly || !_optionalChain([generated, 'access', _6 => _6.common, 'optionalAccess', _7 => _7.rules]) ? {} : generated.common.rules,
    // Icon rules
    ...generated.css[0].rules
  };
}

// src/index.ts
function addDynamicIconSelectors(options) {
  const prefix = _optionalChain([options, 'optionalAccess', _8 => _8.prefix]) || "icon";
  return _plugin2.default.call(void 0, ({ matchComponents }) => {
    matchComponents({
      [prefix]: (icon) => getDynamicCSSRules(icon, options)
    });
  });
}
function addCleanIconSelectors(icons, options) {
  const rules = getCSSRulesForIcons(icons, options);
  return _plugin2.default.call(void 0, ({ addUtilities }) => {
    addUtilities(rules);
  });
}



exports.addCleanIconSelectors = addCleanIconSelectors; exports.addDynamicIconSelectors = addDynamicIconSelectors;
//# sourceMappingURL=index.js.map