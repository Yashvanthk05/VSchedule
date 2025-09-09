import { useEffect, useState } from 'react';
import Table from '../components/Tabel';
import { generate, getData } from '../utils/functions';

const Generate = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result = generate();
    setData(result);
  }, []);

  return (
    <div>
      <h1>Total Possible Timetables: {data.length}</h1>
      {data.map((table, idx) => (
        <Table key={idx} table={table} tableid={idx} />
      ))}
    </div>
  );
};

export default Generate;
