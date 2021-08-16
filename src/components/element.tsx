
import CustomEditor from "./editor-custom";
import "./component.module.css";
import { useSlateStatic, useSelected, useFocused } from "slate-react";

const CodeElement = (props) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};
const DefaultElement = (props) => {
	return <div {...props.attributes}>{props.children}</div>;
};

const Link = (props) => {
	const { attributes, element, children } = props;
	const editor = useSlateStatic();
	const selected = useSelected();
	const focused = useFocused();

	const openLink = (link) => {
		const anchorEl = document.createElement('a');

		anchorEl.href = link;
		anchorEl.target = '_blank';
		anchorEl.rel = 'noopener noreferrer';
		setTimeout(() => {
			anchorEl.click();
		});
	}

	console.log(window.location)

	return (
		<div className="element-link">
			<div {...attributes} onClick={openLink(element.href)}>
				{children}
			</div>
			{selected && focused && (
				<div className="popup" contentEditable={false}>
					<a href={element.href} rel="noreferrer" target="_blank">
						{element.href}
					</a>
					<button
						onClick={() => {
							CustomEditor.removeLink(editor);
						}}
					>
						Unlink
        		 	</button>
				</div>
			)}
		</div>
	);
};

export { CodeElement, DefaultElement, Link };
