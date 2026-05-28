type VariantSwitcherProps = {
  variantNames: string[];
  selectedVariantId: string | null;
  onVariantChange: (variantId: string | null) => void;
};

export function VariantSwitcher({
  variantNames,
  selectedVariantId,
  onVariantChange
}: VariantSwitcherProps) {
  if (variantNames.length === 0) return null;

  return (
    <label className="template-switcher">
      Variant
      <select
        value={selectedVariantId ?? ""}
        onChange={(e) => onVariantChange(e.currentTarget.value || null)}
      >
        <option value="">Base</option>
        {variantNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
