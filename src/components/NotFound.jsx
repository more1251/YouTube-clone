import React from 'react'

const NotFound = () => {
  return (
    <>
    <main 
        style={{ 
            display:"flex", flexDirection:"column", placeItems:"center" ,marginTop: "100px", padding:"4rem"
        }}
    >
        <img 
            style={{
                width: "180px", height:"180px",filter: "invert(100%)" 
            }} 
              src="https://rb.gy/72grrm" alt=''
        />

        <p 
            style={{
               marginTop: "50px", fontSize:"1.5rem", fontWeight:"500", letterSpacing:"2px"
            }}
        >
        OOPS! There's nothing here ☹️?
        </p>

        <a href="/" 
            style={{
            backgroundColor: "#b80e0e", textDecoration:'none', color:"#fff", padding: "1rem", borderRadius: "15px", fontWeight:"600", fontSize: "1rem",letterSpacing:"2px", margin: "15px auto"}}
        >
        Back to Youtube
        </a>

    </main>
    </>
  )
}

export default NotFound