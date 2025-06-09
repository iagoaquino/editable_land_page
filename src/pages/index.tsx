import { Row, Col, Layout, Menu, Divider, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get_selected_style } from '@/api_connection';

import { PhoneOutlined } from '@ant-design/icons';

import Introduction from '@/components/introduction';
import Experiences from '@/components/experience';
import Contats from '@/components/contacts';
import RepositoryExplanation from '@/components/repository_explanation';

const { Header, Content } = Layout;
export default function Home() {
  const router = useRouter();
  const items = [
    {
      key: 'introduction',
      label: <a href="#introduction">Introduction</a>,
    },
    {
      key: 'experiences',
      label: <a href="#experiences">Experiences</a>,
    },
    {
      key: 'programas_desenvolvidos',
      label: <a href="#programas_desenvolvidos">Programas desenvolvidos</a>,
    },
  ];

  const [currentKey, setCurrentKey] = useState<Array<string>>(['introduction']);

  const [hideHeader, setHideHeader] = useState<boolean>(false);

  const [hideFooter, setHideFooter] = useState<boolean>(true);

  const update_css = async () => {
    const current_css_text = await get_selected_style('applied_css', 'current_applied_style');
    const oldStyle = document.getElementById('dynamic_style');
    if (oldStyle) oldStyle.remove();

    const newStyle = document.createElement('style');
    newStyle.id = 'dynamic_style';
    newStyle.innerText = current_css_text;
    document.head.appendChild(newStyle);
  };

  useEffect(() => {
    update_css();
  }, []);

  const wheel_handler = (action_value: number) => {
    setHideHeader(action_value > 0 ? true : false);
  };

  const navegation_handler = (key: any) => {
    setCurrentKey(key['keyPath']);
  };

  return (
    <div
      onWheel={(event) => {
        wheel_handler(event['deltaY']);
      }}
    >
      <Header
        style={{
          position: 'fixed',
          transition: 'transform 0.3s ease',
          transform: hideHeader ? 'translateY(-100%)' : 'translateY(0)',
          zIndex: 1000,
          width: '100%',
        }}
      >
        <Menu
          items={items}
          mode="horizontal"
          className="primary-background"
          selectedKeys={currentKey}
          onClick={navegation_handler}
        />
      </Header>
      <Content>
        <Row
          id="introduction"
          onMouseOver={() => {
            setCurrentKey(['introduction']);
          }}
          onClick={() => {
            router.push('#introduction');
          }}
        >
          <Introduction />
        </Row>
        <Row
          id="experiences"
          onMouseOver={() => {
            setCurrentKey(['experiences']);
          }}
          onClick={() => {
            router.push('#experiences');
          }}
        >
          <Experiences />
        </Row>
        <Row
          id="programas_desenvolvidos"
          onMouseOver={() => {
            setCurrentKey(['programas_desenvolvidos']);
          }}
          onClick={() => {
            router.push('#programas_desenvolvidos');
          }}
        >
          <RepositoryExplanation />
        </Row>
      </Content>
      <Row
        onClick={() => {
          setHideFooter(false);
        }}
        style={{
          position: 'fixed',
          transition: 'transform 0.6s ease',
          transform: hideFooter ? 'translateY(100%)' : 'translateY(-100vh)',
          bottom: '80vh',
          left: '5vh',
          width: '6vh',
          height: '6vh',
          zIndex: 1200,
        }}
      >
        <Button className="third-background">
          <Row>
            <PhoneOutlined />
          </Row>
        </Button>
      </Row>
      <Row
        style={{
          position: 'fixed',
          transition: 'transform 0.6s ease',
          transform: !hideFooter ? 'translateY(100%)' : 'translateY(-100vh)',
          bottom: '80vh',
          left: '5vh',
          width: '6vh',
          height: '6vh',
          zIndex: 1200,
        }}
      >
        <Contats setHideContats={setHideFooter} />
      </Row>
    </div>
  );
}
