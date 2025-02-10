import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";

/**
 * Um contexto é uma forma de compartilhar informações (como estados, temas, 
 * informação de usuárie, etc.) para toda a árvore de componentes filhes de 
 * um componente "Provider" (descrito mais abaixo) sem a necessidade de maiores 
 * programações evitando o problema de dependência em cascata já que o 
 * contexto será válido para até o mais profundo componente.
 * 
 * Além disso o contexto faz papel de uma variável global em relação aos
 * subcomponentes sob sua influência. Para acessar essa váriavel global
 * dentro do componente use o comando "useContext(ThemeContext)"
 */
export const ThemeContext = createContext({});

/**
 * Para que o context (representado por ThemeContext) fique acessível aos
 * subcomponentes, é necessário que eles sejam evoltos em um componente
 * "Provider". Esse componente propaga e atualiza os dados modificados
 * nos subcomponentes (filhes) o que obriga esses a renderizarem novamente.
 * 
 * O provider é necessario para montar / preparar os dados que serão
 * compartilhados, assim como mudar de forma dinâmicas tais dados.
 * @param {React.ReactNode} children 
 * @returns ThemeContext.Provider
 */
export const ThemeProvider = ({ children }) =>
{
    // Criam um hook para armazenar o 
    // esquema de cores do tema atual
    const [colorScheme, setColorScheme] = useState(
        // Recupera do sistema se o esquema de cores 
        // é 'light' ou 'dark' ou null ou undefined;
        Appearance.getColorScheme()
    );

    // Recupera de Colors.js o tema que será usado na aplicação
    const theme = colorScheme === 'dark'
        ? Colors.dark
        : Colors.light;

    // Cria uma instância do Provider 
    return (
        <ThemeContext.Provider value={
            // Dados compartilhados (inclusive funções)
            // colorScheme -> Para saber qual o esquema de cores atual
            // setColorScheme -> Para mudar o esquema de cores
            // theme -> Para ter acesso ao tema atual
            { colorScheme, setColorScheme, theme }
        }>
            {children} {/* Elementos filhos são renderizados aqui */}
        </ThemeContext.Provider>
    );
};