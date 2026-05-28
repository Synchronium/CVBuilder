type PrintControlsProps = {
  printMode: boolean;
  onPrintModeChange: (enabled: boolean) => void;
};

export function PrintControls({
  printMode,
  onPrintModeChange
}: PrintControlsProps) {
  return (
    <div className="print-controls">
      <label>
        <input
          type="checkbox"
          checked={printMode}
          onChange={(event) => onPrintModeChange(event.currentTarget.checked)}
        />
        PDF preview
      </label>
      <button type="button" onClick={() => window.print()}>
        Print
      </button>
    </div>
  );
}
