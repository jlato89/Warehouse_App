import React, { useState } from 'react';
import { SafeAreaView, Button, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import ListViewItem from '../../components/ListViewItem/ListViewItem';
import PullData from '../../TestData/PullDetails.example';

export default function App() {
  const [dataArr, setDataArr] = useState(PullData);

  const isFinished = dataArr.every((item => item.picked !== false));

  const handleToggleItem = itemId => {
    const newArr = dataArr.map(el =>
      (el.id === itemId ? Object.assign({}, el, { 'picked': !el.picked }) : el))
    setDataArr(newArr)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataArr.sort((a, b) => a.picked - b.picked)}
        renderItem={({ item }) =>
          <ListViewItem
            data={item}
            toggleItem={handleToggleItem}
          />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title='Submit'
        disabled={!isFinished}
        onPress={() => alert('Pullsheet marked as Pulled')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
