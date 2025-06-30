import { container } from './styles/Start.css';
import InputForm from '../components/InputForm';
import CourseList from '../components/CourseList';
import { getData, saveData } from '../utils/functions';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import Render from './Render';

const Start = () => {
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [coursesuggestion, setCoursesuggestion] = useState([]);
  const date = new Date();
  const [sem, setSem] = useState(date.getMonth() >= 5 && date.getMonth() <= 10 ? 'fall' : 'winter');
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);

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
  }, [sem]);

  useEffect(() => {
    const data = getData();
    setCourses(data);
  }, []);

  const handleDelete = (id) => {
    saveData(courses.filter((c) => c.id !== id));
    setCourses((oldCourses) => oldCourses.filter((c) => c.id !== id));
    toast.success('Course Deleted Successfully');
  };

  const handleAdd = (course) => {
    saveData([...courses, course]);
    setCourses((oldCourses) => [...oldCourses, course]);
  };

  const handleChange = (course) => {
    saveData([...courses.filter((c) => c.id !== course.id), course]);
    setCourses(getData());
    setRefresh((prev) => prev + 1);
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
        sem={sem}
        setSem={setSem}
        setCode={setCode}
        setName={setName}
      />
      <CourseList
        courses={courses}
        handleDelete={handleDelete}
        setCode={setCode}
        setName={setName}
        handleChange={handleChange}
        sem={sem}
      />
      <Render refresh={refresh} />
    </div>
  );
};

export default Start;
