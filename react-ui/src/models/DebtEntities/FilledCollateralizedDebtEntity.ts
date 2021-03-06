import { BigNumber } from "bignumber.js";
import { FilledDebtEntity } from "./FilledDebtEntity";
import { CollateralParameters } from "../DebtInterfaces";

export class FilledCollateralizedDebtEntity extends FilledDebtEntity
    implements CollateralParameters {
    collateralAmount: BigNumber; // raw amount
    collateralTokenSymbol: string;
    collateralReturnable: boolean;
    collateralWithdrawn: boolean;
}
