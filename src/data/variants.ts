/** A map of variant file path → lazy loader, as produced by `import.meta.glob`. */
export type VariantModules = Record<string, () => Promise<unknown>>;

const variantModules = import.meta.glob("../../data/variants/*.cv.json", {
  import: "default"
}) as VariantModules;

export function variantNameFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.cv\.json$/);
  return match?.[1] ?? path;
}

/** Pure: variant names from a module map. */
export function variantNames(modules: VariantModules): string[] {
  return Object.keys(modules).map(variantNameFromPath);
}

/** Pure: load the data for a named variant from a module map. Throws if absent. */
export function loadVariant(modules: VariantModules, name: string): Promise<unknown> {
  const key = Object.keys(modules).find((p) => variantNameFromPath(p) === name);
  const loadModule = key ? modules[key] : undefined;
  if (!loadModule) throw new Error(`Variant "${name}" not found`);
  return loadModule();
}

export function getVariantNames(): string[] {
  return variantNames(variantModules);
}

export async function loadVariantData(name: string): Promise<unknown> {
  return loadVariant(variantModules, name);
}
