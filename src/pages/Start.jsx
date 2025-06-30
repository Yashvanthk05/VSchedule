import { container } from './styles/Start.css';
import InputForm from '../components/InputForm';
import CourseList from '../components/CourseList';
import { getData, saveData } from '../utils/functions';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import data from '../models/fall.json';
import toast from 'react-hot-toast';
import Render from './Render';

const Start = () => {
  const [courses, setCourses] = useState(getData());
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [coursesuggestion, setCoursesuggestion] = useState([]);

  const handleDelete = (id) => {
    setCourses((oldCourses) => oldCourses.filter((c) => c.id !== id));
    saveData(courses.filter((c) => c.id !== id));
    toast.success('Course Deleted Successfully');
  };

  const handleAdd = (course) => {
    saveData([...courses, course]);
    setCourses((oldCourses) => [...oldCourses, course]);
  };

  const handleChange = (course) => {
    saveData([...courses.filter((c) => c.id !== course.id), course]);
    setCourses(getData());
    toast.success('Course Updated Successfully');
  };

  const handleCode = (e) => {
    const input = e.target.value.toUpperCase();
    setCode(input);
    const suggestions = data
      .filter(
        (item) =>
          item['COURSE CODE'].includes(input) || item['COURSE TITLE'].toUpperCase().includes(input)
      )
      .reduce(
        (acc, item) => {
          const key = `${item['COURSE CODE']} - ${item['COURSE TITLE']}`;
          if (!acc.map.has(key)) {
            acc.map.set(key, true);
            acc.items.push({
              display: key,
              code: item['COURSE CODE'],
              title: item['COURSE TITLE'],
              slots: new Set([item['SLOT']]),
              faculties: new Set([item['EMPLOYEE NAME']]),
            });
          } else {
            const existing = acc.items.find((i) => i.code === item['COURSE CODE']);
            existing.slots.add(item.SLOT);
            existing.faculties.add(item['EMPLOYEE NAME']);
          }
          return acc;
        },
        { items: [], map: new Map() }
      ).items;
    setCoursesuggestion(suggestions);
    setName('');
  };

  const handleCourse = (item) => {
    setCode(item.code);
    setName(item.title);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCode('');
    setName('');
  };

  return (
    <>
      <div className={container}>
        <Navbar />
        <InputForm
          handleAdd={handleAdd}
          handleCode={handleCode}
          handleCourse={handleCourse}
          handleReset={handleReset}
          coursesuggestion={coursesuggestion}
          code={code}
          name={name}
        />
        <CourseList
          courses={courses}
          handleDelete={handleDelete}
          setCode={setCode}
          setName={setName}
          handleChange={handleChange}
        />
        <Render key={1029330} />
      </div>
    </>
  );
};

export default Start;
