export const getFontSize = (selector: string): number => {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return 0;
  const size = parseFloat(getComputedStyle(element).fontSize);
  return size;
};

export const getAge = (): number => {
  const birthDate = new Date(2000, 10, 24);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
};

