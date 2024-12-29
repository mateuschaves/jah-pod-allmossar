import React, { useEffect, useRef, useState } from "react";
import { Container, Subtitle, Title } from "./screens/Home/styles";
import { canAllMossarTexts, cantAllMossarTexts } from "./constants/Texts";
import * as Sharing from 'expo-sharing';

import ConfettiCannon from 'react-native-confetti-cannon';
import { AllMossarEnum } from "./enums/AllMossar.enum";
import * as Haptics from 'expo-haptics';
import ViewShot from "react-native-view-shot";
import Button from "./components/Button";

export default function Index() {
  const explosionRef = useRef(null);
  const [allMossarStatus] = useState(isAllMossarTime() ? AllMossarEnum.CAN : AllMossarEnum.CANT);
  const [allMossarText, setAllMossarText] = useState(getRandomText(allMossarStatus === AllMossarEnum.CAN ? canAllMossarTexts : cantAllMossarTexts));
  const viewShotRef = useRef(null);


  useEffect(() => {
    if (allMossarStatus === AllMossarEnum.CAN){
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
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

  function shareResponse() {
    if (!viewShotRef?.current) return;
    console.log("shareResponse");

    viewShotRef?.current?.capture().then(uri => {
      console.log("Image saved to", uri);
      Sharing.shareAsync(uri);
    });
  }

  return (
    <Container can={allMossarStatus === AllMossarEnum.CAN}>
      <ConfettiCannon
        explosionSpeed={300}
        fallSpeed={3000}
        count={400}
        origin={{x: 200, y: 1000}}
        fadeOut
        autoStart={false}
        ref={explosionRef}
      />

      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1 }} captureMode="mount">
        <Title>
          {allMossarText.title}
        </Title>

        <Subtitle>
          {allMossarText.subtitle}
        </Subtitle>
      </ViewShot>

      <Button
        title="Compartilhar"
        onPress={shareResponse}
      />
      </Container>
  );
}
