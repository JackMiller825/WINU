function copyWithCommand(value: string): boolean {
  let copied = false;
  const onCopy = (event: ClipboardEvent) => {
    event.preventDefault();
    event.clipboardData?.setData('text/plain', value);
    copied = true;
  };
  document.addEventListener('copy', onCopy);
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '0';
  area.style.left = '0';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.focus();
  area.select();
  area.setSelectionRange(0, value.length);
  let commandOk = false;
  try { commandOk = document.execCommand('copy'); } catch { /* The copy listener records success. */ }
  area.remove();
  document.removeEventListener('copy', onCopy);
  return copied || commandOk;
}

/** Copies the visible contract text, including "Coming Soon.." before an address exists. */
export function copyText(value: string): Promise<boolean> {
  if (copyWithCommand(value)) return Promise.resolve(true);
  if (!navigator.clipboard?.writeText) return Promise.resolve(false);
  return navigator.clipboard.writeText(value).then(() => true, () => false);
}
