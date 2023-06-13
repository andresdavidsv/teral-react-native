import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';

import {GamesContext} from '../context/GamesContext';
import {GamesStackParams} from '../navigator/GamesNavigator';

interface Props extends StackScreenProps<GamesStackParams, 'GamesScreen'> {}

export const GamesScreen = ({navigation}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {games, loadGames} = useContext(GamesContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={() => console.log('GameScreen', {})}>
          <Text>Add </Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadGamesFromBackend = async () => {
    setIsRefreshing(true);
    await loadGames();
    setIsRefreshing(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={games}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              console.log('GameScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.gameName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadGamesFromBackend}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gameName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
