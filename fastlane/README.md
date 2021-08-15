fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
### codepush_ios
```
fastlane codepush_ios
```
Deploy a CodePush build to current version for iOS
### codepush_android
```
fastlane codepush_android
```
Deploy a CodePush build to current version for Android
### codepush
```
fastlane codepush
```
Distribute a CodePush build

----

## iOS
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight
### ios production
```
fastlane ios production
```
Deploy a new version to the App Store

----

## Android
### android beta
```
fastlane android beta
```
Android build and release to Internal App Sharing (Beta Track)
### android production
```
fastlane android production
```
Deploy a new version to the Google Play

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
