const variantModules = import.meta.glob("../../data/variants/*.cv.json", {
  import: "default"
});

export function variantNameFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.cv\.json$/);
  return match?.[1] ?? path;
}

export function getVariantNames(): string[] {
  return Object.keys(variantModules).map(variantNameFromPath);
}

export async function loadVariantData(name: string): Promise<unknown> {
  const key = Object.keys(variantModules).find(
    (p) => variantNameFromPath(p) === name
  );
  const loadModule = key ? variantModules[key] : undefined;
  if (!loadModule) throw new Error(`Variant "${name}" not found`);
  return loadModule();
}
