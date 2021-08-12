export const splitText = (text, d, cls) => {
  return (
    <p className="text-5xl sm:text-8xl lg:text-8xl xl:text-9xl font-serif mb-8">
      {text.split("").map(function (char, i) {
        return (
          <span
            aria-hidden="true"
            key={i}
            style={{
              animationDelay: 0.5 + i / 10 + "s",
              bottom: d,
            }}
            data-scroll
            data-scroll-class="anim-span"
            className="relative opacity-0"
          >
            {char}
          </span>
        );
      })}
    </p>
  );
};
