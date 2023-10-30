import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: '"https://api.gomezpalacio.gob.mx/api/imm"' 
};
