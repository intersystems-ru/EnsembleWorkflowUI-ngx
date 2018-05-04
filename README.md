# Installation
## Prerequisites
Firstly, please import and compile the [Ensemble Workflow REST API](https://github.com/intersystems-ru/EnsembleWorkflow) project.

Then, you will need to create and setup 2 CSP-applications.

### REST Application
1. Go to Ensemble Management Portal, Web Applications and create a new one for Namespace where you imported Ensemble Workflow REST API project.
2. Set it’s name as `/wf/api` for instance.
3. Set Allowed Authentication Methods for “Password” only.
4. Set Group By ID for any string you want (remember it)
5. Set dispatch class for `Workflow.REST`
6. Set Session Cookie Path for `/wf` (it depends from name of the app in step 2)
7. Assign roles for application if needed (depends on configuration and security rules of your Ensemble instance)

## Client Application
1. Go to Ensemble Management Portal, Web Applications and create a new one for the same Namespace as REST Application.
2. Set it’s name as `/wf` for instance (it depends on app name in step 2 of REST Application setup. The idea is to set the same Cookie Path for both applications, that they could share same CSP-session. Cookie path depends on app name).
3. Set Allowed Authentication Methods for “Password” only.
4. Set Group By ID to value you used in step 4 of REST Application setup.
5. Set CSP Files Physical Path to folder where you will extract files of the current project (or configure it later)

## Use Release
To use the latest release, go to ‘Releases’ tab of this repository. Download and extract zip to the folder you chosen in step 5 of Client Application Setup.

## Build from source
To build application from source you need to install **Node.js** with **npm** package manager.
Then, use following command inside source directory to install all the dependencies: `npm install`
After that, use `npm run build` to build the application in development mode or `npm run build-prod` to build the application for production. Result application will be placed in `dist` directory.

## Config
**Important**

Go to `/assets/config/config.json` and set apiServer.appName to the name of you REST Application.
