import React, { useState, useEffect } from "react";
import Collapsible from 'react-collapsible';



const NewsContainer = () => {

    const apiKey = "2f9437c4ebb54e89a3ed45198236a89c"; //mein API key
    //let lang = "de"; //meine default language
    //const urlDE = `https://newsapi.org/v2/top-headlines?country=de&apiKey=${apiKey}`
    //const urlEn = `https://newsapi.org/v2/top-headlines?country=${lang}&apiKey=${apiKey}`

    const [jsonArr, setJsonarr] = useState([]); // API Abruf als Array in "jsonArr", wir laden die erhaltenen json-Daten in den setter "setJsonarr", das resultierende "jsonArr" ist Basis für die Ausgabe der Werte im "return", hier mit map als Übergabe der Werte ins HTML

    //const [newsLang, setNewsLang] = useState("de"); //API Abruf für andere Sprachen, default language "de"

    const [newsType, setNewsType] = useState("tesla")


    //wenn ein State sich ändert, rufen wir useEffect auf, dort erfolgt auch der Fetch:
    useEffect(() => {
        fetch(`https://newsapi.org/v2/everything?q=${newsType}&language=de&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.articles) //we can call this Data if we want
                setJsonarr(data.articles) //setJasonarr(): in diese Funktion wird json.articles übergeben, dieses gibt jsonArr aus, damit die Basis für map in return
            })
    }, [newsType])   //unser parameterwert ist die geänderte Sprache


    return (
        <>
            <article className="change">
                <h1>News Category: {newsType}</h1>
                <Collapsible trigger="Click here to show/hide different categories">
                    <button className="changeButton" onClick={() => setNewsType('bitcoin')}>News on Bitcoin</button>
                    <button className="changeButton" onClick={() => setNewsType('tesla')}>News on Tesla</button>
                    <button className="changeButton" onClick={() => setNewsType('apple')}>News on Apple</button>
                    <button className="changeButton" onClick={() => setNewsType('ukraine')}>News on Ukraine</button>

                </Collapsible>


            </article>
            <main>

                {jsonArr.map((singleArticle, i) => {
                    return (
                        <figure key={i}>
                            <img src={singleArticle.urlToImage}
                                onError={(e) => (e.target.onError = null,
                                    e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png")} alt="photo" className="photo" />
                            <h3 className="title">{singleArticle.title.slice(0, 100)}</h3>
                            <p className="body">{singleArticle.description.slice(0, 300)}...</p>
                            <h5 className="date">{singleArticle.publishedAt.slice(0, 10)}</h5>
                            <button ><a href={singleArticle.url}>READ MORE</a></button>
                        </figure>
                    )
                })}

            </main>
        </>
    )


}

export default NewsContainer