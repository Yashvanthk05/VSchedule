import { slotList } from './slotList';
import fallData from '../models/fall.json';
import winterData from '../models/winter.json';

export const getData = () => {
  if (localStorage.getItem('ffcs_planner_data'))
    return JSON.parse(localStorage.getItem('ffcs_planner_data'));
  return [];
};

export const saveData = (obj) => {
  const stringValue = JSON.stringify(obj);
  localStorage.setItem('ffcs_planner_data', stringValue);
};

export const validate = ({ code, slots, faculty }) => {
  const oldData = getData();
  if (oldData) {
    const existItem = oldData.find(
      (i) => i.code === code && i.faculty === faculty && i.slots === slots
    );
    if (existItem) {
      return 'exists';
    }
  }
  return 'valid';
};

export const transform = (slots) => {
  let transformedSlots = [];
  for (let slot of slots) {
    transformedSlots = transformedSlots.concat(
      slotList.filter((s) => s.includes(slot.toLowerCase()))
    );
  }
  return transformedSlots;
};

export const generate = () => {
  if (!localStorage.getItem('ffcs_planner_data')) return;
  const data = JSON.parse(localStorage.getItem('ffcs_planner_data'));
  if (data.length === 0) return [];
  const activeSem = data[0]?.sem || 'winter';
  const sourceData = activeSem === 'fall' ? fallData : winterData;

  const subjectEntries = [];
  data.forEach((subject) => {
    let all = sourceData.filter((item) => item['COURSE CODE'] === subject.code);
    if (subject.faculty) {
      all = all.filter(
        (item) => item['EMPLOYEE NAME'].toUpperCase() === subject.faculty.toUpperCase()
      );
    }
    let uniqueSlots;
    if (subject.slots) {
      uniqueSlots = [subject.slots];
    } else {
      uniqueSlots = Array.from(
        new Set(
          all.map((item) =>
            item['SLOT']
              .split('+')
              .map((i) => `_${i.trim()}_`)
              .join(',')
          )
        )
      );
    }
    subjectEntries.push({ id: subject.id, code: subject.code, slots: uniqueSlots });
  });

  const n = subjectEntries.length;
  if (n === 0) return [];

  const partIndex = new Map();
  let nextPart = 0;

  const subjectOptions = {};
  for (const entry of subjectEntries) {
    const slotsArr = entry.slots || [];
    const opts = [];
    for (const slot of slotsArr) {
      const slotParts = slot.split(',').map((p) => p.trim());
      let mask = 0n;
      for (const part of slotParts) {
        if (!partIndex.has(part)) {
          partIndex.set(part, nextPart++);
        }
        const idx = BigInt(partIndex.get(part));
        mask |= 1n << idx;
      }
      opts.push({ slot, parts: slotParts, mask });
    }
    subjectOptions[entry.id] = opts;
  }

  const orderedEntries = subjectEntries.slice().sort((a, b) => {
    return (subjectOptions[a.id].length || 0) - (subjectOptions[b.id].length || 0);
  });

  const results = [];
  const chosen = new Array(n);

  function backtrack(index, usedMask) {
    if (index === n) {
      results.push(Array.from(chosen));
      return;
    }
    const entry = orderedEntries[index];
    const opts = subjectOptions[entry.id] || [];
    if (opts.length === 0) {
      return;
    }
    for (let i = 0; i < opts.length; ++i) {
      const opt = opts[i];
      if ((usedMask & opt.mask) === 0n) {
        chosen[index] = `${entry.code}-${opt.slot}`;
        backtrack(index + 1, usedMask | opt.mask);
      }
    }
  }

  backtrack(0, 0n);
  return results;
};

export const generate_transform = (slots) => {
  return transform(slots);
};
