import React, { useState, useEffect } from 'react';

const InputComponent = () => {
    const [input, setInput] = useState('');
    const [base, setBase] = useState('2');
    const [exponent, setExponent] = useState('');

    useEffect(() => {
        try {
            if (input === '' || exponent === '') {
                throw new Error('Input and exponent cannot be empty.');
            }

            if (base === '2') {
                if (!/^[01]+$/.test(input)) {
                    throw new Error('Invalid input. Input should only contain 0s and 1s for base 2.');
                }
            } else if (base === '10') {
                const decimal = parseFloat(input);
                if (isNaN(decimal)) {
                    throw new Error('Invalid input. Input should be a valid decimal for base 10.');
                }
            }

            const parsedExponent = parseInt(exponent, 10);
            if (isNaN(parsedExponent)) {
                throw new Error('Invalid exponent. Exponent should be a valid integer.');
            }
        } catch (e) {
            console.error(e.message);
        }
    }, [input, base, exponent]);

    return (
        <div>
            <label>
                Input:
                <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            </label>
            <label>
                Base:
                <select value={base} onChange={e => setBase(e.target.value)}>
                    <option value="2">2</option>
                    <option value="10">10</option>
                </select>
            </label>
            <label>
                Exponent:
                <input type="text" value={exponent} onChange={e => setExponent(e.target.value)} />
            </label>
        </div>
    );
};

export default InputComponent;
