import {
  ColorPicker,
  Layout,
  Row,
  Col,
  Button,
  GetProp,
  ColorPickerProps,
  Select,
  Card,
  InputNumber,
} from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import '@/styles/globals.css';
import { save_new_css_configuration } from '@/api_connection/';

const { Content, Footer, Header } = Layout;
const { Option } = Select;

export default function ConfigurationPage() {
  type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

  //Color configuration
  const [primaryColor, setPrimaryColor] = useState<string | Color>('');
  const [secondaryColor, setSecondaryColor] = useState<string | Color>('');
  const [thirdColor, setThirdColor] = useState<string | Color>('');
  const [primaryFontColor, setPrimaryFontColor] = useState<string | Color>('');
  const [secondaryFontColor, setSecondaryFontColor] = useState<string | Color>('');

  //Font configuration
  const [titleWeight, setTitleWeight] = useState<number | any>(0);
  const [titleSize, setTitleSize] = useState<string>('');
  const [titleFontFamily, setTitleFontFamily] = useState<string>('');

  const [mainTextWeight, setMainTextWeight] = useState<number | any>(0);
  const [fontSize, setFontSize] = useState<string>('');
  const [normalTextFontFamily, setNormalTextFontFamily] = useState<string>('');

  const get_initial_color_configuration = () => {
    const root = document.documentElement;
    setPrimaryColor(getComputedStyle(root).getPropertyValue('--primary-color'));
    setSecondaryColor(getComputedStyle(root).getPropertyValue('--secondary-color'));
    setThirdColor(getComputedStyle(root).getPropertyValue('--third-color'));
    setPrimaryFontColor(getComputedStyle(root).getPropertyValue('--primary-font-color'));
    setSecondaryFontColor(getComputedStyle(root).getPropertyValue('--secondary-font-color'));
  };

  const get_initial_font_configuration = () => {
    const root = document.documentElement;
    setTitleWeight(Number.parseInt(getComputedStyle(root).getPropertyValue('--title-weight')));
    setTitleSize(getComputedStyle(root).getPropertyValue('--title-size'));
    setTitleFontFamily(getComputedStyle(root).getPropertyValue('--title-font-family'));
    setMainTextWeight(
      Number.parseInt(getComputedStyle(root).getPropertyValue('--main-text-weight'))
    );
    setFontSize(getComputedStyle(root).getPropertyValue('--font-size'));
    setNormalTextFontFamily(getComputedStyle(root).getPropertyValue('--normal-text-font-family'));
  };

  useEffect(() => {
    get_initial_color_configuration();
    get_initial_font_configuration();
  }, []);

  const color_configurations = useMemo(() => {
    return {
      primary_color: typeof primaryColor == 'string' ? primaryColor : primaryColor!.toHexString(),
      secondary_color:
        typeof secondaryColor == 'string' ? secondaryColor : secondaryColor!.toHexString(),
      third_color: typeof thirdColor == 'string' ? thirdColor : thirdColor!.toHexString(),
      primary_font_color:
        typeof primaryFontColor == 'string' ? primaryFontColor : primaryFontColor!.toHexString(),
      secondary_font_color:
        typeof secondaryFontColor == 'string'
          ? secondaryFontColor
          : secondaryFontColor!.toHexString(),
    };
  }, [primaryColor, secondaryColor, thirdColor, primaryFontColor, secondaryFontColor]);

  const font_configuration = useMemo(() => {
    return {
      title_weight: titleWeight,
      title_size: titleSize,
      title_font_family: titleFontFamily,
      main_text_weight: mainTextWeight,
      font_size: fontSize,
      normal_text_font_family: normalTextFontFamily,
    };
  }, [titleWeight, titleSize, mainTextWeight, fontSize, normalTextFontFamily, titleFontFamily]);

  const example_box_primary_style: React.CSSProperties = {
    backgroundColor: color_configurations['primary_color'],
    color: color_configurations['primary_font_color'],
    height: '20vh',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderColor: color_configurations['secondary_color'],
  };

  const example_box_secondary_style: React.CSSProperties = {
    backgroundColor: color_configurations['secondary_color'],
    color: color_configurations['secondary_font_color'],
    height: '20vh',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderColor: color_configurations['primary_color'],
  };

  const example_box_third_style: React.CSSProperties = {
    backgroundColor: color_configurations['third_color'],
    color: color_configurations['primary_font_color'],
    height: '20vh',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderColor: color_configurations['secondary_color'],
  };

  const primary_style: React.CSSProperties = {
    backgroundColor: color_configurations['primary_color'],
    color: color_configurations['primary_font_color'],
  };

  const secondary_style: React.CSSProperties = {
    backgroundColor: color_configurations['secondary_color'],
    color: color_configurations['secondary_font_color'],
  };
  const third_style: React.CSSProperties = {
    backgroundColor: color_configurations['third_color'],
    color: color_configurations['primary_font_color'],
  };

  const title_style: React.CSSProperties = {
    fontWeight: font_configuration['title_weight'],
    fontSize: font_configuration['title_size'],
    fontFamily: font_configuration['title_font_family'],
  };

  const normal_text_style: React.CSSProperties = {
    fontWeight: font_configuration['main_text_weight'],
    fontSize: font_configuration['font_size'],
    fontFamily: font_configuration['normal_text_font_family'],
  };

  return (
    <>
      <Header>
        <Row justify={'center'} align={'middle'} className="title primary-font-color">
          Pagina de configuração
        </Row>
      </Header>
      <Content>
        <Row justify={'center'} align={'middle'}>
          <Col span={8}>
            <Card
              title={<div style={secondary_style}>Configuração das cores de fundo</div>}
              style={secondary_style}
            >
              <Row>
                <Col span={11}> primary color: </Col>
                <Col span={11} offset={1}>
                  <ColorPicker value={primaryColor} onChange={setPrimaryColor}></ColorPicker>
                </Col>
              </Row>
              <Row>
                <Col span={11}> secondary color: </Col>
                <Col span={11} offset={1}>
                  <ColorPicker value={secondaryColor} onChange={setSecondaryColor}></ColorPicker>
                </Col>
              </Row>
              <Row>
                <Col span={11}> third color: </Col>
                <Col span={11} offset={1}>
                  <ColorPicker value={thirdColor} onChange={setThirdColor}></ColorPicker>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8} offset={2}>
            <Card
              title={<div style={secondary_style}>Configuração das cores dos textos</div>}
              style={secondary_style}
            >
              <Row>
                <Col span={11}> Cor primaria das fontes: </Col>
                <Col span={11} offset={1}>
                  <ColorPicker
                    value={primaryFontColor}
                    onChange={setPrimaryFontColor}
                  ></ColorPicker>
                </Col>
              </Row>
              <Row>
                <Col span={11}> Cor secundarias das fontes </Col>
                <Col span={11} offset={1}>
                  <ColorPicker
                    value={secondaryFontColor}
                    onChange={setSecondaryFontColor}
                  ></ColorPicker>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row justify={'center'} align={'middle'}>
          <Col span={8}>
            <Card
              title={<div style={secondary_style}>Configuração do estilo da fonte dos titulos</div>}
              style={secondary_style}
            >
              <Row>
                <Col span={11}> Espessura da fonte </Col>
                <Col span={11} offset={1}>
                  <InputNumber
                    style={{ width: 100 }}
                    value={font_configuration['title_weight']}
                    onChange={setTitleWeight}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11}> Tamanho da fonte </Col>
                <Col span={11} offset={1}>
                  <Select
                    style={{ width: 100 }}
                    value={font_configuration['title_size']}
                    onChange={setTitleSize}
                  >
                    <Option value="medium">Small</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="large">Large</Option>
                    <Option value="x-large">X-large</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={11}> Estilo da fonte </Col>
                <Col span={11} offset={1}>
                  <Select
                    style={{ width: 200 }}
                    value={font_configuration['title_font_family']}
                    onChange={setTitleFontFamily}
                  >
                    <Option value="Franklin Gothic Medium, Arial Narrow, Arial, sans-serif">
                      Arial
                    </Option>
                    <Option value="Cambria, Cochin, Georgia, Times, Times New Roman, serif">
                      TImes New Roman
                    </Option>
                    <Option value="Roboto, Open Sans, Lato, Helvetica, Arial, Inter, Poppins">
                      Sans serif
                    </Option>
                    <Option value="x-Courier New, Fira Code, Source Code Pro, Monaco">
                      MonoSpace
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8} offset={2}>
            <Card
              title={<div style={secondary_style}>Configuração do estilo da fontes dos textos</div>}
              style={secondary_style}
            >
              <Row>
                <Col span={11}> Espessura da fonte </Col>
                <Col span={11} offset={2}>
                  <InputNumber
                    style={{ width: 100 }}
                    value={font_configuration['main_text_weight']}
                    onChange={setMainTextWeight}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11}> Tamanho da</Col>
                <Col span={11} offset={2}>
                  <Select
                    style={{ width: 100 }}
                    value={font_configuration['font_size']}
                    onChange={setFontSize}
                  >
                    <Option value="medium">Small</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="large">Large</Option>
                    <Option value="x-large">X-large</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={11}> Estilo da fonte</Col>
                <Col span={11} offset={2}>
                  <Select
                    style={{ width: 200 }}
                    value={font_configuration['normal_text_font_family']}
                    onChange={setNormalTextFontFamily}
                  >
                    <Option value="Franklin Gothic Medium, Arial Narrow, Arial, sans-serif">
                      Arial
                    </Option>
                    <Option value="Cambria, Cochin, Georgia, Times, Times New Roman, serif">
                      TImes New Roman
                    </Option>
                    <Option value="Roboto, Open Sans, Lato, Helvetica, Arial, Inter, Poppins">
                      Sans serif
                    </Option>
                    <Option value="x-Courier New, Fira Code, Source Code Pro, Monaco">
                      MonoSpace
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row align={'middle'} justify={'center'} style={{ height: '20vh' }}>
          <Button
            onClick={() => {
              save_new_css_configuration({
                primary_color: color_configurations['primary_color'],
                secondary_color: color_configurations['secondary_color'],
                third_color: color_configurations['third_color'],
                primary_font_color: color_configurations['primary_font_color'],
                secondary_font_color: color_configurations['secondary_font_color'],
                title_weight: font_configuration['title_weight'],
                title_size: font_configuration['title_size'],
                title_font_family: font_configuration['title_font_family'],
                main_text_weight: font_configuration['main_text_weight'],
                font_size: font_configuration['font_size'],
                normal_text_font_family: font_configuration['normal_text_font_family'],
              });
            }}
            style={primary_style}
            size="large"
          >
            Salvar
          </Button>
        </Row>
        <Row justify={'center'} align={'middle'} style={{ height: '20vh' }}>
          <Col span={7} style={example_box_primary_style}>
            <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
              <Col>
                <Row justify={'center'} align={'middle'} style={title_style}>
                  Fundo com a cor primaria
                </Row>
                <Row
                  justify={'center'}
                  align={'middle'}
                  style={normal_text_style}
                  className="center-align"
                >
                  Você pode mudar a fonte desses textos através das configurações
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={7} offset={1} style={example_box_secondary_style}>
            <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
              <Col>
                <Row justify={'center'} align={'middle'} style={title_style}>
                  Fundo com a cor secondaria
                </Row>
                <Row
                  justify={'center'}
                  align={'middle'}
                  style={normal_text_style}
                  className="center-align"
                >
                  Você pode mudar a fonte desses textos através das configurações
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={7} offset={1} style={example_box_third_style}>
            <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
              <Col>
                <Row justify={'center'} align={'middle'} style={title_style}>
                  Fundo com a cor terciaria
                </Row>
                <Row
                  justify={'center'}
                  align={'middle'}
                  style={normal_text_style}
                  className="center-align"
                >
                  Você pode mudar a fonte desses textos através das configurações
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </>
  );
}
