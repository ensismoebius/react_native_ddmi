import { Appearance, FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { MENU_ITEMS } from "@/constants/MenuItems";
import MENU_IMAGES from "@/constants/MenuImages";

export default function MenuScreen()
{
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const styles = createStyles(theme, colorScheme);

    // Scollview for web and SafeAreaView for mobile apps
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    const separatorComp = <View style={styles.separator} />;
    const headerComp = <Text style={styles.headerComp}>Top of the list</Text>;
    const footerComp = <Text style={styles.footerComp}>Bottom of the list</Text>;
    const emptyComp = <Text style={styles.headerComp}>No items</Text>;

    return (
        <Container>
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) =>
                {
                    return item.id.toString();
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={separatorComp}
                ListHeaderComponent={headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}
                ListEmptyComponent={emptyComp}
                renderItem={({ item }) =>
                {
                    return (
                        <View style={styles.row}>
                            <View style={styles.menuTextRow}>
                                <Text style={[styles.menuItemText, styles.menuItemTitle]}>{item.title}</Text>
                                <Text style={styles.menuItemText}>{item.description}</Text>
                            </View>
                            <Image
                                source={MENU_IMAGES[item.id - 1]}
                                style={styles.menuImage}
                            />
                        </View>
                    );
                }} />
        </Container>
    );
}

function createStyles(theme, colorScheme)
{
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        separator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10
        },
        footerComp: {
            color: theme.text,
            marginHorizontal: 'auto'
        },
        headerComp: {
            color: theme.text,
            marginHorizontal: 'auto'
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto'
        },
        menuTextRow: {
            width: '65%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 5,
            flexGrow: 1
        },
        menuItemTitle: {
            fontSize: 18,
            textDecorationLine: 'underline'
        },
        menuItemText: {
            color: theme.text
        },
        menuImage: {
            width: 100,
            height: 100
        }
    });
}