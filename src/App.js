
import React, { useState } from 'react';
import { Col, Row, Space, Switch, } from 'antd';
import JsonFormatter from './JsonFormatter';

const themes = [];

function App() {
  const [hideRight, setHideRight] = useState(false);

  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <h1>
        JSON Viewer and formatter!
      </h1>

      <Switch checkedChildren="Side by side" unCheckedChildren="Side by side" defaultChecked checked={!hideRight}
        onChange={e => setHideRight(!hideRight)} />

      <Row wrap={false} gutter={12}>
        <Col span={hideRight ? 24 : 12}>
          <JsonFormatter appId="1" count={hideRight ? 1 : 2}/>
        </Col>
        {!hideRight &&
          <Col span={12}>
            <JsonFormatter appId="2" count={hideRight ? 1 : 2}/>
          </Col>
        }
      </Row>
    </Space>
  );
}

export default App;
