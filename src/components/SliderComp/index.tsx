import { Slider, withStyles } from "@material-ui/core";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

interface SliderCompProps {
  value: number;
  sliderOnChange: (e: number) => void;
}

const SliderComp = (props: SliderCompProps) => {
  const { value, sliderOnChange } = props;
  return (
    <PrettoSlider
      valueLabelDisplay="on"
      value={value}
      min={50}
      max={250}
      onChange={(e, _value) => sliderOnChange(_value as number)}
      // onChangeCommitted={(e, _value) => sliderOnChange(_value as number)}
    />
  );
};

export default SliderComp;
