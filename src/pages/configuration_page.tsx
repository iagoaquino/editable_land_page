import {
  ColorPicker,
  Layout,
  Row,
  Col,
  Button,
  Select,
  Card,
  InputNumber,
  Modal,
  Input,
  Form,
  Spin,
} from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { DeleteFilled, PlusOutlined, EditFilled } from '@ant-design/icons';
import {
  save_new_css_configuration,
  update_saved_files_list,
  delete_file,
  get_selected_style,
} from '../api_connection';

const { Content, Header } = Layout;
const { Option } = Select;

export default function ConfigurationPage() {
  //Color configuration
  const [primaryColor, setPrimaryColor] = useState<any>('');
  const [secondaryColor, setSecondaryColor] = useState<any>('');
  const [thirdColor, setThirdColor] = useState<any>('');
  const [primaryFontColor, setPrimaryFontColor] = useState<any>('');
  const [secondaryFontColor, setSecondaryFontColor] = useState<any>('');
  const [thirdFontColor, setThirdFontColor] = useState<any>('');

  //Font configuration

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [titleWeight, setTitleWeight] = useState<number | any>(0);
  const [titleSize, setTitleSize] = useState<string>('');
  const [titleFontFamily, setTitleFontFamily] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mainTextWeight, setMainTextWeight] = useState<number | any>(0);
  const [fontSize, setFontSize] = useState<string>('');
  const [normalTextFontFamily, setNormalTextFontFamily] = useState<string>('');

  //State manager
  const [loading, setLoading] = useState<boolean>(false);

  //Necessary data
  const [savedCssList, setSavedCssList] = useState<Array<string>>([]);
  const [selectedCss, setSelectedCss] = useState<string>('');

  //Modal manager
  const [showModalSaveNew, setShowModalSaveNew] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSucess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);

  //Forms
  const [new_style_form] = Form.useForm();

  //Functions
  const get_initial_color_configuration = () => {
    const root = document.documentElement;
    setPrimaryColor(getComputedStyle(root).getPropertyValue('--primary-color'));
    setSecondaryColor(getComputedStyle(root).getPropertyValue('--secondary-color'));
    setThirdColor(getComputedStyle(root).getPropertyValue('--third-color'));

    setPrimaryFontColor(getComputedStyle(root).getPropertyValue('--primary-font-color'));
    setSecondaryFontColor(getComputedStyle(root).getPropertyValue('--secondary-font-color'));
    setThirdFontColor(getComputedStyle(root).getPropertyValue('--third-font-color'));
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

  const save = async (name: string | undefined) => {
    setLoading(true);
    try {
      if (
        await save_new_css_configuration({
          primary_color: color_configurations['primary_color'],
          secondary_color: color_configurations['secondary_color'],
          third_color: color_configurations['third_color'],
          primary_font_color: color_configurations['primary_font_color'],
          secondary_font_color: color_configurations['secondary_font_color'],
          third_font_color: color_configurations['third_font_color'],
          title_weight: font_configuration['title_weight'],
          title_size: font_configuration['title_size'],
          title_font_family: font_configuration['title_font_family'],
          main_text_weight: font_configuration['main_text_weight'],
          font_size: font_configuration['font_size'],
          normal_text_font_family: font_configuration['normal_text_font_family'],
          name: name,
        })
      ) {
        setShowModalSucess(true);
        updateSavedList();
      }
    } catch (err) {
      console.log(err);
      setShowModalError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (name: string) => {
    setLoading(true);
    try {
      if (await delete_file(name)) {
        await updateSavedList();
        setShowModalSucess(true);
        setSelectedCss('');
      }
    } catch (err) {
      setShowModalSucess(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSavedList = async () => {
    setLoading(true);
    try {
      setSavedCssList(await update_saved_files_list());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const changeCssConfiguration = async (folder: string, file_name: string) => {
    const selected_css_text = await get_selected_style(folder, file_name);
    const old_style = document.getElementById('configuration_css');
    if (old_style) old_style.remove();
    const new_style = document.createElement('style');
    new_style.id = 'configuration_css';
    new_style.innerText = selected_css_text;
    document.head.appendChild(new_style);
  };

  //React functions
  useEffect(() => {
    changeCssConfiguration('applied_css', 'current_applied_style');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      get_initial_color_configuration();
      get_initial_font_configuration();
    }, 1000);
  }, [selectedCss]);

  useEffect(() => {
    if (selectedCss !== '') {
      console.log(selectedCss);
      changeCssConfiguration('saved_styles', selectedCss);
    }
  }, [selectedCss]);

  useEffect(() => {
    updateSavedList();
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
      third_font_color:
        typeof thirdFontColor == 'string' ? thirdFontColor : thirdFontColor!.toHexString(),
    };
  }, [
    primaryColor,
    secondaryColor,
    thirdColor,
    primaryFontColor,
    secondaryFontColor,
    thirdFontColor,
  ]);

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
    borderColor: color_configurations['primary_color'],
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
    color: color_configurations['third_font_color'],
    height: '20vh',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderColor: color_configurations['primary_color'],
  };

  const primary_style: React.CSSProperties = {
    backgroundColor: color_configurations['primary_color'],
    color: color_configurations['primary_font_color'],
  };

  const secondary_style: React.CSSProperties = {
    backgroundColor: color_configurations['secondary_color'],
    color: color_configurations['secondary_font_color'],
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
    <div style={{ width: '183.2vh', height: '100vh' }}>
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
              <Row>
                <Col span={11}> Cor terciaria das fontes </Col>
                <Col span={11} offset={1}>
                  <ColorPicker value={thirdFontColor} onChange={setThirdFontColor}></ColorPicker>
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
          <Card style={{ width: '80%' }}>
            <Row justify={'center'}>
              <Col span={10}>
                <Card
                  title={
                    <Row style={secondary_style} justify={'center'}>
                      Usar modelos salvos
                    </Row>
                  }
                >
                  <Row justify={'center'}>
                    <Col span={11}>
                      <Select
                        style={{ width: 200 }}
                        placeholder={'Selecione o estilo salvo'}
                        value={selectedCss}
                        onChange={setSelectedCss}
                      >
                        {savedCssList.map((name) => (
                          <Option value={name} key={name}>
                            {name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={2} offset={1}>
                      <Button
                        size="large"
                        style={primary_style}
                        variant="solid"
                        onClick={() => {
                          deleteFile(selectedCss);
                        }}
                      >
                        <DeleteFilled />
                      </Button>
                    </Col>
                    <Col span={2} offset={1}>
                      <Button
                        size="large"
                        style={primary_style}
                        variant="solid"
                        onClick={() => {
                          console.log(selectedCss);
                          save(selectedCss);
                        }}
                      >
                        <EditFilled />
                      </Button>
                    </Col>
                    <Col span={2} offset={1}>
                      <Button
                        size="large"
                        style={primary_style}
                        variant="solid"
                        onClick={() => {
                          setShowModalSaveNew(true);
                        }}
                      >
                        <PlusOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={10} offset={4}>
                <Card
                  title={
                    <Row style={secondary_style} justify={'center'}>
                      Aplicar estilo atual ao site
                    </Row>
                  }
                >
                  <Row justify={'center'} align={'middle'}>
                    <Button
                      onClick={() => {
                        save(undefined);
                      }}
                      style={primary_style}
                      size="large"
                    >
                      Aplicar estilo
                    </Button>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
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
      {/*modais*/}
      <Modal
        open={showModalSuccess}
        footer={
          <Row justify={'center'} align={'middle'}>
            <Button size="large" style={primary_style} onClick={() => setShowModalSucess(false)}>
              OK
            </Button>
          </Row>
        }
      >
        <Row style={title_style} justify={'center'}>
          A ação foi um sucesso
        </Row>
      </Modal>
      <Modal
        open={showModalError}
        footer={
          <Row justify={'center'} align={'middle'}>
            <Button size="large" style={primary_style} onClick={() => setShowModalError(false)}>
              OK
            </Button>
          </Row>
        }
      >
        <Row justify={'center'}>Error na operação, por favor checar os logs</Row>
      </Modal>
      <Modal open={loading} closable={false} footer={<></>}>
        <Row justify={'center'}>
          <Spin size="large" />
        </Row>
        <Row justify={'center'} style={title_style}>
          Carregando...
        </Row>
      </Modal>
      <Modal
        open={showModalSaveNew}
        footer={
          <Row align={'middle'} justify={'center'}>
            <Col>
              <Button
                onClick={() => {
                  save(new_style_form.getFieldValue('name'));
                  setShowModalSaveNew(false);
                }}
                style={primary_style}
              >
                Salvar
              </Button>
            </Col>
            <Col offset={8}>
              <Button
                onClick={() => {
                  setShowModalSaveNew(false);
                }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        }
      >
        <Form form={new_style_form}>
          <Row justify={'center'} align={'middle'}>
            <Form.Item name="name" label="nome">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
