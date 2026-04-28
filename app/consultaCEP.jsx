/**
 * Tela Consulta CEP - Busca de Endereço por CEP
 * 
 * Esta tela permite ao usuário consultar endereços brasileiros
 * usando o webservice gratuito ViaCEP.
 * 
 * Funcionalidades:
 * - Campo para digitar o CEP (apenas números)
 * - Validação de 8 dígitos
 * - Requisição HTTP para API ViaCEP
 * - Exibição de logradouro, bairro, cidade, estado
 * - Estados de carregamento e erro
 * 
 * @module app/consultaCEP
 */

// ============================================
// IMPORTS
// ============================================

// React e hook de estado
import React, { useState } from 'react';

// Componentes visuais do React Native
import { 
    View,               // Container
    Text,               // Texto
    Button,             // Botão nativo (não usado)
    ActivityIndicator, // Indicador carregamento
    StyleSheet,        // Estilos
    Alert              // Alertas nativos do sistema
} from 'react-native';

// Componente TextInput personalizado do projeto
import { TextInput } from '../components/TextInput';

// Componente Button personalizado do projeto
import { Button as CustomButton } from '../components/Button';

// Hook de tradução
import { useTranslation } from '../hooks/useTranslation';

// ============================================
// TELA PRINCIPAL
// ============================================

export default function CepLookup() {
    // ------------------------------------------
    // ESTADOS DO COMPONENTE
    // ------------------------------------------
    
    /**
     * cep: Estado que armazena o CEP digitado pelo usuário
     * String com apenas números (máx 8 dígitos)
     */
    const [cep, setCep] = useState('');
    
    /**
     * dados: Estado que armazena os dados do endereço retornados
     * Object: { logradouro, bairro, localidad UF } ou null
     */
    const [dados, setDados] = useState(null);
    
    /**
     * carregando: Estado que indica se há requisição em andamento
     * boolean: true = mostrando spinner, false = não carregando
     */
    const [carregando, setCarregando] = useState(false);
    
    // Hook de tradução
    const { t } = useTranslation();

    // ------------------------------------------
    // TEXTOS TRADUZIDOS
    // ------------------------------------------
    
    // Mensagens de erro traduzidas
    const invalidCepMsg = t ? t('cep.invalid') : 'CEP inválido! Insira um CEP com 8 dígitos.';
    const notFoundMsg = t ? t('cep.notFound') : 'CEP não encontrado!';
    const errorMsg = t ? t('cep.error') : 'Erro ao buscar o CEP.';
    
    // Labels traduzidos
    const labelText = t ? t('cep.enterCep') : 'Digite o CEP:';
    const buttonText = t ? t('cep.search') : 'Buscar CEP';
    const addressLabel = t ? t('cep.address') : 'Endereço';
    const neighborhoodLabel = t ? t('cep.neighborhood') : 'Bairro';
    const cityLabel = t ? t('cep.city') : 'Cidade';
    const stateLabel = t ? t('cep.state') : 'Estado';

    // ------------------------------------------
    // FUNÇÃO: Buscar dados do CEP
    // ------------------------------------------
    
    /**
     * Função que executa a búsqueda do CEP na API ViaCEP
     * Endpoint: https://viacep.com.br/ws/{cep}/json/
     */
    async function carregaDadosDoCEP() {
        // ------------------------------------------
        // VALIDAÇÃO: Verificar se CEP tem 8 dígitos
        // ------------------------------------------
        if (cep.length !== 8) {
            Alert.alert(
                t ? t('common.error') : 'Erro', 
                invalidCepMsg
            );
            return; // Encerra função
        }

        // ------------------------------------------
        // PREPARAÇÃO: Ativar estado de carregamento
        // ------------------------------------------
        setCarregando(true);

        // ------------------------------------------
        // REQUISIÇÃO: Fetch para API ViaCEP
        // ------------------------------------------
        /**
         * fetch(url): Função nativa para fazer requisições HTTP
         * then(): Encadeia operações assíncronas
         * Promise: Fluxo assíncrono (não bloqueante)
         */
        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            
            // Step 1: Converter resposta para JSON
            .then(resposta => resposta.json())
            
            // Step 2: Processar dados retornados
            .then(dadosEmJson => {
                // ViaCEP retorna { erro: true } se CEP não existe
                if (dadosEmJson.erro) {
                    // CEP não encontrado
                    Alert.alert(
                        t ? t('common.error') : 'Erro', 
                        notFoundMsg
                    );
                    setDados(null); // Limpa dados anteriores
                } else {
                    // Sucesso: armazena dados do endereço
                    setDados(dadosEmJson);
                }
            })
            
            // Step 3: Tratar erros de rede/servidor
            .catch(errorDeRequisicao => {
                console.error('Erro na requisição:', errorDeRequisicao);
                Alert.alert(
                    t ? t('common.error') : 'Erro', 
                    errorMsg
                );
            })
            
            // Step 4: Sempre executado (sucesso ou erro)
            // Desativa estado de carregamento
            .finally(() => setCarregando(false));
    }

    // ------------------------------------------
    // RENDERIZAÇÃO
    // ------------------------------------------
    
    return (
        // Container principal com padding
        <View style={styles.container}>
            
            {/* Label acima do campo de input */}
            <Text style={styles.label}>{labelText}</Text>
            
            {/* Campo de entrada do CEP */}
            <TextInput
                value={cep}                    // Valor controlado
                onChangeText={setCep}          // Callback de mudança
                keyboardType="numeric"         // Teclado numérico
                maxLength={8}                 // Limite de 8 caracteres
                placeholder="12345678"        // Texto de exemplo
            />
            
            {/* Botão de buscar - mostra loading se carregando */}
            <CustomButton
                title={buttonText}
                onPress={carregaDadosDoCEP}
                loading={carregando}
            />

            {/* ------------------------------------------
                CONDIÇÃO: Só exibe se dados existirem
                Exibe card com informações do endereço
                ------------------------------------------ */}
            {dados && (
                <View style={styles.result}>
                    {/* Endereço (logradouro) */}
                    <Text>📍 {addressLabel}: {dados.logradouro}</Text>
                    
                    {/* Bairro */}
                    <Text>🏙 {neighborhoodLabel}: {dados.bairro}</Text>
                    
                    {/* Cidade */}
                    <Text>🌆 {cityLabel}: {dados.localidade}</Text>
                    
                    {/* Estado (UF) */}
                    <Text>🗺 {stateLabel}: {dados.uf}</Text>
                </View>
            )}
            
        </View>
    );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
    // Container principal
    container: {
        padding: 20,              // Espaçamento interno
    },
    
    // Label do campo de input
    label: {
        fontSize: 16,            // Tamanho de fonte
        marginBottom: 8,         // Espaço abaixo
    },
    
    // Card de resultado
    result: {
        marginTop: 20,           // Espaço acima
        borderWidth: 1,          // Borda
        borderColor: '#ffffff',  // Cor da borda
        borderRadius: 10,        // Bordas arredondadas
        backgroundColor: '#bbbbbb', // Fundo cinza
        padding: 10,             // Espaçamento interno
    },
});