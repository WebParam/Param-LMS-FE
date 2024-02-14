import dynamic from 'next/dynamic';
import { useRef, forwardRef } from 'react';
import { useEffect, useState } from 'react';

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return forwardRef((props, ref) => <RQ ref={ref} {...props} />);
  },
  {
    ssr: false,
  }
);

const descriptionToolbar = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "link", "blockquote", "code", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

export default function MyEditor(props: any) {
  const qRef = useRef(null);
  const [content, setContent] = useState(props.value);

//   useEffect(() => {
//     props.setValue(content);

//   }, [content]);

  return (
    typeof window !== 'undefined' ? (
      <QuillNoSSRWrapper
        ref={qRef}
        modules={descriptionToolbar}
        value={content}
        onChange={(c: any) => setContent(c)}
        theme="snow"
        {...props} // Forwarding all props
      />
    ) : null
  );
}
