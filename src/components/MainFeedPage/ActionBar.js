/**
 * This is a react component class for the action bar which
 * contains several buttons such as :
 * - 'Make a post'
 * - 'Text'
 * - 'Image'
 * - 'Document'
 * - 'Calendar'
 * - 'Link'
 * 
 * Please look at the UI mockup for image explanation
 */

 import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
 
 export default class ActionBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toCreatePostPage: false
        };
    }
    
     render() {

        // redirect to create post page
        if (this.state.toCreatePostPage) {
            return <Redirect to="/createpost"/>;
        }

         return (
             <div className="ActionBarButtonsContainer">
                 <button 
                    className="ActionBarButtonOdd"
                    id="CreatePostButton"
                    type="button"
                    onClick={() => {this.setState({toCreatePostPage: true})}} >
                    MAKE A POST
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterTextButton"
                    type="button" >
                    TEXT
                 </button>
                 <button 
                    className="ActionBarButtonOdd"
                    id="FilterImageButton"
                    type="button" >
                    IMAGE
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterDocumentButton"
                    type="button" >
                    DOCUMENT
                 </button>
                 <button 
                    className="ActionBarButtonOdd"
                    id="FilterCalendarButton"
                    type="button" >
                    CALENDAR
                 </button>
                 <button 
                    className="ActionBarButtonEven"
                    id="FilterLinkButton"
                    type="button" >
                    LINK
                 </button>
             </div>
         )
     }
 }
 