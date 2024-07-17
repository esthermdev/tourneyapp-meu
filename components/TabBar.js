import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { icons } from '../constants';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const TabBar = ({ state, descriptors, navigation }) => {

	const primaryColor = '#EA1D25';
	const secondaryColor = '#333243';

  const getIcon = (routeName, isFocused) => {
    let iconName;
    switch (routeName) {
      case 'home':
        iconName = 'home';
        break;
      case 'schedule':
        iconName = 'calendar';
        break;
      case 'teams':
        iconName = 'people';
        break;
      default:
        iconName = 'house';
    }
    return (
      <Ionicons
        name={iconName}
				size={21}
				color={ isFocused ? primaryColor : secondaryColor }
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
            navigation.navigate(route.name, route.params);
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
						{getIcon(route.name, isFocused)}
            <Text style={{ color: isFocused ? primaryColor : secondaryColor, fontFamily: 'Outfit-Regular' }}>
              {label}
            </Text>
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
		height: 56,
		backgroundColor: '#fff',
		borderTopColor: 'lightgrey',
		borderTopWidth: 0.3,
  },
	tabBarItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default TabBar;