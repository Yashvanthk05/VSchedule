import { useEffect, useState } from 'react';
import { crossBtn, desc, dropdown, item, tickBtn } from './styles/CourseItem.css';
import toast from 'react-hot-toast';

const CourseItem = ({ course, handleDelete, id, handleChange, sem }) => {
  const [slots, setSlots] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(course.slots);
  const [selectedFaculty, setSelectedFaculty] = useState(course.faculty ? course.faculty : '');
  const [selectedSlotOg, setSelectedSlotOg] = useState(
    course.slots ? course.slots.replaceAll('_', '').replaceAll(',', '+') : ''
  );
  const [updatedCourse, setUpdatedCourse] = useState({
    id: id,
    code: course.code,
    slots: course.slots,
    faculty: course.faculty,
  });
  const [data, setData] = useState([]);

  const handleCode = () => {
    const courseCode = course.code;
    const slotsSet = new Set();
    const facultiesSet = new Set();
    data
      .filter((item) => item['COURSE CODE'] === courseCode)
      .map((item) => (slotsSet.add(item.SLOT), facultiesSet.add(item['EMPLOYEE NAME'])));
    setSlots([...slotsSet]);
    setFaculties([...facultiesSet]);
  };

  useEffect(() => {
    async function loadData() {
      try {
        let module;
        if (sem === 'fall') {
          module = await import('../models/fall.json');
        } else {
          module = await import('../models/winter.json');
        }
        setData(module.default);
      } catch (error) {
        console.log('Error loading JSON: ', error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      handleCode();
    }
  }, [data]);

  const handleSlot = (e) => {
    const input = e.target.value;
    setSelectedSlotOg(input);
    const slotarr = input.split('+');
    var slotstr = '';
    for (var i = 0; i < slotarr.length - 1; i++) {
      slotstr += `_${slotarr[i]}_,`;
    }
    slotstr += `_${slotarr[slotarr.length - 1]}_`;
    setUpdatedCourse({ ...updatedCourse, slots: slotstr });
    setSelectedSlot(slotstr);
    const matchingFaculties = data
      .filter((item) => item['COURSE CODE'] === course.code && item.SLOT === input)
      .map((item) => item['EMPLOYEE NAME'].toUpperCase());
    setFaculties([...new Set(matchingFaculties)]);
    if (!matchingFaculties.includes(selectedFaculty.toUpperCase())) {
      setSelectedFaculty('');
    }
  };

  const handleFaculty = (e) => {
    const input = e.target.value.toUpperCase();
    setSelectedFaculty(input);
    setUpdatedCourse({ ...updatedCourse, faculty: input });
    const matchingSlots = data
      .filter(
        (item) =>
          item['COURSE CODE'] === course.code && item['EMPLOYEE NAME'].toUpperCase() === input
      )
      .map((item) => item.SLOT.toUpperCase());
    setSlots([...new Set(matchingSlots)]);
    if (!matchingSlots.includes(selectedSlotOg.toUpperCase())) {
      setSelectedSlot('');
      setSelectedSlotOg('');
    }
  };

  return (
    <div className={`${item} ${desc}`}>
      <span>{course.code}</span>
      <span>
        <select
          name="slots"
          id="slots"
          className={dropdown}
          onChange={handleSlot}
          value={selectedSlotOg}
          required
        >
          <option value="" disabled hidden>
            Select Slot
          </option>
          {slots.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </span>
      <span>
        <select
          name="faculties"
          id="faculties"
          className={dropdown}
          onChange={handleFaculty}
          value={selectedFaculty}
        >
          <option value="" disabled hidden>
            Select faculty
          </option>
          {faculties.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 25 }}>
        <button className={crossBtn} onClick={() => handleDelete(id)}>
          &#x2715;
        </button>
        <button
          className={tickBtn}
          onClick={() => {
            if (!selectedFaculty && !selectedSlot) {
              toast.error('Select both faculty and slot');
            } else {
              handleChange(updatedCourse);
            }
          }}
        >
          &#10004;
        </button>
      </div>
    </div>
  );
};

export default CourseItem;
