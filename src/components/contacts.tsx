import { Row, Col } from 'antd';
import { GitHubIcon, LinkedinIcon, GmailIcon, WhatsappIcon } from './svg_controler';
import { CloseOutlined } from '@ant-design/icons';

import '@/styles/globals.css';

interface contatsInterface {
  setHideContats: Function;
}

export default function Contats({ setHideContats }: contatsInterface) {
  const navigate_to_contact = (route: string) => {
    window.open(route, '_blank');
  };

  return (
    <>
      <Row justify={'center'} align={'middle'} className="secondary-background normal-text rounded">
        <Col span={24}>
          <Row justify={'center'} align={'middle'} className="clicable">
            <GitHubIcon
              className="contact-icon"
              onClick={() => {
                navigate_to_contact('https://github.com/iagoaquino');
              }}
            />
          </Row>
          <Row
            justify={'center'}
            align={'middle'}
            style={{ marginTop: 10 }}
            className="clicable"
            onClick={() => {
              navigate_to_contact('https://www.linkedin.com/in/iago-aquino-a380b5235/');
            }}
          >
            <LinkedinIcon className="contact-icon" />
          </Row>
          <Row justify={'center'} align={'middle'} style={{ marginTop: 10 }} className="clicable">
            <WhatsappIcon
              className="contact-icon"
              onClick={() => {
                navigate_to_contact('https://wa.me/5588993089933');
              }}
            />
          </Row>
          <Row
            justify={'center'}
            align={'middle'}
            style={{ marginTop: 10 }}
            className="clicable"
            onClick={() => {
              navigate_to_contact(
                'https://mail.google.com/mail/?view=cm&fs=1&to=iagodeaquino10@gmail.com'
              );
            }}
          >
            <GmailIcon className="contact-icon" />
          </Row>
          <Row
            justify={'center'}
            style={{ marginTop: 10, marginBottom: 10 }}
            className="clicable"
            onClick={() => {
              setHideContats(true);
            }}
          >
            <CloseOutlined className="secondary-font-color" />
          </Row>
        </Col>
      </Row>
    </>
  );
}
