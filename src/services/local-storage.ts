export function setLocal<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getLocal<T>(key: string): T | null {
  try {
    const itemString = localStorage.getItem(key);
    if (!itemString) throw Error("Could not retrieve data");
    return JSON.parse(itemString);
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function deleteLocal(key: string) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
}
