import { FaGithub } from 'react-icons/fa6';
import { navbar, nav_section, navhead } from './styles/Navbar.css';

const Navbar = () => {
  return (
    <div className={navbar}>
      <div className={nav_section}>
        <a href="/vschedule/" className={navhead}>
          VSchedule
        </a>
      </div>
      <a
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'white',
          borderRadius: 5,
          padding: 5,
          fontSize: 18,
          color: 'black',
        }}
        href="https://github.com/kdx-08/vit-ffcs-planner"
        target="_blank"
      >
        <FaGithub size={22} /> Github
      </a>
    </div>
  );
};

export default Navbar;
