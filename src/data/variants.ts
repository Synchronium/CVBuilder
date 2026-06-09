const variantModules = import.meta.glob("../../data/variants/*.cv.json", {
  import: "default"
});

export function variantNameFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.cv\.json$/);
  return match ? match[1] : path;
}

export function getVariantNames(): string[] {
  return Object.keys(variantModules).map(variantNameFromPath);
}

export async function loadVariantData(name: string): Promise<unknown> {
  const key = Object.keys(variantModules).find(
    (p) => variantNameFromPath(p) === name
  );
  if (!key) throw new Error(`Variant "${name}" not found`);
  return variantModules[key]();
}
