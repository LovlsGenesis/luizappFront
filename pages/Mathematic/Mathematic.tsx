import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/button';

type operationType = {
  addition: 'addition';
  substraction: 'substraction';
  multiplication: 'multiplication';
  division: 'division';
};

const Mathematic = () => {
  const [result, setResult] = useState<Number>(0);
  const [operationType, setOperationType] = useState<String>('addition');

  const calcul = () => {
    const numberA = Math.floor(Math.random() * 100) + 1;
    const numberB = Math.floor(Math.random() * 100) + 1;
    let operationResult = 0;
    switch (operationType) {
      case 'addition':
        operationResult = numberA + numberB;
        break;
      case 'substraction':
        operationResult = numberA - numberB;
        break;
      case 'multiplication':
        operationResult = numberA * numberB;
        break;
      case 'division':
        operationResult = numberA / numberB;
        break;

      default:
        break;
    }
    setResult(operationResult);
  };

  return (
    <View>
      <Text>Mathematic</Text>
      <Button text="Start Game" displayFunction={() => {}} />
    </View>
  );
};

export default Mathematic;
