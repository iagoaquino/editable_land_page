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

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL, timeout: 5000 });

const save_new_css_configuration = async (data: information_to_save) => {
  try {
    if (data['name'] === undefined) {
      await api.post('merge', (data = data));
    } else {
      await api.post('save_new', (data = data));
    }
  } catch (err) {
    return false;
  } finally {
    console.log('terminei de atualizar');
    return true;
  }
};

const update_saved_files_list = async (): Promise<Array<string>> => {
  console.log(api.arguments);
  return (await api.get('get_saved_files')).data;
};

const get_selected_style = async (folder: string, file_name: string): Promise<any> => {
  return (
    await api.get(`get_selected_css/${folder}/${file_name}`, {
      responseType: 'text',
    })
  ).data;
};

const delete_file = async (file_name: string): Promise<boolean> => {
  try {
    await api.delete(`delete/${file_name}`);
  } catch (err) {
    return false;
  } finally {
    return true;
  }
};

export { save_new_css_configuration, update_saved_files_list, delete_file, get_selected_style };
