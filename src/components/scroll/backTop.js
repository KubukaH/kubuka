// Scroll Back Top
export const ScrollTop = ({ children }) => {
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      role="presentation"
      style={{ position: 'fixed', bottom: 16, right: 16 }}
    >
      {children}
    </div>
  );
};
