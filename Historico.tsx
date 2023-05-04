import React, { useRef } from 'react';
import {useState, useEffect} from 'react';
import { Lista  } from './ListItems';
import { StyleSheet, View } from 'react-native';

const Historico: React.FC = () => {
  const [reload, setReload] = useState<boolean>(false);

  const handleReloadTotal = () => {
    // Implement your reloadTotal logic here
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    }
  })

  return (
    <View style={styles.container}>
      <Lista
        reloadTotal={handleReloadTotal}
        reload={reload}
        setReload={setReload}
      />
    </View>
  );
};

export default Historico;
