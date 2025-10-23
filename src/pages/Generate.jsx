import { useEffect, useState } from 'react';
import Table from '../components/Tabel';
import { generate, getData } from '../utils/functions';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import { editButton, timetablesCountText, mainDiv } from './styles/Generate.css';

const Generate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/start');
  };

  useEffect(() => {
    const result = generate();
    setData(result);
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <div className={mainDiv}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
          <h1 className={timetablesCountText}>Total Possible Timetables: {data.length}</h1>
          <button className={editButton} onClick={handleRedirect}>Edit details</button>
          {data.map((table, idx) => (
            <Table table={table} tableid={idx} hidden={true} />
          ))}
        </>
      )}
    </div>
    </>
  );
};

export default Generate;
