import { useEffect, useState } from 'react';
import data from '../models/slots.json';
import {
  table,
  theader,
  ttheader,
  day,
  lunch,
  tdefault,
  filled,
  clash,
  lunch_bg,
  btn,
  btns,
  download,
  reset,
} from './styles/Timetable.css';
import { getData, saveData, transform } from '../utils/functions';
import { getTemplate } from '../utils/template';
import QuickViz from './QuickViz';
import { LuRefreshCcw } from 'react-icons/lu';
import { HiDownload } from 'react-icons/hi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Timetable = ({ refresh, setRefresh }) => {
  const [timetableData, setTimeTableData] = useState(getData());
  const [activeList, setActiveList] = useState([]);
  const timetable = getTemplate();
  const allSlots = transform([...Object.keys(getTemplate())]);

  useEffect(() => {
    setTimeTableData(getData());
  }, [refresh]);

  useEffect(() => {
    for (let slot of allSlots) {
      const block = document.getElementById(slot);
      block.classList.remove(filled);
      block.classList.remove(clash);
      block.innerText = slot
        .slice(1, slot.length - 1)
        .replace('_', ' / ')
        .replace(' / undefined', '')
        .toUpperCase();
    }
    if (activeList.length > 0) {
      const transformedSlots = transform(activeList.map((i) => `_${i.toLowerCase()}_`));
      for (let slot of transformedSlots) {
        const block = document.getElementById(slot);
        block.classList.add(filled);
      }
    }

    for (let course of timetableData) {
      const slots = transform(course.slots.split(',').map((s) => s.toLowerCase()));
      for (let slot of slots) {
        const block = document.getElementById(slot);
        if (!timetable[slot].isFilled) {
          timetable[slot].code = course.code;
          timetable[slot].isFilled = true;
          block.classList.add(filled);
          block.innerText = course.code;
        } else {
          block.innerText += ` ${course.code}`;
          block.classList.add(clash);
        }
      }
    }
  }, [timetableData, activeList]);

  const resetTimetable = () => {
    saveData([]);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
      <QuickViz setActiveList={setActiveList} activeList={activeList} />
      <div>
        <div className={btns}>
          <button className={`${btn} ${reset}`} onClick={() => resetTimetable()}>
            <LuRefreshCcw /> Reset
          </button>
          <button className={`${btn} ${download}`} onClick={() => window.print()}>
            <HiDownload /> Download
          </button>
        </div>
        <br />
        <table id="printTable" className={table}>
          <thead>
            <tr className={theader}>
              <td className={ttheader}>
                Lecture
                <br />
                Hours
              </td>
              {data.theoryHours.map((item, index) => (
                <>
                  {index == 6 && <td className={ttheader}></td>}
                  <td className={ttheader}>{item}</td>
                </>
              ))}
            </tr>
            <tr className={theader}>
              <td className={ttheader}>
                Lab
                <br />
                Hours
              </td>
              {data.labHours.map((item, index) => (
                <>
                  {index == 6 && <td className={ttheader}></td>}
                  <td className={ttheader}>{item}</td>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.days.map((item, index) => (
              <tr key={index}>
                <td className={day}>{item.day}</td>
                {item.slots.map((slot, i) => (
                  <>
                    {index === 0 && i === 6 && (
                      <td className={lunch_bg} rowSpan={data.days.length}>
                        <div className={lunch}>
                          <span>L</span>
                          <span>U</span>
                          <span>N</span>
                          <span>C</span>
                          <span>H</span>
                        </div>
                      </td>
                    )}
                    <td
                      className={`${ttheader} ${tdefault}`}
                      key={i}
                      id={`_${slot.split(' / ')[0].toLowerCase()}_${slot
                        .split(' / ')[1]
                        ?.toLowerCase()}_`}
                      onClick={() => {
                        activeList.includes(slot.split(' / ')[0])
                          ? setActiveList(activeList.filter((i) => i !== slot.split(' / ')[0]))
                          : setActiveList((prev) => [...prev, slot.split(' / ')[0]]);
                      }}
                    >
                      {slot}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
