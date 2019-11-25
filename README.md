# J.B. Hunt Carrier 360

## Prerequisites

- Xcode
- Android Studio
- [Homebrew](https://brew.sh/)
- Node.js v8.x (via Homebrew, NVM, or [website](https://nodejs.org/))
- NPM v6.4.1
  After installing Node.js, modify the NPM version via NPM:
  `npm install --global npm@5.6.0`
- [CocoaPods](https://cocoapods.org/)
  Recommended to install via Homebrew: `brew install cocoapods`
  _Please keep your version of CocoaPods up-to-date (`brew upgrade cocoapods`) because the version gets written to the `Podfile`, which we keep in Git._
- Gem Bundler `gem install bundler` or `sudo gem install bundler` (depending on how your permissions are configured)

## Quick Start

- Clone repo
- `npm install`
- `npm run pods` (Only needed to run on iOS)
- The first time through terminal will prompt you for your password to install `bundler`. Input your password and press Enter.
- `npm run (ios|android)`

## React Native Debuggger

Install the [React native debugger desktop app](https://github.com/jhen0409/react-native-debugger).
- React Native Debuggger must be open before the app's JavaScript runs and then hit (⌘D to select Start Remote Debugging), so if you already had the app running when you open React Native Debuggger, just refresh the app (⌘R/R-R).  If ⌘ still hasn't connected at that point, time to [troubleshoot](https://github.com/jhen0409/react-native-debugger/blob/master/docs/troubleshooting.md).
- If you have multiple devices simultaneously running, you'll have to switch the debugger between each device to get it to connect. But the ability for multiple devices seems to be coming soon for RN-Debugger.

## Appium
See: [E2E Testing With Appium](./e2e/appium/README.md)

## In-App Style Guide

When running the app in development mode, an in-app style guide is available. From the `Home` screen, swipe right to access the Style Guide.

To add a component to the Style Guide, add the component to the `config.js` file in `src/StyleGuide/StyleComponents`. It's possible to optionally pass in a `props` property which will get passed into the rendered component.

```js
{
  component: Typography,
  menuTitle: 'Typography & Fonts',
},
{
  component: Colors,
  menuTitle: 'Color Palette',
},
{
  component: YourNewComponent,
  menuTitle: 'Awesome New Component',
  props: {} // optional
},
```

## Making External HTTP Requests

The request service uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make HTTP requests. The `request` function should be passed a [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) object (see example below), and will return a Promise.

```js
import request from '../services/request';
import Methods from '../utilities/methods';

const options = {
  method: Methods.GET,  // required
  url: 'http://www.example.com',  // required
  headers: { 'SomeHeader': 'SomeValue' },
};

request(options)
  .then(/* handle response */)
  .catch(/* handle error */);
```

## Notifications

The notification service provides support for local notifications, dispatched immediately or scheduled for later, and with options for actions.  See the [notification service README](./src/services/notifications/README.md) for details.

## Dynatrace

```js
import { NativeModules } from 'react-native';
const { RNDynatrace } = NativeModules;

RNDynatrace.startup('appId', 'envId', 'appUrl')
RNDynatrace.enterAction('actionName');
RNDynatrace.identifyUser('userId');

```

## Localization

See the [localization service README](./src/services/localization/README.md)

## Redux & Saga Paradigms

See [Redux & Saga Paradigms](./src/state/README.md)

## Resetting the project files

You may at some point find yourself in a situation which requires a complete reset of the project directory, as if you had freshly cloned the repository.  In these cases, it usually suffices to remove package and build directories: `npm run nuke:project` (or just `npm run nuke`).  Though sometimes you must also remove Xcode's DerivedData directories corresponding to your project: `npm run nuke:derived-data`.  Both of these commands will give you the chance to select which of the possible directories you would like to remove.  If you need to run both of the warheads, use `npm run nuke:all`; the `all` version deliberately destroys DerivedData directories first, because the script will not run once `node_modules` is gone.  Please enjoy responsibly.

## Add Vector Icons To Project

### React Native Vector Icons

General information about `react-native-vector-icons` can be found at the project repository](https://github.com/oblador/react-native-vector-icons)

These procedures are derived from the recommended setup steps from the project documentation.

### Procedure to Generate Font

####  Export vector assets to a directory of `.svg` files, one per icon.
- The file names assigned in this step will map directly to how they will be consumed in the application code.
- _example_: `jbh-SomeIcon.svg` will become accessible using `<C360Icon name="jbh-SomeIcon" />`

#### 1. Upload Existing Icons To [IcoMoon](https://icomoon.io/app/)
1. Click on top left MENU
2. Manage Projects
3. Import Project
4. Import the selection.json from `src/assets/fonts/C360Icons/`
5. Select the project and Click Load

#### 2. Go to [IcoMoon](https://icomoon.io/app/)'s web application to convert your icon files.
1. Confirm that all the existing font glyphs are visible in the IcoMoon interface from the Upload Existing Icons step
2. Press the `[+ Import Icons]` button at the top of the screen and then select all of the icon `.svg` files to include in the new font icon set.
3. Your icons will appear in an Untitled Icon set. Press the hamburger icon in the header for this subsection and select `Select All`
4. Click `Generate Font` button at the bottom right.
5. Confirm that the fonts look good in the preview.
6. Click `Download` in the bottom toolbar to save a zip of files to your computer.
7. Replace the files found in `src/assets/fonts/C360Icons/` with new versions from download

#### 3. To copy new file to iOS build:
1. Open the Xcode project to the `Project Navigator` view in the left pane of the application.
2. Ensure that your files have the same file names as those found in `app_mobile_carrier_360/C360Icons`
3. Drag the new icon files directly into the `app_mobile_carrier_360/C360Icons` directory and replace them.
4. Clear local build caches and then build to confirm that files are properly linked.

#### 4. To copy new font files to Android build:
1. Locate and rename your newly downloaded `.ttf` font file to be `icomoon.ttf`.
2. Replace the ttf file at this path: `/android/app/src/main/assets/fonts` with the new file.
3. Clear local build caches and then build to confirm that the new font file works as expected.

## Persisted State Migration

Migrating from one version of state to another is handled in `state/redux/BaseReduxManager`. When the app is loaded, the persisted state object is copied from device storage and used in the app. If a new feature modifies or changes state, then a migration should be created. Migrations can be found in `state/redux/migrations.js`. Documentation for this feature of `redux-persist` can be found [here](https://github.com/rt2zz/redux-persist#migrations), with solid examples [here](https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md).

*Note:* It's important to remember that `redux-persist` performs a shallow copy, so nested persists (can be seen in the docs) should be used on branches of state that need to persist.

`redux-persist` will look at the current version of the store and compare it to the persisted version. If they are different, it will look for the current version in the migrations and run that migration function against the persisted store.

### Removing Branches or Leaves from State

When removing a branch of state, we need to tell `redux-persist` to remove it from the state tree when migrating the persisted state. Lodash's `omit` is great for this.

```js
// Persisted State
//  {
//    version: 1,
//    auth: { ... }
//    myProp: 'myValue',
//  }

// We're removing myProp in v2

// Sample Migration
import omit from 'lodash/omit';

const root = {
  2: state => omit(state, 'myProp'),  // Will just return { version: 2, auth: { ... } }
};
```

### Adding Branches to State

When adding a branch to state, it's typical to just be able to return the persisted version of state and the new prop will get added.

```js
// Sample Migration
const root = {
  3: state => state,
};
```

### Updating a Branch in State

When updating a branch in state, it's important to set the value to `undefined` in the migration, so that the persisted value gets overwritten.

```js
// Persisted State
//  {
//    version: 1,
//    auth: { ... }
//    myProp: 'myValue',
//  }

// We're changing the value of myProp in version 2

// Sample Migration
const root = {
  2: state => ({ ...state, myProp: undefined }),
};
```

## Upgrading React

### The Easy Way
1. Run `sudo npm install -g react-native-git-upgrade`
2. Run `react-native-git-upgrade`
3. Ensure the package.json file shows the `react-native` dependency updated to the latest version.
4. Resolve file conflicts (notably with the ios xcode project files)
5. If any, follow any manual instructions given as part of the upgrade process.
6. Run `npm run pods` to update the React pod (and any other dependent pods)
  (Note: Because the Android gradle files pull the latest version, based on the `react-native` node module version, you don't have to worry about the Android build)
7. Run `npm run validate` to make sure the update didn't break any unit or snapshot tests. Fix accordingly.
8. Run appium to make sure all functionality still works. Fix accordingly.

### The Hard Way
Run only if the above doesn't work.

1. Upgrade the `react-native` dependency in package.json
2. Run `npm install --save react-native@X.Y`, where X.Y is the version you're upgrading to.
3. If you see a warning about the peerDependency with `React`, also upgrade React by running `npm install --save react@X`
4. Consult `rn-diff` to see about changes in the project template files. If there are minor changes, simply manually make those changes and rebuild.
5. If there are major changes, run `react-native upgrade`. Follow any prompts it gives about file template changes.
6. Run `npm run pods`.
7. Run `npm run validate`.
8. Run appium.

Reference: https://facebook.github.io/react-native/docs/upgrading.html

## Analytics Testing

- Android
  - Build the app using `npm run android` (You have to have an emulator running even when building to a device)
  - `npm run enable-firebase-debug`
  - Build the app using `npm run android`
  - **Note:** This change must be manually undone via `npm run disable-firebase-debug` to remove the debugging flag
- iOS
  - Build the project from Xcode using the `(test)` scheme
- Log into https://console.firebase.google.com/ (reach out to someone on the team if you need login privileges provided)
- Click on the carrier app
- Click on `Debug View` on the left under Analytics
- Choose the Device from the dropdown at the top
- Make sure that you see all your events and Event Parameters showing properly, with no errors.

## Module Generator
Generates a starter template for asynchronous operations (Service, Saga, Action, Types, Reducer and tests)

- run `npm install` (if needed)

#### Command
```
node generateService.js
```

#### Arguments
```
--name {nameOfService} - name of service (camelcase) [required]
--key {SERVICE_KEY} - key for service (this is what we add in env file) [required]
--URL {URL} - url for service (this is what we add in env file, this must be test server url ) [required]
--httpMethod  GET/POST/UPDATE/PUT -  [required]
--group {group} - if service is part of service group (Eg: userProfile service group will have services like get profile, change password etc ) [optional]
example
node generateService.js --name driverMiles --key JBH_GET_DRIVER_MILES_URL --URL 'https://drive-gateway-tst.jbhunt.com/ws_mobile_drive_gateway/driver-services/rest/miles/getMiles?alphaCode={username}&payGroup={payGroup}&jobGroup={jobGroup}' --httpMethod  GET --group myServiceGroup
```

## Detox
See: [E2E Testing With Detox](./e2e/detox/README.md)

# react-native-background-geolocation

## Config
- Under the hood, this package uses the native (CLLocationManager/CMMotionActivtyManager for iOS; ActivityRecognitionAPI for Android) location and/or motions APIs to get the job done. React's web location API doesn't quite function well enough for our uses at this time.

- There's a hardcoded fallback config in remoteConfig.service.js in case the Firebase call fails. Ideally
this fallback should match what Firebase is returning, so if you update one you'd better update both configs.
- There are some listeners you can implement that have been left out (including location offload via HTTP service!). If you're wanting to listen in on more than just location updates, check out this page: https://github.com/transistorsoft/react-native-background-geolocation
- Check this out for the full set of config options: https://github.com/transistorsoft/react-native-background-geolocation/blob/master/docs/README.md#geolocation-common-options
- ¡¡¡IF YOU ENABLE DEBUG MODE, iOS IS GONNA GET A LITTLE NOISY!!!

## Solidarity

- Solidarity is a tool used for quickly taking snapshots of environments for React Native projects
- By using this plugin to solidarity, you can snapshot your environment to verify the project is in a similar environment on other machines.
- To get started with the tool below commands must be run

```
npm i -g solidarity solidarity-react-native
# go to your react native project and run:
solidarity snapshot or solidarity --verbose
```

- This will check the dependencies you have installed and needed in that project and creates the .solidarity file.

- For more info See: [Effortless Environment Reports with Solidarity](https://shift.infinite.red/effortless-environment-reports-d129d53eb405)
