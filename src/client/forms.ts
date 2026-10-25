/**
 * Form behaviour: validation with the shared schemas, inline errors,
 * confirmation dialog for event enquiries, sending and result states.
 */
import { schemas, fieldErrors, todayIST, type FormKind } from '../lib/schemas.ts';

interface Messages {
  errors: Record<string, string>;
  fixErrors: string;
  sending: string;
  errorGeneral: string;
  errorOffline: string;
  errorRate: string;
  errorConfig: string;
}

function readUtm(): Record<string, string> | undefined {
  try {
    const raw = window.sessionStorage.getItem('ri-utm');
    return raw ? (JSON.parse(raw) as Record<string, string>) : undefined;
  } catch {
    return undefined;
  }
}

function setup(form: HTMLFormElement): void {
  const kind = form.dataset.form as FormKind;
  const schema = schemas[kind];
  const msg = JSON.parse(form.dataset.messages ?? '{}') as Messages;
  const wrap = form.closest<HTMLElement>('[data-form-wrap]')!;
  const success = wrap.querySelector<HTMLElement>('[data-success]')!;
  const general = form.querySelector<HTMLElement>('[data-general-error]')!;
  const generalText = form.querySelector<HTMLElement>('[data-general-error-text]')!;
  const summary = form.querySelector<HTMLElement>('[data-error-summary]')!;
  const dialog = wrap.querySelector<HTMLDialogElement>('.confirm-dialog');
  const reviewBtn = form.querySelector<HTMLButtonElement>('[data-review]');
  const started = Date.now();
  let attempted = false;
  let sending = false;

  const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]');
  if (dateInput) dateInput.min = todayIST();

  function values(): Record<string, unknown> {
    const fd = new FormData(form);
    const out: Record<string, unknown> = {};
    fd.forEach((v, k) => {
      if (typeof v === 'string') out[k] = v;
    });
    out.consent = (form.elements.namedItem('consent') as HTMLInputElement | null)?.checked === true;
    return out;
  }

  function fieldEl(name: string): HTMLElement | null {
    return form.querySelector<HTMLElement>(`[data-field="${name}"]`);
  }

  function showErrors(errs: Record<string, string>, onlyField?: string): void {
    form.querySelectorAll<HTMLElement>('[data-field]').forEach((f) => {
      const name = f.dataset.field!;
      if (onlyField && name !== onlyField) return;
      const code = errs[name];
      const err = f.querySelector<HTMLElement>('.error');
      const controls = f.querySelectorAll<HTMLElement>('input, select, textarea');
      controls.forEach((c) => {
        if (code) c.setAttribute('aria-invalid', 'true');
        else c.removeAttribute('aria-invalid');
      });
      if (err) {
        err.textContent = code ? (msg.errors[code] ?? code) : '';
        err.hidden = !code;
      }
    });
  }

  function validate(): Record<string, string> | null {
    const r = schema.safeParse(values());
    if (r.success) {
      showErrors({});
      return null;
    }
    const errs = fieldErrors(r.error.issues);
    showErrors(errs);
    return errs;
  }

  function focusFirstError(errs: Record<string, string>): void {
    summary.textContent = '';
    window.setTimeout(() => (summary.textContent = msg.fixErrors), 50);
    const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    first?.focus();
    void errs;
  }

  // Re-check a field when the visitor leaves it, once they have tried to send.
  form.addEventListener('focusout', (e) => {
    if (!attempted) return;
    const field = (e.target as HTMLElement).closest<HTMLElement>('[data-field]');
    if (!field) return;
    const r = schema.safeParse(values());
    showErrors(r.success ? {} : fieldErrors(r.error.issues), field.dataset.field);
  });

  function showGeneral(text: string): void {
    generalText.textContent = text;
    general.hidden = false;
    general.focus();
  }

  if (reviewBtn && dialog) {
    const list = dialog.querySelector<HTMLElement>('[data-confirm-list]')!;
    reviewBtn.addEventListener('click', () => {
      attempted = true;
      general.hidden = true;
      const errs = validate();
      if (errs) return focusFirstError(errs);
      list.replaceChildren();
      form.querySelectorAll<HTMLElement>('[data-field]').forEach((f) => {
        const name = f.dataset.field!;
        if (name === 'consent') return;
        const control = f.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
          'input, select, textarea',
        );
        if (!control || !control.value.trim()) return;
        const label = f.querySelector('label')?.childNodes[0]?.textContent?.trim() ?? name;
        const shown =
          control instanceof HTMLSelectElement ? (control.selectedOptions[0]?.textContent ?? '') : control.value;
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = shown;
        list.append(dt, dd);
      });
      dialog.showModal();
      dialog.querySelector<HTMLButtonElement>('[data-confirm-send]')?.focus();
    });
    dialog.querySelector('[data-confirm-edit]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      if (!sending) reviewBtn.focus();
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    attempted = true;
    general.hidden = true;
    const errs = validate();
    if (errs) {
      dialog?.open && dialog.close();
      return focusFirstError(errs);
    }
    sending = true;
    const buttons = [
      ...form.querySelectorAll<HTMLButtonElement>('[type="submit"], [data-review]'),
      ...(dialog ? dialog.querySelectorAll<HTMLButtonElement>('[data-confirm-send]') : []),
    ];
    const labels = buttons.map((b) => b.textContent);
    buttons.forEach((b) => {
      b.disabled = true;
      b.textContent = msg.sending;
    });
    const body = { ...values(), lang: form.dataset.lang, elapsed: Date.now() - started, utm: readUtm() };
    let outcome: 'ok' | 'fields' | 'rate' | 'config' | 'offline' | 'error' = 'error';
    let serverErrors: Record<string, string> = {};
    try {
      const res = await fetch(`/api/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string>; code?: string };
      if (res.ok && data.ok) outcome = 'ok';
      else if (res.status === 422 && data.errors) {
        outcome = 'fields';
        serverErrors = data.errors;
      } else if (res.status === 429) outcome = 'rate';
      else if (res.status === 503 && data.code === 'not_configured') outcome = 'config';
    } catch {
      outcome = navigator.onLine === false ? 'offline' : 'error';
    }
    sending = false;
    buttons.forEach((b, i) => {
      b.disabled = false;
      b.textContent = labels[i] ?? '';
    });
    if (dialog?.open) dialog.close();

    if (outcome === 'ok') {
      form.hidden = true;
      success.hidden = false;
      success.focus();
      return;
    }
    if (outcome === 'fields') {
      showErrors(serverErrors);
      return focusFirstError(serverErrors);
    }
    showGeneral(
      outcome === 'rate'
        ? msg.errorRate
        : outcome === 'config'
          ? msg.errorConfig
          : outcome === 'offline'
            ? msg.errorOffline
            : msg.errorGeneral,
    );
  });

  success.querySelector('[data-another]')?.addEventListener('click', () => {
    form.reset();
    attempted = false;
    showErrors({});
    success.hidden = true;
    form.hidden = false;
    form.querySelector<HTMLElement>('input, select, textarea')?.focus();
  });
}

document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach(setup);

export {};
