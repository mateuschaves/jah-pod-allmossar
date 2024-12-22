import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "./constants/Colors";

import ConfettiCannon from 'react-native-confetti-cannon';
import { AllMossarEnum } from "./enums/AllMossar.enum";
import { canAllMossarTexts, cantAllMossarTexts } from "./constants/Texts";
export default function Index() {
  const explosionRef = React.useRef(null);
  const [allMossarStatus] = useState(isAllMossarTime() ? AllMossarEnum.CAN : AllMossarEnum.CANT);
  const [allMossarText, setAllMossarText] = useState(getRandomText(allMossarStatus === AllMossarEnum.CAN ? canAllMossarTexts : cantAllMossarTexts));

  useEffect(() => {
    if (allMossarStatus === AllMossarEnum.CAN){
      explosionRef?.current?.start();
    }

    chooseText();
  }, []);

  function isAllMossarTime() {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 12 && hours < 14) {
      return true;
    }

    return false;
  }
  const texts = allMossarStatus === AllMossarEnum.CAN ? canAllMossarTexts : cantAllMossarTexts;

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function getRandomText(texts: {
    title: string;
    subtitle: string;
  }[]) {
    return texts[getRandomInt(texts.length)];
  }

  function chooseText() {
    setAllMossarText(getRandomText(texts));
  }

  return (
    <View
      style={allMossarStatus === AllMossarEnum.CAN ? styles.canContainer : styles.cantContainer}
    >
      <ConfettiCannon
        explosionSpeed={300}
        fallSpeed={3000}
        count={400}
        origin={{x: 200, y: 1000}}
        autoStart={false}
        ref={explosionRef}
      />
      <Text style={
        allMossarStatus === AllMossarEnum.CAN ? styles.canTitle : styles.cantTitle
      }>
        {allMossarText.title}
      </Text>

      <Text style={styles.subtitle}>
        {allMossarText.subtitle}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  canContainer: {
    flex: 1,
    backgroundColor: Colors.canAllMossar.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cantContainer: {
    flex: 1,
    backgroundColor: Colors.cantAllMossar.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canTitle: {
    color: Colors.canAllMossar.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  cantTitle: {
    color: Colors.cantAllMossar.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.canAllMossar.text,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  }
});