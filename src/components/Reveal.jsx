import { forwardRef, useEffect, useRef, useState } from 'react';

/**
 * Wraps children in an element that gains the "visible" class once it
 * scrolls into view — mirrors the original IntersectionObserver behavior
 * in main.js (section 6: Scroll-reveal via IntersectionObserver).
 *
 * `as` lets you pick the wrapping tag (defaults to "div").
 * Any additional props (className, style, id, event handlers, etc.) are
 * passed through. Forwards its ref to the underlying DOM node so parents
 * (e.g. Projects.jsx for the 3D tilt effect) can also attach their own ref.
 */
const Reveal = forwardRef(function Reveal({ as: Tag = 'div', className = '', children, ...rest }, forwardedRef) {
  const innerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // unobserve after animating so it only plays once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function setRefs(node) {
    innerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  return (
    <Tag ref={setRefs} className={`${className}${visible ? ' visible' : ''}`} {...rest}>
      {children}
    </Tag>
  );
});

export default Reveal;
