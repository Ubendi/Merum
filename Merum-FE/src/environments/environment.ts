import { Environment } from './environment.interface';

export const environment: Environment = { 
    production: false, 
    bypassSSL: true,
    apiUrl: 'https://localhost:7147/api',
    fileUrl: 'https://localhost:7147'
};