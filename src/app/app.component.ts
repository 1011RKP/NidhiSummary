import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import Promise from 'promise-polyfill';
import { sp } from 'sp-pnp-js';
import { AppService } from './app.service';
import { Program, Compound, Dose, CYP450Data, TransporterData, ADMEData, Comment } from './data';
import { OrderByPipe } from "./customPipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  allProgram: Program[];
  allCompound: Compound[];
  selectedProgram: string;
  selectedCompound: Compound;
  cacadedCompound: Compound[];
  pleaseSelectCompound: any = '-- Select Compound --';
  pleaseSelectDose: any = '-- Select Study --';
  error: String;
  // filter: any;

  /* Test */
  //valtest = 1.2; valtestA = 0.9; valtestB = 1.06;
  loading: string = null; showDose: boolean = null; showTransporterData: boolean = null; showCYP450Data: boolean = null;
  showCYP450DataVictim: boolean = null;
  alertfromProgram: string = null;
  dose: string; imaxCmax: string; plasmaPBFree: string; microsomalPBFree: string; LinMax: string; Igut: string; Modified: string; ModifiedBy: string; Microsomaltested: boolean;

  RI1A2Input: any; RI2B6Input: any; RI2C8Input: any; RI2C9Input: any;
  RI2C19Input: any; RI2D6Input: any; RI3A4MidInput: any; RI3A4TstInput: any;
  RI1A2Value: any; RI2B6Value: any; RI2C8Value: any; RI2C9Value: any;
  RI2C19Value: any; RI2D6Value: any; RI3A4MidValue: any; RI3A4TstValue: any;

  R1TotalRI1A2: string; R1TotalRI2B6: string; R1TotalRI2C8: string; R1TotalRI2C9: string;
  R1TotalRI2C19: string; R1TotalRI2D6: string; R1TotalRI3A4Mid: string; R1TotalRI3A4: string;
  R1UnboundRI1A2: string; R1UnboundRI2B6: string; R1UnboundRI2C8: string; R1UnboundRI2C9: string;
  R1UnboundRI2C19: string; R1UnboundRI2D6: string; R1UnboundRI3A4Mid: string; R1UnboundRI3A4: string;
  R1GutRI1A2: string; R1GutRI2B6: string; R1GutRI2C8: string; R1GutRI2C9: string;
  R1GutRI2C19: string; R1GutRI2D6: string; R1GutRI3A4Mid: string; R1GutRI3A4: string;

  TDI2C19CKS: boolean; TDI2C19Kinact: string; TDI2C19KI: string; TDI2C19Kdeg: string;
  TDI2C9CKS: boolean; TDI2C9Kinact: string; TDI2C9KI: string; TDI2C9Kdeg: string;
  TDI2D6CKS: boolean; TDI2D6Kinact: string; TDI2D6KI: string; TDI2D6Kdeg: string;
  TDI3A4MidCKS: boolean; TDI3A4MidKinact: string; TDI3A4MidKI: string; TDI3A4MidKdeg: string;

  R2TotalTDI2C9: string; R2TotalTDI2C19: string; R2TotalTDI2D6: string; R2TotalTDI3A4Mid: string;
  // * Phase II new Add ons
  R22013TotalTDI2C9: string; R22013TotalTDI2C19: string; R22013TotalTDI2D6: string; R22013TotalTDI3A4Mid: string;
  FirstURL: string; SecoundURL: string; ThirdURL: string;
  // * Phase II new Add ons
  R2UnboundTDI2C9: String; R2UnboundTDI2C19: String; R2UnboundTDI2D6: String; R2UnboundTDI3A4Mid: String;

  Induction1A2CFI: boolean; Induction1A2EC50: string; Induction1A2Emax: string;
  Induction2B6CFI: boolean; Induction2B6EC50: string; Induction2B6Emax: string;
  Induction3ACFI: boolean; Induction3AEC50: string; Induction3AEmax: string;

  R3TotalInduction1A2: string; R3TotalInduction2B6: string; R3TotalInduction3A: string;
  R3UnboundInduction1A29: String; R3UnboundInduction2B6: String; R3UnboundInduction3A: String;

  UptakeOATP1B1Input: string; UptakeOATP1B1Value: string; UptakeOATP1B3Input: string; UptakeOATP1B3Value: string;
  UptakeOAT1Input: string; UptakeOAT1Value: string; UptakeOAT3Input: string; UptakeOAT3Value: string;
  UptakeOCT2Input: string; UptakeOCT2Value: string; EffluxBCRPInput: string; EffluxBCRPValue: string;
  EffluxPgpInput: string; EffluxPgpValue: string; EffluxMATE1Input: string; EffluxMATE1Value: string;
  EffluxMATE2KInput: string; EffluxMATE2KValue: string; Comment: string;

  UptakeOATP1B1RValue: number; UptakeOATP1B3RValue: number; UptakeOAT1CuttOff: number; UptakeOAT3CuttOff: number;
  UptakeOCT2CuttOff: number; EffluxBCRPCuttOff: number; EffluxPgpCuttOff: number; EffluxMATE1CuttOff: number;
  EffluxMATE2KCuttOff: number;

  CYP450Data: CYP450Data;
  TransporterData: TransporterData;
  admeDATA: ADMEData[];
  selecteddose: ADMEData;


  Substrate1A2: string; TNR1A2: string; Comment1A2: string;
  Substrate2B6: string; TNR2B6: string; Comment2B6: string;
  Substrate2C8: string; TNR2C8: string; Comment2C8: string;
  Substrate2C9: string; TNR2C9: string; Comment2C9: string;
  Substrate2C19: string; TNR2C19: string; Comment2C19: string;
  Substrate2D6: string; TNR2D6: string; Comment2D6: string;
  Substrate3A4: string; TNR3A4: string; Comment3A4: string;
  Substrate3A5: string; TNR3A5: string; Comment3A5: string;
  ParentRemain95: string;
  ParentRemain85: string;
  ParentRemain8520: string;
  ParentRemain20: string;

  Note: string; RIComment: string; TDIComment: string;
  ADMEComment: string; UptakeComment: string; CommentBCRP: string; CommentPGP: string;
  SubstrateBCRP: string; SubstratePGP: string; ADMECommentDescription: string;
  ADMECommentLink: string;


  // * Transport Date Pagse II chnages 
  SubstrateBCRPNew: string;
  SubstrateBCRPOATP1B1: string;
  SubstrateBCRPOATP1B3: string;
  SubstrateOAT1: string;
  SubstrateOAT3: string;
  SubstrateOAT2: string;
  SubstrateMATE1: string;
  SubstrateMATE2K: string;
  SubstratePGPChnage: string;
  UptakeURL: Comment;
  EffluxURL: Comment;
  VictimURL: Comment;
  //* Need to check

  ComOATP1B1: string;
  ComOATP1B3: string;
  ComOAT1: string;
  ComOAT3: string;
  ComOAT2: string;
  ComMATE1: string;
  ComMATE2K: string;
  ComBCRP: string;
  ComPGP: string;

  CYP450DataModified: string;
  CYP450DataEditor: string;
  CYP450VictimURL: string;
  CYP450VictimDescription: string;
  TransporterDataModified: string;
  TransporterDataEditor: string;
  CY450Inductiontested: string

  constructor(
    private _appService: AppService) { }

  ngOnInit() {
    sp.web.lists.getByTitle('ProgramList').items.select('Title', 'Id').get().then(r => {
      this.allProgram = r;
      if (this.allProgram.length !== 0) {
        this.selectedProgram = '-- Select Program --';
        this.getCompound();
      } else {
        this.selectedProgram = '-- Select Program --';
      }
    });
  }

  getCompound(): void {
    sp.web.lists.getByTitle('CompoundList').items.select('Title', 'Id', 'Program/Title', 'Program/Id').expand('Program').get().then(r => {
      this.allCompound = r;
      this.selectedCompound = this.pleaseSelectCompound;
    });
  }

  setallalertstoNull(): void {
    this.loading = null;
    this.showDose = null;
    this.showTransporterData = null;
    this.showCYP450Data = null;
    this.alertfromProgram = null;
  }

  onSelect(program: string) {
    this.setallalertstoNull();
    this.loading = '/sites/DMB/DDI/SiteAssets/DDISummary/assets/images/loading.gif';
    this.selectedCompound = this.pleaseSelectCompound;
    if (this.allCompound.length !== 0) {
      this.cacadedCompound = this.allCompound.filter(
        (item) => item.Program.Title === program);
      if (this.cacadedCompound.length !== 0) {
        // console.log(this.cacadedCompound.length);
      } else {
        this.setallalertstoNull();
        this.alertfromProgram = 'Show';
      }
    } else {
      this.setallalertstoNull();
      this.alertfromProgram = 'Show';
    }
  }

  onprogramselectionChanged(compound: Compound) {
    if (compound.Id) {
      // console.log('Program Name:- ' + this.selectedCompound.Program.Title);
      // console.log('Compound Name:- ' + this.selectedCompound.Title);
      this.getADMEData(compound.Program.Id, compound.Id);
    } else {
      this.setallalertstoNull();
      this.alertfromProgram = 'Show';
    }
  }

  getADMEData(program: string, compound: string): void {
    this.setallalertstoNull();
    const select = '?$select=Id,StudyNumber,Dose,ImaxCmax,Igut,MW,LinMax,PlasmaPB,FaFg,Ka,Qh,Rb,CommentLink,' +
      'MicrosomalPB,StableDose,Microsomaltested,Modified,Created,Comment,Program/Id,Compound/Id,Editor/Title';
    const expand = '&$expand=Program/Id,Compound/Id,Editor/Title';
    const filter = '&$filter=(Program/Id eq ' + program + ') and (Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'GeneralADMEData\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (admeData) => {
          if (admeData == null) {
            console.log('NO Data');
          } else {
            if (admeData.d.results.length !== 0) {
              this.dose = '';
              this.imaxCmax = '';
              this.microsomalPBFree = '';
              this.plasmaPBFree = '';
              this.Microsomaltested = false;
              this.Modified = '';
              this.ModifiedBy = '';
              this.LinMax = '';
              this.Igut = '';
              this.ADMECommentDescription = '';
              this.ADMECommentLink = null;
              this.loading = null;
              this.showDose = true;
              this.ADMEComment = ''
              this.admeDATA = admeData.d.results;
              this.selecteddose = this.pleaseSelectDose;
            } else {
              this.loading = null;
              this.showDose = false;
            }
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  ondoseChnage(selecteddose: ADMEData) {
    console.log(selecteddose);
    this.Microsomaltested = selecteddose.Microsomaltested
    this.Modified = selecteddose.Modified;
    this.ModifiedBy = selecteddose.Editor;
    this.dose = selecteddose.Dose;
    this.ADMEComment = selecteddose.Comment;
    this.ADMECommentDescription = (selecteddose.CommentLink !== null) ? selecteddose.CommentLink.Description : '';
    this.ADMECommentLink = (selecteddose.CommentLink !== null) ? selecteddose.CommentLink.Url : '#';
    this.imaxCmax = selecteddose.ImaxCmax;
    this.microsomalPBFree = selecteddose.MicrosomalPB;
    this.plasmaPBFree = selecteddose.PlasmaPB;
    this.LinMax = selecteddose.LinMax;
    this.Igut = selecteddose.Igut;
    this.getCYP450Data();
    this.getTransporterData();
    this.getTransporterVictimData();
  }

  getCYP450Data(): void {
    const program = this.selectedCompound.Program.Id;
    const compound = this.selectedCompound.Id;
    const select = '?$select=Id,RI1A2Input,RI1A2Value,RI1A2Input2,RI1A2Value2,RI2B6Input,RI2B6Value,RI2B6Input2,RI2B6Value2,' +
      'RI2C8Input,RI2C8Value,RI2C8Input2,RI2C8Value2,RI2C9Input,RI2C9Value,RI2C9Input2,RI2C9Value2,' +
      'RI2C19Input,RI2C19Value,RI2C19Input2,RI2C19Value2,RI2D6Input,RI2D6Value,RI2D6Input2,RI2D6Value2,' +
      'RI3A4MidInput,RI3A4MidValue,RI3A4MidInput2,RI3A4MidValue2,' +
      'RI3A4TstInput,RI3A4TstValue,RI3A4TstInput2,RI3A4TstValue2,' +
      'TDI2C9CKS,TDI2C9Kinact,TDI2C9KI,TDI2C9Kdeg,TDI2C9Input2,TDI2C9Value2,' +
      'TDI2C19CKS,TDI2C19Kinact,TDI2C19KI,TDI2C19Kdeg,TDI2C19Input2,TDI2C19Value2,' +
      'TDI2D6CKS,TDI2D6Kinact,TDI2D6KI,TDI2D6Kdeg,TDI2D6Input2,TDI2D6Value2,' +
      'TDI3A4MidCKS,TDI3A4MidKinact,TDI3A4MidKI,TDI3A4MidKdeg,TDI3A4MidInput2,TDI3A4MidValue2,' +
      'Induction1A2CFI,Induction1A2EC50,Induction1A2Emax,Induction1A2Input2,Induction1A2Value2,' +
      'Induction2B6CFI,Induction2B6EC50,Induction2B6Emax,Induction2B6Input2,Induction2B6Value2,' +
      'Induction3ACFI,Induction3AEC50,Induction3AEmax,Induction3AInput2,Induction3AValue2,' +
      'FirstURL,SecoundURL,ThirdURL,' +
      'Note,RIComment,TDIComment,Inductiontested,' +
      'Modified,Program/Id,Compound/Id,Editor/Title,Created';
    const expand = '&$expand=Program/Id,Compound/Id,Editor/Title';
    const filter = '&$filter=(Program/Id eq ' + program + ') and (Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Modified desc';
    const url = '/_api/web/lists/getbytitle(\'CYP450Data\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (cyp450Data) => {
          if (cyp450Data == null) {
            console.log('NO Data');
          } else {
            if (cyp450Data.d.results.length !== 0) {
              this.CYP450Data = cyp450Data.d.results[0];
              this.setCYP450Data(this.CYP450Data);
              this.showCYP450Data = true;
            } else {
              this.showCYP450Data = false;
            }
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  getTransporterData(): void {
    const program = this.selectedCompound.Program.Id;
    const compound = this.selectedCompound.Id;
    // const select = '?$select=Id,UptakeOATP1B3Input,UptakeOATP1B3Value,UptakeOATP1B3Input2,UptakeOATP1B3Value2,' +
    //   'UptakeOATP1B1Input,UptakeOATP1B1Value,UptakeOATP1B1Input2,UptakeOATP1B1Value2,UptakeOAT1Input,UptakeOAT1Value,' +
    //   'UptakeOAT1Input2,UptakeOAT1Value2,UptakeOAT3Input,UptakeOAT3Value,UptakeOAT3Input2,UptakeOAT3Value2,' +
    //   'UptakeOCT2Input,UptakeOCT2Value,UptakeOCT2Input2,UptakeOCT2Value2,EffluxBCRPInput,EffluxBCRPValue,' +
    //   'EffluxBCRPInput2,EffluxBCRPValue2,EffluxPgpInput,EffluxPgpValue,EffluxPgpInput2,EffluxPgpValue2,' +
    //   'EffluxMATE1Input,EffluxMATE1Value,EffluxMATE1Input2,EffluxMATE1Value2,EffluxMATE2KInput,EffluxMATE2KValue,' +
    //   'EffluxMATE2KInput2,EffluxMATE2KValue2,SubstrateBCRP,SubstratePGP,' +
    //   'Comment,CommentBCRP,CommentPGP,UptakeComment,' +
    //   'Modified,Program/Id,Compound/Id';
    const select = '?$select=Id,UptakeOATP1B3Input,UptakeOATP1B3Value,UptakeOATP1B3Input2,UptakeOATP1B3Value2,' +
      'UptakeOATP1B1Input,UptakeOATP1B1Value,UptakeOATP1B1Input2,UptakeOATP1B1Value2,UptakeOAT1Input,UptakeOAT1Value,' +
      'UptakeOAT1Input2,UptakeOAT1Value2,UptakeOAT3Input,UptakeOAT3Value,UptakeOAT3Input2,UptakeOAT3Value2,' +
      'UptakeOCT2Input,UptakeOCT2Value,UptakeOCT2Input2,UptakeOCT2Value2,EffluxBCRPInput,EffluxBCRPValue,' +
      'EffluxBCRPInput2,EffluxBCRPValue2,EffluxPgpInput,EffluxPgpValue,EffluxPgpInput2,EffluxPgpValue2,' +
      'EffluxMATE1Input,EffluxMATE1Value,EffluxMATE1Input2,EffluxMATE1Value2,EffluxMATE2KInput,EffluxMATE2KValue,' +
      'EffluxMATE2KInput2,EffluxMATE2KValue2,Comment,UptakeComment,SubstrateBCRP,CommentBCRP,SubstratePGP,CommentPGP,' +
      'SubstrateBCRPOATP1B1,SubstrateBCRPOATP1B3,SubstrateOAT1,SubstrateOAT3,SubstrateOAT2,SubstrateMATE1,SubstrateMATE2K,SubstrateBCRPNew,ComOATP1B1,ComOATP1B3,ComOAT1,ComOAT3,ComOAT2,ComMATE1,ComMATE2K,ComBCRP,ComPGP,' +
      'UptakeURL,EffluxURL,VictimURL,' +
      'Modified,Program/Id,Compound/Id,Editor/Title';
    const expand = '&$expand=Program/Id,Compound/Id,Editor/Title';
    const filter = '&$filter=(Program/Id eq ' + program + ') and (Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Modified desc';
    const url = '/_api/web/lists/getbytitle(\'TransporterData\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (transporterData) => {
          if (transporterData == null) {
            console.log('NO Data');
          } else {
            if (transporterData.d.results.length !== 0) {
              this.TransporterData = transporterData.d.results[0];
              this.setTransporterData(this.TransporterData);
              this.showTransporterData = true;
            } else {
              console.log('No Data');
              this.showTransporterData = false;
            }
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  setCYP450Data(cyp450Data: CYP450Data): void {
    this.RI1A2Input = cyp450Data.RI1A2Input; this.RI2B6Input = cyp450Data.RI2B6Input; this.RI2C8Input = cyp450Data.RI2C8Input;
    this.RI2C9Input = cyp450Data.RI2C9Input; this.RI2C19Input = cyp450Data.RI2C19Input; this.RI2D6Input = cyp450Data.RI2D6Input;
    this.RI3A4MidInput = cyp450Data.RI3A4MidInput; this.RI3A4TstInput = cyp450Data.RI3A4TstInput; this.RI1A2Value = cyp450Data.RI1A2Value;
    this.RI2B6Value = cyp450Data.RI2B6Value; this.RI2C8Value = cyp450Data.RI2C8Value; this.RI2C9Value = cyp450Data.RI2C9Value;
    this.RI2C19Value = cyp450Data.RI2C19Value; this.RI2D6Value = cyp450Data.RI2D6Value; this.RI3A4MidValue = cyp450Data.RI3A4MidValue;
    this.RI3A4TstValue = cyp450Data.RI3A4TstValue;

    this.TDI2C9CKS = cyp450Data.TDI2C9CKS; this.TDI2C9Kinact = cyp450Data.TDI2C9Kinact;
    this.TDI2C9KI = cyp450Data.TDI2C9KI; this.TDI2C9Kdeg = cyp450Data.TDI2C9Kdeg;
    this.TDI2C19CKS = cyp450Data.TDI2C19CKS; this.TDI2C19Kinact = cyp450Data.TDI2C19Kinact;
    this.TDI2C19KI = cyp450Data.TDI2C19KI; this.TDI2C19Kdeg = cyp450Data.TDI2C19Kdeg;
    this.TDI2D6CKS = cyp450Data.TDI2D6CKS; this.TDI2D6Kinact = cyp450Data.TDI2D6Kinact;
    this.TDI2D6KI = cyp450Data.TDI2D6KI; this.TDI2D6Kdeg = cyp450Data.TDI2D6Kdeg;
    this.TDI3A4MidCKS = cyp450Data.TDI3A4MidCKS; this.TDI3A4MidKinact = cyp450Data.TDI3A4MidKinact;
    this.TDI3A4MidKI = cyp450Data.TDI3A4MidKI; this.TDI3A4MidKdeg = cyp450Data.TDI3A4MidKdeg;

    this.Induction1A2CFI = cyp450Data.Induction1A2CFI; this.Induction1A2EC50 = cyp450Data.Induction1A2EC50;
    this.Induction1A2Emax = cyp450Data.Induction1A2Emax; this.Induction2B6CFI = cyp450Data.Induction2B6CFI;
    this.Induction2B6EC50 = cyp450Data.Induction2B6EC50; this.Induction2B6Emax = cyp450Data.Induction2B6Emax;
    this.Induction3ACFI = cyp450Data.Induction3ACFI; this.Induction3AEC50 = cyp450Data.Induction3AEC50;
    this.Induction3AEmax = cyp450Data.Induction3AEmax;

    // * Phaase II Add Modified by and Modified columns 
    this.CY450Inductiontested = cyp450Data.Inductiontested;
    this.FirstURL = (cyp450Data.FirstURL !== null) ? cyp450Data.FirstURL.Url : null;
    this.SecoundURL = (cyp450Data.SecoundURL !== null) ? cyp450Data.SecoundURL.Url : null;
    this.ThirdURL = (cyp450Data.ThirdURL !== null) ? cyp450Data.ThirdURL.Url : null;
    console.log(this.CY450Inductiontested);
    this.CYP450DataModified = cyp450Data.Modified; this.CYP450DataEditor = cyp450Data.Editor;

    console.log(cyp450Data);

    this.R1TotalRI1A2 = this.setR1Total(this.RI1A2Value);
    this.R1TotalRI2B6 = this.setR1Total(this.RI2B6Value);
    this.R1TotalRI2C8 = this.setR1Total(this.RI2C8Value);
    this.R1TotalRI2C9 = this.setR1Total(this.RI2C9Value);
    this.R1TotalRI2C19 = this.setR1Total(this.RI2C19Value);
    this.R1TotalRI2D6 = this.setR1Total(this.RI2D6Value);
    this.R1TotalRI3A4Mid = this.setR1Total(this.RI3A4MidValue);
    this.R1TotalRI3A4 = this.setR1Total(this.RI3A4TstValue);

    this.R1UnboundRI1A2 = this.setR1Unbound(this.RI1A2Value);
    this.R1UnboundRI2B6 = this.setR1Unbound(this.RI2B6Value);
    this.R1UnboundRI2C8 = this.setR1Unbound(this.RI2C8Value);
    this.R1UnboundRI2C9 = this.setR1Unbound(this.RI2C9Value);
    this.R1UnboundRI2C19 = this.setR1Unbound(this.RI2C19Value);
    this.R1UnboundRI2D6 = this.setR1Unbound(this.RI2D6Value);
    this.R1UnboundRI3A4Mid = this.setR1Unbound(this.RI3A4MidValue);
    this.R1UnboundRI3A4 = this.setR1Unbound(this.RI3A4TstValue);

    this.R1GutRI1A2 = this.setR1Gut(this.RI1A2Value);
    this.R1GutRI2B6 = this.setR1Gut(this.RI2B6Value);
    this.R1GutRI2C8 = this.setR1Gut(this.RI2C8Value);
    this.R1GutRI2C9 = this.setR1Gut(this.RI2C9Value);
    this.R1GutRI2C19 = this.setR1Gut(this.RI2C19Value);
    this.R1GutRI2D6 = this.setR1Gut(this.RI2D6Value);
    this.R1GutRI3A4Mid = this.setR1Gut(this.RI3A4MidValue);
    this.R1GutRI3A4 = this.setR1Gut(this.RI3A4TstValue);

    this.R2TotalTDI2C9 = this.setR2Total(this.TDI2C9CKS, this.TDI2C9Kinact, this.TDI2C9KI, this.TDI2C9Kdeg);
    this.R2TotalTDI2C19 = this.setR2Total(this.TDI2C19CKS, this.TDI2C19Kinact, this.TDI2C19KI, this.TDI2C19Kdeg);
    this.R2TotalTDI2D6 = this.setR2Total(this.TDI2D6CKS, this.TDI2D6Kinact, this.TDI2D6KI, this.TDI2D6Kdeg);
    this.R2TotalTDI3A4Mid = this.setR2Total(this.TDI3A4MidCKS, this.TDI3A4MidKinact, this.TDI3A4MidKI, this.TDI3A4MidKdeg);

    // * Pahse II Caleculations Start

    this.R22013TotalTDI2C9 = this.setR2Total2013(this.TDI2C9CKS, this.TDI2C9Kinact, this.TDI2C9KI, this.TDI2C9Kdeg);
    this.R22013TotalTDI2C19 = this.setR2Total2013(this.TDI2C19CKS, this.TDI2C19Kinact, this.TDI2C19KI, this.TDI2C19Kdeg);
    this.R22013TotalTDI2D6 = this.setR2Total2013(this.TDI2D6CKS, this.TDI2D6Kinact, this.TDI2D6KI, this.TDI2D6Kdeg);
    this.R22013TotalTDI3A4Mid = this.setR2Total2013(this.TDI3A4MidCKS, this.TDI3A4MidKinact, this.TDI3A4MidKI, this.TDI3A4MidKdeg);

    // * Pahse II Caleculations end
    this.R2UnboundTDI2C9 = this.setR2Unbound(this.TDI2C9CKS, this.TDI2C9Kinact, this.TDI2C9KI, this.TDI2C9Kdeg);
    this.R2UnboundTDI2C19 = this.setR2Unbound(this.TDI2C19CKS, this.TDI2C19Kinact, this.TDI2C19KI, this.TDI2C19Kdeg);
    this.R2UnboundTDI2D6 = this.setR2Unbound(this.TDI2D6CKS, this.TDI2D6Kinact, this.TDI2D6KI, this.TDI2D6Kdeg);
    this.R2UnboundTDI3A4Mid = this.setR2Unbound(this.TDI3A4MidCKS, this.TDI3A4MidKinact, this.TDI3A4MidKI, this.TDI3A4MidKdeg);

    this.R3TotalInduction1A2 = this.setR3Total(this.Induction1A2CFI, this.Induction1A2EC50, this.Induction1A2Emax);
    this.R3TotalInduction2B6 = this.setR3Total(this.Induction2B6CFI, this.Induction2B6EC50, this.Induction2B6Emax);
    this.R3TotalInduction3A = this.setR3Total(this.Induction3ACFI, this.Induction3AEC50, this.Induction3AEmax);


    this.R3UnboundInduction1A29 = this.setR3Unbound(this.Induction1A2CFI, this.Induction1A2EC50, this.Induction1A2Emax);
    this.R3UnboundInduction2B6 = this.setR3Unbound(this.Induction2B6CFI, this.Induction2B6EC50, this.Induction2B6Emax);
    this.R3UnboundInduction3A = this.setR3Unbound(this.Induction3ACFI, this.Induction3AEC50, this.Induction3AEmax);
    this.Note = cyp450Data.Note; this.RIComment = cyp450Data.RIComment; this.TDIComment = cyp450Data.TDIComment;
  }

  // * Pahse II Caleculations Start

  setR2Total2013(cks: boolean, kinact: string, ki: string, kdeg: string): string {
    let returnvalue: string;
    if (cks === false) {
      if (this.imaxCmax && kinact && ki && kdeg) {
        returnvalue = ((((+kinact * +((+this.imaxCmax) * (+this.microsomalPBFree))) / (+ki + +((+this.imaxCmax) * (+this.microsomalPBFree)))) + +kdeg) / +kdeg).toFixed(3);
      }
    } else {
      returnvalue = 'No R2 calculated; kobs Clean.';
    }
    return returnvalue;
  }


  // * Pahse II Caleculations end

  setR3Total(cks: boolean, ec50: string, emax: string): string {
    let returnvalue: string;
    if (cks === false) {
      if (this.imaxCmax && ec50 && emax) {
        console.log(' emax ----' + emax + ' eC50 ---  ' + ec50);
        returnvalue = (1 / (1 + (+emax * +this.imaxCmax) / (+ec50 + +this.imaxCmax))).toFixed(3);
      }
    } else {
      returnvalue = 'No R3 calculated; Clean.';
    }
    return returnvalue;
  }

  setR3Unbound(cks: boolean, ec50: string, emax: string): string {
    let returnvalue: string;
    if (cks === false) {
      if (this.imaxCmax && ec50 && emax && this.plasmaPBFree) {
        // tslint:disable-next-line:max-line-length
        returnvalue = (1 / (1 + (+emax * 10 * (+this.imaxCmax * +this.plasmaPBFree)) / (+ec50 + (10 * +this.imaxCmax * +this.plasmaPBFree)))).toFixed(3);
      }
    } else {
      returnvalue = 'No R3 calculated; Clean.';
    }
    return returnvalue;
  }

  setR2Total(cks: boolean, kinact: string, ki: string, kdeg: string): string {
    let returnvalue: string;
    if (cks === false) {
      if (this.imaxCmax && kinact && ki && kdeg) {
        returnvalue = ((((+kinact * +this.imaxCmax) / (+ki + +this.imaxCmax)) + +kdeg) / +kdeg).toFixed(3);
      }
    } else {
      returnvalue = 'No R2 calculated; kobs Clean.';
    }
    return returnvalue;
  }

  setR2Unbound(cks: boolean, kinact: string, ki: string, kdeg: string): string {
    let returnvalue: string;
    if (cks === false) {
      if (this.imaxCmax && kinact && ki && kdeg && this.plasmaPBFree) {
        // tslint:disable-next-line:max-line-length
        returnvalue = ((((+kinact * (+this.imaxCmax * +this.plasmaPBFree) * 50) / (+ ki + (+this.imaxCmax * +this.plasmaPBFree) * 50)) + +kdeg) / +kdeg).toFixed(3);
      }
    } else {
      returnvalue = 'No R2 calculated; kobs Clean.';
    }
    return returnvalue;
  }

  setR1Total(value: string): string {
    let returnvalue: string;
    if (this.imaxCmax && value) {
      if (!isNaN(+value)) {
        returnvalue = (1 + (+this.imaxCmax / +value)).toFixed(3);
      } else {
        returnvalue = 'No R1 calculated; Clean upto highest conc. value.';
      }
    }
    return returnvalue;
  }

  setR1Unbound(value: string): string {
    let returnvalue: string;

    this.microsomalPBFree = this.Microsomaltested == true ? ((+this.microsomalPBFree < 0.01) ? '0.01' : this.microsomalPBFree) : this.microsomalPBFree;

    if (this.imaxCmax && value && this.plasmaPBFree && this.microsomalPBFree) {
      if (!isNaN(+value)) {
        returnvalue = (1 + (+this.imaxCmax * +this.plasmaPBFree) / (+value * +this.microsomalPBFree)).toFixed(3);
      } else {
        returnvalue = 'No R1 calculated; Clean upto highest conc. value.';
      }
    }
    return returnvalue;
  }

  setR1Gut(value: string): string {
    let returnvalue: string;
    if (this.Igut && value) {
      if (!isNaN(+value)) {
        returnvalue = (1 + (+this.Igut / +value)).toFixed(3);
      } else {
        returnvalue = 'No R1 calculated; Clean upto highest conc. value.';
      }
    }
    return returnvalue;
  }

  setTransporterData(tData: TransporterData): void {
    this.UptakeOATP1B1Input = tData.UptakeOATP1B1Input; this.UptakeOATP1B1Value = tData.UptakeOATP1B1Value;
    this.UptakeOATP1B3Input = tData.UptakeOATP1B3Input; this.UptakeOATP1B3Value = tData.UptakeOATP1B3Value;
    this.UptakeOAT1Input = tData.UptakeOAT1Input; this.UptakeOAT1Value = tData.UptakeOAT1Value;
    this.UptakeOAT3Input = tData.UptakeOAT3Input; this.UptakeOAT3Value = tData.UptakeOAT3Value;
    this.UptakeOCT2Input = tData.UptakeOCT2Input; this.UptakeOCT2Value = tData.UptakeOCT2Value;
    this.EffluxBCRPInput = tData.EffluxBCRPInput; this.EffluxBCRPValue = tData.EffluxBCRPValue;
    this.EffluxPgpInput = tData.EffluxPgpInput; this.EffluxPgpValue = tData.EffluxPgpValue;
    this.EffluxMATE1Input = tData.EffluxMATE1Input; this.EffluxMATE1Value = tData.EffluxMATE1Value;
    this.EffluxMATE2KInput = tData.EffluxMATE2KInput; this.EffluxMATE2KValue = tData.EffluxMATE2KValue;

    this.UptakeOATP1B1RValue = this.setUptakeRValue(this.UptakeOATP1B1Value);
    this.UptakeOATP1B3RValue = this.setUptakeRValue(this.UptakeOATP1B3Value);
    this.UptakeOAT1CuttOff = this.setUptakeEffluxCutoff(this.UptakeOAT1Value);
    this.UptakeOAT3CuttOff = this.setUptakeEffluxCutoff(this.UptakeOAT3Value);
    this.UptakeOCT2CuttOff = this.setUptakeEffluxCutoff(this.UptakeOCT2Value);
    this.EffluxMATE1CuttOff = this.setUptakeEffluxCutoff(this.EffluxMATE1Value);
    this.EffluxMATE2KCuttOff = this.setUptakeEffluxCutoff(this.EffluxMATE2KValue);
    this.EffluxBCRPCuttOff = this.setEffluxCutoff(this.EffluxBCRPValue);
    this.EffluxPgpCuttOff = this.setEffluxCutoff(this.EffluxPgpValue);
    this.Comment = tData.Comment; this.UptakeComment = tData.UptakeComment;
    this.CommentBCRP = tData.CommentBCRP; this.CommentPGP = tData.CommentPGP;
    this.SubstrateBCRP = tData.SubstrateBCRP; this.SubstratePGP = tData.SubstratePGP;


    //* Phase II
    this.TransporterDataModified = tData.Modified;
    this.TransporterDataEditor = tData.Editor;
    this.SubstrateBCRPOATP1B1 = tData.SubstrateBCRPOATP1B1;
    this.SubstrateBCRPOATP1B3 = tData.SubstrateBCRPOATP1B3;
    this.SubstrateOAT1 = tData.SubstrateOAT1;
    this.SubstrateOAT3 = tData.SubstrateOAT3;
    this.SubstrateOAT2 = tData.SubstrateOAT2;
    this.SubstrateMATE1 = tData.SubstrateMATE1;
    this.SubstrateMATE2K = tData.SubstrateMATE2K;
    this.SubstrateBCRPNew = tData.SubstrateBCRPNew;
    this.SubstratePGPChnage = tData.SubstratePGP;
    this.ComOATP1B1 = tData.ComOATP1B1;
    this.ComOATP1B3 = tData.ComOATP1B3;
    this.ComOAT1 = tData.ComOAT1;
    this.ComOAT3 = tData.ComOAT3;
    this.ComOAT2 = tData.ComOAT2;
    this.ComMATE1 = tData.ComMATE1;
    this.ComMATE2K = tData.ComMATE2K;
    this.ComBCRP = tData.ComBCRP;
    this.ComPGP = tData.ComPGP;
    this.UptakeURL = tData.UptakeURL;
    this.EffluxURL = tData.EffluxURL
    this.VictimURL = tData.VictimURL
  }

  setUptakeRValue(value: string): number {
    let returnvalue: number;
    if (this.plasmaPBFree && this.LinMax && value) {
      if (!isNaN(+value)) {
        returnvalue = +(1 + (+this.LinMax * +this.plasmaPBFree / +value)).toFixed(3);
      }
    }
    return returnvalue;
  }

  setUptakeEffluxCutoff(value: string): number {
    let returnvalue: number;
    if (this.plasmaPBFree && this.imaxCmax && value) {
      if (!isNaN(+value)) {
        returnvalue = +((+this.imaxCmax * +this.plasmaPBFree) / +value).toFixed(3);
      }
    }
    return returnvalue;
  }

  setEffluxCutoff(value: string): number {
    let returnvalue: number;
    if (this.Igut && value) {
      if (!isNaN(+value)) {
        returnvalue = +(+this.Igut / +value).toFixed(3);
      }
    }
    return returnvalue;
  }

  getTransporterVictimData(): void {
    const program = this.selectedCompound.Program.Id;
    const compound = this.selectedCompound.Id;
    const select = '?$select=Id,Substrate_x0020_1A2,TNR_x0020_1A2,Comment_x0020_1A2,Substrate_x0020_2B6,TNR_x0020_2B6,' +
      'Comment_x0020_2B6,Substrate_x0020_2C8,TNR_x0020_2C8,Comment_x0020_2C8,Substrate_x0020_2C9,' +
      'TNR_x0020_2C9,Comment_x0020_2C9,Substrate_x0020_2C19,TNR_x0020_2C19,Comment_x0020_2C19,' +
      'Substrate_x0020_2D6,TNR_x0020_2D6,Comment_x0020_2D6,Substrate_x0020_3A4,TNR_x0020_3A4,' +
      'ParentRemain95,ParentRemain_x0020_85,ParentRemain_x0020_8520,ParentRemain_x0020_20,' +
      'Comment_x0020_3A4,Substrate_x0020_3A5,TNR_x0020_3A5,Comment_x0020_3A5,URL,' +
      'Created,Program/Id,Compound/Id,Editor/Title,Modified';
    const expand = '&$expand=Program/Id,Compound/Id,Editor/Title';
    const filter = '&$filter=(Program/Id eq ' + program + ') and (Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'CYP450%20Victim\')/items' + select + expand + filter + order;

    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (cyp450DataVictim) => {
          if (cyp450DataVictim == null) {
            console.log('NO Data');
          } else {
            if (cyp450DataVictim.d.results.length !== 0) {
              this.CYP450Data = cyp450DataVictim.d.results[0];
              this.setCYP450VictimData(this.CYP450Data);
              this.showCYP450DataVictim = true;
            } else {
              this.showCYP450DataVictim = false;
            }
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  setCYP450VictimData(CYP450VictimData: any): void {
    this.Substrate1A2 = CYP450VictimData.Substrate_x0020_1A2;
    this.TNR1A2 = CYP450VictimData.TNR_x0020_1A2; this.Comment1A2 = CYP450VictimData.Comment_x0020_1A2;
    this.Substrate2B6 = CYP450VictimData.Substrate_x0020_2B6;
    this.TNR2B6 = CYP450VictimData.TNR_x0020_2B6; this.Comment2B6 = CYP450VictimData.Comment_x0020_2B6;
    this.Substrate2C8 = CYP450VictimData.Substrate_x0020_2C8;
    this.TNR2C8 = CYP450VictimData.TNR_x0020_2C8; this.Comment2C8 = CYP450VictimData.Comment_x0020_2C8;
    this.Substrate2C9 = CYP450VictimData.Substrate_x0020_2C9;
    this.TNR2C9 = CYP450VictimData.TNR_x0020_2C9; this.Comment2C9 = CYP450VictimData.Comment_x0020_2C9;
    this.Substrate2C19 = CYP450VictimData.Substrate_x0020_2C19;
    this.TNR2C19 = CYP450VictimData.TNR_x0020_2C19; this.Comment2C19 = CYP450VictimData.Comment_x0020_2C19;
    this.Substrate2D6 = CYP450VictimData.Substrate_x0020_2D6;
    this.TNR2D6 = CYP450VictimData.TNR_x0020_2D6; this.Comment2D6 = CYP450VictimData.Comment_x0020_2D6;
    this.Substrate3A4 = CYP450VictimData.Substrate_x0020_3A4;
    this.TNR3A4 = CYP450VictimData.TNR_x0020_3A4; this.Comment3A4 = CYP450VictimData.Comment_x0020_3A4;
    this.Substrate3A5 = CYP450VictimData.Substrate_x0020_3A5;
    this.TNR3A5 = CYP450VictimData.TNR_x0020_3A5; this.Comment3A5 = CYP450VictimData.Comment_x0020_3A5;
    this.ParentRemain95 = CYP450VictimData.ParentRemain95;
    this.ParentRemain85 = CYP450VictimData.ParentRemain_x0020_85;
    this.ParentRemain8520 = CYP450VictimData.ParentRemain_x0020_8520;
    this.ParentRemain20 = CYP450VictimData.ParentRemain_x0020_20;
    // * Phaase II Add Modified by and Modified columns 
    this.CYP450DataModified = CYP450VictimData.Modified; this.CYP450DataEditor = CYP450VictimData.Editor;
    this.CYP450VictimURL = (CYP450VictimData.URL !== null) ? CYP450VictimData.URL.Url : null
    this.CYP450VictimDescription = (CYP450VictimData.URL !== null) ? "Click Here" : null
  }
}
