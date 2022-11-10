import { useMemo, useRef, useEffect, useCallback } from 'react';
import { Slate, Editable, withReact, useSlate, useFocused } from 'slate-react';
import isHotkey from 'is-hotkey';
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Range,
  Element as SlateElement
} from 'slate';
import { css } from '@emotion/css';
import { withHistory } from 'slate-history';

import { Button, Icon, Menu, Portal } from './comp';
import SelectItem from './selectItem';
import { useCTX } from '../../components/context';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const EditorPage = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const bodyValue = useMemo(() => [
    { type: 'paragraph', children: [{text: ''}] }
  ],[]);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const { setBValue } = useCTX();

  return (
    <div className="pb-4 pt-4 mb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slate 
          name="blog_content"
          editor={editor} 
          value={bodyValue}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              op => 'set_selection' !== op.type
            );
            if (isAstChange) {
              setBValue(value);
            };
          }}
        >
          <HoveringToolbar />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some text..."
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleFormat(editor, mark)
                }
              }
            }}
          />
        </Slate>
      </div>
    </div>
  );
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote 
          style={{
            ...style,
            borderLeft: '12px solid orange',
            borderStartStartRadius: '8px',
            borderEndStartRadius: '8px',
            fontFamily: 'Lucida Calligraphy',
            paddingBlock: '16px',
            fontSize: '32px',
            paddingInline: '20px'
          }} 
          {...attributes}
        >
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    case 'heading-four':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      )
    case 'heading-five':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      );
  };
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  };

  if (leaf.italic) {
    children = <em>{children}</em>;
  };

  if (leaf.underlined) {
    children = <u>{children}</u>;
  };

  if (leaf.code) {
    children = <code
      style={{ 
        backgroundColor: "#ddd", 
        color: "green", 
        borderBlock: "1px solid #a0a465",
        borderInlineStart: '16px solid orange',
        borderInlineEnd: "1px solid #a0a465",
        borderRadius: "8px",
        overflow: "hidden",
        width: '96%',
        margin: 'auto', 
        display: 'block',
        padding: '16px'
      }}
    >{children}</code>
  };

  return <span {...attributes}>{children}</span>;
};

const hList = [
  {
    id: 1,
    name: 'H 1',
  },
  {
    id: 2,
    name: 'H 2',
  },
  {
    id: 3,
    name: 'H 3',
  },
  {
    id: 4,
    name: 'H 4',
  },
  {
    id: 5,
    name: 'H 5',
  },
  {
    id: 6,
    name: 'H 6',
  },
  {
    id: 7,
    name: 'paragraph',
  },
];

const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return;
    };

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    };

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`;
  })

  return (
    <Portal className="flex">
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `}
        onMouseDown={e => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault()
        }}
      >
        <FormatButton format="bold" icon={<i className="fas fa-bold"></i>} />
        <FormatButton format="italic" icon={<i className="fas fa-italic"></i>} />
        <FormatButton format="underlined" icon={<i className="fas fa-underline"></i>} />
        <FormatButton format="code" icon={<i className="fa-solid fa-code"></i>} />
        <SelectItem
          itemsList={hList}
        />
        <BlockButton format="align-left" icon={<i className="fa-solid fa-align-left"></i>} />
        <BlockButton format="align-center" icon={<i className="fa-solid fa-align-center"></i>} />
        <BlockButton format="align-justify" icon={<i className="fa-solid fa-align-justify"></i>} />
        <BlockButton format="align-right" icon={<i className="fa-solid fa-align-right"></i>} />
        <BlockButton format="list-ordered" icon={<i className="fa-solid fa-list-ol"></i>} />
        <BlockButton format="list-unordered" icon={<i className="fa-solid fa-list-ul"></i>} />
      </Menu>
    </Portal>
  );
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onClick={() => toggleFormat(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  };
};

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

export default EditorPage;
