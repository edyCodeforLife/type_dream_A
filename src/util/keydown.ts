import CustomEditor from '../components/editor-custom';

export const customOnKeyDown = (listOnKeyDown, event, editor) => {
	if (event.ctrlKey) {
		// eslint-disable-next-line default-case
		switch (event.key) {
			case '`': {
				event.preventDefault();
				CustomEditor.toggleCodeBlock(editor);
				break;
			}
			case 'b': {
				event.preventDefault();
				CustomEditor.toggleBoldMark(editor);
				break;
			}
		}
	}
	return listOnKeyDown(event);
};
