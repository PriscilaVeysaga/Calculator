import React, {useEffect, useState, useContext} from 'react';
import {Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from 'styled-components';

import CustomButtom from '../../components/CustomButton';
import CustomScreen from '../../components/CustomScreen';

import {Container, RowButtonArea, SwitchArea} from './style';

export default ({toggleTheme}) => {
  const [input, setInput] = useState('');
  const [prevNum, setPrevNum] = useState('');
  const [curNum, setCurNum] = useState('');
  const [operator, setOperator] = useState('');

  const {colors, title} = useContext(ThemeContext);

  useEffect(() => {
    const math_it_Up = {
      '+': function (x, y) {
        return x + y;
      },
      '-': function (x, y) {
        return x - y;
      },
      '*': function (x, y) {
        return x * y;
      },
      '/': function (x, y) {
        return x / y;
      },
    };

    if (curNum !== '') {
      if (operator !== '') {
        let solution = math_it_Up[operator](
          parseFloat(prevNum),
          parseFloat(curNum),
        );

        setInput(solution);
        setOperator('');
        setCurNum('');
      }
    }
  }, [curNum, operator, prevNum]);

  const addPercentage = () => {
    setInput(input / 100);
  };

  const addPlusMinus = () => {
    if (input > 0) {
      setInput(-input);
    } else if (input < 0) {
      setInput(Math.abs(input));
    }
  };

  const addDecimalToInput = e => {
    if (input.indexOf('.') === -1) {
      setInput(input + e);
    }
  };

  const handleClear = () => {
    setInput('');
    setPrevNum('');
    setCurNum('');
    setOperator('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0,(input.length -1)));
  };

  const solve = () => {
    setCurNum(input);
    setInput('');
  };

  function operation_Func(e) {
    setPrevNum(input);
    setInput('');
    setOperator(e);
  }

  const clickButton = e => {
    if (e === '+' || e === '-' || e === '/' || e === '*') {
      operation_Func(e);
    } else if (e === 'AC') {
      handleClear();
    } else if (e === '+/-') {
      addPlusMinus();
    } else if (e === '%') {
      addPercentage();
    } else if (e === '.') {
      addDecimalToInput(e);
    } else if (e === 'backspace') {
      handleBackspace();
    } else if (e === '=') {
      solve();
    } else {
      setInput(input + e);
    }
  };

  return (
    <Container colors={[colors.primary, colors.secondary]} locations={[0, 0.8]}>
      <SwitchArea>
        <Icon name="sun" size={20} color={colors.colorFunctionPrimary} solid />
        <Switch
          value={title === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={colors.colorSwitch}
          trackColor={{
            false: colors.colorFunctionPrimary,
            true: colors.colorFunctionSecondary,
          }}
        />
        <Icon
          name="moon"
          size={20}
          color={colors.colorFunctionSecondary}
          solid
        />
      </SwitchArea>

      <CustomScreen inputValue={input} />

      <RowButtonArea>
        <CustomButtom
          value="AC"
          color={colors.colorFunctionSecondary}
          onPress={() => clickButton('AC')}
        />
        <CustomButtom
          value="+/-"
          color={colors.colorFunctionSecondary}
          onPress={() => clickButton('+/-')}
        />
        <CustomButtom
          value={<Icon name="percentage" size={25} />}
          color={colors.colorFunctionSecondary}
          onPress={() => clickButton('%')}
        />
        <CustomButtom
          value={<Icon name="divide" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('/')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom value="7" onPress={() => clickButton('7')} />
        <CustomButtom value="8" onPress={() => clickButton('8')} />
        <CustomButtom value="9" onPress={() => clickButton('9')} />
        <CustomButtom
          value={<Icon name="times" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('*')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom value="4" onPress={() => clickButton('4')} />
        <CustomButtom value="5" onPress={() => clickButton('5')} />
        <CustomButtom value="6" onPress={() => clickButton('6')} />
        <CustomButtom
          value={<Icon name="minus" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('-')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom value="1" onPress={() => clickButton('1')} />
        <CustomButtom value="2" onPress={() => clickButton('2')} />
        <CustomButtom value="3" onPress={() => clickButton('3')} />
        <CustomButtom
          value={<Icon name="plus" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('+')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom value="0" onPress={() => clickButton('0')} />
        <CustomButtom value="." onPress={() => clickButton('.')} />
        <CustomButtom
          value={<Icon name="backspace" size={25} />}
          onPress={() => clickButton('backspace')}
        />
        <CustomButtom
          value={<Icon name="equals" size={25} />}
          background={colors.backgroundEquals}
          onPress={() => clickButton('=')}
        />
      </RowButtonArea>
    </Container>
  );
};