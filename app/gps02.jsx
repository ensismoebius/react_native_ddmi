/**
 * Tela GPS 2 - Localização em Tempo Real
 * 
 * Similar ao GPS 1, mas atualiza continuamente a posição
 * usando watchPositionAsync (em vez de getCurrentPositionAsync).
 * Exibe um mapa Leaflet integrado via WebView.
 * 
 * Diferenças do GPS 1:
 * - Atualiza posição em tempo real (a cada 1 segundo)
 * - Mostra mapa interativo com marcador na posição atual
 * - Necessita cancelar subscription ao sair da tela
 * 
 * @module app/gps02
 */

// ============================================
// IMPORTS
// ============================================

// React e hooks
import React, { useEffect, useState } from 'react';

// Componentes visuais do React Native
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// Biblioteca de localização do Expo
import * as Location from 'expo-location';

// Componente WebView para exibir mapa HTML
import { WebView } from 'react-native-webview';

// Template HTML do mapa Leaflet
import { getLocationMapHtml } from '../utils/mapTemplates';

// Hook de tradução
import { useTranslation } from '../hooks/useTranslation';

// ============================================
// TELA PRINCIPAL
// ============================================

export default function App() {
    // ------------------------------------------
    // ESTADOS DO COMPONENTE
    // ------------------------------------------
    
    /**
     * location: Posição atual do GPS (atualizada em tempo real)
     */
    const [location, setLocation] = useState(null);
    
    /**
     * errorMsg: Mensagem de erro (permissão negada, etc)
     */
    const [errorMsg, setErrorMsg] = useState(null);
    
    // Hook de tradução
    const { t } = useTranslation();

    // ------------------------------------------
    // EFFECT: Iniciar watch de localização
    // ------------------------------------------
    
    useEffect(() => {
        // Variável para armazenar a subscription
        // (precisamos dela para cancelar depois)
        let subscription;
        
        // Função async para configurar GPS em tempo real
        (async () => {
            // Step 1: Solicitar permissão de localização
            const { status } = await Location.requestForegroundPermissionsAsync();
            
            // Step 2: Verificar permissão
            if (status !== 'granted') {
                setErrorMsg(
                    t ? t('gps.permissionDenied') : 'Permissão negada'
                );
                return;
            }
            
            // Step 3: Iniciar monitoramento contínuo
            /**
             * watchPositionAsync: Observa mudanças de posição
             * - accuracy: Alta precisão (GPS)
             * - timeInterval: Atualiza a cada 1000ms (1 segundo)
             * - distanceInterval: Atualiza se mover mais de 1 metro
             * - Callback: atualiza estado com nova posição
             */
            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High, // Alta precisão
                    timeInterval: 1000,               // A cada 1 segundo
                    distanceInterval: 1,              // Ou a cada 1 metro
                },
                (loc) => {
                    // Callback: nova posição recebida
                    setLocation(loc);
                }
            );
        })();
        
        // ------------------------------------------
        // CLEANUP: Cancelar watch ao sair da tela
        // ------------------------------------------
        /**
         * Return dentro do useEffect = função de cleanup
         * Executada quando:
         * - Componente é desmontado (navegou para outra tela)
         * - Antes de re-executar o effect
         * Evita vazamento de memória e bateria
         */
        return () => {
            if (subscription) {
                subscription.remove(); // Para o monitoramento
            }
        };
    }, [t]); // Dependência: t (re-configura se idioma mudar)

    // ------------------------------------------
    // RENDERIZAÇÃO CONDICIONAL
    // ------------------------------------------
    
    /**
     * Texto de espera tradução
     */
    const waitingText = t ? t('gps.waiting') : 'Aguardando localização...';

    return (
        // Container principal (ocupa toda a tela)
        <View style={styles.container}>
            
            {/* ------------------------------------------
                CONDIÇÃO 1: Erro na permissão
                Exibe mensagem de erro centralizada
                ------------------------------------------ */}
            {errorMsg ? (
                <View style={styles.centered}>
                    <Text>{errorMsg}</Text>
                </View>
            ) : 
            
            /* ------------------------------------------
               CONDIÇÃO 2: Tem localização
               Exibe mapa com posição atual
               ------------------------------------------ */
            location ? (
                /**
                 * WebView: Componente que renderiza HTML/CSS/JS
                 * originWhitelist: Permite carregar de qualquer origem
                 * source.html: Passa HTML do mapa Leaflet
                 */
                <WebView 
                    style={styles.map}
                    originWhitelist={['*']}  // Permite qualquer domínio
                    source={{ 
                        // Template HTML com coordenadas
                        html: getLocationMapHtml(
                            location.coords.latitude, 
                            location.coords.longitude
                        ) 
                    }}
                />
            ) : 
            
            /* ------------------------------------------
               CONDIÇÃO 3: Carregando
               Exibe texto de espera centralizado
               ------------------------------------------ */
            (
                <View style={styles.centered}>
                    <Text>{waitingText}</Text>
                </View>
            )}
            
        </View>
    );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
    // Container principal - flex 1 ocupa toda a tela
    container: {
        flex: 1,
    },
    
    // Container centralizado (para mensagens de espera/erro)
    centered: {
        flex: 1,                           // Ocupa espaço disponível
        justifyContent: 'center',          // Centraliza verticalmente
        alignItems: 'center',             // Centraliza horizontalmente
    },
    
    // Mapa WebView - ocupa toda a tela
    map: {
        // Usa dimensões da janela do dispositivo
        width: Dimensions.get('window').width,   // Largura da tela
        height: Dimensions.get('window').height, // Altura da tela
    },
});