export const convertBase2 = (mantissa, exponent) => {
  const parsedMantissa = parseFloat(mantissa);
  let noSignMantissa = mantissa;
  let signBit = 0;
  if (Math.sign(parsedMantissa) === -1) {
    signBit = 1;
    noSignMantissa = mantissa.slice(1);
  }

  // Check if mantissa and exponent are 0
  if (parsedMantissa === 0 && parseFloat(exponent) === 0) {
    return { binAnswer: { signBit, exponent: '00000000', mantissa: '00000000000000000000000' }, hex: signBit === 0 ? '00000000' : '80000000' };
  }

  // Check if mantissa is 0 and exponent is 255
  if (parsedMantissa === 0 && parseFloat(exponent) === 255) {
    return { binAnswer: { signBit, exponent: '11111111', mantissa: '00000000000000000000000' }, hex: signBit === 0 ? '7F800000' : 'FF800000' };
  }

  // Check if exponent is 255 and mantissa is non-zero
  if (parseFloat(exponent) === 255 && parsedMantissa !== 0) {
    return { binAnswer: { signBit, exponent: '11111111', mantissa: '10000000000000000000000' }, hex: '7FC00000' };
  }

  const normalized = normalize(noSignMantissa, parseFloat(exponent));

  const e = normalized.exponent + 127;
  const bin_e = convertExponent(e);
  const bins = processMantissa(normalized.mantissa);
  const combinedBins = signBit.toString() + bin_e.toString() + bins.toString();
  const hex = binToHex(combinedBins);
  return { binAnswer: { signBit, exponent: bin_e, mantissa: bins }, hex };
};

export const convertBase10 = (mantissa, exponent) => {
  let mant = parseFloat(mantissa).toString(2);
  let signBit = 0;
  if (Math.sign(parseFloat(mantissa)) === -1) {
    signBit = 1;
    mant = mant.slice(1);
  }
  const normalized = normalize(mant, parseFloat(exponent));
  const e = normalized.exponent + 127;
  const bin_e = convertExponent(e);
  const bins = processMantissa(normalized.mantissa);
  const combinedBins = signBit.toString() + bin_e.toString() + bins.toString();
  const hex = binToHex(combinedBins);

  return { binAnswer: { signBit, exponent: bin_e, mantissa: bins }, hex };
};

// Check if mantissa and exponent are 0
if (parseFloat(mantissa) === 0 && parseFloat(exponent) === 0) {
  return { binAnswer: { signBit, exponent: '00000000', mantissa: '00000000000000000000000' }, hex: signBit === 0 ? '00000000' : '80000000' };
}

// Check if mantissa is 0 and exponent is 255
if (parseFloat(mantissa) === 0 && parseFloat(exponent) === 255) {
  return { binAnswer: { signBit, exponent: '11111111', mantissa: '00000000000000000000000' }, hex: signBit === 0 ? '7F800000' : 'FF800000' };
}

// Check if exponent is 255 and mantissa is non-zero
if (parseFloat(exponent) === 255 && parseFloat(mantissa) !== 0) {
  return { binAnswer: { signBit, exponent: '11111111', mantissa: '10000000000000000000000' }, hex: '7FC00000' };
}

const normalize = (mant, exponent) => {
  let mantissa = parseFloat(mant);
  let shift = -1;
  if (mant.startsWith("1.")) {
    return { mantissa, shift: 0, exponent };
  }
  if (mant[0] === "1") {
    shift = mant.indexOf(".");

    const mantArr = mant.split("");

    mantArr.splice(shift, 1);
    mantArr.splice(1, 0, ".");

    mantissa = parseFloat(mantArr.join(""));
    const temp = shift - 1;
    exponent = exponent + temp;
    return { mantissa, shift, exponent };
  }

  const dot = mant.indexOf(".");
  shift = mant.indexOf("1", dot);

  const first = mant.indexOf("1");
  const replaced = mant.substring(first).replace(/^0*/, "");
  mantissa = parseFloat(
    `${replaced.substring(0, dot)}.${replaced.substring(dot)}`,
  );
  const temp = shift - 1;
  exponent = exponent - temp;

  return { mantissa, shift, exponent };
};

const convertExponent = (exponent) => {
  if (exponent < 0 || exponent > 255) {
    throw Error("Invalid input!");
  }
  let bin = (exponent >>> 0).toString(2);
  while (bin.length < 8) {
    bin = "0" + bin;
  }
  return bin;
};

const processMantissa = (mant) => {
  let mantissa = mant.toString();
  let index = false;
  index = mantissa.indexOf(".");

  if (!index) {
    mantissa = "0";
  }
  const count = mantissa.substring(index + 1);
  let processed = count.toString();
  while (processed.length < 23) {
    processed += "0";
  }
  return processed;
};

const binToHex = (bin) => {
  const group = bin.match(/.{1,4}/g);
  const hex = group.map((bin) => parseInt(bin, 2).toString(16).toUpperCase());

  return hex.join("");
};
