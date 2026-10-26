import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openStatus, hoursComplete, formatTime, type DayHours, type DayKey } from '../../src/config/hours.ts';
import { normalizeIndianMobile, contactSchema, todayIST } from '../../src/lib/schemas.ts';
import { faqsFor } from '../../src/config/faq.ts';

const full: Record<DayKey, DayHours> = {
  mon: { open: '06:30', close: '22:30' },
  tue: { open: '06:30', close: '22:30' },
  wed: { open: '06:30', close: '22:30' },
  thu: { open: '06:30', close: '22:30' },
  fri: { open: '06:30', close: '22:30' },
  sat: { open: '06:30', close: '22:30' },
  sun: { open: null, close: null, closed: true },
};

test('open status is computed in Asia/Kolkata', () => {
  // Monday 2026-10-26 12:00 IST is 06:30 UTC.
  assert.deepEqual(openStatus(new Date('2026-10-26T06:30:00Z'), full), { open: true, until: '22:30' });
  // Monday 23:00 IST.
  assert.deepEqual(openStatus(new Date('2026-10-26T17:30:00Z'), full), { open: false, until: '06:30' });
  // Sunday is closed.
  assert.deepEqual(openStatus(new Date('2026-10-25T06:30:00Z'), full), { open: false, until: null });
});

test('incomplete hours never produce a status', () => {
  const partial = { ...full, mon: { open: null, close: '22:30' } };
  assert.equal(hoursComplete(partial), false);
  assert.equal(openStatus(new Date(), partial), null);
});

test('formats times', () => {
  assert.equal(formatTime('22:30'), '10:30 PM');
  assert.equal(formatTime('06:05'), '6:05 AM');
  assert.equal(formatTime('12:00'), '12:00 PM');
  assert.equal(formatTime('00:15'), '12:15 AM');
});

test('normalises Indian mobile numbers', () => {
  for (const v of ['9845012345', '+91 98450 12345', '+919845012345', '09845012345', '91-98450-12345']) {
    assert.equal(normalizeIndianMobile(v), '+919845012345', v);
  }
  for (const v of ['12345', '5845012345', '+1 202 555 0100', '98450123456']) {
    assert.equal(normalizeIndianMobile(v), null, v);
  }
});

test('contact accepts phone or email', () => {
  const base = { name: 'A', message: 'hi', consent: true };
  assert.equal(contactSchema.safeParse({ ...base, contact: '98450 12345' }).data?.contact, '+919845012345');
  assert.equal(contactSchema.safeParse({ ...base, contact: 'a@b.in' }).data?.contact, 'a@b.in');
  assert.equal(contactSchema.safeParse({ ...base, contact: 'nope' }).success, false);
});

test('today in IST', () => {
  assert.equal(todayIST(new Date('2026-10-25T19:00:00Z')), '2026-10-26');
});

test('home FAQ has five to seven questions', () => {
  const n = faqsFor('home').length;
  assert.ok(n >= 5 && n <= 7, `got ${n}`);
});

import { liveBranches, branchBySlug, mainBranch } from '../../src/data/branches.ts';
import { menu, itemsFor } from '../../src/config/menu.ts';

test('branches have unique slugs and the main branch is live', () => {
  const slugs = liveBranches.map((b) => b.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.includes(mainBranch.slug));
  assert.equal(branchBySlug('cariappa-road')?.name, 'Cariappa Road');
  assert.equal(branchBySlug('nowhere'), undefined);
});

test('only confirmed facts are set on branches', () => {
  for (const b of liveBranches) {
    if (b.phone) assert.match(b.phone.e164, /^\+91\d{10}$/);
    assert.ok(b.sources.length > 0, `${b.slug} has sources`);
  }
});

test('branch menu overrides only name live branches', () => {
  const slugs = new Set(liveBranches.map((b) => b.slug));
  for (const c of menu)
    for (const i of c.items) for (const s of i.branches ?? []) assert.ok(slugs.has(s), `${i.id} -> ${s}`);
  const tiffin = menu.find((c) => c.id === 'tiffin');
  assert.ok(tiffin);
  assert.ok(itemsFor(tiffin, 'channasandra').length >= itemsFor(tiffin, 'cariappa-road').length - 5);
});
