import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

// The Google services JSON (Android) and GoogleService-Info.plist (iOS) 
// are automatically loaded by the native SDK.
// You no longer need to manually pass the configuration object.

export const app = getApp();
export const auth = getAuth(app);
