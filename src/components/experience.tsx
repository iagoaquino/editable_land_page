import { Row, Col, Steps } from 'antd';
import { JSX, useState } from 'react';
export default function Experiences() {
  const text_components = [
    <>
      <Row className="normal-text center-align" justify={'center'} align={'middle'}>
        <Col span={16}>
          Meu ensino medio aconteceu na Escola Estadual de Educação Profissional Osmira Eduardo de
          Castro foi nesse periodo que também descobri minha vontade de trabalhar com
          desenvolvimento de aplicações. Durante esse periodo de desenvolvi meu primeiro site que
          esta salvo no meu repositorio no meu github com o nome de Liago(o nome vem da junção de
          Livia e Iago, Livia me auxiliou no desenvolvimento dessa interface por isso tem parte de
          seu nome nele). Tambem nesse periodo fiz parte de uma equipe para o desenvolvimento de:
          Biojogos, ferramenta tecnológica de estudo e revisão para o enem.
        </Col>
      </Row>
    </>,
    <>
      <Row className="normal-text center-align" justify={'center'} align={'middle'}>
        <Col span={16}>
          Durante minha vida academica fiz parte de alguns projetos que me ajudaram a obter
          experiência no ramo de desenvolvimento profissional sendo eles a startup Fusion Tecnology
          e a startop Medusas eyes. Em ambos foi feito o desenvolvimento de uma aplicação para Apodi
          uma grande industria de produção de cimento Na Fusion Tecnology foi desenvolvido uma IA
          para a otimização de produção de cimento, nesse projeto trabalho como full-stack
          desenvolvendo tanto o frontend quanto o backend da interface junto com outras aplicações
          em python necessarios para a IA. No Medusas Eyes fiquei responsavel por parte do
          desenvolvimento do frontend onde pude ter a experiência de desenvolver uma interface web
          junto a modelagens feito com o Figma. Agora após obter meu bacharelato em Ciência da
          Computação estou em busca de outras empresas para que possa expandir ainda mais minha
          experência de mercado
        </Col>
      </Row>
    </>,
  ];

  const [currentText, setCurrentText] = useState<JSX.Element>(text_components[0]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const text_change = (value: number) => {
    setCurrentStep(value);
    setCurrentText(text_components[value]);
  };

  return (
    <Row
      style={{ height: '40vh' }}
      align={'middle'}
      justify={'center'}
      className="secondary-background"
    >
      <Col>
        <Row className="title" justify={'center'} style={{ marginBottom: 50 }}>
          Experiências
        </Row>
        <Row justify={'center'} style={{ marginBottom: 50 }}>
          <Steps
            type="navigation"
            progressDot
            current={currentStep}
            style={{ width: '20%' }}
            items={[{ title: 'Ensino Medio' }, { title: 'Faculdade' }]}
            onChange={text_change}
          ></Steps>
        </Row>
        <Row justify={'center'} className="normal-text center-align">
          {currentText}
        </Row>
      </Col>
    </Row>
  );
}
