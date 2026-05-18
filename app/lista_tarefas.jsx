// ============================================================
// Lista de Tarefas — demonstração de FlatList com dados reais
//
// Conceitos demonstrados:
//   - FlatList: lista performática para muitos itens
//   - TouchableOpacity: item clicável com feedback visual
//   - Estado local para controlar quais itens estão concluídos
//   - Importação de dados estáticos de outro arquivo
//
// Dependências: nenhuma nova — usa apenas React Native puro
// ============================================================

import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Dados estáticos importados de dados/afazeres.js
// Cada item tem: { id, title, completed }
import { listaDeAfazeres } from "../dados/afazeres";

export default function ListaDeTarefas() {

    // Estado local que espelha a lista de afazeres
    // Usamos estado (em vez de usar o array diretamente) para
    // poder alternar "concluído/não concluído" sem modificar o original
    const [tarefas, setTarefas] = useState(listaDeAfazeres);

    // --------------------------------------------------------
    // alternarConcluido — marca/desmarca uma tarefa como feita
    // Recebe o id do item clicado e inverte seu campo 'completed'
    // --------------------------------------------------------
    function alternarConcluido(id) {
        setTarefas(anterior =>
            anterior.map(item =>
                // Se o id bater, inverte; caso contrário, mantém igual
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    }

    // --------------------------------------------------------
    // renderItem — função chamada pelo FlatList para cada elemento
    // Recebe { item } desestruturado automaticamente pelo FlatList
    // --------------------------------------------------------
    function renderItem({ item }) {
        return (
            // TouchableOpacity: área clicável que escurece ao toque
            // onPress chama a função de alternar para este item específico
            <TouchableOpacity
                style={styles.item}
                onPress={() => alternarConcluido(item.id)}
                activeOpacity={0.7} // Opacidade ao pressionar (0 = transparente, 1 = sem efeito)
            >
                {/* Círculo de marcação: preenchido se concluído */}
                <View style={[styles.circulo, item.completed && styles.circuloConcluido]}>
                    {/* Checkmark visível somente quando concluído */}
                    {item.completed && <Text style={styles.check}>✓</Text>}
                </View>

                {/* Texto da tarefa: riscado se concluída */}
                <Text style={[styles.titulo, item.completed && styles.tituloConcluido]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    // Conta quantas tarefas já foram concluídas
    const quantidadeConcluidas = tarefas.filter(t => t.completed).length;

    return (
        <View style={styles.container}>

            {/* Cabeçalho com contagem de progresso */}
            <Text style={styles.progresso}>
                {quantidadeConcluidas} / {tarefas.length} concluídas
            </Text>

            {/*
                FlatList — renderiza apenas os itens visíveis na tela
                (mais eficiente que .map() para listas longas)

                Props principais:
                  data        — o array de itens
                  keyExtractor — função que retorna chave única por item
                  renderItem  — função que transforma cada item em componente
            */}
            <FlatList
                data={tarefas}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                // Separador visual entre itens (mais simples que estilizar cada item)
                ItemSeparatorComponent={() => <View style={styles.separador} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    progresso: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
        textAlign: "right",
    },
    item: {
        flexDirection: "row",   // Círculo e texto lado a lado
        alignItems: "center",   // Alinha verticalmente ao centro
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
    },
    circulo: {
        width: 28,
        height: 28,
        borderRadius: 14,       // Metade do tamanho = círculo perfeito
        borderWidth: 2,
        borderColor: "#aaa",
        marginRight: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    // Aplicado quando completed === true
    circuloConcluido: {
        backgroundColor: "#10b981", // Verde
        borderColor: "#10b981",
    },
    check: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    titulo: {
        fontSize: 16,
        color: "#1a1a1a",
        flex: 1,                // Ocupa espaço restante (evita quebra no círculo)
    },
    // Texto riscado quando concluído
    tituloConcluido: {
        textDecorationLine: "line-through",
        color: "#aaa",
    },
    separador: {
        height: 8,              // Espaço entre itens
    },
});
