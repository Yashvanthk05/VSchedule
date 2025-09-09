import { slotList } from './slotList';
import falldata from '../models/fall.json';
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
    console.log(optimized);
    const subjects = Object.keys(optimized);
    const results = [];
    console.log(subjects);
    const backtrack = (index, chosen, used) => {
      if (index === subjects.length) {
        results.push([...chosen]);
        return;
      }
      const subject = subjects[index];
      for (const slot of optimized[subject]) {
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
          chosen.push(`${subject}-${slot}`);
          backtrack(index + 1, chosen, used);
          chosen.pop();
          slotParts.forEach((p) => used.delete(p));
        }
      }
    };
    backtrack(0, [], new Set());
    return results;
  }
};

export const generate_transform = (slots) => {
  console.log(slots);
  let transformedSlots = [];
  for (let slot of slots) {
    transformedSlots = transformedSlots.concat(slotList.filter((i) => i.includes(slot.toLowerCase())));
  }
  console.log(transformedSlots);
  return transformedSlots;
};
