"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-amber-200",
  onChange,
}) {
  const [selected, setSelected] = React.useState(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index, tab) => {
    setSelected(index);
    onChange?.(index);
    if (tab.href) {
      const target = document.querySelector(tab.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-white/20" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex items-center justify-around w-full rounded-full border border-white/30 bg-black/40 backdrop-blur-3xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] text-white transition-all duration-500",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index, tab)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-full px-3.5 py-2.5 text-xs font-medium transition-all duration-300 active:scale-95",
              selected === index
                ? cn("bg-white/20 backdrop-blur-md border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]", activeColor)
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            )}
          >
            {typeof Icon === "string" ? (
              <i className={`${Icon} text-base`} />
            ) : (
              <Icon size={18} />
            )}
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap tracking-wider text-[11px] font-sans font-semibold uppercase"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
