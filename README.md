# 🖥 Coodesh Front-End Challenge - 2021

This is my solution to [Coodesh Front-End Challenge 2021](https://lab.coodesh.com/public-challenges/front-end-challenge-2021).
A MVP TypeScript/React application. Built with Webpack and Babel. From a template wich is from my athoring.
With a lot of configurations for development and production environments. Covering all the topics from the challenge.

---

## 📜 Summary

- [Requirements](#-requirements)

- [Differentials](#-differentials)

- [Bonus](#-bonus)

- [Install and Run](#-install-and-run)

- [Tests](#-tests)

- [Docker](#-docker)

- [Troubleshooting](#-troubleshooting)

- [Presentation Video](#-presentation-video)

- [Contacts](#-contacts)

- [To Do](#-to-do)

---

## 📋 Requirements

1. ✅ Header with logo and user info
2. ✅ Patients list or table
3. ✅ Shearch input with filter
4. ✅ Loading more items compoents
5. ✅ Modal with patients data
6. ✅ Url with patient id to share patient data
7. ✅ Consumes data from [randomuser](https://randomuser.me/documentation/) api
8. ✅ Manages data global state

---

## 🌟 Differentials

1. ✅ Add filter by gender on table (not working, because the api is not returning results by gender)
2. ✅ Configure search to able to filter by name and nation
3. ✅ Add paginator/route to share patient link and keep list position
4. ✅ Write Unit Tests or E2E Test on patients list. Choose better approach and library.
5. ✅ Configure Docker on project to help DevOps team

---

## 💥 Bonus

Not included on requirements:

01. ✅ Code coverage > 90 % ☔️
02. ✅ Strong types
03. ✅ Clean Code principles
04. ✅ Design Patterns
06. ✅ Responsive Design
05. ✅ Development experience
07. ✅ Deployment
08. ✅ Infinity Scroll
09. ✅ Custom Hooks
10. ✅ Code Splitting
11. ✅ Google Lighthouse 100%
12. ✅ Documentation with JS Docs

---

## 🧐 Tecnologies

* Webpack
* Babel
* Typescript
* React
* Reactstrap
* React Router DOM
* React Testing Library
* React Redux
* Redux
* Cypress
* Jest
* MSW
* Axios
* Bootstrap
* SASS
* Styled Components
* PostCSS
* Git
* Husky
* Eslint
* Stylelint
* Docker
* NPM

---

## 📦 Install and Run

This app requires `nvm` to install versions of Node JS.

**Check Node Version:** in order to run all features, this app is running with Node v14.18.0 or above. Intall it with [nvm](https://github.com/nvm-sh/nvm).

1) On root folder of the project, open the terminal:

```
nvm use
```

This will change the node version to v14.18.0 located on `.nvmrc` file.

2) Install packages:

```
npm install
```

3) Run:

```
npm start
```

4) Build:

```
npm run build
```

---

## 🧪 Tests

* Unit Tests:

```
npm test <filename>
```

```
npm run test:coverage
```

* E2E:

```
npm run cy:open
```

In order to get the complete coverage run this command after perfming all tests cases:

```
npm run cy:coverage
```

---

## 🐋 Docker

```
npm run publish:dev
```

---

## 🔧 Troubleshooting

-   On deployment change base directory to `/dist`

---

## 📽 Presentation Video
-   Presentation video: [Link](Link)

---

## 📡 Contacts

-   Name: Hugo Leoanardo Matosinhos de Souza
-   Phone: `+5531999699361`
-   Email: `hugoleonardo.dev@gmail.com`

-   [LinkedIn](https://www.linkedin.com/in/hugo-leonardo-matosinhos-de-souza/)

---

## ✅ To Do

- [ ] Reduce bundle size
- [ ] Search Optimization Engine
- [ ] Improve layouts with high fidelity frames
- [ ] Improve tests cases
- [ ] Iterate with PharmaInc contact to get more informations
- [ ] Always more work to do...
