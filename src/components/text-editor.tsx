import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { DefaultElement, CodeElement, Link } from './element';
import Leaf from './leaf';
import Toolbar from './toolbar';
import withLinks from '../util/with-links';
import { EditListPlugin } from '@productboard/slate-edit-list';
import { customOnKeyDown } from '../util/keydown';
import { memo } from 'react';

const options = {}; // additional options
// @refresh reset
const [withEditList, onKeyDown, { Editor, Transforms }] =
	EditListPlugin(options);

function _TextEditor() {
	const editor = useMemo(
		() => withEditList?.(withLinks?.(withHistory?.(withReact?.(createEditor?.() as ReactEditor)))),
		[]
	);

	const initialValue = [
		{
			type: 'paragraph',
			children: [{ text: 'A line of Paragraph text.' }],
		},
		{
			type: 'paragraph',
			children: [
				{
					text: "Since it's a text editor, you can do things like turn a selection of text bold, italic, and many else",
				},
			],
		},
	]
	// Add the initial value when setting up our state.
	const [value, setValue] = useState<Descendant[]>(initialValue);

	const [hlColor, setHlColor] = useState('#fcba03');
	const handleHlColor = (event: any) => {
		setHlColor(event?.target.value);
	};

	useEffect(() => {
		if (!value) {
			Transforms.deselect(editor);
		}
	}, [value]);

	// Define a rendering function based on the element passed to `props`. We use
	// `useCallback` here to memoize the function for subsequent renders.
	const renderElement = useCallback((props) => {
		switch (props.element?.type) {
			case 'code':
				return <CodeElement {...props} />;
			case 'link':
				return <Link {...props} />;
			case 'ul_list':
				return <ul {...props.attributes}>{props?.children}</ul>;
			case 'ol_list':
				return <ol {...props.attributes}>{props?.children}</ol>;
			case 'list_item':
				return <li {...props.attributes}>{props?.children}</li>;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback(
		(props) => {
			let withColor = { ...props, hlColor };
			return <Leaf props={withColor} />;
		},
		[hlColor]
	);

	return (
		<>
			<Slate
				editor={editor}
				value={value}
				onChange={(newValue: any) => {
					console.log(newValue);
					setValue(newValue);
				}}
			>
				<Toolbar
					editor={editor}
					listEditor={Editor}
					listTransforms={Transforms}
					hlColor={hlColor}
					handleHlColor={handleHlColor}
				/>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={(event) => {
						customOnKeyDown(onKeyDown(editor), event, editor);
					}}
				/>
			</Slate>
		</>
	);
};

export const TextEditor = memo((_TextEditor));
