This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First install python and node dependencies

for python dependencies use the requirements.txt in the folder:

```bash
pip install -r requirements.txt
```

for node dependencies use:

```bash
npm install
```

Then run the Node development server and python flask api:
Node:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Flask:

```bash
flask --app css_manager run
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Description

This project is a land page made by me about me, even though it looks quite simple its main purpose was to learn more about Css,Flask and Nextjs, and to do that I made this land page self editable. if you visit path localhost:3000/configuration_page you will se a page that will allow you to edit colors and fonts of this page.

## How it works

To make the site colors easy to change I use good practice in CSS by adding all colors that would be used as variables in the root configuration this way a simple change in this variable and all others components will change its colors too. To change this variables while in the aplication runtime I created a Flask API to be responsible to manage the css file. With this all I needed to do was to connect the API with the Nextjs frontend, for that I used axios.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Flask](https://flask.palletsprojects.com/en/stable/) - Learn about flask.
- [Antd](https://ant.design/) - Learn more about the antdesign framework
- [Axios](https://axios-http.com/ptbr/docs/intro) - Learn more about Axios

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
