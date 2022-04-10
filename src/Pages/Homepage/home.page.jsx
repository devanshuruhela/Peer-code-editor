import React from 'react'
import './homepage.styles.css'
import logo from '../../Assets/code-sync.png'
export const Home = () => {
  return (
    <div className='homePageContainer'>
      <div className="formContainer">
        <img src={logo} className='homepagelogo' alt="code" />
        <h4 className='main-label'> Paste invitation ROOM ID</h4>
        <div className="inputContainer">
          <input type="text" className='inputBox' placeholder='ROOM ID'/>
          <input type="text" className='inputBox' placeholder='USERNAME'/>
          <button className='btn joinbtn'>JOIN</button>
          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a href="google.com" className='createNewBtn'>new room </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with love By <a href="https://github.com/devanshuruhela">Devanshu</a> </h4>
      </footer>
    </div>
  )
}

export default Home;
