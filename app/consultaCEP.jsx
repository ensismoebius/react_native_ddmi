import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Button as CustomButton } from '../components/Button';
import { useTranslation } from '../hooks/useTranslation';

export default function CepLookup() {
    const [cep, setCep] = useState('');
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const { t } = useTranslation();

    const invalidCepMsg = t ? t('cep.invalid') : 'CEP inválido! Insira um CEP com 8 dígitos.';
    const notFoundMsg = t ? t('cep.notFound') : 'CEP não encontrado!';
    const errorMsg = t ? t('cep.error') : 'Erro ao buscar o CEP.';

    async function carregaDadosDoCEP() {
        if (cep.length !== 8) {
            Alert.alert(t ? t('common.error') : 'Erro', invalidCepMsg);
            return;
        }

        setCarregando(true);

        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resposta => resposta.json())
            .then(dadosEmJson => {
                if (dadosEmJson.erro) {
                    Alert.alert(t ? t('common.error') : 'Erro', notFoundMsg);
                    setDados(null);
                } else {
                    setDados(dadosEmJson);
                }
            })
            .catch(errorDeRequisicao => {
                console.error('Erro na requisição:', errorDeRequisicao);
                Alert.alert(t ? t('common.error') : 'Erro', errorMsg);
            })
            .finally(() => setCarregando(false));
    }

    const labelText = t ? t('cep.enterCep') : 'Digite o CEP:';
    const buttonText = t ? t('cep.search') : 'Buscar CEP';
    const addressLabel = t ? t('cep.address') : 'Endereço';
    const neighborhoodLabel = t ? t('cep.neighborhood') : 'Bairro';
    const cityLabel = t ? t('cep.city') : 'Cidade';
    const stateLabel = t ? t('cep.state') : 'Estado';

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{labelText}</Text>
            <TextInput
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                maxLength={8}
                placeholder="12345678"
            />
            <CustomButton
                title={buttonText}
                onPress={carregaDadosDoCEP}
                loading={carregando}
            />

            {dados && (
                <View style={styles.result}>
                    <Text>📍 {addressLabel}: {dados.logradouro}</Text>
                    <Text>🏙 {neighborhoodLabel}: {dados.bairro}</Text>
                    <Text>🌆 {cityLabel}: {dados.localidade}</Text>
                    <Text>🗺 {stateLabel}: {dados.uf}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    result: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 10,
        backgroundColor: '#bbbbbb',
        padding: 10,
    },
});