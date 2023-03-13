import React, { Component } from 'react'
import HomeForm from './HomeForm'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material/'

class Home extends Component{
    render(){
        return(
            <React.Fragment>
                <CssBaseline />
                    <Container maxWidth='md'>
                    <HomeForm/>
                </Container>
            </React.Fragment>
        )
    }
}

export default Home