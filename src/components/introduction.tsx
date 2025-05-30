import { Typography, Row, Col, Image } from 'antd';
import '@/../public/styles/globals.css';
import my_photo from '@/assets/me_1.png';
const { Text } = Typography;
export default function Introduction() {
  return (
    <>
      <Row
        style={{ height: '80vh' }}
        align={'middle'}
        justify={'center'}
        className="primary-background"
      >
        <Col span={14}>
          <Row align={'middle'} justify={'center'} className="title center-align">
            Iago de Aquino Oliveira
          </Row>
          <Row align={'middle'} justify={'center'} className="normal-text justify-align">
            <Col span={16} className="normal-text justify-align">
              Olá, meu nome é Iago de Aquino Oliveira e criei essa land page com o objetivo de
              praticar desenvolvimento e compartilhar sobre meu trabalho. Sou bacharel e cientista
              da computação formado pela Universidade Federal do Ceara (UFC). Junto com isso, tenho
              certificado tecnico em informatico gerado pela EEEP Osmira Eduardo de Castro onde
              conclui meu curso de informatica e encontrei minha vontade de trabalhar com
              desenvolvimento. Trabalhei nas startups Fusion Tecnology e Medusas Eyes, onde pude
              obter experiência em desenvolvimento full-stack e desenvolvimento de IAs para
              otimização industrial Nessa pagina você encontrarar mais informações sobre meus
              repositorios mais relevantes no github e da minha jornada como desenvolvedor
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Row>
            <Image src={my_photo.src} height={'80vh'} width={'100vh'}></Image>
          </Row>
        </Col>
      </Row>
    </>
  );
}
