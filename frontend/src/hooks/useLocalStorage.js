export const useLocalStorage = (key, initialValue) => {
      // Obtém o valor do localStorage pelo key fornecido ou o valor inicial
  const storedValue = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue;

  // Cria um estado para armazenar o valor atual
  const [value, setValue] = useState(storedValue);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}