// ============================================================
// Câmera e Galeria — seleção de imagem com expo-image-picker
//
// Conceitos demonstrados:
//   - ImagePicker.requestCameraPermissionsAsync: pede permissão de câmera
//   - ImagePicker.requestMediaLibraryPermissionsAsync: pede acesso à galeria
//   - ImagePicker.launchCameraAsync: abre a câmera para tirar foto
//   - ImagePicker.launchImageLibraryAsync: abre a galeria para escolher foto
//   - Exibir a imagem selecionada com o componente Image
//   - Diferença entre câmera (capturar nova foto) e galeria (escolher existente)
//
// Instalação:
//   npx expo install expo-image-picker
//
// Permissões necessárias em app.json (para Android/iOS em produção):
//   "android": { "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE"] }
//   "ios": { "infoPlist": { "NSCameraUsageDescription": "...",
//                           "NSPhotoLibraryUsageDescription": "..." } }
// ============================================================

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Alert,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function TelaCamera() {

    // Armazena o resultado da seleção de imagem
    // Quando null: nenhuma imagem selecionada ainda
    // Quando preenchido: { uri, width, height, type, ... }
    const [imagemSelecionada, setImagemSelecionada] = useState(null);

    // --------------------------------------------------------
    // abrirCamera — pede permissão e abre a câmera
    // --------------------------------------------------------
    async function abrirCamera() {
        // Passo 1: solicitar permissão de uso da câmera
        // Em Android 13+, a permissão é solicitada automaticamente ao instalar
        // Em iOS, deve ser declarada no Info.plist
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permissão negada",
                "Precisamos de acesso à câmera para tirar fotos."
            );
            return;
        }

        // Passo 2: abrir a câmera
        const resultado = await ImagePicker.launchCameraAsync({
            // allowsEditing: permite recortar a foto após capturar
            allowsEditing: true,

            // aspect: proporção do recorte [largura, altura]
            // [4, 3] = formato paisagem padrão de câmera
            aspect: [4, 3],

            // quality: compressão de 0 (máxima compressão) a 1 (sem compressão)
            quality: 0.8,
        });

        // Passo 3: verificar se o usuário não cancelou
        // resultado.canceled é true se o usuário fechou sem tirar foto
        if (!resultado.canceled) {
            // resultado.assets é um array; pegamos o primeiro item
            setImagemSelecionada(resultado.assets[0]);
        }
    }

    // --------------------------------------------------------
    // abrirGaleria — pede permissão e abre a galeria de fotos
    // --------------------------------------------------------
    async function abrirGaleria() {
        // Passo 1: solicitar permissão de acesso à biblioteca de mídia
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permissão negada",
                "Precisamos de acesso à galeria para escolher fotos."
            );
            return;
        }

        // Passo 2: abrir a galeria
        const resultado = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: tipo de mídia aceita
            // Images  = apenas fotos
            // Videos  = apenas vídeos
            // All     = fotos e vídeos
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        // Passo 3: verificar se o usuário escolheu algo
        if (!resultado.canceled) {
            setImagemSelecionada(resultado.assets[0]);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
            <Text style={styles.titulo}>Câmera e Galeria</Text>
            <Text style={styles.descricao}>
                Tire uma nova foto ou escolha uma da galeria.
                A imagem selecionada aparecerá abaixo.
            </Text>

            {/* ---- Botões de ação ---- */}
            <View style={styles.filaBotoes}>
                <View style={styles.botaoWrapper}>
                    <Button title="📷 Câmera" onPress={abrirCamera} />
                </View>
                <View style={styles.botaoWrapper}>
                    <Button title="🖼 Galeria" onPress={abrirGaleria} color="#10b981" />
                </View>
            </View>

            {/* ---- Exibição da imagem selecionada ---- */}
            {imagemSelecionada ? (
                <View style={styles.cartaoImagem}>
                    {/*
                        Image — componente nativo para exibir imagens
                        source.uri: caminho local ou URL remota
                        resizeMode: como a imagem se adapta ao container
                          "cover"   = preenche, corta se necessário
                          "contain" = mostra tudo, pode deixar espaço
                          "stretch" = estica para preencher exatamente
                    */}
                    <Image
                        source={{ uri: imagemSelecionada.uri }}
                        style={styles.imagem}
                        resizeMode="cover"
                    />

                    {/* Metadados da imagem */}
                    <View style={styles.metadados}>
                        <Text style={styles.metaTexto}>
                            Dimensões: {imagemSelecionada.width} × {imagemSelecionada.height} px
                        </Text>
                        <Text style={styles.metaTexto} numberOfLines={1}>
                            URI: {imagemSelecionada.uri}
                        </Text>
                    </View>
                </View>
            ) : (
                // Placeholder quando nenhuma imagem foi selecionada
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderTexto}>
                        Nenhuma imagem selecionada
                    </Text>
                    <Text style={styles.placeholderDica}>
                        Use os botões acima para escolher uma foto
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    conteudo: {
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    descricao: {
        fontSize: 13,
        color: "#666",
        marginBottom: 20,
        lineHeight: 20,
    },
    filaBotoes: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    botaoWrapper: {
        flex: 1,
    },
    cartaoImagem: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",     // Garante que a imagem respeite o borderRadius
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    imagem: {
        width: "100%",
        height: 260,
    },
    metadados: {
        padding: 12,
        gap: 4,
    },
    metaTexto: {
        fontSize: 12,
        color: "#666",
        fontFamily: "monospace",
    },
    placeholder: {
        height: 200,
        backgroundColor: "#e9ecef",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#dee2e6",
        borderStyle: "dashed",  // Borda tracejada (indica área de drop/seleção)
    },
    placeholderTexto: {
        fontSize: 15,
        color: "#888",
        fontWeight: "500",
    },
    placeholderDica: {
        fontSize: 12,
        color: "#aaa",
        marginTop: 4,
    },
});
