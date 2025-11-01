import CourseItem from './CourseItem';
import { sechead } from '../pages/styles/Section.css';
import { noCaption, courseContainer, listTitle } from './styles/CourseList.css';
import { desc, item } from './styles/CourseItem.css';


const CourseList = ({ courses, handleDelete, handleChange, sem }) => {
  return (
    <div>
      <h2 className={sechead}>Course List</h2>
      <div className={courseContainer}>
        {courses.length > 0 ? (
          <div>
            <div className={`${item} ${desc}`}>
              <span className={listTitle}>Course Code</span>
              <span className={listTitle}>Course Name</span>
              <span className={listTitle}>Slots</span>
              <span className={listTitle}>Faculties</span>
              <span className={listTitle}>Actions</span>
            </div>
            {courses.sort((a,b)=> a.code.localeCompare(b.code)).map((course, index) => (
              <CourseItem
                course={course}
                handleDelete={handleDelete}
                id={course.id}
                key={course.id}
                handleChange={handleChange}
                sem={sem}
                courses={courses}
              />
            ))}
          </div>
        ) : (
          <p className={noCaption}>
            There are no courses in the timetable, add one to see it here!
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
