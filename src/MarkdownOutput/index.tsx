import React from 'react';
import styled from 'styled-components';
import patternsAndReplacers from './patternsAndReplacers';

const Container = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding-left: 15px;
`;

interface MarkdownOutputProps {
  text: string;
}

const MarkdownOuput = ({text}:MarkdownOutputProps) => {
    const output = patternsAndReplacers.reduce((out,el) => {
      return out.replace(el.pattern, el.replacer);
    }, text);
    
    return (<Container  data-testid="markdown-preview" dangerouslySetInnerHTML={{__html: output }} />);
}


export default MarkdownOuput;
