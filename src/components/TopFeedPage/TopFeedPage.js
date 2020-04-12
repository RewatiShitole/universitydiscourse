import React, { Component } from 'react';
import TopBar from '../TopBar';
//import Footer from '../Footer';
import ActionBar from './ActionBar';
import Post from './../Post';
import SideBar from '../SideBar';
import { Grid, createMuiTheme } from '@material-ui/core';
import './MainFeedPage.css';
import sample_tags from '../../mock_data/AllTags.json';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {ThemeProvider} from '@material-ui/styles'



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F2B705"
        },
        secondary: {
            main: "#F2C94C"
        },
        post_primary: {
            main: "#F2F2F2"
        },
        post_secondary: {
            main: "#757575"
        },
        text: {
            main: "#000000",
            sub: "#9B9B9B"
        }
    }
});

export default class MainFeedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredPosts: [],
            alert: false,
            alertText: "",
            alertType: "",
           
        };
        //localStorage.setItem("tags", "CS307");
    }

   
    
    renderSet(text, alertType) {
        this.setState({alert: true, alertText: text, alertType: alertType});
    }

    renderAlert(text) {
        return <Snackbar open={this.state.alert} autoHideDuration={2000}  onClose={() => this.setState({alert: false})}>
                    <Alert severity={this.state.alertType}>
                    {this.state.alertText}
                    </Alert>
                </Snackbar>
    }
        
    

    /**
     * Helper function to get the posts for the user
     * Get all the posts from hot section and filter by
     * the tags the user follows
     */
    getPosts = async () => {

        // Send request to the database
        axios({
                method: 'get',
                url: 'http://localhost:3000/api/getposts'
        })
        .then((response) => {
            
            let posts = [];
            posts = response.data.data;

            // request user data for the tags
            axios({
                method: 'post',
                url: 'http://localhost:3000/api-user/getuser',
                data: {
                    email: localStorage.getItem("email"),
                    username: localStorage.getItem("username")
                }
            })
            .then((response) => {
                console.log(response.data.data)

                // Filter the posts based on the tags the user follows
                let tags =  response.data.data.tags.split(",");

                // save the tags to the local storage
                localStorage.setItem("tags", tags.toString());

                let filteredPosts = [];

                posts.forEach((post) => {

                    if (post.likeCount +post.upvoteCount - post.downvoteCount >= 2 && filteredPosts.length < 10) {
                        filteredPosts.push(<Post key={Math.random()*100000} data={post} theme={theme}/>);
                    }

                    // for (let i = 0; i < post.tag.length; i++) {
                    //     if (tags.includes(post.tag[i]) || tags.includes("default")) {
                    //         filteredPosts.push(<Post key={Math.random()*100000} data={post} theme={theme}/>);
                    //         console.log(post)
                    //         break;
                    //     }
                    // }
                });
                
                this.setState({
                    filteredPosts: filteredPosts
                });

            })
            .catch((error) => {
                console.error(error);
                alert('An error occurred');
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }


    componentDidMount() {
        this.getPosts();
    }

    render() {

       
        
      return (
          
          <div className="MainFeedPage">
            {this.renderAlert()}
              <SideBar />

              <Grid 
                  container
                  spacing={3}
                  direction="column"
                  justify="space-around"
                  alignItems="center" >
                  {/* <Grid item >
                      <TopBar /> 
                  </Grid> */}
                  <Grid 
                      container
                      wrap="nowrap" 
                      spacing={3}
                      direction="row"
                      justify="center"
                      alignItems="flex-start" >
                      <Grid item>
                          <Grid container
                              wrap="nowrap"
                              spacing={2}
                              direction="column">
                        
                              {/* <Grid item>
                                  <ActionBar theme={theme}/>
                              </Grid> */}
                              <Grid item>
                                  {this.state.filteredPosts === null ? <p>Fetching data</p> : this.state.filteredPosts}
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>                
          </div>
      );
    }
}