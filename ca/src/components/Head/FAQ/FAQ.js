import React from 'react'

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import './react-accessible-accordion.css';
import './FAQ.css';

class FAQ extends React.Component {
    componentWillUpdate(){

    }
    render(){
        return (
            <article id='faq-modal' className='paper-shadow'>
                <header><h1>常見問題</h1></header>
                <Accordion accordion={false}>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>Simple title</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                答案就是這樣這樣
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>Simple title</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                答案就是這樣這樣
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>Simple title</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                答案就是這樣這樣
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>Complex title</h3>
                            <div>With a bit of description</div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，我是測試測試，
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
            </article>
        )
    }
}

export default FAQ;