export default function ScrollTopButton({ show }) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button id="scroll-top" title="Back to top" className={show ? 'show' : ''} onClick={handleClick}>
      ↑
    </button>
  );
}
