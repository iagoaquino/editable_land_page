This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install Node dependencies using:
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
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Description

This project is a land page made by me about me, even though it looks quite simple its main purpose was to learn more about Css,Flask and Nextjs, and to do that I made this land page self editable. if you visit path localhost:3000/configuration_page you will se a page that will allow you to edit colors and fonts of the main page.
As a aditional function you can also save a style without apply it to the main page, you can also delete or overwrite old saved styles.

## How it works

To make the site style easy to change I use good practice in CSS by adding all colors and font configuration as variables in the root configuration, this way a simple change in these variables and all others configurations will change homogeneously. To change this variables while in the runtime I created a Flask API to be responsible for the management of the css file. With this all I needed to do was to connect the API with the Nextjs frontend, for that I used axios for a better organization of all functions with the api connection.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Antd](https://ant.design/) - Learn more about the antdesign framework
- [Axios](https://axios-http.com/ptbr/docs/intro) - Learn more about Axios
- 
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
