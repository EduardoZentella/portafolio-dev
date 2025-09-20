import yaml from 'js-yaml';

export type Language = 'en' | 'es';

interface TranslationData {
  [key: string]: any;
}

class TranslationService {
  private translations: Record<Language, TranslationData> = {
    en: {},
    es: {}
  };
  
  private isLoaded = false;

  async loadTranslations(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // Import YAML files as text using Vite's asset handling
      const [enModule, esModule] = await Promise.all([
        import('/src/locales/en.yaml?raw'),
        import('/src/locales/es.yaml?raw')
      ]);

      // Parse YAML content
      this.translations.en = yaml.load(enModule.default) as TranslationData;
      this.translations.es = yaml.load(esModule.default) as TranslationData;

      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to empty objects if loading fails
      this.translations = {
        en: {},
        es: {}
      };
      this.isLoaded = true; // Mark as loaded to prevent infinite loading
    }
  }

  translate(key: string, language: Language): string {
    const keys = key.split('.');
    let value: any = this.translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation is not found
      }
    }

    return typeof value === 'string' ? value : key;
  }

  getRaw(key: string, language: Language): any {
    const keys = key.split('.');
    let value: any = this.translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return undefined; // Return undefined if not found
      }
    }

    return value; // Return the raw value (could be string, array, object, etc.)
  }

  isTranslationsLoaded(): boolean {
    return this.isLoaded;
  }
}

export const translationService = new TranslationService();
