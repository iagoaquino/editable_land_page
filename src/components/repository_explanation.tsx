import { Carousel, Row, Col } from 'antd';
import { useState } from 'react';

export default function RepositoryExplanation() {
  const [arrowColorClass, setArrowColorClass] = useState('primary-arrow');
  const [ProgressClass, setProgressClass] = useState('primary-progress');

  const handle_arrow_color_change = (position: number) => {
    if ((position + 1) % 2 == 1) {
      setArrowColorClass('primary-arrow');
      setProgressClass('primary-progress');
    } else {
      setArrowColorClass('secondary-arrow');
      setProgressClass('secondary-progress');
    }
  };

  return (
    <Row className="secondary-background">
      <Col span={24}>
        <Row justify={'center'} className="title">
          Programas desenvolvidos
        </Row>
        <Carousel
          className={`${arrowColorClass} ${ProgressClass}`}
          afterChange={handle_arrow_color_change}
          dotPosition="top"
          arrows
          infinite={true}
          style={{ height: '30vh' }}
        >
          <div>
            <Row
              className="primary-background"
              justify={'center'}
              align={'middle'}
              style={{ height: '30vh' }}
            >
              <Col span={16}>
                <Row className="title" justify={'center'} align={'middle'}>
                  Liago
                </Row>
                <Row className="normal-text justify-align" justify={'center'} align={'middle'}>
                  Esse repositorio contem minha primeira pagina web, ela foi feita em PHP com o
                  auxilio da minha colega Livia. Ele contem uma pagina de um Petshop cujo os textos
                  podem ser mudados nas configurações de administrador que pode ser acessado ao
                  entrar com login e senha na pagina de funcionarios
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row
              className="secondary-background"
              justify={'center'}
              align={'middle'}
              style={{ height: '30vh' }}
            >
              <Col span={16}>
                <Row className="title" justify={'center'} align={'middle'}>
                  compressor-python
                </Row>
                <Row className="normal-text justify-align" justify={'center'} align={'middle'}>
                  Esse repositorio contem um compressor de imagems feito em python que consegue com
                  uma baixa perda comprir uma imagem de 800 MB em menos de 200 MB onde trabalho com
                  meu Colega Wesley. O compressor utiliza da logica de huffman para compactar os
                  bytes das imagens em bits e reduzir o seu tamanho, o repositorio também possui um
                  descompactador para que você possa recuperar a imagem após sua compactação.
                  Dependendo das configurações usadas na hora da compactação é possivel chegar a
                  arquivos bem pequenos no entanto pode acabar havendo muitas perdas se exagerar
                  demais.
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row
              className="primary-background"
              justify={'center'}
              align={'middle'}
              style={{ height: '30vh' }}
            >
              <Col span={16}>
                <Row className="title" justify={'center'} align={'middle'}>
                  coletor_de_reviews
                </Row>
                <Row className="normal-text justify-align" justify={'center'} align={'middle'}>
                  Esse repositorio contem o codigo em python que criei para coletar as revisões
                  feitas pelos jogadores para o jogo Baldurs Gate 3 e Divinity: Original Sin 2 onde
                  usei ele para uma avaliação textual e relatar os resultados no meu TCC. Esse
                  codigo coleta os comentarios através de uma requisição usando a biblioteca request
                  para API da Steam, o consumo da API é gratuita no entanto alguns serviços é
                  necessario uma chave obtida após se cadastrar como desenvolvedor e pagar a licença
                  para Steam.
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row
              className="secondary-background"
              justify={'center'}
              align={'middle'}
              style={{ height: '30vh' }}
            >
              <Col span={16}>
                <Row className="title" justify={'center'} align={'middle'}>
                  Essa land Page
                </Row>
                <Row className="normal-text justify-align" justify={'center'} align={'middle'}>
                  Essa land page esta salva no meu repositorio do github, ela contem parte da minha
                  historia como desenvolvedor mas sua principal feature é a facilidade de edição das
                  cores desse site, se você navegar para a pagina configuration_page você vai
                  conseguir mudar as cores e tamanho das fontes presente nessa pagina.
                </Row>
              </Col>
            </Row>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
}
