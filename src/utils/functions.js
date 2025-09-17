import { slotList } from './slotList';
import falldata from '../models/winter.json';
import { PiCheckSquareOffsetDuotone } from 'react-icons/pi';

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
    transformedSlots = transformedSlots.concat(slotList.filter((s) => s.includes(slot)));
  }
  return transformedSlots;
};

export const generate = () => {
  if (localStorage.getItem('ffcs_planner_data')) {
    const data = JSON.parse(localStorage.getItem('ffcs_planner_data'));
    console.log(data);
    let optimized = {};
    data.forEach((subject) => {
      const all = falldata.filter((item) => item['COURSE CODE'] === subject.code);
      let uniqueSlots;
      if (subject.slots) {
        uniqueSlots = new Array(subject.slots);
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
      optimized[subject.code] = uniqueSlots;
    });
    const subjects = Object.keys(optimized);
    const results = [];
    const n = subjects.length;
    function backtrack(index) {
      if (index === n) {
        results.push(Array.from(chosen));
        return;
      }
      const subject = subjects[index];
      const slotsArr = optimized[subject];
      if (slotsArr.length === 1) {
        const slot = slotsArr[0];
        const slotParts = slot.split(',');
        let clash = false;
        for (const part of slotParts) {
          if (used.has(part)) {
            clash = true;
            break;
          }
        }
        if (!clash) {
          slotParts.forEach((p) => used.add(p));
          chosen[index] = `${subject}-${slot}`;
          backtrack(index + 1);
          slotParts.forEach((p) => used.delete(p));
        }
        return;
      }
      for (let i = 0; i < slotsArr.length; ++i) {
        const slot = slotsArr[i];
        const slotParts = slot.split(',');
        let clash = false;
        for (let j = 0; j < slotParts.length; ++j) {
          if (used.has(slotParts[j])) {
            clash = true;
            break;
          }
        }
        if (!clash) {
          slotParts.forEach((p) => used.add(p));
          chosen[index] = `${subject}-${slot}`;
          backtrack(index + 1);
          slotParts.forEach((p) => used.delete(p));
        }
      }
    }
    const chosen = new Array(n);
    const used = new Set();
    backtrack(0);
    return results;
  }
};

export const generate_transform = (slots) => {
  let transformedSlots = [];
  for (let slot of slots) {
    transformedSlots = transformedSlots.concat(
      slotList.filter((i) => i.includes(slot.toLowerCase()))
    );
  }
  return transformedSlots;
};
