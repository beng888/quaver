import { colors } from "@context/index";

export const splitText = (text, delay = 100, randomColor = false) =>
  Array.from(text).map((char, i) => (
    <span
      aria-hidden="true"
      key={i}
      style={{
        ["--delay"]: `${i * delay}ms`,
        color: randomColor
          ? colors[Math.floor(Math.random() * colors.length)]
          : "inherit",
      }}
    >
      {char}
    </span>
  ));
