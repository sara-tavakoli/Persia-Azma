// Bale has no simple standalone icon mark published (their logo asset is a
// wordmark), so this is a generic chat-bubble glyph in Bale's confirmed
// brand green (#00B894, pulled from bale.ai/logo/bale_logo.svg) — swap in
// their real icon mark if/when one becomes available.
export function BaleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#00B894"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 5.94 2 10.8c0 2.76 1.456 5.22 3.727 6.835-.123.99-.472 2.29-1.36 3.51-.12.165-.01.4.19.39 1.79-.083 3.39-.766 4.53-1.437.93.256 1.914.394 2.913.394 5.523 0 10-3.94 10-8.8S17.523 2 12 2Z" />
    </svg>
  );
}
