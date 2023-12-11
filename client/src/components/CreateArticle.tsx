import React, {FormEvent, useState} from 'react';
import {Card, Container, Dropdown, DropdownItem, Form, FormControl} from "react-bootstrap";
import {ArticleService} from "../API/article/articleService";
import {CreateArticleDto} from "../API/article/dto/create-article";

const CreateArticle = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [formData, setFormData] = useState({
        head: '',
        description: '',
        price: 0,
        currency: ''
    })
    const [errMsg, setErrMsg] = useState('');
    const [isTrade, setIsTrade] = useState(false);

    const pushData = async (event: FormEvent) => {
        event.preventDefault();
        let property: keyof typeof formData;
        for(property in formData){
            if(formData[property] === '') {
                if (!((property === 'price' || property === "currency") && isTrade))
                    setErrMsg(property + 'can not be empty');
                    return;
            }
        }

        if(accessToken) {
            const res = await ArticleService.create(accessToken, formData)
        }

    }
    return (
        <Container className="justify-content-center align-items-center mt-5">
            <Card className="p-2 shadow" style={{width:'22rem'}}>
                <h3 className="text-center text-muted" style={{fontFamily:"monospace"}}>CREATE NEW ARTICLE</h3>
            </Card>
            <Card>
                <Form className="d-flex flex-column"  onSubmit={pushData}>
                    <FormControl
                        placeholder="Title..."
                        onChange={(event) =>{
                            event.preventDefault();
                            setFormData({...formData, head: event.target.value})
                        }}/>
                    <FormControl
                        placeholder="Description..."
                        onChange={(event) =>{
                            event.preventDefault();
                            setFormData({...formData, description: event.target.value})
                        }}/>
                    <FormControl
                        placeholder="Price..."
                        onChange={(event) =>{
                            event.preventDefault();
                            if (event.target.value)
                            setFormData({...formData, price: event.target.value})
                        }}/>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Currency...
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Item 1" onSelect={(event) => setFormData({...formData, currency: event.target.value})}>
                                Item 1
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Item 2" onSelect={handleSelect}>
                                Item 2
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Item 3" onSelect={handleSelect}>
                                Item 3
                            </Dropdown.Item>
                        </Dropdown.Menu>


                    </FormControl>
                </Form>
            </Card>
        </Container>
    );
};

export default CreateArticle;