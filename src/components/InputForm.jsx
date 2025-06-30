import { useState } from 'react';
import {
  form,
  input,
  label,
  reset,
  addBtn,
  section,
  buttons,
  suggestion,
  suggestitem,
  light,
  highlight,
} from './styles/InputForm.css.js';
import { toast, Toaster } from 'react-hot-toast';
import { validate } from '../utils/functions.js';
import { v7 } from 'uuid';

const InputForm = ({
  handleAdd,
  handleCode,
  handleCourse,
  coursesuggestion,
  code,
  name,
  handleReset,
  sem,
  setSem,
  setCode,
  setName,
}) => {
  const [suggestIdx, setSuggestIdx] = useState(-1);
  
  const handleSem = (e) => {
    setSem(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (suggestIdx > -1 && e.key === 'ArrowUp') {
      setSuggestIdx((prev) => prev - 1);
    } else if (suggestIdx < 9 && e.key === 'ArrowDown') {
      setSuggestIdx((prev) => prev + 1);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const index = suggestIdx >= 0 ? suggestIdx : 0;
      setCode(coursesuggestion[index].code);
      setName(coursesuggestion[index].title);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const inputCode = code;
    const classObj = { id: v7(), code: inputCode, slots: '', faculty: '' };
    if (inputCode === '') {
      toast.error('Invalid input');
      return;
    }
    if (validate(classObj) === 'valid') {
      toast.success('Course added successfully');
      handleAdd(classObj);
      handleReset(e);
    } else if (validate(classObj) === 'exists') toast.error('Course already exists');
    else toast.error('Something went wrong');
  };

  return (
    <form className={form} onSubmit={handleForm}>
      <div className={section}>
        <label className={label} htmlFor="sem">
          Semester:
        </label>
        <select className={input} name="sem" id="sem" onChange={handleSem} value={sem}>
          <option value="fall">Fall Semester</option>
          <option value="winter">Winter Semester</option>
        </select>
      </div>
      <div className={section}>
        <label className={label} htmlFor="ccode">
          Course:
        </label>
        <input
          required
          placeholder="Course Code or Title"
          className={input}
          type="text"
          name="ccode"
          id="ccode"
          value={code}
          onKeyDown={handleKeyPress}
          onChange={handleCode}
          autoComplete="off"
          autoFocus
        />
        {!name && coursesuggestion.length > 0 && code.length > 0 ? (
          <ul className={suggestion}>
            {coursesuggestion.slice(0, 10).map((item, index) => (
              <>
                <li
                  className={`${suggestitem} ${index === suggestIdx ? highlight : ''}`}
                  key={index}
                  onClick={() => handleCourse(item)}
                >
                  {item.display.slice(0, 42)}..
                </li>
              </>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
      <div className={section}>
        <label className={`${label}`} htmlFor="title">
          Title:
        </label>
        {name ? (
          <span className={input}>{name}</span>
        ) : (
          <span className={`${input} ${light}`}>Course Title</span>
        )}
      </div>
      <div className={buttons}>
        <button className={reset} onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className={addBtn}>
          Add Course
        </button>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            background: '#1e60ff',
            color: 'white',
            bottom: '20px',
          },
        }}
      />
    </form>
  );
};

export default InputForm;
