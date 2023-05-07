import { Film } from "@/src/redux/services/swapiApi";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type TextScrollProps = {
  film?: Film;
  onScrollEnd?: () => void;
};

const TextScroll = ({ film, onScrollEnd }: TextScrollProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastContentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrolledByRef = useRef(0);

  useEffect(() => {
    if (!lastContentRef.current) {
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        scrolledByRef.current += 1;
        if (scrolledByRef.current > 1) {
          setIsVisible(false);
          onScrollEnd?.();
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });
    const target = lastContentRef.current;
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [lastContentRef.current, onScrollEnd]);

  useEffect(() => {
    if (!scrollContainerRef.current) {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("animationend", () => {
      setIsVisible(false);
      onScrollEnd?.();
    });

    return () => {
      scrollContainer.removeEventListener("animationend", () => {
        setIsVisible(false);
        onScrollEnd?.();
      });
    };
  }, [scrollContainerRef.current, onScrollEnd]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <button
        className="skip-button"
        onClick={() => {
          setIsVisible(false);
          onScrollEnd?.();
        }}
      >
        Skip
      </button>
      );
      <div className="text-scroll-wrapper">
        <div
          ref={scrollContainerRef}
          className={classNames("text-scroll-content", { scroll: !!film })}
        >
          <h1 className="h-screen text-5xl md:text-7xl text-starwarsBlue">
            A long time ago, in a galaxy far, far away...
          </h1>
          {film && (
            <div>
              <h2 className="my-8 text-3xl md:text-5xl">
                Episode {film.episode_id}
              </h2>
              <h3 className="my-8 text-3xl md:text-5xl">{film.title}</h3>
              <p
                ref={lastContentRef}
                className="whitespace-pre-line mx-4 font-gothic tracking-wider"
              >
                {film.opening_crawl}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { TextScroll };
