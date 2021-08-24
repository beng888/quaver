import { colors } from "@context/index";

export const splitText = (
  text,
  delay = 100,
  randomColor = false,
  randomDelay = null
) =>
  Array.from(text).map((char, i) => (
    <span
      aria-hidden="true"
      key={i}
      style={{
        ["--delay"]: !randomDelay
          ? `${i * delay}ms`
          : `${Math.floor(Math.random() * (100 - 1100 + 1)) + 1100}ms`,
        color: randomColor
          ? colors[Math.floor(Math.random() * colors.length)]
          : "inherit",
      }}
    >
      {char}
    </span>
  ));
