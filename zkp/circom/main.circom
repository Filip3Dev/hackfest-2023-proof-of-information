pragma circom 2.1.2;

include "./libraries/switcher.circom";
include "./libraries/mimc.circom";
include "./libraries/comparators.circom";

template SelectiveSwitch() {
  signal input in0;
  signal input in1;
  signal input s;
  signal output out0;
  signal output out1;

  component Switch = Switcher();

  s*(s-1) === 0;

  Switch.sel <== s;
  Switch.L <== in0;
  Switch.R <== in1;

  out0 <== Switch.outL;
  out1 <== Switch.outR;
}

template Node () {
    signal input leaf;
    signal output out;

    out <== leaf;
}

template Verifier(depth) {
  signal input accountId; 
  signal input information; 
  signal input web2Id; 
  signal input pass; 
  signal input authHash; 
  signal input root; 
  signal input operator;
  // operator = 1: greater, 2: less, 3: range|no condition
  signal input min;
  signal input max; 
  signal input condition;
  signal input verifyTimestamp;
  signal input direction[depth]; 
  signal input siblings[depth]; 

  // Check owner by auth hash 
  component MimcMulti = MultiMimc7(3, 91);
  MimcMulti.in[0] <== accountId;
  MimcMulti.in[1] <== web2Id;
  MimcMulti.in[2] <== pass;
  MimcMulti.k <== 0;
  authHash === MimcMulti.out;

  component MimcMultiLeaf = MultiMimc7(2, 91);
  MimcMultiLeaf.in[0] <== authHash;
  MimcMultiLeaf.in[1] <== accountId;
  MimcMultiLeaf.k <== 0;
  // component Mimc = Mimc7(91);

  component hashNode[depth+1];
  component selectiveSwitch[depth];
  component MimcUpdate[depth];

  hashNode[0] = Node();
  hashNode[0].leaf <== MimcMultiLeaf.out;

  // log(MimcMultiLeaf.out);

  for (var i = 0; i < depth; i++) {
    MimcUpdate[i] = MultiMimc7(2, 91);
    selectiveSwitch[i] = SelectiveSwitch();
    hashNode[i + 1] = Node();
    selectiveSwitch[i].in0 <== hashNode[i].out;
    selectiveSwitch[i].in1 <== siblings[i];
    selectiveSwitch[i].s <== direction[i];

    MimcUpdate[i].in[0] <== selectiveSwitch[i].out0;
    MimcUpdate[i].in[1] <== selectiveSwitch[i].out1;
    MimcUpdate[i].k <== 0;

    hashNode[i + 1].leaf <== MimcUpdate[i].out;
    log(hashNode[i+1].out);
  }

  hashNode[depth].out === root;

  var minNumber = (operator == 1) ? condition : min;
  var maxNumber = (operator == 2) ? condition : max;

  component compareMin = LessEqThan(128);
  component compareMax = LessEqThan(128);

  compareMin.in[0] <== min;
  compareMin.in[1] <== information;

  compareMin.out === 1;

  compareMax.in[0] <== information;
  compareMax.in[1] <== max;

  compareMax.out === 1;
}

component main{public[web2Id, information, operator, condition, min, max, root, verifyTimestamp]} = Verifier(16);