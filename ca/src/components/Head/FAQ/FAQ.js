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
                            <h3>1. 只有開啟系統自動排序，才會有編輯的字樣可以按</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                摁摁對呀 QQ, 因為沒有開啟自動排序的話, 編輯課程也看不到結果, 所以設定成有開啟自動排序才有編輯按鈕。
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>2. 資料結構因為課程調整，修習電工系的，卻放在其他，不能放進必修</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                這樣的課需要到系辦申請抵免。
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>3. 國防之前有聽說不能列入畢業學分但是在系統中有被列入在其他選修。請問是規定有改嗎還是說一樣不能列入畢業學分</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                摁摁對不行, 但是有列出。
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>4. 請問資工系的其他選修 護理方面的算不算學分呢</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                護理可以算學分。
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>5. 抵免研究所的課程可以算進畢業學分嗎？</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <p>
                                不行
                            </p>
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
            </article>
        )
    }
}

export default FAQ;