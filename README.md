# React Native Hearthstone

It is a reference project to use for Fastlane.

```bash
# clone the project and go into it
git clone https://github.com/ridvanaltun/rn-heartstone.git && cd rn-hearthstone

# don't forget prepare your environment file
cp .env.example .env

# run android
npm run android

# run ios
npm run ios
```

# Handle Production

**TODO**

```bash
# prepare your release properties for android production
cp ./android/release.properties.example ./android/release.properties
```

# Available Scripts

In this project directory, you can run:

```bash
# create a .aab file for android production
npm run android:release
```

# Fastlane Usage

```bash
# install fastlane
bundle install

# deploy an android release
npm run deploy:android

# deploy an android beta release to Android Internal Test
npm run deploy:android-beta

# deploy an ios release
npm run deploy:ios

# deploy an ios beta release to TestFlight
npm run deploy:ios-beta

# deploy changes via codepush
npm run deploy:codepush

# deploy changes to current version with codepush on ios
npm run deploy:codepush:ios

# deploy changes to current version with codepush on android
npm run deploy:codepush:android
```
