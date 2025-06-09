import axios from 'axios';

interface information_to_save {
  primary_color: string;
  secondary_color: string;
  third_color: string;

  primary_font_color: string;
  secondary_font_color: string;
  third_font_color: string;

  title_weight: number;
  title_size: string;
  title_font_family: string;

  main_text_weight: number;
  font_size: string;
  normal_text_font_family: string;
  name: undefined | string;
}

const save_new_css_configuration = async (data: information_to_save) => {
  try {
    if (data['name'] === undefined) {
      await axios.post('http://localhost:5000/merge', (data = data));
    } else {
      await axios.post('http://localhost:5000/save_new', (data = data));
    }
  } catch (err) {
    return false;
  } finally {
    console.log('terminei de atualizar');
    return true;
  }
};

const update_saved_files_list = async (): Promise<Array<string>> => {
  return (await axios.get('http://localhost:5000/get_saved_files')).data;
};

const get_selected_style = async (folder: string, file_name: string): Promise<any> => {
  return (
    await axios.get(`http://localhost:5000/get_selected_css/${folder}/${file_name}`, {
      responseType: 'text',
    })
  ).data;
};

const delete_file = async (file_name: string): Promise<boolean> => {
  try {
    await axios.delete(`http://localhost:5000/delete/${file_name}`);
  } catch (err) {
    return false;
  } finally {
    return true;
  }
};

export { save_new_css_configuration, update_saved_files_list, delete_file, get_selected_style };
