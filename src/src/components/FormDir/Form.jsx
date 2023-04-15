import React from 'react'

export default function Form(){

    const [meme , setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: '/meme-assets/memeFace.gif',
    })
    const [allMemes , setallMemes] = React.useState([]);

    function getMemeImage(){
        const randomNum = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNum].url        
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event){
        const {name , value} =  event.target

        setMeme(()=>{
            return {
                ...meme,
                [name] : value
            }
        })
    }

        React.useEffect(()=>{
            fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setallMemes(data.data.memes))            
        },[])
    
        

    return (
        <div className ="form">
            <input 
                id = "top-text" 
                name = "topText"
                className="memeInput"
                placeholder = "top-text" 
                type="text" 
                onChange={handleChange}
                values = {meme.topText}
            />
            <input 
                id = "bottom-text" 
                name = "bottomText"
                className="memeInput"
                placeholder = "bottom-text" 
                type="text"
                onChange={handleChange}
                values = {meme.bottomText}
             />        
            <div className = "button-holder">
                <button onClick ={getMemeImage}
                className = "form--button">
                    Get a new meme Image
                </button>

            </div>
            <div className="image-holder">
                <img className = "memeImage" src={meme.randomImage} />
                <h2 className = "top--text">{meme.topText}</h2>
                <h2 className = "bottom--text">{meme.bottomText}</h2>
            </div>
        </div>
    )
}