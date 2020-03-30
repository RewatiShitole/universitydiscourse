/**
 * This page is the main feed page
 * The user should arrive to this page after logging in,
 * clicking on the university discourse icon, etc.
 * 
 * This page should consist of:
 * - top bar = search bar, user profile image button, etc. 
 * - action bar = a bar that includes buttons to create post,
 *                filter posts, etc.
 * - posts from the tags that the user follows
 * - tags that the user follows
 */

import React, { Component } from 'react'
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import logo from '../../images/image1.png';
import logoName from '../../images/ImageName.png';
import './ReportPost.css'
import Button from '@material-ui/core/Button';
//import {Grid} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormControl from '@material-ui/core/FormControl';
const axios = require('axios');

const theme = createMuiTheme ({
    palette: {
        primary: {
            main:'#F2B705',
        }
    }

});
export default class ReportPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reportCount: this.props.location.state.reportCount,
            id: this.props.location.state.id,
            user:this.props.location.state.user,
            time:this.props.location.state.time,
            reportArray: this.props.location.state.reportArray,
            reportArrayindex: this.props.location.state.reportArrayindex,
            redirect1: false,
            report: false,
        };
        //console.log(this.state.reportCount);
        
    }

    onSubmit1 = (event) => {
        
       
        console.log(this.state.reportCount)
        this.setState({redirect1: true, report: true});
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/report',
            data: {
                user: this.state.user,
                time: this.state.time,
                reportArray: this.state.reportArray,
                reportArrayindex: this.state.reportArrayindex+1,
                reportCount: this.state.reportCount+1,
                id: this.state.id
            }
        })
        .then((response) => {
            alert(response.data.message);
            //alert(response.data.reportCount);
            //this.setState({reportCount: response.data.reportCount})
            this.setState({reportArray: response.data.reportArray})
            
             this.setState({reportCount: this.state.reportCount+1})


            // this.setState({reportArray: response.data.data.reportArray})
            // console.log("recent person inserted");
            // console.log(this.state.reportArray[this.state.reportArrayindex])
            // this.setState({reportArrayindex: this.state.reportArrayindex+1})
            
            
            
        })
        .catch((error) => {
            console.log("THIS IS THE ERROR");
            console.log(error);
            alert("ALWAYS");
            return;
            

        });
    }  
    
    
    
    
        

    
    render() {
        
        if (this.state.redirect1 === true) {
    
            return <Redirect exact from="/" push to={{
                pathname: "/mp",
                
            }}/>;
        }
        
       


        return (
            
            <div>
                
                <Footer />
                <TopBar/>
                
                
                <div className="EntryPage">
                    
                    <div class="grid-containerEP" >
                    <div class="grid-item1">
                        <img 
                            className="LoginLogo"
                            src={logo}
                            alt="logo" /> 
                        <br />
                    </div>
                    <div class="grid-item2">
                        <img 
                            className="LogoName2"
                            src={logoName}
                            alt="logoName"/>
                    </div>
                    </div>


                    <div class="grid-item10">

                    <FormControl>

                    <Select
                         native
                        inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                        }}
                        >
                        <option value="" />
                        <option>Inappropriate Content</option>
                        <option>I don't like it</option>
                        <option>Other</option>
                        
                        </Select>
                        <FormHelperText>Optional</FormHelperText>
                    </FormControl>

                    </div>
                    <br />
                    
                    <div class="grid-containerButtons" >
                       
                        <div class="grid-item">
                        <form onSubmit={this.onSubmit1}>
                            <ThemeProvider theme={theme}>
                            <Button 
                                className  = "ReportButton" 
                                variant = "contained"
                                color = "primary" 
                                type = "submit"
                                >
                                Report
                            </Button> 
                            </ThemeProvider>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
