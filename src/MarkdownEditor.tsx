import React from 'react';
import styled from 'styled-components';
import MarkdownOuput from './MarkdownOutput';

const Container = styled.div`
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-items: space-between;
`;

const Textarea = styled.textarea`
    font-family: inherit;
    font-size: inherit;
    width: 50%;
    height: 100%;
`;

const Preview = styled.div`
    background: #f3f3f3;
    width: 50%;
`;

type MarkdownEditorProps = {
    placeholder?: string;
};

const MarkdownEditor = ({ placeholder = '' }: MarkdownEditorProps) => {
    const [textInput, enterText] = React.useState("");
    const onTextInput = (event:any) => {
        enterText(event.target.value);
    }

    return (
        <Container>
            <Textarea
                data-testid="markdown-textarea"
                placeholder={placeholder}
                value={textInput}
                onChange={onTextInput}
            />
            <Preview>
                <MarkdownOuput text={textInput} />
            </Preview>
        </Container>
    );
};

export default MarkdownEditor;
