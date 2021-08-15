import { Transforms, Editor, Text, Path, Range, Element } from 'slate';
import { ReactEditor } from 'slate-react';

const CustomEditor = {
	isBoldMarkActive(editor: any) {
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.bold === true,
			universal: true,
		});

		return !!match;
	},

	isMarkActive(editor, format) {
		const marks = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	},

	toggleMark(editor, format) {
		const isActive = this.isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},

	isItalicMarkActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.italic === true,
			universal: true,
		});

		return !!match;
	},

	isCodeBlockActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.type === 'code',
		});

		return !!match;
	},

	isUnderlineActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.underline === true,
			universal: true,
		});

		return !!match;
	},

	isHighlightActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.highlight === true,
			universal: true,
		});

		return !!match;
	},

	isStrikethroughActive(editor) {
		const [match] = Editor.nodes(editor, {
			match: (n: any) => n.strikethrough === true,
			universal: true,
		});

		return !!match;
	},

	toggleBoldMark(editor) {
		const isActive = CustomEditor.isBoldMarkActive(editor);
		(Transforms as any).setNodes(
			editor,
			{ bold: isActive ? null : true },
			{
				match: (n) => Text.isText(n),
				mode: 'highest',
				split: true,
			}
		);
	},

	toggleItalicMark(editor) {
		const isActive = CustomEditor.isItalicMarkActive(editor);
		(Transforms as any).setNodes(
			editor,
			{ italic: isActive ? null : true },
			{ match: (n) => Text.isText(n), split: true }
		);
	},

	toggleCodeBlock(editor) {
		const isActive = CustomEditor.isCodeBlockActive(editor);
		(Transforms as any).setNodes(
			editor,
			{ type: isActive ? null : 'code' },
			{ match: (n) => Editor.isBlock(editor, n) }
		);
	},

	toggleUnderlineMark(editor) {
		const isActive = CustomEditor.isUnderlineActive(editor);
		(Transforms as any).setNodes(
			editor,
			{ underline: isActive ? null : true },
			{ match: (n) => Text.isText(n), split: true }
		);
	},

	toggleHighlightMark(editor, color) {
		const isActive = CustomEditor.isHighlightActive(editor);
		(Transforms as any).setNodes(
			editor,
			{
				highlight: isActive ? null : true,
				color: isActive ? null : color,
			},
			{ match: (n) => Text.isText(n), split: true }
		);
	},

	toggleStrikethroughMark(editor) {
		const isActive = CustomEditor.isStrikethroughActive(editor);
		(Transforms as any).setNodes(
			editor,
			{ strikethrough: isActive ? null : true },
			{ match: (n) => Text.isText(n), split: true }
		);
	},

	// Link specific logic
	createLinkNode(href, text) {
		return {
			type: 'link',
			href,
			children: [{ text }],
		};
	},

	createParagraphNode(children = [{ text: '' }]) {
		return {
			type: 'paragraph',
			children,
		};
	},

	removeLink(editor, opts = {}) {
		return Transforms.unwrapNodes(editor, {
			...opts,
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && (n as any).type === 'link',
		});
	},

	insertLink(editor, url) {
		if (!url) return;

		const { selection } = editor;
		const link = this.createLinkNode(url, 'New Link');

		ReactEditor.focus(editor);

		if (!!selection) {
			const [parentNode, parentPath] = Editor.parent(
				editor,
				selection.focus?.path
			);
			if ((parentNode as any).type === 'link') {
				this.removeLink(editor);
			}

			if (editor.isVoid(parentNode)) {
				Transforms.insertNodes(editor, this.createParagraphNode([link]), {
					at: Path.next(parentPath),
					select: true,
				});
			} else if (Range.isCollapsed(selection)) {
				Transforms.insertNodes(editor, link, { select: true });
			} else {
				Transforms.wrapNodes(editor, link, { split: true });
				Transforms.collapse(editor, { edge: 'end' });
			}
		} else {
			Transforms.insertNodes(editor, this.createParagraphNode([link]));
		}
	},
};

export default CustomEditor;
