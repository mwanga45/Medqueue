// app.config.js
export default ({ config }) => {
    const appEnv = process.env.APP_ENV || 'production';
    
    // Base configuration that applies to all environments
    const baseConfig = {
        ...config,
        name: "MedqueV3",
        slug: "MedqueV3",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/splash-icon.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#ffffff"
                }
            ],
            "expo-secure-store",
            [
                "expo-notifications",
                {
                    "icon": "./assets/images/notification-icon.png",
                    "color": "#ffffff",
                    "sounds": ["./assets/sounds/notification-sound.wav"]
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            router: {
                origin: false
            },
            eas: {
                projectId: "943be5f9-0d56-4b51-81f8-a03ef910c141"
            },
            appEnv, // Expose environment to app code
        }
    };

    // Environment-specific overrides
    switch (appEnv) {
        case 'development':
            return {
                ...baseConfig,
                name: "MedqueV3 (Dev)",
                ios: {
                    ...baseConfig.ios,
                    bundleIdentifier: "com.lynxprazo.MedqueV3.dev",
                    supportsTablet: true,
                    infoPlist: {
                        ...baseConfig.ios?.infoPlist, // Preserve existing infoPlist
                        ITSAppUsesNonExemptEncryption: false
                    }
                },
                android: {
                    ...baseConfig.android,
                    package: "com.lynxprazo.MedqueV3.dev",
                    adaptiveIcon: {
                        ...baseConfig.android?.adaptiveIcon, // Preserve existing
                        foregroundImage: "./assets/images/adaptive-icon-dev.png",
                        backgroundColor: "#FF0000" // Red for dev
                    },
                    googleServicesFile: "./android/app/dev-google-services.json"
                },
                extra: {
                    ...baseConfig.extra,
                    apiUrl: "https://dev-api.medque.com"
                }
            };
            
        case 'preview':
            return {
                ...baseConfig,
                name: "MedqueV3 (Preview)",
                ios: {
                    ...baseConfig.ios,
                    bundleIdentifier: "com.lynxprazo.MedqueV3.preview",
                    supportsTablet: true,
                    infoPlist: {
                        ...baseConfig.ios?.infoPlist, 
                        ITSAppUsesNonExemptEncryption: false
                    }
                },
                android: {
                    ...baseConfig.android,
                    package: "com.lynxprazo.MedqueV3.preview",
                    adaptiveIcon: {
                        ...baseConfig.android?.adaptiveIcon, // Preserve existing
                        foregroundImage: "./assets/images/adaptive-icon-preview.png",
                        backgroundColor: "#FFFF00" // Yellow for preview
                    },
                    googleServicesFile: "./android/app/preview-google-services.json"
                },
                extra: {
                    ...baseConfig.extra,
                    apiUrl: "https://staging-api.medque.com"
                }
            };
            
        default: // production
            return {
                ...baseConfig,
                ios: {
                    ...baseConfig.ios,
                    bundleIdentifier: "com.lynxprazo.MedqueV3",
                    supportsTablet: true,
                    infoPlist: {
                        ...baseConfig.ios?.infoPlist, 
                        ITSAppUsesNonExemptEncryption: false
                    }
                },
                android: {
                    ...baseConfig.android,
                    package: "com.lynxprazo.MedqueV3",
                    adaptiveIcon: {
                        ...baseConfig.android?.adaptiveIcon, 
                        foregroundImage: "./assets/images/adaptive-icon.png",
                        backgroundColor: "#ffffff"
                    },
                    googleServicesFile: "./android/app/google-services.json"
                },
                extra: {
                    ...baseConfig.extra,
                    apiUrl: "https://api.medque.com"
                }
            };
    }
};