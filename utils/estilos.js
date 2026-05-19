import { Platform, StyleSheet } from 'react-native';

export const cores = {
    primaria:      '#6366f1',
    primariaEsc:   '#4f46e5',
    primariaCla:   '#e0e7ff',
    secundaria:    '#06b6d4',
    perigo:        '#ef4444',
    perigoClaro:   '#fee2e2',
    sucesso:       '#10b981',
    sucessoClaro:  '#d1fae5',
    aviso:         '#f59e0b',
    avisoClaro:    '#fef3c7',

    fundo:         '#f1f5f9',
    superficie:    '#ffffff',
    borda:         '#e2e8f0',

    texto:         '#0f172a',
    textoSec:      '#64748b',
    textoMudo:     '#94a3b8',
    branco:        '#ffffff',

    // section accent colors
    rede:    '#6366f1',
    sensores:'#06b6d4',
    mapas:   '#10b981',
    notif:   '#f59e0b',
    outros:  '#8b5cf6',
};

export const raio = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 999 };

export const sombra = {
    sm: Platform.select({
        ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3 },
        android: { elevation: 2 },
        default: {},
    }),
    md: Platform.select({
        ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 8 },
        android: { elevation: 4 },
        default: {},
    }),
    lg: Platform.select({
        ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.14, shadowRadius: 16 },
        android: { elevation: 8 },
        default: {},
    }),
};

export const fonte = Platform.select({ ios: 'Courier New', android: 'monospace', default: 'monospace' });

export const estilosComuns = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: cores.fundo,
    },
    cartao: {
        backgroundColor: cores.superficie,
        borderRadius: raio.lg,
        padding: 16,
        ...Platform.select({
            ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
            android: { elevation: 3 },
            default: {},
        }),
    },
    tituloPagina: {
        fontSize: 26,
        fontWeight: '700',
        color: cores.texto,
        marginBottom: 4,
    },
    subtitulo: {
        fontSize: 14,
        color: cores.textoSec,
        marginBottom: 20,
    },
    rotulo: {
        fontSize: 13,
        fontWeight: '600',
        color: cores.textoSec,
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    entrada: {
        backgroundColor: cores.superficie,
        borderWidth: 1.5,
        borderColor: cores.borda,
        borderRadius: raio.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: cores.texto,
        marginBottom: 12,
    },
    entradaFocada: {
        borderColor: cores.primaria,
    },
    botaoPrimario: {
        backgroundColor: cores.primaria,
        borderRadius: raio.md,
        paddingVertical: 13,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoPrimarioTexto: {
        color: cores.branco,
        fontSize: 15,
        fontWeight: '700',
    },
    botaoSecundario: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: cores.primaria,
        borderRadius: raio.md,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    botaoSecundarioTexto: {
        color: cores.primaria,
        fontSize: 15,
        fontWeight: '600',
    },
    botaoPerigo: {
        backgroundColor: cores.perigo,
        borderRadius: raio.md,
        paddingVertical: 13,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    botaoPerigoTexto: {
        color: cores.branco,
        fontSize: 15,
        fontWeight: '700',
    },
    erro: {
        backgroundColor: cores.perigoClaro,
        borderRadius: raio.sm,
        padding: 10,
        marginVertical: 8,
    },
    erroTexto: {
        color: cores.perigo,
        fontSize: 14,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: raio.full,
        alignSelf: 'flex-start',
    },
    divisor: {
        height: 1,
        backgroundColor: cores.borda,
        marginVertical: 16,
    },
});
