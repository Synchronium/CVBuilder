/** Triggers the browser print dialog (Save as PDF). Hidden in printed output. */
export function PrintButton() {
  return (
    <div className="print-controls">
      <button type="button" onClick={() => window.print()}>
        Print / Save PDF
      </button>
    </div>
  );
}
