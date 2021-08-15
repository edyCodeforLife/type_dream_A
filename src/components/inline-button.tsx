import { useSlate } from 'slate-react';
import { memo } from 'react';
import CustomEditor from './editor-custom';
import { Tag } from 'antd';

const { CheckableTag } = Tag;
export interface IMarkButton {
	format: any;
	icon: any
}

function _MarkButton(props: IMarkButton) {
	const { format } = props;
	const editor = useSlate();
	return (
		<CheckableTag
			checked={CustomEditor.isMarkActive(editor, format)}
			onChange={(event: any) => {
				event.preventDefault();
				CustomEditor.toggleMark(editor, format);
			}}
		/>
	);
};

export const MarkButton = memo((_MarkButton));
