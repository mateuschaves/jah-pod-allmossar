import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Subtitle, Title, ViewShotContainer } from "./screens/Home/styles";
import { canAllMossarTexts, cantAllMossarTexts } from "./constants/Texts";
import * as Sharing from 'expo-sharing';

import ConfettiCannon from 'react-native-confetti-cannon';
import { AllMossarEnum } from "./enums/AllMossar.enum";
import * as Haptics from 'expo-haptics';
import Button from "./components/Button";
import ViewShot from "react-native-view-shot";
import { RefreshControl, ScrollView } from "react-native";
import { DefaultTheme } from "./theme/default";

export default function App() {
  const explosionRef = useRef<ConfettiCannon>(null);
  const [allMossarStatus] = useState(isAllMossarTime() ? AllMossarEnum.CAN : AllMossarEnum.CANT);
  const [allMossarText, setAllMossarText] = useState(getRandomText(allMossarStatus === AllMossarEnum.CAN ? canAllMossarTexts : cantAllMossarTexts));
  const viewShotRef = useRef<ViewShot>(null);

  const canAllMossar = useMemo(() => allMossarStatus === AllMossarEnum.CAN, [allMossarStatus]);

  useEffect(() => {
    if (allMossarStatus === AllMossarEnum.CAN) {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      explosionRef?.current?.start();
    }

    chooseText();
  }, []);

  function isAllMossarTime() {
    return true;
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
    if (!viewShotRef?.current?.capture) return;

    viewShotRef?.current?.capture()?.then(uri => {
      Sharing.shareAsync(uri, {
        dialogTitle: 'Compartilhar status do all-mosso',
      });
    });
  }

  return (
    <Container can={canAllMossar}>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          tintColor={DefaultTheme.colors.textHighlight}
          colors={[DefaultTheme.colors.textHighlight]}
          refreshing={false}
          onRefresh={() => {
            chooseText();
          }}
        />
      }
    >
      <Container can={canAllMossar}>
        <ConfettiCannon
          explosionSpeed={300}
          fallSpeed={3000}
          count={400}
          origin={{ x: 200, y: 1000 }}
          fadeOut
          autoStart={false}
          ref={explosionRef}
        />
        <ViewShotContainer can={canAllMossar} ref={viewShotRef} options={{ format: "png",  }} captureMode="mount">
          <Title>
            {allMossarText.title}
          </Title>

          <Subtitle>
            {allMossarText.subtitle}
          </Subtitle>
        </ViewShotContainer>

        <Button
          title="Compartilhar"
          onPress={shareResponse}
        />
        </Container>
    </ScrollView>
      </Container>
  );
}
