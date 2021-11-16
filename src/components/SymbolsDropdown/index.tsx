import { MenuItem, Select } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SymbolsDropDownProps {
  value: number;
  onSelectChange: (e: any) => void;
  assetSymbols: string[];
}

const SymbolsDropDown = (props: SymbolsDropDownProps) => {
  const { value, onSelectChange, assetSymbols } = props;

  return (
    <Select
      MenuProps={MenuProps}
      value={value}
      onChange={(e) => onSelectChange(assetSymbols[e.target.value as number])}
    >
      {assetSymbols.map((assetSymbol, i) => (
        <MenuItem key={i} value={i}>{assetSymbol}</MenuItem>
      ))}
    </Select>
  );
};

export default SymbolsDropDown;
