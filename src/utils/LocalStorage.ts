class LocalStorage {
  public get(key: string, fallback: any = null) {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      }
      return fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  public set(key: string, value: object | string, callback?: () => void) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
      if (callback) {
        callback();
      }
    }
  }

  public remove(key: string, callback?: () => void) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
      if (callback) {
        callback();
      }
    }
  }
}

export default new LocalStorage();
