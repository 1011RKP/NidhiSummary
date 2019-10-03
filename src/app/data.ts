export class Program {
  Id: string;
  Title: string;
}

export class Compound {
  Id: string;
  Title: string;
  Program: Program;
}

export class Dose {
  stableDose: string;
  dose: string;
  imaxCmax: string;
  microsomalPB: string;
}

export class Comment {
  Description: string;
  Url: string;
}

export class CYP450Data {
  Id: string;
  RI1A2Input: string;
  RI1A2Value: string;
  RI1A2Input2: string;
  RI1A2Value2: string;
  RI2B6Input: string;
  RI2B6Value: string;
  RI2B6Input2: string;
  RI2B6Value2: string;
  RI2C8Input: string;
  RI2C8Value: string;
  RI2C8Input2: string;
  RI2C8Value2: string;
  RI2C9Input: string;
  RI2C9Value: string;
  RI2C9Input2: string;
  RI2C9Value2: string;
  RI2C19Input: string;
  RI2C19Value: string;
  RI2C19Input2: string;
  RI2C19Value2: string;
  RI2D6Input: string;
  RI2D6Value: string;
  RI2D6Input2: string;
  RI2D6Value2: string;
  RI3A4MidInput: string;
  RI3A4MidValue: string;
  RI3A4MidInput2: string;
  RI3A4MidValue2: string;
  RI3A4TstInput: string;
  RI3A4TstValue: string;
  RI3A4TstInput2: string;
  RI3A4TstValue2: string;
  TDI2C19CKS: boolean;
  TDI2C19Kinact: string;
  TDI2C19KI: string;
  TDI2C19Kdeg: string;
  TDI2C9Input2: string;
  TDI2C9Value2: string;
  TDI2C9CKS: boolean;
  TDI2C9Kinact: string;
  TDI2C9KI: string;
  TDI2C9Kdeg: string;
  TDI2C19Input2: string;
  TDI2C19Value2: string;
  TDI2D6CKS: boolean;
  TDI2D6Kinact: string;
  TDI2D6KI: string;
  TDI2D6Kdeg: string;
  TDI2D6Input2: string;
  TDI2D6Value2: string;
  TDI3A4MidCKS: boolean;
  TDI3A4MidKinact: string;
  TDI3A4MidKI: string;
  TDI3A4MidKdeg: string;
  TDI3A4MidInput2: string;
  TDI3A4MidValue2: string;
  Induction1A2CFI: boolean;
  Induction1A2EC50: string;
  Induction1A2Emax: string;
  Induction1A2Input2: string;
  Induction1A2Value2: string;
  Induction2B6CFI: boolean;
  Induction2B6EC50: string;
  Induction2B6Emax: string;
  Induction2B6Input2: string;
  Induction2B6Value2: string;
  Induction3ACFI: boolean;
  Induction3AEC50: string;
  Induction3AEmax: string;
  Induction3AInput2: string;
  Induction3AValue2: string;
  Note: string;
  RIComment: string;
  TDIComment: string;
  //* Phase 2 Columns but out of the box/
  Modified: string;
  Editor: string;
  Inductiontested: string;
  FirstURL: Comment;
  SecoundURL: Comment;
  ThirdURL: Comment;
}

export class TransporterData {
  Id: string;
  UptakeOATP1B3Input: string;
  UptakeOATP1B3Value: string;
  UptakeOATP1B3Input2: string;
  UptakeOATP1B3Value2: string;
  UptakeOATP1B1Input: string;
  UptakeOATP1B1Value: string;
  UptakeOATP1B1Input2: string;
  UptakeOATP1B1Value2: string;
  UptakeOAT1Input: string;
  UptakeOAT1Value: string;
  UptakeOAT1Input2: string;
  UptakeOAT1Value2: string;
  UptakeOAT3Input: string;
  UptakeOAT3Value: string;
  UptakeOAT3Input2: string;
  UptakeOAT3Value2: string;
  UptakeOCT2Input: string;
  UptakeOCT2Value: string;
  UptakeOCT2Input2: string;
  UptakeOCT2Value2: string;
  EffluxBCRPInput: string;
  EffluxBCRPValue: string;
  EffluxBCRPInput2: string;
  EffluxBCRPValue2: string;
  EffluxPgpInput: string;
  EffluxPgpValue: string;
  EffluxPgpInput2: string;
  EffluxPgpValue2: string;
  EffluxMATE1Input: string;
  EffluxMATE1Value: string;
  EffluxMATE1Input2: string;
  EffluxMATE1Value2: string;
  EffluxMATE2KInput: string;
  EffluxMATE2KValue: string;
  EffluxMATE2KInput2: string;
  EffluxMATE2KValue2: string;
  Comment: string;
  UptakeComment: string;
  CommentBCRP: string;
  CommentPGP: string;
  SubstrateBCRP: string;
  SubstratePGP: string;
  /*Phase 2 column chnages */
  SubstrateBCRPNew: string;
  SubstrateBCRPOATP1B1: string;
  SubstrateBCRPOATP1B3: string;
  SubstrateOAT1: string;
  SubstrateOAT3: string;
  SubstrateOAT2: string;
  SubstrateMATE1: string;
  SubstrateMATE2K: string;
  SubstratePGPChnage: string;// need to change

  ComOATP1B1: string;
  ComOATP1B3: string;
  ComOAT1: string;
  ComOAT3: string;
  ComOAT2: string;
  ComMATE1: string;
  ComMATE2K: string;
  ComBCRP: string;
  ComPGP: string;
  //* Phase 2 Columns but out of the box/
  Modified: string;
  Editor: string;
  UptakeURL: Comment;
  EffluxURL: Comment;
  VictimURL: Comment;
}

export class ADMEData {
  Id: string;
  StudyNumber: string;
  Dose: string;
  ImaxCmax: string;
  Igut: string;
  MW: string;
  LinMax: string;
  PlasmaPB: string;
  MicrosomalPB: string;
  StableDose: boolean;
  FaFg: string;
  Ka: string;
  Qh: string;
  Rb: string;
  Modified: string;
  Editor: string;
  Microsomaltested: boolean;
  Comment: string;
  CommentLink: Comment;
}
