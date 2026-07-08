/**
 * Utility to retrieve the computed font size of an element and optionally apply a scaling factor.
 *
 * @param selector CSS selector for the target element (e.g. '.text-2xl').
 * @returns       Font size string with 'px' unit (e.g. '24px'). Returns an empty string if the element is not found.
 */
export const getFontSize = (selector: string): number => {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return 0;
  const size = parseFloat(getComputedStyle(element).fontSize);
  return size;
};

