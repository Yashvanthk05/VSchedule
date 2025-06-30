import { useEffect } from 'react';
import QuickButton from './QuickButton';
import { container, row, row_h, groupContainer } from './styles/QuickViz.css';

const QuickViz = ({ setActiveList, activeList }) => {
  useEffect(() => {}, [activeList]);

  return (
    <div>
      <div className={row_h}>Quick Visualization</div>
      <div className={groupContainer}>
        <div className={container}>
          <div className={row}>
            <QuickButton value="A1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="B1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="C1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="D1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="E1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="F1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="G1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="S11" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="S15" setActiveList={setActiveList} activeList={activeList} />
          </div>
          <div className={row}>
            <QuickButton value="TA1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TB1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TC1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TD1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TE1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TF1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TG1" setActiveList={setActiveList} activeList={activeList} />
          </div>
          <div className={row}>
            <QuickButton value="TAA1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TBB1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TCC1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TDD1" setActiveList={setActiveList} activeList={activeList} />
          </div>
        </div>
        <div className={container}>
          <div className={row}>
            <QuickButton value="A2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="B2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="C2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="D2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="E2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="F2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="G2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="S3" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="S1" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="S4" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="S2" setActiveList={setActiveList} activeList={activeList} />
          </div>
          <div className={row}>
            <QuickButton value="TA2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TB2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TC2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TD2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TE2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TF2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TG2" setActiveList={setActiveList} activeList={activeList} />
          </div>
          <div className={row}>
            <QuickButton value="TAA2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TBB2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TCC2" setActiveList={setActiveList} activeList={activeList} />
            <QuickButton value="TDD2" setActiveList={setActiveList} activeList={activeList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViz;
