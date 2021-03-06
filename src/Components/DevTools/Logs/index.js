import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../../Common/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

const LogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: calc(100% - 24px);
  width: 100%;
  overflow: auto;

  > div {
    margin-bottom: 16px;
    font-size: 14px;
    color: #ffffff;
    width: 100%;
  }
`;

const Logs = ({ logs }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo(0, 1000000);
    }
  }, [logs]);

  return (
    <Container>
      <Header>{'Message Logs'}</Header>
      <LogsContainer
        ref={containerRef}
      >
        {logs.map((item, idx) => (
          <div key={idx}>{JSON.stringify(item, null, 2)}</div>
        ))}
      </LogsContainer>
    </Container>
  );
};

Logs.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object),
};

Logs.defaultProps = {
  logs: [],
};

export default Logs;
