function binary32(mantissa, exponent) {
    // Normalize the binary number
    let { normalized, newExponent } = normalize(mantissa, exponent);

    // Determine the sign bit
    let sign = (normalized < 0) ? '1' : '0';

    // Get the most significant digit and its binary
    let msd = normalized[0];
    let msdBinary = parseInt(msd).toString(2);

    // Calculate the combination field
    let combinationField;
    if (msd >= 0 && msd <= 7) {
        combinationField = newExponent.substring(0, 2) + msdBinary.substring(msdBinary.length - 3);
    } else if (msd >= 8 && msd <= 9) {
        combinationField = '11' + newExponent.substring(0, 2) + msdBinary[msdBinary.length - 1];
    }

    // Get the exponent continuation
    let exponentContinuation = newExponent.substring(2);

    // Get the coefficient continuation
    let coefficientContinuation = denselyPackedBCD(normalized.substring(1));

    // Combine all parts
    let binary32 = sign + pad(combinationField, 5) + pad(exponentContinuation, 6) + pad(coefficientContinuation, 20);

    // Convert to hexadecimal
    let hex = parseInt(binary32, 2).toString(16);

    // Print the results
    console.log('Sign:', sign);
    console.log('Combination field:', combinationField);
    console.log('Exponent continuation:', exponentContinuation);
    console.log('Coefficient continuation:', coefficientContinuation);

    return { binary32, hex };
}

function normalize(mantissa, exponent) {
    // Convert the mantissa to a string to manipulate it easily
    mantissa = mantissa.toString();

    // Find the position of the decimal point
    let pointIndex = mantissa.indexOf('.');

    // If there's no decimal point, add one at the end
    if (pointIndex === -1) {
        mantissa += '.';
        pointIndex = mantissa.length - 1;
    }

    // Calculate the number of moves to make the decimal point at the leftmost part
    let moves = pointIndex - 1;

    // Adjust the exponent by the number of moves
    exponent -= moves;

    // Move the decimal point to the leftmost part
    mantissa = mantissa.replace('.', '');
    mantissa = '0.' + mantissa;

    // Pad the mantissa with leading zeroes to make it a 7-digit number
    while (mantissa.length < 7) {
        mantissa = '0' + mantissa;
    }

    // Add 101 to the exponent and turn it into a binary
    let newExponent = (exponent + 101).toString(2);

    // Return the normalized mantissa and adjusted exponent
    return { normalized: mantissa, newExponent: newExponent };
}

function denselyPackedBCD(digits) {
    // Convert the string of digits into an array of individual numbers
    let digitArray = digits.split('').map(Number);

    // Check if the number of digits is a multiple of 3
    if (digitArray.length % 3 !== 0) {
        throw new Error('The number of digits must be a multiple of 3.');
    }

    // Process each group of 3 digits
    let bcdArray = [];
    for (let i = 0; i < digitArray.length; i += 3) {
        // Convert each group of 3 digits to BCD
        let bcd = (digitArray[i] << 8) | (digitArray[i + 1] << 4) | digitArray[i + 2];
        bcdArray.push(bcd);
    }

    // Combine the BCD values into a single densely packed BCD
    let denselyPackedBCD = bcdArray.reduce((acc, bcd) => (acc << 12) | bcd, 0);

    return denselyPackedBCD;
}

function pad(num, size) {
    var s = "0000000000" + num;
    return s.substr(s.length-size);
}
