class SessionStorage {
  public get(key: string, fallback: any = null) {
    try {
      if (typeof window !== "undefined") {
        const item = window.sessionStorage.getItem(key);
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
      window.sessionStorage.setItem(key, JSON.stringify(value));
      if (callback) {
        callback();
      }
    }
  }

  public remove(key: string, callback?: () => void) {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
      if (callback) {
        callback();
      }
    }
  }
}

export default new SessionStorage();
