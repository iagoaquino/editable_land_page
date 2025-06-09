
from flask import Flask, request
from flask_cors import CORS
from glob import glob
from pathlib import Path

#Functions
def get_complementary_text():
    with open('public/styles/globals.css', 'r') as file:
        whole_text = file.read().replace("\n", "")

    end_flag = True
    position = 0

    while end_flag:
        if whole_text[position] == "}":
            end_flag = False
        position+=1

    complementary_text = whole_text[position:]
    return complementary_text

def save_css(css_text, path):
    with open(path, 'w') as file:
        file.write(css_text)





def mesclate_text(css_text_to_mesclate):
    return f":root {{--primary-color:{css_text_to_mesclate['primary_color']};--secondary-color:{css_text_to_mesclate['secondary_color']};\
    --third-color:{css_text_to_mesclate['third_color']}\
    ;--primary-font-color: {css_text_to_mesclate['primary_font_color']};--secondary-font-color: {css_text_to_mesclate['secondary_font_color']};--third-font-color: {css_text_to_mesclate['third_font_color']};\
    --title-weight: {css_text_to_mesclate['title_weight']};--title-size: {css_text_to_mesclate['title_size']};--title-font-family: {css_text_to_mesclate['title_font_family']};\
    --main-text-weight: {css_text_to_mesclate['main_text_weight']};--font-size: {css_text_to_mesclate['font_size']};--normal-text-font-family: {css_text_to_mesclate['normal_text_font_family']};}}"

def create_new_style(css_text, style_name):
    save_folder = Path("public/saved_styles/")
    save_folder.mkdir(exist_ok=True)
    save_css(css_text, f'{save_folder}/{style_name}.css')


#Routes
app = Flask("css_manager")
CORS(app)
@app.post("/merge")
def merge_css():
    request_response = request.get_json()
    main_configuration = mesclate_text(request_response)
    save_css(main_configuration+get_complementary_text(), "public/styles/globals.css")
    return ""

@app.post("/save_new")
def save_new_css():
    request_response = request.get_json()
    main_configuration = mesclate_text(request_response)
    create_new_style(main_configuration+get_complementary_text(), request_response['name'])
    return ""

@app.get("/get_saved_files")
def get_all_files_saved():
    files = glob("public/saved_styles/*css")
    files_name_list = []
    for file in files:
        files_name_list.append(file.split("\\")[1].split('.')[0])
    return files_name_list

@app.delete("/delete/<name>")
def delete_file(name=None):
    file = Path('public/saved_styles/').joinpath(f'{name}.css')
    print(file)
    if file.exists():
        file.unlink()
    return ""
