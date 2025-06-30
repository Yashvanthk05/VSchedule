import { getTemplate } from './template.js';
import { getData } from './functions.js';
import { slotList } from './slotList.js';

export const generateTimetable = () => {
  const data = getData();
  const timetable = getTemplate();
  const registeredCourses = [];
  for (let course of data) {
    if (registeredCourses.indexOf(course.code) === -1) {
      const formattedSlots = course.slots.split(',').map((s) => s.toLowerCase());
      let courseSlots = [];
      for (let slot of formattedSlots) {
        const courseSlot = slotList.filter((s) => s.includes(slot));
        courseSlots = courseSlots.concat(courseSlot);
      }
      courseSlots.map((c) => {
        if (c.isFilled) return;
        timetable[c].code = course.code;
        timetable[c].isFilled = true;
        registeredCourses.push(course.code);
      });
    }
  }
};
