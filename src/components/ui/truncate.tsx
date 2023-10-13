import { useState } from "react";


type ReadMoreProps = {
  more?: string;
  less?: string;
  character: number;
  children: string;
};

const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  more,
  less,
  character = 150,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event: any) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  if (!children) return null;

  return (
    <>
      {(children && children.length < character) || expanded
        ? children
        : children.substring(0, character) + "..."}
      {children && children.length > character && !expanded && (
        <>
          <br />
          <span className="mt-2 inline-block">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: "#009e7f", fontWeight: 700 }}
            >
              {more ? more : 'Read more'}
            </a>
          </span>
        </>
      )}
      {children && children.length > character && expanded && (
        <>
          <br />
          <span className="mt-2 inline-block">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: "#009e7f", fontWeight: 700 }}
            >
              {less ? less : 'text less'}
            </a>
          </span>
        </>
      )}
    </>
  );
};

export default ReadMore;
