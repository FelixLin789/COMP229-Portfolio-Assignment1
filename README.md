# Wenbo Lin Portfolio

A simple six-page React portfolio for COMP229 Assignment 1.

## Run locally

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local URL shown in the terminal.

Run `npm run build` to create a production build. Run `npm run lint` to check the code.

## Pages

Home, About, Projects, Education, Services, and Contact are available from the navigation bar. The About page links to the PDF résumé. The Contact form saves the entered details in the current browser session and returns to Home, as required by the assignment. It does not send email.

The About page includes Wenbo's photo and a PDF résumé.

## Hosting

For Vercel or Netlify, import this repository, use `npm run build` as the build command, and set `dist` as the output folder. Hash-based page links work on static hosting without extra routing settings.
