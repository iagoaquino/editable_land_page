import { Row, Layout, Menu, Button } from 'antd';
import { useEffect, useState } from 'react';
import { get_selected_style } from '../api_connection';
import { useNavigate } from 'react-router';
import { PhoneFilled } from '@ant-design/icons';
import Introduction from '../components/introduction';
import Experiences from '../components/experience';
import Contats from '../components/contacts';
import RepositoryExplanation from '../components/repository_explanation';

const { Header, Content } = Layout;
export default function Home() {
  const navigate = useNavigate();
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <Content style={{ width: '100%' }}>
        <Row
          id="introduction"
          onMouseOver={() => {
            setCurrentKey(['introduction']);
          }}
          onClick={() => {
            navigate('#introduction');
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
            navigate('#experiences');
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
            navigate('#programas_desenvolvidos');
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
            <PhoneFilled />
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
