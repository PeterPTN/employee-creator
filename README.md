## Employee Creator

## Application Snippets

### Home Page
![Home page](NeoHomePage.png)

### Update Modal
![Update modal](NeoUpdatePage.png)

### Create Page
![Create page](NeoCreatePage.png)

## Requirements / Purpose
- A full-stack web application with CRUD functionality
- SpringBoot for the backend API - (includes end-to-end testing)
- Vite/React/TS for the frontend - (includes unit testing)
- SASS for styling
This application is an attempt at a full-stack application with a common stack typically used by companies in Australia. It's essentially a proof-of-concept of my skill. 

## Features 
- Allows users to:
  - Get employees
  - Create employees
  - Update employees
  - Delete employees
 To a custom SpringBoot server and database.
 - Has filter logic based on user-text input, filter can be set to name, email, address or mobile
 - Has a sort-by-ascending/descending order logic (just for name)

## Build Steps
Coming soon...

## Design Goals
- The dependencies installed (ReactQuery, React-Hook-Forms, ReduxToolkit) were used as proof of concept that reflected something I would see in larger codebases, where DX, maintability and scalability are a concern. I was also quite comfortable writing simple custom hooks, using vanilla forms and using ReactContext so I thought it was time to up-skill a little further.

## Problems Encountered
To preface, this was my first time using these front-end libraries (specified above). Originally I wanted to also include MockServiceWorker and Twin.macro as well but was encountering issues implementing them in a test environment alongside everything else. It's likely this issue was caused by this export in main.tsx instead of App.tsx.

![Export error](Export.png)

However I was convinced it was an issue with my babel transformation (which was necessary for MSW at the time). I'm confident I can resolve these issues the next time I use these dependencies. 

## Future Goals
Currently tests assume best case scenario, therefore:
- Add sophisticated component tests
- Add sophisticated error handling for CRUD-logic test suites



### More to come...
