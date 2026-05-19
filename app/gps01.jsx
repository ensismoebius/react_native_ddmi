// ============================================================
// GPS Estático — única leitura de localização
//
// Dependências:
//   npx expo install expo-location (~19.0.8)
// ============================================================

/**
 * Tela GPS 1 - GPS Estático (uma única leitura)
 * 
 * Obtém a localização atual do dispositivo APENAS UMA VEZ
 * ao abrir a tela. Exibe latitude e longitude.
 * 
 * Usa o hook useEffect para:
 * 1. Solicitar permissão de localização ao usuário
 * 2. Buscar posição atual
 * 3. Armazenar na variável de estado
 * 
 * @module app/gps01
 */

// ============================================
// IMPORTS
// ============================================

// React e hooks de estado
import React, { useEffect, useState } from 'react';

// Componentes visuais do React Native
import { StyleSheet, Text, View } from 'react-native';

// Biblioteca de localização do Expo
import * as Location from 'expo-location';

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
     * location: Armazena a posição obtida do GPS
     * null = ainda não obteve / erro
     * Object = { coords: { latitude, longitude, altitude } }
     */
    const [location, setLocation] = useState(null);
    
    /**
     * errorMsg: Mensagem de erro (se permissão negada ou falha)
     * null = sem erro
     * string = mensagem de erro
     */
    const [errorMsg, setErrorMsg] = useState(null);
    
    // Hook de tradução - função t() para textos traduzidos
    const { t } = useTranslation();

    // ------------------------------------------
    // EFFECT: Buscar localização ao abrir tela
    // ------------------------------------------
    
    /**
     * useEffect com array de dependências [t]
     * Executa quando o componente é montado
     * e quando t mudar (mudança de idioma)
     */
    useEffect(() => {
        // Função async dentro do useEffect
        (async () => {
            // Step 1: Solicitar permissão de localização
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            // Step 2: Verificar se permissão foi concedida
            if (status !== 'granted') {
                // Permissão negada - exibe mensagem de erro
                setErrorMsg(
                    t ? t('gps.permissionDenied') : 'Permission to access location was denied'
                );
                return; // Encerra função
            }

            // Step 3: Permissão concedida - buscar posição atual
            // getCurrentPositionAsync retorna uma única leitura
            let loc = await Location.getCurrentPositionAsync({});
            
            // Step 4: Armazenar posição no estado
            setLocation(loc);
        })();
        // Nota: IIFE (Immediately Invoked Function Expression)
        // executa a função async imediatamente
    }, [t]); // Dependência: t (re-executa se idioma mudar)

    // ------------------------------------------
    // RENDERIZAÇÃO DO TEXTO
    // ------------------------------------------
    
    /**
     * Aguarda mensagem - texto padrão enquanto busca
     */
    const waitingText = t ? t('gps.waiting') : 'Waiting...';
    
    /**
     * Texto de erro ou vazio
     */
    const errorText = errorMsg || '';
    
    /**
     * Lógica para exibir texto apropriado:
     * - Se há erro: exibe erro
     * - Se tem localização: exibe coordenadas
     * - Caso contrário: exibe "aguarde"
     */
    let text = waitingText;
    if (errorMsg) {
        text = errorText;
    } else if (location) {
        // Traduz labels de latitude/longitude
        const lat = t ? t('map.latitude') : 'Latitude';
        const lon = t ? t('map.longitude') : 'Longitude';
        // Monta string com coordenadas
        text = `${lat}: ${location.coords.latitude}\n${lon}: ${location.coords.longitude}`;
    }

    // ------------------------------------------
    // RETORNO DA UI
    // ------------------------------------------
    
    return (
        // Container centralizado
        <View style={styles.container}>
            {/* Texto: pode ser espera, erro ou coordenadas */}
            <Text>{text}</Text>
        </View>
    );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
    // Container que centraliza conteúdo na tela
    container: {
        flex: 1,                      // Ocupa toda a tela
        justifyContent: 'center',    // Centraliza verticalmente
        alignItems: 'center',        // Centraliza horizontalmente
    },
});