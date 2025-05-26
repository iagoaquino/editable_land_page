import axios from 'axios';

interface information_to_save {
  primary_color: string;
  secondary_color: string;
  third_color: string;

  primary_font_color: string;
  secondary_font_color: string;

  title_weight: number;
  title_size: string;
  title_font_family: string;

  main_text_weight: number;
  font_size: string;
  normal_text_font_family: string;
}

const save_new_css_configuration = (data: information_to_save) => {
  axios.post('http://localhost:5000/merge', (data = data));
};

export { save_new_css_configuration };
