export async function generateProof (input) {
  try {
      const witnessParsed = JSON.parse(
        JSON.stringify(
          input,
          (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
        )
      );
    console.log(witnessParsed)
    const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
      witnessParsed,
      "/main.wasm",
      "/main.zkey"
    );
    const finalRes = {
      proof: proof,
      publicSignals: publicSignals
    };
    return finalRes;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

const unstringifyBigInts = (o) => {
  if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
      return window.bigInt(o);
  } else if (Array.isArray(o)) {
      return o.map(unstringifyBigInts);
  } else if (typeof o == "object") {
      const res = {};
      for (let k in o) {
          res[k] = unstringifyBigInts(o[k]);
      }
      return res;
  } else {
      return o;
  }
}

const hexifyBigInts = (o) => {
  if (typeof (o) === "bigInt" || (o instanceof window.bigInt)) {
      let str = o.toString(16);
      while (str.length < 64) str = "0" + str;
      str = "0x" + str;
      return str;
  } else if (Array.isArray(o)) {
      return o.map(hexifyBigInts);
  } else if (typeof o == "object") {
      const res = {};
      for (let k in o) {
          res[k] = hexifyBigInts(o[k]);
      }
      return res;
  } else {
      return o;
  }
}

export function toSolidityInput (proof) {
  const result = {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]],
      c: [proof.pi_c[0], proof.pi_c[1]],
  };
  if (proof.publicSignals) {
      result.publicSignals = proof.publicSignals;
  }
  return hexifyBigInts(unstringifyBigInts(result));
}
