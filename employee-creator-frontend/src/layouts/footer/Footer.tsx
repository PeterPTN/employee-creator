const Footer = () => {
  return (
    <div style={{textAlign: "center", margin: "1rem"}}>
      <span >&copy; {new Date().getFullYear()} <a style={{color: "white"}} href="https://pptn-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">Peter Nguyen</a></span>
    </div>
  )
}

export default Footer