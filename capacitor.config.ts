import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuapp.id',
  appName: 'TuApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      allowEditing: true,
      resultType: 'base64',
    },
  },
};

export default config;
