import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react';

const AutoTextArea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight('auto');
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        minHeight: parentHeight
      }}
    >
      <textarea
        {...props}
        ref={textAreaRef}
        rows={1}
        style={{
          height: textAreaHeight
        }}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default AutoTextArea;
