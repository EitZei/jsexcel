// TODO: Ranges become too complex quite fast.
type Letter = "A" | "B" | "C";
//type Letter = "A" | "B" | "C" | "D" | "E"| "F" | "G" | "H" | "I";  | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
type Zero = "0";
type NonZeroNumeral = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Numeral = Zero | NonZeroNumeral;

// TODO: Support for longer longer than 2 letter identifiers
type ColumnRef = Letter;
type RowRef = Numeral | `${NonZeroNumeral}${Numeral}`;

export type CellRef = `${ColumnRef}${RowRef}`;

export type RangeRef = `${CellRef}:${CellRef}`;

type Result = number | Error;

type RangeToResult = (range: RangeRef) => Result;

type Sum = RangeToResult;
type Average = RangeToResult;

type ExcelFunction = Sum | Average;

type Cell = {
  ref: CellRef;
  fn: ExcelFunction;
  value: Result | undefined;
  dependsOn: [Cell];
  dependants: [Cell];
};

type Row = { [rows in RowRef]: Cell };

export type Workbook = {
  cells: { [columns in ColumnRef]: Row };
};
