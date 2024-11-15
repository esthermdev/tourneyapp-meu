import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import Ionicon from '@expo/vector-icons/Ionicons';
import { ms, s } from 'react-native-size-matters';

const TabBar = ({ state, descriptors, navigation }) => {

  const primaryColor = '#EA1D25';
  const secondaryColor = '#333243';

  const getIcon = (routeName, isFocused) => {
    let iconName;
    switch (routeName) {
      case 'home':
        iconName = 'home';
        size = ms(21);
        break;
      case 'schedule':
        iconName = 'calendar';
        size = ms(21);
        break;
      case 'teams':
        iconName = 'people';
        size = ms(25);
        break;
      case 'standings':
        iconName = 'medal';
        size = ms(21);
        break;
      case 'info':
        iconName = 'information-circle';
        size = ms(26);
        break;
      default:
        iconName = 'home';
    }
    return (
      <Ionicon
        name={iconName}
        size={size}
        color={isFocused ? primaryColor : secondaryColor}
      />
    );
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            key={route.name}
            style={styles.tabBarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={styles.tabBarItem}>
              {getIcon(route.name, isFocused)}
            </View>
            <View style={{ flex: 1 }}>
              <Text maxFontSizeMultiplier={1.1} style={{ color: isFocused ? primaryColor : secondaryColor, fontFamily: 'Outfit-Regular', fontSize: ms(13) }}>
                {label}
              </Text>
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ms(55),
    backgroundColor: '#fff',
    borderTopColor: 'lightgrey',
    borderTopWidth: ms(1),
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default TabBar;