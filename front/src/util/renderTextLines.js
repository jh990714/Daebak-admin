export const renderTextLines = (text) => {
  return text.split("\n").map((line, index) => (
    <div style={{ whiteSpace: "pre-wrap" }} key={index}>
      {line}
    </div>
  ));
};
