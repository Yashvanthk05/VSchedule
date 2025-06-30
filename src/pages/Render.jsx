import Timetable from '../components/Timetable';
import { section, sechead, secbody } from './styles/Section.css';

const Render = ({refresh}) => {
  return (
    <div className={section}>
      <div className={secbody}>
        <p className={sechead}>TIMETABLE</p>
        <Timetable refresh={refresh} />
      </div>
    </div>
  );
};

export default Render;
