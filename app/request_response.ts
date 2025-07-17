// export const apiurl  = "http://192.168.117.123:8801/" 
// export const apiurl  = "http://10.127.131.38:8801/" 
export const apiurl  = "http://192.168.117.123:8801/" 

// request_response.ts
import Constants from 'expo-constants';

// Get API URL from environment configuration
// export const apiurl = Constants.expoConfig?.extra?.apiUrl || "http://192.168.117.123:8801/";

// Get current environment
export const appEnv = Constants.expoConfig?.extra?.appEnv || 'production';

// Log environment info (optional, for debugging)
console.log(`[Environment] Running in ${appEnv} mode`);
console.log(`[API] Using base URL: ${apiurl}`);

// Optional: Add a helper to detect development mode
export const isDev = appEnv === 'development';
export const isPreview = appEnv === 'preview';
export const isProduction = appEnv === 'production';

