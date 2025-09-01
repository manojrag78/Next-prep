'use client';
import { useState, useEffect, useCallback } from 'react';

export default function Calculator() {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState<string | undefined>(undefined);

  const clear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(undefined);
  };

  const del = () => {
    setCurrentOperand(prev => prev.slice(0, -1));
  };

  const appendNumber = useCallback((num: string) => {
    if (num === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(prev => prev + num);
  }, [currentOperand]);

   const compute = useCallback(() => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          alert('Cannot divide by zero!');
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setOperation(undefined);
    setPreviousOperand('');
  }, [previousOperand, currentOperand, operation]);

  const chooseOperation = useCallback((op: string) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') compute();
    else {
      setPreviousOperand(currentOperand);
      setCurrentOperand('');
      setOperation(op);
    }
  }, [currentOperand, previousOperand, compute]);

 

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendNumber(e.key);
    if (e.key === '+' || e.key === '-') chooseOperation(e.key);
    if (e.key === '*') chooseOperation('×');
    if (e.key === '/') chooseOperation('÷');
    if (e.key === 'Enter' || e.key === '=') compute();
    if (e.key === 'Escape') clear();
    if (e.key === 'Backspace') del();
  },[appendNumber, chooseOperation, compute]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  const getDisplayNumber = (number: string) => {
    const floatNum = parseFloat(number);
    if (isNaN(floatNum)) return '';
    const [int, dec] = number.split('.');
    const formattedInt = parseFloat(int).toLocaleString('en');
    return dec != null ? `${formattedInt}.${dec}` : formattedInt;
  };

  const buttonClass = `calculator-btn h-16 rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg border border-white/20`;

  return (
    <div className='flex items-center justify-center'>
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-lg w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Calculator</h1>
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Display */}
      <div className="bg-black/30 rounded-2xl p-6 mb-6 border border-white/10">
        <div className="text-right">
          <div className="text-white/60 text-sm h-6 overflow-hidden">{previousOperand} {operation}</div>
          <div className="text-white text-3xl font-semibold min-h-[2.5rem] overflow-hidden">
            {getDisplayNumber(currentOperand) || '0'}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={`${buttonClass} bg-red-500/80 hover:bg-red-500 text-white font-semibold`}>C</button>
        <button onClick={del} className={`${buttonClass} bg-orange-500/80 hover:bg-orange-500 text-white font-semibold`}>⌫</button>
        <button onClick={() => chooseOperation('÷')} className={`${buttonClass} bg-blue-500/80 hover:bg-blue-500 text-white font-semibold`}>÷</button>
        <button onClick={() => chooseOperation('×')} className={`${buttonClass} bg-blue-500/80 hover:bg-blue-500 text-white font-semibold`}>×</button>

        {['7','8','9','-','4','5','6','+','1','2','3'].map((char, i) =>
          <button
            key={i}
            onClick={() => isNaN(Number(char)) ? chooseOperation(char) : appendNumber(char)}
            className={`${buttonClass} ${isNaN(Number(char)) ? 'bg-blue-500/80 hover:bg-blue-500' : 'bg-white/20 hover:bg-white/30'} text-b font-semibold`}>
            {char}
          </button>
        )}

        <button onClick={compute} className={`${buttonClass} bg-green-500/80 hover:bg-green-500  font-semibold row-span-2`}> = </button>
        <button onClick={() => appendNumber('0')} className={`${buttonClass} col-span-2 bg-white/20 hover:bg-white/30 font-semibold`}>0</button>
        <button onClick={() => appendNumber('.')} className={`${buttonClass} bg-white/20 hover:bg-white/30 font-semibold`}>.</button>
      </div>
    </div>
    </div>
  );
}
