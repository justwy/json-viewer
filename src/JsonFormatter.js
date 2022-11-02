
import ReactJson from 'react-json-view'
import React, { Component, useState, useEffect } from 'react';
import JSON5 from 'json5'
import { useSearchParams } from "react-router-dom";
import { Input, Space, Collapse } from 'antd';
import request from 'request';
import "antd/dist/antd.css";
import "./index.css"

const LOCAL_STORE_KEY = 'JVDTASCLR'

function JsonFormatter({ appId, count }) {
  let [userInput, setUserInput] = useState('');

  let [searchParams, setSearchParams] = useSearchParams();

  const localContent = localStorage.getItem(LOCAL_STORE_KEY + appId);

  let [gistContent, setGistContent] = useState('');
  const gistFileLink = searchParams.get('gistRaw'+appId) || '';
  useEffect(() => {

    console.log('gistFileLink: ', gistFileLink);

    if (gistFileLink) {
      request(gistFileLink, function (error, response, body) {
        if (error) {
          console.error('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          setGistContent('');
        } else {
          console.log('body:', body); // Print the HTML for the Google homepage.
          setGistContent(body);
        }
      });
    }
  })

  const content = gistContent || userInput || localContent || '';

  let obj = {}
  try {
    obj = JSON5.parse(content);
  } catch (e) {
    obj = {}
  }

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['0']}>
        <Collapse.Panel header="Input">
          <div className='json-input'>
            <Input.TextArea
              disabled={gistContent}
              id="json-input"
              value={content}
              onChange={e => {
                localStorage.setItem(LOCAL_STORE_KEY + appId, e.target.value);
                setUserInput(e.target.value);
              }}
            />
          </div>
        </Collapse.Panel>
      </Collapse>


      <div className="autoscroll">
        <ReactJson
          theme="rjv-default"
          collapseStringsAfterLength={120 / count}
          iconStyle="square"
          enableClipboard={true}
          displayDataTypes={false}
          name={false}
          src={obj} />
      </div>
    </div >
  );
}

export default JsonFormatter;
