import React from 'react'

function About() {
  return (
    <div className="about-section"> <h1>What is this tool?</h1>
    <br />
    <h2><i>This is a browser based tool to build and deploy web APIs and run PowerShell scripts.</i></h2>
    
    <br/>   
    <hr></hr><br/><h1>What can you do with this tool?</h1>
    <br />
    <h2><u>Build and Deploy Web APIs and Run PowerShell scripts</u></h2>
    <br />
    <br />
    <h2><u>Build and Deploy Web APIs</u></h2>
    <br />
    <h3>Let's say you have to run more than one Web API to execute your Client application (Angular or WPF)</h3>
    <br />
    <h3>You would be running multiple Visual Studio instances and start each API via Visual Studio</h3>
    <br />
    <h3>This is a very time/your system's memory consuming process and you would have to wait for each API to be ready before you can start your Client application</h3>
    <br />
    <h3>This is where this tool comes in. You can run your Web APIs in parallel and start your Client application once all Web APIs are ready</h3>
    <br />
    <br/><br/>   
    <h2><u>Run PowerShell scripts</u></h2>
    <br />      
    <h3>You can also use this tool to run any PowerShell script that you have in your machine</h3>   <br />
    <br/>   
    <hr></hr><br/><h2>Please click the Hamburger to begin</h2>
  </div>
  )
}

export default About